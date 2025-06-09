import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";
import { toast } from "sonner";

interface ProfileScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = useQuery(api.profiles.getCurrentProfile);
  const updateProfile = useMutation(api.profiles.updateProfile);

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    bio: "",
    profession: "",
    location: "",
    interests: [] as string[],
  });

  const availableInterests = [
    "Travel", "Cooking", "Reading", "Music", "Sports", "Art", "Photography",
    "Dancing", "Hiking", "Yoga", "Movies", "Gaming", "Volunteering", "Fitness"
  ];

  const londonAreas = [
    "Central London", "North London", "South London", "East London", "West London",
    "Camden", "Greenwich", "Hackney", "Hammersmith", "Islington", "Kensington",
    "Lambeth", "Lewisham", "Southwark", "Tower Hamlets", "Wandsworth", "Westminster"
  ];

  const startEditing = () => {
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        bio: profile.bio,
        profession: profile.profession,
        location: profile.location,
        interests: profile.interests,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(editData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleInterestToggle = (interest: string) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={startEditing}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile photo */}
          <div className="relative h-64 bg-gradient-to-br from-rose-200 to-pink-200">
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
              <h2 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}, {profile.age}
              </h2>
              <p className="text-sm opacity-90">{profile.location}</p>
            </div>
          </div>

          {/* Profile details */}
          <div className="p-6 space-y-6">
            {isEditing ? (
              <>
                {/* Edit form */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={editData.age}
                    onChange={(e) => setEditData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                  <input
                    type="text"
                    value={editData.profession}
                    onChange={(e) => setEditData(prev => ({ ...prev, profession: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={editData.location}
                    onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    {londonAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableInterests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-2 rounded-lg border text-sm transition-all duration-200 ${
                          editData.interests.includes(interest)
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* View mode */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Profession</h3>
                  <p className="text-gray-700">{profile.profession}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>

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

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferences</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Age range: {profile.preferences.ageRange.min} - {profile.preferences.ageRange.max}</p>
                    <p>Maximum distance: {profile.preferences.maxDistance} miles</p>
                    {profile.preferences.profession && (
                      <p>Preferred profession: {profile.preferences.profession}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('testimonials')}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">💕</span>
              <h3 className="font-medium text-gray-900">Success Stories</h3>
              <p className="text-sm text-gray-600">Share your story</p>
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('support')}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">🎫</span>
              <h3 className="font-medium text-gray-900">Support</h3>
              <p className="text-sm text-gray-600">Get help</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
