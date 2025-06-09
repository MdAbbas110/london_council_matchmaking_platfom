import { Screen } from "../App";

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Discover', icon: '💝' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'chat', label: 'Matches', icon: '💕' },
    { id: 'testimonials', label: 'Stories', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              currentScreen === item.id
                ? 'bg-rose-50 text-rose-600 scale-105'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
