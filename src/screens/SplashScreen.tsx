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
