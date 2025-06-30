
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Calendar, DollarSign } from "lucide-react";
import { SearchFilters as SearchFiltersType } from "@/types/workshop";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    "All Categories",
    "Art & Craft",
    "Cooking",
    "Technology",
    "Fitness",
    "Music",
    "Photography",
    "Business",
    "Language Learning"
  ];

  const locations = [
    "All Locations",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA"
  ];

  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  return (
    <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Category
          </label>
          <Select
            value={localFilters.category}
            onValueChange={(value) => 
              setLocalFilters(prev => ({ ...prev, category: value === "All Categories" ? "" : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Select
            value={localFilters.location}
            onValueChange={(value) => 
              setLocalFilters(prev => ({ ...prev, location: value === "All Locations" ? "" : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <Input
            type="date"
            value={localFilters.date}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, date: e.target.value }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
          </label>
          <Slider
            value={localFilters.priceRange}
            onValueChange={(value) => 
              setLocalFilters(prev => ({ ...prev, priceRange: value as [number, number] }))
            }
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
        </div>
      </div>

      <Button 
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        ✨ Find My Perfect Workshop
      </Button>
    </Card>
  );
};
