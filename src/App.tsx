import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { ProfileSetupScreen } from "./screens/ProfileSetupScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MatchDetailScreen } from "./screens/MatchDetailScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { TestimonialsScreen } from "./screens/TestimonialsScreen";
import { SupportScreen } from "./screens/SupportScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'profile-setup'
  | 'home'
  | 'search'
  | 'chat'
  | 'testimonials'
  | 'support'
  | 'profile'
  | 'match-detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const profile = useQuery(api.profiles.getCurrentProfile);

  useEffect(() => {
    // Auto-advance from splash screen
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    // Handle navigation based on auth and profile state
    if (loggedInUser === undefined) return; // Still loading

    if (!loggedInUser) {
      if (currentScreen !== 'splash' && currentScreen !== 'onboarding') {
        setCurrentScreen('auth');
      }
    } else if (loggedInUser && !profile?.isComplete) {
      setCurrentScreen('profile-setup');
    } else if (loggedInUser && profile?.isComplete && currentScreen === 'auth') {
      setCurrentScreen('home');
    }
  }, [loggedInUser, profile, currentScreen]);

  const navigateToScreen = (screen: Screen, data?: any) => {
    if (screen === 'match-detail' && data?.userId) {
      setSelectedUserId(data.userId);
    }
    if (screen === 'chat' && data?.matchId) {
      setSelectedMatchId(data.matchId);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setCurrentScreen('auth')} />;
      case 'auth':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 p-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to continue your journey</p>
              </div>
              <SignInForm />
            </div>
          </div>
        );
      case 'profile-setup':
        return <ProfileSetupScreen onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={navigateToScreen} />;
      case 'search':
        return <SearchScreen onNavigate={navigateToScreen} />;
      case 'chat':
        return <ChatScreen matchId={selectedMatchId} onNavigate={navigateToScreen} />;
      case 'testimonials':
        return <TestimonialsScreen onNavigate={navigateToScreen} />;
      case 'support':
        return <SupportScreen onNavigate={navigateToScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateToScreen} />;
      case 'match-detail':
        return <MatchDetailScreen userId={selectedUserId} onNavigate={navigateToScreen} />;
      default:
        return <HomeScreen onNavigate={navigateToScreen} />;
    }
  };

  const showNavigation = loggedInUser && profile?.isComplete && 
    !['splash', 'onboarding', 'auth', 'profile-setup'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Authenticated>
        {showNavigation && (
          <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-4 py-3">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Connect
              </h2>
              <SignOutButton />
            </div>
          </div>
        )}
      </Authenticated>

      <main className={showNavigation ? 'pb-20' : ''}>
        {renderScreen()}
      </main>

      {showNavigation && (
        <Navigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
