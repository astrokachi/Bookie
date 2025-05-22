# Bookie - Car Service Booking App

A modern web application for booking car repair services, built with React and TailwindCSS.

## Features

- 🚗 Vehicle type and repair service filtering
- 🔍 Search functionality for repair stations
- 📅 Time slot selection for appointments
- ✅ Form validation for booking details
- 📱 Responsive design for all devices
- 🎉 Animated confirmation screen

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **API Mocking**: Mock Service Worker (MSW)
- **Date Management**: date-fns
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone this repository

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

## Usage Guide

### 1. Select Vehicle and Service

- Choose your vehicle type (sedan, SUV, truck, etc.)
- Select repair services you need (oil change, tire rotation, etc.)
- Apply filters to find suitable stations

### 2. Browse Repair Stations

- View stations that match your criteria
- Search for specific station names
- See ratings and services offered

### 3. Book an Appointment

- Select a repair station
- Choose an available date and time
- Fill in your contact details
- Confirm your booking

### 4. Confirmation

- Receive booking confirmation
- View booking summary with all details

## Project Structure

```
bookie/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── modals/         # Modal components
│   │   └── ...
│   ├── features/           # Feature-specific components
│   ├── store/              # State management
│   ├── mocks/              # API mocking
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── ...
```

## License

This project is licensed under the MIT License
