import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";

interface SearchScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [filters, setFilters] = useState({
    ageRange: { min: 25, max: 35 },
    location: "",
    profession: "",
    interests: [] as string[],
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const potentialMatches = useQuery(api.profiles.getPotentialMatches, { limit: 50 });

  const availableInterests = [
    "Travel", "Cooking", "Reading", "Music", "Sports", "Art", "Photography",
    "Dancing", "Hiking", "Yoga", "Movies", "Gaming", "Volunteering", "Fitness"
  ];

  const londonAreas = [
    "Central London", "North London", "South London", "East London", "West London",
    "Camden", "Greenwich", "Hackney", "Hammersmith", "Islington", "Kensington",
    "Lambeth", "Lewisham", "Southwark", "Tower Hamlets", "Wandsworth", "Westminster"
  ];

  const filteredMatches = potentialMatches?.filter(profile => {
    const ageMatch = profile.age >= filters.ageRange.min && profile.age <= filters.ageRange.max;
    const locationMatch = !filters.location || profile.location === filters.location;
    const professionMatch = !filters.profession || profile.profession.toLowerCase().includes(filters.profession.toLowerCase());
    const interestMatch = filters.interests.length === 0 || 
      filters.interests.some(interest => profile.interests.includes(interest));
    
    return ageMatch && locationMatch && professionMatch && interestMatch;
  }) || [];

  const handleInterestToggle = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Search</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">🔍</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-4 space-y-4">
          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range: {filters.ageRange.min} - {filters.ageRange.max}
            </label>
            <div className="flex space-x-4">
              <input
                type="range"
                min="18"
                max="80"
                value={filters.ageRange.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  ageRange: { ...prev.ageRange, min: parseInt(e.target.value) }
                }))}
                className="flex-1"
              />
              <input
                type="range"
                min="18"
                max="80"
                value={filters.ageRange.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  ageRange: { ...prev.ageRange, max: parseInt(e.target.value) }
                }))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="">All areas</option>
              {londonAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
            <input
              type="text"
              value={filters.profession}
              onChange={(e) => setFilters(prev => ({ ...prev, profession: e.target.value }))}
              placeholder="Search by profession..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
            <div className="grid grid-cols-2 gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-2 rounded-lg border text-sm transition-all duration-200 ${
                    filters.interests.includes(interest)
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredMatches.length} profiles found
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredMatches.map((profile) => (
            <div
              key={profile._id}
              onClick={() => onNavigate('match-detail', { userId: profile.userId })}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              {/* Photo */}
              <div className="relative h-48 bg-gradient-to-br from-rose-200 to-pink-200">
                {profile.photoUrls && profile.photoUrls.length > 0 ? (
                  <img
                    src={profile.photoUrls[0].url || ''}
                    alt={profile.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Basic info overlay */}
                <div className="absolute bottom-2 left-2 text-white">
                  <h3 className="font-bold text-sm">
                    {profile.firstName}, {profile.age}
                  </h3>
                  <p className="text-xs opacity-90">{profile.location}</p>
                </div>
              </div>

              {/* Profile details */}
              <div className="p-3">
                <p className="text-xs text-gray-600 mb-2">{profile.profession}</p>
                <div className="flex flex-wrap gap-1">
                  {profile.interests.slice(0, 2).map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{profile.interests.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more profiles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
