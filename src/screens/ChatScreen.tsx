import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";
import { Id } from "../../convex/_generated/dataModel";

interface ChatScreenProps {
  matchId: string | null;
  onNavigate: (screen: Screen, data?: any) => void;
}

export function ChatScreen({ matchId, onNavigate }: ChatScreenProps) {
  const [newMessage, setNewMessage] = useState("");
  const matches = useQuery(api.matches.getMatches);
  const messages = useQuery(
    api.messages.getMessages,
    matchId ? { matchId: matchId as Id<"matches"> } : "skip"
  );
  const sendMessage = useMutation(api.messages.sendMessage);
  const markAsRead = useMutation(api.messages.markMessagesAsRead);

  // Mark messages as read when viewing
  useEffect(() => {
    if (matchId) {
      markAsRead({ matchId: matchId as Id<"matches"> });
    }
  }, [matchId, markAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !matchId) return;

    try {
      await sendMessage({
        matchId: matchId as Id<"matches">,
        content: newMessage,
        messageType: "text",
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!matchId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>

        {/* Matches list */}
        <div className="p-4">
          {matches && matches.length > 0 ? (
            <div className="space-y-3">
              {matches.filter(match => match !== null).map((match) => (
                <div
                  key={match.matchId}
                  onClick={() => onNavigate('chat', { matchId: match.matchId })}
                  className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center overflow-hidden">
                      {match.profile.photoUrl ? (
                        <img
                          src={match.profile.photoUrl}
                          alt={match.profile.firstName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {match.profile.firstName} {match.profile.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {match.lastMessage?.content || "Start a conversation..."}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {match.lastMessage && new Date(match.lastMessage._creationTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
              <p className="text-gray-600 mb-4">Start swiping to find your perfect match!</p>
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
              >
                Start Discovering
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentMatch = matches?.find(m => m && m.matchId === matchId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('chat')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center overflow-hidden">
            {currentMatch?.profile.photoUrl ? (
              <img
                src={currentMatch.profile.photoUrl}
                alt={currentMatch.profile.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg">👤</span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {currentMatch?.profile.firstName} {currentMatch?.profile.lastName}
            </h2>
            <p className="text-sm text-gray-600">{currentMatch?.profile.location}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === currentMatch?.profile.userId ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.senderId === currentMatch?.profile.userId
                    ? 'bg-white text-gray-900'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === currentMatch?.profile.userId ? 'text-gray-500' : 'text-white/70'
                }`}>
                  {new Date(message._creationTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start the conversation!</h3>
            <p className="text-gray-600">Say hello to {currentMatch?.profile.firstName}</p>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
