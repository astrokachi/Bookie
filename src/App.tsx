import { useState, useEffect } from "react";
import Filters from "./features/filters";
import { Navbar } from "./components/navbar";
import { Stations } from "./features/stations";
import { BookingSuccess } from "./components/modals/bookingSuccess";
import { Feedback } from "./components/feedback";
import { LoadingSpinner } from "./components/loadingSpinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="large" className="mb-4" />
          <h2 className="text-xl font-medium text-neutral-700">
            Loading Bookie...
          </h2>
          <p className="mt-2 text-neutral-500">
            Please wait while we prepare your booking experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />
      <Feedback />
      <div className="transition-all duration-150 ease-in md:mx-32 lg:mx-44">
        <Filters />
        <Stations />
      </div>
      <BookingSuccess />
    </div>
  );
}

export default App;
