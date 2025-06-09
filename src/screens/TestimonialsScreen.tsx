import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";
import { toast } from "sonner";

interface TestimonialsScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function TestimonialsScreen({ onNavigate }: TestimonialsScreenProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    partnerName: "",
    story: "",
    relationshipLength: "",
  });

  const testimonials = useQuery(api.testimonials.getApprovedTestimonials);
  const submitTestimonial = useMutation(api.testimonials.submitTestimonial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitTestimonial({
        partnerName: formData.partnerName,
        story: formData.story,
        relationshipLength: formData.relationshipLength,
      });
      
      toast.success("Thank you! Your testimonial has been submitted for review.");
      setFormData({ partnerName: "", story: "", relationshipLength: "" });
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Success Stories</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
          >
            Share Your Story
          </button>
        </div>
      </div>

      {/* Submit form */}
      {showForm && (
        <div className="bg-white border-b border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Name
              </label>
              <input
                type="text"
                value={formData.partnerName}
                onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Your partner's name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship Length
              </label>
              <select
                value={formData.relationshipLength}
                onChange={(e) => setFormData(prev => ({ ...prev, relationshipLength: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              >
                <option value="">Select duration</option>
                <option value="Less than 6 months">Less than 6 months</option>
                <option value="6 months - 1 year">6 months - 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2+ years">2+ years</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Story
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Tell us about how you met and your journey together..."
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
              >
                Submit Story
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials */}
      <div className="p-4">
        {testimonials && testimonials.length > 0 ? (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center overflow-hidden">
                    {testimonial.photoUrl ? (
                      <img
                        src={testimonial.photoUrl}
                        alt="Couple"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">💕</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        Anonymous & {testimonial.partnerName}
                      </h3>
                      <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                        {testimonial.relationshipLength}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{testimonial.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💕</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share your success story!</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
            >
              Share Your Story
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
