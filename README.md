# Bookie - Car Service Booking Application

Bookie is a comprehensive web application designed to simplify the process of booking car repair services. The application allows users to select their vehicle type, choose specific repair services, find nearby repair workshops, and book appointments at their convenience.

## Features

- Vehicle Type Filtering: Users can filter repair stations based on their specific vehicle type
- Repair Service Filtering: Users can select the specific repair services they need
- Workshop Search: Search functionality to find specific repair workshops by name
- Workshop Listings: Browse available repair workshops with ratings and service details
- Appointment Scheduling: Select available time slots for service appointments
- Booking Form: Simple and efficient form to collect user contact information
- Responsive Design: Fully responsive interface that works across desktop, tablet, and mobile devices
- Booking Confirmation: Detailed confirmation screen showing all booking information

## Technology Stack

- React with TypeScript: Modern frontend framework that provides type safety and improved developer experience
- TailwindCSS: Utility-first CSS framework for creating custom designs without leaving your HTML
- Zustand: Lightweight state management library for React applications
- Mock Service Worker (MSW): API mocking library that intercepts requests for simulating backend responses
- date-fns: JavaScript library for date manipulation and formatting
- React Icons: Comprehensive library of popular icon sets as React components

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/bookie.git
cd bookie
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Application Workflow

### 1. Vehicle and Service Selection

- Users are presented with a filterable list of vehicle types
- The application allows selection of specific repair services required
- These selections are processed through the filter system to display relevant repair workshops
- The filtering mechanism is implemented through state management that preserves filter selections
- Vehicle type and service filters operate independently to provide granular search capabilities

### 2. Workshop Discovery and Selection

- The application displays a comprehensive list of repair workshops that can be filtered through
- Users can utilize the search functionality to find specific workshops by name or characteristics
- Each workshop listing includes detailed information such as available services, ratings, and location
- Workshop listings are generated dynamically from the data source with proper pagination for performance
- Sorting options allow users to arrange workshops by proximity, ratings, or availability

### 3. Appointment Scheduling

- Upon selecting a workshop, users can view an interactive calendar showing available appointment slots
- The time slot selection provides visual indicators for available and unavailable times
- Users can navigate between different dates to find the most convenient appointment time
- Selected date and time information is preserved in the application state throughout the booking process
- Time slot availability is checked in real-time to prevent double bookings

### 4. User Information and Booking

- A booking form is included to collect essential user information including name, contact details, and vehicle information
- Form validation ensures all required information is provided before proceeding
- Users can review their selection details before finalizing the booking
- Input fields are designed to minimize typing errors and improve user experience

### 5. Confirmation and Feedback

- Upon successful booking, users receive a detailed confirmation screen with all booking information
- The confirmation includes workshop details, selected services, appointment time, and booking reference
- Users have the option to provide feedback about the booking experience
- The application provides options to save or share booking details
- Confirmation details can be accessed later for reference or modification

## Application Architecture

The application uses central state management. Components are organized by their functionality, with shared UI components and feature based logic. The application state is managed through a central Zustand store that provides a simple state management solution.

Each feature is designed to be self contained while sharing common state through the store. The Mock Service Worker (MSW) is used to simulate API responses, allowing the frontend to be developed independently of the backend.

## Implementation Details

### State Management

- Zustand is used for centralized application state management
- Custom selectors are implemented to prevent unnecessary re-renders and optimize performance
- State is organized into logical domains for better maintainability
- Actions are defined as methods within the store for encapsulation
- Component-specific state is kept local when appropriate to reduce global state complexity

### Filter Logic

- Vehicle and service filters work independently through separate state arrays
- Filter state is preserved
- Filters use data structures for fast lookups and updates

### Component Architecture

- Each components deals with a single concern
- Custom hooks abstract complex logic away from the UI layer
- Components communicate through props and global state when necessary
- Reusable UI components encourage easy readabity and maintenance

### API Integration

- Mock Service Worker provides realistic API responses without requiring a backend
- API calls are abstracted into service modules for better testability
- Response caching is implemented to improve performance
- Error handling is consistent across all API interactions
- Data transformation layers convert API responses to application-friendly formats

## Key Technical Solutions

### Independent Filter System

The independent filter system allows users to filter by vehicle type and repair service separately. This was implemented by:

- Creating separate state arrays for vehicle and service filters
- Adding a filter type identifier in the state to track which filter is active
- Ensuring filters can be combined or used independently
