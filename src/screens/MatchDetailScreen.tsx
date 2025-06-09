import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";
import { Id } from "../../convex/_generated/dataModel";

interface MatchDetailScreenProps {
  userId: string | null;
  onNavigate: (screen: Screen, data?: any) => void;
}

export function MatchDetailScreen({ userId, onNavigate }: MatchDetailScreenProps) {
  const potentialMatches = useQuery(api.profiles.getPotentialMatches, { limit: 100 });
  const createMatch = useMutation(api.matches.createMatch);

  const profile = potentialMatches?.find(p => p.userId === userId);

  const handleAction = async (action: 'like' | 'pass') => {
    if (!userId) return;

    try {
      await createMatch({
        targetUserId: userId as Id<"users">,
        action,
      });
      
      onNavigate('home');
    } catch (error) {
      console.error('Failed to create match:', error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      {/* Profile content */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Photos */}
          <div className="relative h-96 bg-gradient-to-br from-rose-200 to-pink-200">
            {profile.photoUrls && profile.photoUrls.length > 0 ? (
              <img
                src={profile.photoUrls[0].url || ''}
                alt={profile.firstName}
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
              <h2 className="text-3xl font-bold">
                {profile.firstName} {profile.lastName}, {profile.age}
              </h2>
              <p className="text-lg opacity-90">{profile.location}</p>
            </div>
          </div>

          {/* Profile details */}
          <div className="p-6 space-y-6">
            {/* Profession */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profession</h3>
              <p className="text-gray-700">{profile.profession}</p>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional photos */}
            {profile.photoUrls && profile.photoUrls.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">More Photos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {profile.photoUrls.slice(1).map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={photo.url || ''}
                        alt={`${profile.firstName} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-6 mt-6 pb-6">
          <button
            onClick={() => handleAction('pass')}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-2xl">❌</span>
          </button>
          
          <button
            onClick={() => handleAction('like')}
            className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110"
          >
            <span className="text-3xl">💝</span>
          </button>
        </div>
      </div>
    </div>
  );
}
