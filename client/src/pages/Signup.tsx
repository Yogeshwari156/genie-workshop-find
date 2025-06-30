
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Star, UserPlus } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    console.log("Signup attempt:", formData);
    // TODO: Implement actual signup logic
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Floating sparkles animation */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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
            <Sparkles className="text-purple-300/30 w-4 h-4" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
                🧞‍♂️
              </div>
              <div className="absolute -top-1 -right-1">
                <Star className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join Workshop Genie!
          </CardTitle>
          <CardDescription className="text-purple-600">
            Create your account and start discovering amazing workshops ✨
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-700 font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-700 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-purple-700 font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 transition-all duration-200 transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-purple-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-pink-600 hover:text-pink-700 font-medium hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
            
            <div className="mt-4">
              <Link 
                to="/" 
                className="text-purple-500 hover:text-purple-700 text-sm hover:underline transition-colors"
              >
                ← Back to workshops
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
