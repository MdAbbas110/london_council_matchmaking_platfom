# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Ignored for the template, you probably want to remove it:
package-lock.json
```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}

```

# eslint.config.js

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "eslint.config.js",
      "convex/_generated",
      "postcss.config.js",
      "tailwind.config.js",
      "vite.config.ts",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: [
          "./tsconfig.node.json",
          "./tsconfig.app.json",
          "./convex/tsconfig.json",
        ],
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // All of these overrides ease getting into
      // TypeScript, and can be removed for stricter
      // linting down the line.

      // Only warn on unused variables, and ignore variables starting with `_`
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      // Allow escaping the compiler
      "@typescript-eslint/ban-ts-comment": "error",

      // Allow explicit `any`s
      "@typescript-eslint/no-explicit-any": "off",

      // START: Allow implicit `any`s
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      // END: Allow implicit `any`s

      // Allow async functions without await
      // for consistency (esp. Convex `handler`s)
      "@typescript-eslint/require-await": "off",
    },
  },
);

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/src/index.css" />

    <title>Chef</title>

    <meta property="og:image" content="/og-preview.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "flex-template",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "npm-run-all --parallel dev:frontend dev:backend",
    "dev:frontend": "vite --open",
    "dev:backend": "convex dev",
    "lint": "tsc -p convex -noEmit --pretty false && tsc -p . -noEmit --pretty false && convex dev --once && vite build"
  },
  "dependencies": {
    "@convex-dev/auth": "^0.0.80",
    "clsx": "^2.1.1",
    "convex": "^1.24.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/node": "^22.13.10",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "~10",
    "dotenv": "^16.4.7",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "npm-run-all": "^4.1.5",
    "postcss": "~8",
    "prettier": "^3.5.3",
    "tailwindcss": "~3",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.24.1",
    "vite": "^6.2.0"
  }
}

```

# postcss.config.cjs

```cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

# README.md

```md
# London Council Matchmaking Platform
  
This is a project built with [Chef](https://chef.convex.dev) using [Convex](https://convex.dev) as its backend.
  
This project is connected to the Convex deployment named [`robust-puma-577`](https://dashboard.convex.dev/d/robust-puma-577).
  
## Project structure
  
The frontend code is in the `app` directory and is built with [Vite](https://vitejs.dev/).
  
The backend code is in the `convex` directory.
  
`npm run dev` will start the frontend and backend servers.

## App authentication

Chef apps use [Convex Auth](https://auth.convex.dev/) with Anonymous auth for easy sign in. You may wish to change this before deploying your app.

## Developing and deploying your app

Check out the [Convex docs](https://docs.convex.dev/) for more information on how to develop with Convex.
* If you're new to Convex, the [Overview](https://docs.convex.dev/understanding/) is a good place to start
* Check out the [Hosting and Deployment](https://docs.convex.dev/production/) docs for how to deploy your app
* Read the [Best Practices](https://docs.convex.dev/understanding/best-practices/) guide for tips on how to improve you app further

## HTTP API

User-defined http routes are defined in the `convex/router.ts` file. We split these routes into a separate file from `convex/http.ts` to allow us to prevent the LLM from modifying the authentication routes.

```

# setup.mjs

```mjs
/**
 * This script runs `npx @convex-dev/auth` to help with setting up
 * environment variables for Convex Auth.
 *
 * You can safely delete it and remove it from package.json scripts.
 */

import fs from "fs";
import { config as loadEnvFile } from "dotenv";
import { spawnSync } from "child_process";

if (!fs.existsSync(".env.local")) {
  // Something is off, skip the script.
  process.exit(0);
}

const config = {};
loadEnvFile({ path: ".env.local", processEnv: config });

const runOnceWorkflow = process.argv.includes("--once");

if (runOnceWorkflow && config.SETUP_SCRIPT_RAN !== undefined) {
  // The script has already ran once, skip.
  process.exit(0);
}

const result = spawnSync("npx", ["@convex-dev/auth", "--skip-git-check"], {
  stdio: "inherit",
});

if (runOnceWorkflow) {
  fs.writeFileSync(".env.local", `
