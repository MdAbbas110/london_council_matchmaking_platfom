import { useState } from "react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: "🏛️",
      title: "Trusted by London Council",
      description: "A safe, verified platform backed by local government to help you find meaningful connections in your community."
    },
    {
      icon: "🤝",
      title: "Meaningful Connections",
      description: "We focus on compatibility and shared values, not just swiping. Build relationships that last."
    },
    {
      icon: "🌍",
      title: "Inclusive Community",
      description: "Celebrating diversity and bringing together people from all backgrounds across London."
    },
    {
      icon: "🔒",
      title: "Safe & Secure",
      description: "Your privacy and safety are our top priorities. All profiles are verified and monitored."
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 animate-bounce-gentle">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
              <span className="text-6xl">{slides[currentSlide].icon}</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
            {slides[currentSlide].title}
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-delay">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                index === currentSlide ? 'bg-rose-500 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              currentSlide === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nextSlide}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
