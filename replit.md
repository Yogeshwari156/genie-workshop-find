# Workshop Genie - Replit.md

## Overview
Workshop Genie is a modern full-stack web application for discovering and booking workshops. It provides a magical user experience with an intuitive interface for browsing workshops, filtering by preferences, and managing bookings. The application features a playful "genie" theme with animated UI elements and a comprehensive workshop discovery system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM for client-side navigation
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Key Components

### Frontend Components
1. **Hero Section**: Animated landing area with floating sparkles and genie theme
2. **Search Filters**: Comprehensive filtering system for workshops (category, location, date, price)
3. **Workshop Grid**: Responsive grid display of available workshops with detailed cards
4. **Booking Modal**: Full-featured booking interface with form validation
5. **Authentication Pages**: Login and signup forms with themed styling

### Backend Components
1. **Express Server**: Main application server with middleware setup
2. **Route Handler**: Centralized route registration system
3. **Storage Layer**: Abstracted data access with pluggable implementations
4. **Development Tools**: Vite integration for hot module replacement

### Shared Components
1. **Database Schema**: Centralized type definitions and validation schemas
2. **Type Definitions**: Shared TypeScript interfaces for workshops and filters

## Data Flow

### Workshop Discovery Flow
1. User loads the homepage with Hero component
2. SearchFilters component allows setting preferences (category, location, date, price range)
3. WorkshopGrid component fetches and displays filtered workshops
4. Real-time filtering updates the workshop list without page refreshes

### Booking Flow
1. User clicks "Book Now" on a workshop card
2. BookingModal opens with workshop details and booking form
3. Form validation ensures all required fields are completed
4. Booking confirmation displayed with toast notification
5. Modal closes and user receives confirmation feedback

### Authentication Flow
1. Users can access Login and Signup pages
2. Form validation prevents invalid submissions
3. Authentication state managed for future session handling

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI ecosystem for accessible components
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Animations**: CSS animations with Tailwind classes

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL driver
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Replit-specific plugins for enhanced development experience

### Build Dependencies
- **Bundling**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Path Resolution**: Custom path aliases for clean imports

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- Express server with automatic TypeScript compilation
- In-memory storage for rapid prototyping
- Replit-specific development tools and error overlays

### Production Build Process
1. Frontend: Vite builds optimized static assets to `dist/public`
2. Backend: esbuild bundles server code to `dist/index.js`
3. Database: Drizzle migrations ensure schema consistency
4. Environment: Production-specific optimizations and error handling

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Automatic Neon database provisioning support
- Development/production mode switching via `NODE_ENV`

## Recent Changes
- June 30, 2025: Successfully migrated from Lovable to Replit
- June 30, 2025: Updated routing from React Router to Wouter for Replit compatibility  
- June 30, 2025: Created comprehensive backend API with workshops, bookings, and authentication
- June 30, 2025: Connected all frontend components to backend API using React Query
- June 30, 2025: Added sample workshop data and full CRUD operations

## Backend API Endpoints

### Workshop Management
- `GET /api/workshops` - Fetch all workshops with optional filtering
- `GET /api/workshops/:id` - Fetch specific workshop details
- Workshop filtering supports: category, location, priceMin, priceMax

### Booking System  
- `POST /api/bookings` - Create new workshop booking
- `GET /api/bookings/:id` - Get booking details
- `GET /api/users/:userId/bookings` - Get user's bookings
- `GET /api/workshops/:workshopId/bookings` - Get workshop bookings

### User Authentication
- `POST /api/users` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/users/:id` - Get user profile

### System Health
- `GET /api/health` - API health check

## Changelog
- June 30, 2025. Initial setup
- June 30, 2025. Migration to Replit completed with full backend API

## User Preferences
Preferred communication style: Simple, everyday language.