SETUP_SCRIPT_RAN=1
`, { flag: "a" });
}


process.exit(result.status);
```

# src/App.tsx

```tsx
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

```

# src/components/Navigation.tsx

```tsx
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

```

# src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-light: #ffffff;
  --color-dark: #171717;
}

.accent-text {
  @apply text-slate-600;
}

body {
  font-family:
    "Inter Variable",
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
  color: var(--color-dark);
  background: var(--color-light);
}

/* only use this to update the style of the auth input fields. use a different class for all other input fields */
.auth-input-field {
  @apply w-full px-4 py-3 rounded-container bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow shadow-sm hover:shadow;
}

/* only use this to update the style of the auth buttons. use the button class for all other buttons */
.auth-button {
  @apply w-full px-4 py-3 rounded bg-primary text-white font-semibold hover:bg-primary-hover transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed;
}

```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

# src/main.tsx

```tsx
import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
);

```

# src/screens/ChatScreen.tsx

```tsx
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

```

# src/screens/HomeScreen.tsx

```tsx
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

```

# src/screens/MatchDetailScreen.tsx

```tsx
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

```

# src/screens/OnboardingScreen.tsx

```tsx
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

```

# src/screens/ProfileScreen.tsx

```tsx
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

```

# src/screens/ProfileSetupScreen.tsx

```tsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface ProfileSetupScreenProps {
  onComplete: () => void;
}

