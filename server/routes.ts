import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Workshop routes
  app.get("/api/workshops", async (req, res) => {
    try {
      const { category, location, priceMin, priceMax } = req.query;
      
      if (category || location || priceMin || priceMax) {
        const filters = {
          category: category as string,
          location: location as string,
          priceMin: priceMin ? parseFloat(priceMin as string) : undefined,
          priceMax: priceMax ? parseFloat(priceMax as string) : undefined,
        };
        const workshops = await storage.searchWorkshops(filters);
        res.json(workshops);
      } else {
        const workshops = await storage.getWorkshops();
        res.json(workshops);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workshops" });
    }
  });

  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workshop = await storage.getWorkshop(id);
      
      if (!workshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workshop" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Verify workshop exists and has capacity
      const workshop = await storage.getWorkshop(bookingData.workshopId);
      if (!workshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      
      if (workshop.enrolled >= workshop.capacity) {
        return res.status(400).json({ error: "Workshop is fully booked" });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid booking data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.get("/api/users/:userId/bookings", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user bookings" });
    }
  });

  app.get("/api/workshops/:workshopId/bookings", async (req, res) => {
    try {
      const workshopId = parseInt(req.params.workshopId);
      const bookings = await storage.getBookingsByWorkshop(workshopId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workshop bookings" });
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      
      const user = await storage.createUser(userData);
      // Don't return password in response
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Don't return password in response
      const { password: _, ...userResponse } = user;
      res.json({ user: userResponse, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
