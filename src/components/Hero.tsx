
import { Sparkles, Star } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-indigo-900/20"></div>
      
      {/* Floating sparkles animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="text-white/30 w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
              🧞‍♂️
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="w-8 h-8 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          Workshop Genie
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
          ✨ Your magical workshop finder! Let me help you discover amazing workshops 
          based on your interests, availability, and location. 
        </p>
        <div className="text-lg text-purple-200">
          Ready to find your perfect workshop? Let's make some magic happen! 🎭
        </div>
      </div>
    </div>
  );
};
