import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";

interface HomeScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const potentialMatches = useQuery(api.profiles.getPotentialMatches, { limit: 10 });
  const createMatch = useMutation(api.matches.createMatch);

  const handleSwipe = async (action: 'like' | 'pass') => {
    if (!potentialMatches || currentIndex >= potentialMatches.length) return;

    const currentMatch = potentialMatches[currentIndex];
    
    try {
      await createMatch({
        targetUserId: currentMatch.userId,
        action,
      });
      
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Failed to create match:', error);
    }
  };

  if (!potentialMatches) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You're all caught up!</h2>
          <p className="text-gray-600 mb-6">Check back later for new potential matches.</p>
          <button
            onClick={() => onNavigate('search')}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
          >
            Explore Search
          </button>
        </div>
      </div>
    );
  }

  const currentProfile = potentialMatches[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover</h1>
          <p className="text-gray-600">Find your perfect match</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 transform transition-all duration-300 hover:scale-105">
          {/* Photo */}
          <div className="relative h-96 bg-gradient-to-br from-rose-200 to-pink-200">
            {currentProfile.photoUrls && currentProfile.photoUrls.length > 0 ? (
              <img
                src={currentProfile.photoUrls[0].url || ''}
                alt={currentProfile.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Basic info overlay */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">
                {currentProfile.firstName}, {currentProfile.age}
              </h3>
              <p className="text-sm opacity-90">{currentProfile.location}</p>
            </div>
          </div>

          {/* Profile details */}
          <div className="p-6">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-1">{currentProfile.profession}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{currentProfile.bio}</p>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Interests</h5>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.slice(0, 6).map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* View full profile button */}
            <button
              onClick={() => onNavigate('match-detail', { userId: currentProfile.userId })}
              className="w-full py-2 text-rose-600 font-medium hover:bg-rose-50 rounded-lg transition-colors duration-200"
            >
              View Full Profile
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleSwipe('pass')}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-2xl">❌</span>
          </button>
          
          <button
            onClick={() => handleSwipe('like')}
            className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-3xl">💝</span>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} of {potentialMatches.length}
          </p>
        </div>
      </div>
    </div>
  );
}
