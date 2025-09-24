# Social Media Management Tool

## Overview

A full-stack multi-platform social media management application built with React, Node.js/Express, and PostgreSQL. The application allows users to manage multiple social media accounts, create and schedule posts, and track post performance across platforms like Twitter, Facebook, LinkedIn, Instagram, and TikTok.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Component-based architecture using functional components and hooks
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible interface
- **Styling**: Tailwind CSS with custom design tokens and dark/light theme support
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

### Backend Architecture
- **Express.js Server**: RESTful API with TypeScript for type safety
- **Database Layer**: Drizzle ORM with PostgreSQL using Neon serverless database
- **Authentication**: Session-based auth with bcrypt for password hashing
- **File Structure**: Modular separation with shared schema between client/server

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon platform
- **Schema Design**: 
  - Users table for authentication and profile data
  - Social accounts table for connected platform credentials
  - Posts table with JSON fields for media URLs and target platforms
- **ORM**: Drizzle ORM for type-safe database queries and migrations

### Authentication and Authorization
- **Password-based Authentication**: Email/password login with bcrypt hashing
- **OAuth Integration**: Planned support for Google and GitHub OAuth providers
- **Session Management**: Server-side sessions for maintaining user state

### Design System
- **Theme Management**: Dark/light mode toggle with CSS custom properties
- **Component Library**: Comprehensive set of reusable UI components
- **Typography**: Inter font family for clean, modern appearance
- **Color System**: Semantic color tokens with automatic dark/light mode adaptation

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI/UX Dependencies
- **@radix-ui/react-***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe component variants
- **date-fns**: Date manipulation and formatting utilities

### Development Dependencies
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **Replit Integration**: Development environment optimizations

### Authentication Dependencies
- **bcrypt**: Password hashing for secure authentication
- **connect-pg-simple**: PostgreSQL session store

### Form and Validation Dependencies
- **react-hook-form**: Performant form handling
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and parsing