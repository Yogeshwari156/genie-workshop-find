
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Clock } from "lucide-react";
import { SearchFilters } from "@/types/workshop";
import { Workshop } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface WorkshopGridProps {
  filters: SearchFilters;
  onWorkshopSelect: (workshop: Workshop) => void;
}

export const WorkshopGrid = ({ filters, onWorkshopSelect }: WorkshopGridProps) => {
  const { data: workshops = [], isLoading, error } = useQuery({
    queryKey: ['/api/workshops', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      if (filters.category) searchParams.append('category', filters.category);
      if (filters.location) searchParams.append('location', filters.location);
      if (filters.priceRange[0] > 0) searchParams.append('priceMin', filters.priceRange[0].toString());
      if (filters.priceRange[1] < 500) searchParams.append('priceMax', filters.priceRange[1].toString());
      
      const response = await fetch(`/api/workshops?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch workshops');
      }
      return response.json() as Promise<Workshop[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Loading magical workshops...</h3>
        <p className="text-gray-500">Please wait while we gather the best workshops for you!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔧</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-500">We're having trouble loading workshops. Please try again later!</p>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No workshops found</h3>
        <p className="text-gray-500">Try adjusting your filters to find more workshops!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ✨ Magical Workshops Await You! ✨
        </h2>
        <p className="text-gray-600">Found {workshops.length} amazing workshops just for you!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop: Workshop) => (
          <Card 
            key={workshop.id} 
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {workshop.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{workshop.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {workshop.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {workshop.description}
              </p>
              
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
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {workshop.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="text-2xl font-bold text-green-600">
                ${workshop.price}
              </div>
              <Button 
                onClick={() => onWorkshopSelect(workshop)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Book Now ✨
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
