import { useEffect, useState, useRef } from "react";
import { SearchBox } from "../components/searchBox";
import { Station } from "../components/station";
import { Timeslot } from "../components/modals/timeslot";
import { useBookingStore } from "../store/useBookingStore";

export interface Station {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  servicesOffered: string[];
  bookings: Booking[];
}

export interface Booking {
  bookingId: string;
  customerName: string;
  vehicleModel: string;
  service: string;
  bookingTime: string; // ISO 8601 format (e.g., "2025-05-23T10:00:00Z")
  status: "pending" | "confirmed" | "completed" | string;
}

export interface GetStationsResponse {
  data: Station[];
}

export function Stations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use separate selectors to prevent unnecessary rerenders
  const selectedFilters = useBookingStore((state) => state.selectedFilters);
  const setSelectedStation = useBookingStore(
    (state) => state.setSelectedStation,
  );
  const isTimeslotVisible = useBookingStore((state) => state.isTimeslotVisible);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  // Safer fetch function
  async function fetchStations() {
    if (!isMounted.current) return;

    try {
      setIsLoading(true);
      const response = await fetch("/api/stations");
      const formattedResponse = (await response.json()) as GetStationsResponse;

      // Check if component is still mounted
      if (isMounted.current) {
        setStations(formattedResponse.data);
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      // Check if component is still mounted
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    // Fetch data on mount
    fetchStations();

    // Cleanup on unmount
    return () => {
      isMounted.current = false;
    };
  }, []); // Empty dependency array means this runs once on mount

  // Filter stations based on search query and selected filters
  const filteredStations = stations.filter((station) => {
    // Search by name, city, or state
    const matchesSearch =
      searchQuery === "" ||
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.state.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected repair services
    const hasSelectedServices =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) =>
        station.servicesOffered.includes(filter.name),
      );

    return matchesSearch && hasSelectedServices;
  });

  // Memoize handler to prevent unnecessary rerenders
  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
  };

  return (
    <div className="px-8 py-8 md:px-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h3 className="text-lg font-medium text-neutral-800">
          {selectedFilters.length > 0
            ? `Stations for ${selectedFilters.map((f) => f.name).join(", ")}`
            : "Nearby Stations"}
        </h3>
        <div>
          <SearchBox
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
        </div>
      </div>

      <div className="mt-7 w-full rounded-lg bg-white shadow-sm">
        {isLoading ? (
          // Loading skeleton
          <div className="flex flex-col gap-4 p-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-5 w-2/3 rounded bg-gray-200"></div>
                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200"></div>
                    <div className="mt-1 h-3 w-1/3 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                  <div className="h-6 w-24 rounded-full bg-gray-200"></div>
                  <div className="h-6 w-16 rounded-full bg-gray-200"></div>
                </div>
                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredStations.length > 0 ? (
          <div className="flex flex-col gap-4 p-8">
            {filteredStations.map((station) => (
              <Station
                onclick={() => handleStationSelect(station)}
                key={station.id}
                {...station}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="rounded-full bg-neutral-100 p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-neutral-700">
              No stations found
            </h3>
            <p className="mt-2 text-neutral-500">
              {selectedFilters.length > 0
                ? "Try different filter criteria or search term"
                : "Try a different search term"}
            </p>
          </div>
        )}
      </div>

      {/* Conditionally render the Timeslot component */}
      {isTimeslotVisible && <Timeslot />}
    </div>
  );
}
