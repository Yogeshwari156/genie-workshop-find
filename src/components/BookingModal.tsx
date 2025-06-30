
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Clock, User, Mail, Phone } from "lucide-react";
import { Workshop } from "@/types/workshop";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  workshop: Workshop;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ workshop, isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate booking
    toast({
      title: "🎉 Booking Confirmed!",
      description: `Your spot in "${workshop.title}" has been reserved! Check your email for details.`,
    });
    
    onClose();
    setFormData({ name: "", email: "", phone: "", specialRequests: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ Book Your Workshop ✨
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workshop Details */}
          <div className="space-y-4">
            <img
              src={workshop.image}
              alt={workshop.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            
            <div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-2">
                {workshop.category}
              </Badge>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {workshop.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {workshop.description}
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{workshop.date} at {workshop.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{workshop.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{workshop.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{workshop.enrolled}/{workshop.capacity} enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Rating: {workshop.rating}/5</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-green-600 text-center">
              ${workshop.price}
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="requests">Special Requests or Questions</Label>
              <Textarea
                id="requests"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="mt-1"
                placeholder="Any special requirements or questions?"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300"
              >
                Confirm Booking ✨
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
