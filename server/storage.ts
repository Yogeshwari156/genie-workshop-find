import { 
  users, 
  workshops, 
  bookings,
  type User, 
  type InsertUser,
  type Workshop,
  type InsertWorkshop,
  type Booking,
  type InsertBooking
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workshop operations
  getWorkshops(): Promise<Workshop[]>;
  getWorkshop(id: number): Promise<Workshop | undefined>;
  getWorkshopsByCategory(category: string): Promise<Workshop[]>;
  getWorkshopsByLocation(location: string): Promise<Workshop[]>;
  searchWorkshops(filters: {
    category?: string;
    location?: string;
    priceMin?: number;
    priceMax?: number;
  }): Promise<Workshop[]>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshopEnrollment(id: number, enrolled: number): Promise<Workshop | undefined>;
  
  // Booking operations
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByWorkshop(workshopId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workshops: Map<number, Workshop>;
  private bookings: Map<number, Booking>;
  private currentUserId: number;
  private currentWorkshopId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.workshops = new Map();
    this.bookings = new Map();
    this.currentUserId = 1;
    this.currentWorkshopId = 1;
    this.currentBookingId = 1;
    
    // Seed with sample workshops
    this.seedWorkshops();
  }

  private async seedWorkshops() {
    const sampleWorkshops: InsertWorkshop[] = [
      {
        title: "Digital Marketing Mastery",
        description: "Learn the fundamentals of digital marketing including SEO, social media, and content marketing strategies.",
        category: "Marketing",
        instructor: "Sarah Johnson",
        location: "New York",
        date: "2025-01-15",
        time: "10:00 AM",
        duration: "3 hours",
        price: "299.00",
        capacity: 25,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        rating: "4.8",
        tags: ["SEO", "Social Media", "Content Marketing"]
      },
      {
        title: "React Development Bootcamp",
        description: "Intensive hands-on workshop covering React fundamentals, hooks, and modern development practices.",
        category: "Technology",
        instructor: "Mike Chen",
        location: "San Francisco",
        date: "2025-01-20",
        time: "9:00 AM",
        duration: "6 hours",
        price: "450.00",
        capacity: 20,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
        rating: "4.9",
        tags: ["React", "JavaScript", "Frontend"]
      },
      {
        title: "Entrepreneurship Fundamentals",
        description: "Essential skills for starting and running a successful business, including business planning and funding strategies.",
        category: "Business",
        instructor: "David Rodriguez",
        location: "Austin",
        date: "2025-01-25",
        time: "1:00 PM",
        duration: "4 hours",
        price: "350.00",
        capacity: 30,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
        rating: "4.7",
        tags: ["Business Planning", "Funding", "Startups"]
      },
      {
        title: "Creative Writing Workshop",
        description: "Explore creative writing techniques, develop your unique voice, and craft compelling narratives.",
        category: "Arts",
        instructor: "Emily Watson",
        location: "Seattle",
        date: "2025-02-01",
        time: "2:00 PM",
        duration: "3 hours",
        price: "180.00",
        capacity: 15,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        rating: "4.6",
        tags: ["Writing", "Creativity", "Storytelling"]
      },
      {
        title: "Data Science with Python",
        description: "Learn data analysis, visualization, and machine learning fundamentals using Python and popular libraries.",
        category: "Technology",
        instructor: "Dr. Alex Kumar",
        location: "Boston",
        date: "2025-02-05",
        time: "10:00 AM",
        duration: "8 hours",
        price: "500.00",
        capacity: 18,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        rating: "4.9",
        tags: ["Python", "Data Science", "Machine Learning"]
      },
      {
        title: "Photography Masterclass",
        description: "Master the art of photography with professional techniques for composition, lighting, and post-processing.",
        category: "Arts",
        instructor: "Maria Lopez",
        location: "Los Angeles",
        date: "2025-02-10",
        time: "11:00 AM",
        duration: "5 hours",
        price: "380.00",
        capacity: 12,
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
        rating: "4.8",
        tags: ["Photography", "Composition", "Editing"]
      }
    ];

    for (const workshop of sampleWorkshops) {
      await this.createWorkshop(workshop);
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Workshop operations
  async getWorkshops(): Promise<Workshop[]> {
    return Array.from(this.workshops.values());
  }

  async getWorkshop(id: number): Promise<Workshop | undefined> {
    return this.workshops.get(id);
  }

  async getWorkshopsByCategory(category: string): Promise<Workshop[]> {
    return Array.from(this.workshops.values()).filter(
      workshop => workshop.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getWorkshopsByLocation(location: string): Promise<Workshop[]> {
    return Array.from(this.workshops.values()).filter(
      workshop => workshop.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async searchWorkshops(filters: {
    category?: string;
    location?: string;
    priceMin?: number;
    priceMax?: number;
  }): Promise<Workshop[]> {
    let workshops = Array.from(this.workshops.values());

    if (filters.category && filters.category !== "") {
      workshops = workshops.filter(w => 
        w.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.location && filters.location !== "") {
      workshops = workshops.filter(w => 
        w.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.priceMin !== undefined) {
      workshops = workshops.filter(w => 
        parseFloat(w.price) >= filters.priceMin!
      );
    }

    if (filters.priceMax !== undefined) {
      workshops = workshops.filter(w => 
        parseFloat(w.price) <= filters.priceMax!
      );
    }

    return workshops;
  }

  async createWorkshop(insertWorkshop: InsertWorkshop): Promise<Workshop> {
    const id = this.currentWorkshopId++;
    const workshop: Workshop = { 
      ...insertWorkshop, 
      id, 
      enrolled: 0 
    };
    this.workshops.set(id, workshop);
    return workshop;
  }

  async updateWorkshopEnrollment(id: number, enrolled: number): Promise<Workshop | undefined> {
    const workshop = this.workshops.get(id);
    if (!workshop) return undefined;
    
    const updatedWorkshop = { ...workshop, enrolled };
    this.workshops.set(id, updatedWorkshop);
    return updatedWorkshop;
  }

  // Booking operations
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.userId === userId
    );
  }

  async getBookingsByWorkshop(workshopId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.workshopId === workshopId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      id,
      userId: insertBooking.userId,
      workshopId: insertBooking.workshopId,
      bookingDate: new Date(),
      status: "confirmed",
      participantName: insertBooking.participantName,
      participantEmail: insertBooking.participantEmail,
      participantPhone: insertBooking.participantPhone || null,
      specialRequests: insertBooking.specialRequests || null
    };
    this.bookings.set(id, booking);
    
    // Update workshop enrollment count
    const workshop = await this.getWorkshop(insertBooking.workshopId);
    if (workshop) {
      await this.updateWorkshopEnrollment(insertBooking.workshopId, workshop.enrolled + 1);
    }
    
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