export function ProfileSetupScreen({ onComplete }: ProfileSetupScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    bio: "",
    profession: "",
    location: "",
    interests: [] as string[],
    photos: [] as string[],
    preferences: {
      ageRange: { min: 25, max: 35 },
      maxDistance: 10,
      profession: "",
    },
  });

  const createProfile = useMutation(api.profiles.createProfile);
  const generateUploadUrl = useMutation(api.profiles.generateUploadUrl);

  const availableInterests = [
    "Travel", "Cooking", "Reading", "Music", "Sports", "Art", "Photography",
    "Dancing", "Hiking", "Yoga", "Movies", "Gaming", "Volunteering", "Fitness"
  ];

  const londonAreas = [
    "Central London", "North London", "South London", "East London", "West London",
    "Camden", "Greenwich", "Hackney", "Hammersmith", "Islington", "Kensington",
    "Lambeth", "Lewisham", "Southwark", "Tower Hamlets", "Wandsworth", "Westminster"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    try {
      await createProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        bio: formData.bio,
        profession: formData.profession,
        location: formData.location,
        interests: formData.interests,
        photos: [], // For demo purposes
        preferences: formData.preferences,
      });
      
      toast.success("Profile created successfully!");
      onComplete();
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">About You</h2>
              <p className="text-gray-600">Share more details about yourself</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="What do you do for work?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select your area</option>
                  {londonAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Interests</h2>
              <p className="text-gray-600">Select what you're passionate about</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.interests.includes(interest)
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Preferences</h2>
              <p className="text-gray-600">Help us find your perfect match</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Age Range</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.preferences.ageRange.min}
                      onChange={(e) => handleInputChange('preferences', {
                        ...formData.preferences,
                        ageRange: { ...formData.preferences.ageRange, min: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-gray-600 mt-1">
                      Min: {formData.preferences.ageRange.min}
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.preferences.ageRange.max}
                      onChange={(e) => handleInputChange('preferences', {
                        ...formData.preferences,
                        ageRange: { ...formData.preferences.ageRange, max: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-gray-600 mt-1">
                      Max: {formData.preferences.ageRange.max}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Distance: {formData.preferences.maxDistance} miles
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={formData.preferences.maxDistance}
                  onChange={(e) => handleInputChange('preferences', {
                    ...formData.preferences,
                    maxDistance: parseInt(e.target.value)
                  })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.age;
      case 2:
        return formData.profession && formData.location && formData.bio;
      case 3:
        return formData.interests.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                isStepValid()
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                isStepValid()
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

```

# src/screens/SearchScreen.tsx

```tsx
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

```

# src/screens/SplashScreen.tsx

```tsx
export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">💝</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 animate-fade-in">Connect</h1>
        <p className="text-xl opacity-90 animate-fade-in-delay">
          Meaningful connections start here
        </p>
        <div className="mt-8">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

```

# src/screens/SupportScreen.tsx

```tsx
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Screen } from "../App";
import { toast } from "sonner";

interface SupportScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function SupportScreen({ onNavigate }: SupportScreenProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  const tickets = useQuery(api.support.getUserTickets);
  const createTicket = useMutation(api.support.createSupportTicket);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTicket({
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority,
      });
      
      toast.success("Support ticket created successfully!");
      setFormData({ subject: "", message: "", priority: "medium" });
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to create support ticket. Please try again.");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-700";
      case "in_progress": return "bg-yellow-100 text-yellow-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Support</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
          >
            New Ticket
          </button>
        </div>
      </div>

      {/* Create ticket form */}
      {showForm && (
        <div className="bg-white border-b border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Brief description of your issue"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as "low" | "medium" | "high" }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Please describe your issue in detail..."
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
              >
                Submit Ticket
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

      {/* Support info */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How can we help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">📧 Email Support</h3>
              <p className="text-sm text-gray-600">Get help via email within 24 hours</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">💬 Live Chat</h3>
              <p className="text-sm text-gray-600">Chat with our support team</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">📚 Help Center</h3>
              <p className="text-sm text-gray-600">Browse our knowledge base</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">🔒 Safety Center</h3>
              <p className="text-sm text-gray-600">Report safety concerns</p>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Tickets</h2>
          
          {tickets && tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
                  <p className="text-xs text-gray-400">
                    Created {new Date(ticket._creationTime).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
              <p className="text-gray-600 mb-4">Need help? Create a support ticket and we'll get back to you.</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
              >
                Create Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```

# src/screens/TestimonialsScreen.tsx

```tsx
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

```

# src/SignInForm.tsx

```tsx
"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-form-field"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((error) => {
            let toastTitle = "";
            if (error.message.includes("Invalid password")) {
              toastTitle = "Invalid password. Please try again.";
            } else {
              toastTitle =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            }
            toast.error(toastTitle);
            setSubmitting(false);
          });
        }}
      >
        <input
          className="auth-input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="auth-input-field"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
        <hr className="my-4 grow border-gray-200" />
        <span className="mx-4 text-secondary">or</span>
        <hr className="my-4 grow border-gray-200" />
      </div>
      <button className="auth-button" onClick={() => void signIn("anonymous")}>
        Sign in anonymously
      </button>
    </div>
  );
}

```

# src/SignOutButton.tsx

```tsx
"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-4 py-2 rounded bg-white text-secondary border border-gray-200 font-semibold hover:bg-gray-50 hover:text-secondary-hover transition-colors shadow-sm hover:shadow"
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  );
}

```

# src/vite-env.d.ts

```ts
/// <reference types="vite/client" />

```

# tailwind.config.js

```js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: "8px",
        secondary: "4px",
        container: "12px",
      },
      boxShadow: {
        DEFAULT: "0 1px 4px rgba(0, 0, 0, 0.1)",
        hover: "0 2px 8px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
        },
        secondary: {
          DEFAULT: "#6B7280",
          hover: "#4B5563",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
        },
      },
      spacing: {
        "form-field": "16px",
        section: "32px",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "active"],
    },
  },
};

```

# tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    /* Import paths */
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

# tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

# tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

# vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // The code below enables dev tools like taking screenshots of your site
    // while it is being developed on chef.convex.dev.
    // Feel free to remove this code if you're no longer developing your app with Chef.
    mode === "development"
      ? {
          name: "inject-chef-dev",
          transform(code: string, id: string) {
            if (id.includes("main.tsx")) {
              return {
                code: `${code}

/* Added by Vite plugin inject-chef-dev */
window.addEventListener('message', async (message) => {
  if (message.source !== window.parent) return;
  if (message.data.type !== 'chefPreviewRequest') return;

  const worker = await import('https://chef.convex.dev/scripts/worker.bundled.mjs');
  await worker.respondToMessage(message);
});
            `,
                map: null,
              };
            }
            return null;
          },
        }
      : null,
    // End of code for taking screenshots on chef.convex.dev.
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

```

