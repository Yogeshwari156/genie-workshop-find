
import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { WorkshopGrid } from "@/components/WorkshopGrid";
import { Hero } from "@/components/Hero";
import { BookingModal } from "@/components/BookingModal";
import { Workshop } from "@/types/workshop";

const Index = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    date: "",
    priceRange: [0, 500]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SearchFilters filters={filters} onFiltersChange={setFilters} />
        <WorkshopGrid 
          filters={filters} 
          onWorkshopSelect={setSelectedWorkshop}
        />
      </div>
      
      {selectedWorkshop && (
        <BookingModal
          workshop={selectedWorkshop}
          isOpen={!!selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
        />
      )}
    </div>
  );
};

export default Index;
