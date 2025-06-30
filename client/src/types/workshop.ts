
export interface Workshop {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  image: string;
  rating: number;
  tags: string[];
}

export interface SearchFilters {
  category: string;
  location: string;
  date: string;
  priceRange: [number, number];
}
