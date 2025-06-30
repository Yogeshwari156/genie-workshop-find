import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧞‍♂️</span>
            <span className="text-2xl font-bold text-white">Workshop Genie</span>
          </div>
          <div className="flex gap-4">
            <Link to="/feedback">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Feedback
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-5xl font-bold text-white mb-8">
            Unleash Your Inner Genie with Expert-Led Workshops
          </h1>
          <p className="text-xl text-white/80 mb-12">
            Discover a world of magical workshops tailored to elevate your skills and ignite your passions.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-lg">
            Explore Workshops
          </Button>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 w-full p-4 text-center text-white/50">
          <p className="text-sm">
            © {new Date().getFullYear()} Workshop Genie. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
