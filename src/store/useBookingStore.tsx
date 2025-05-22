import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { Filter } from "../features/filters";
import type { Station } from "../features/stations";

export interface TimeSlot {
  id: string;
  stationId: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingDetails {
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  timeSlotId: string;
  stationId: number;
  selectedServices: Filter[];
  vehicleType: Filter | null;
}

export const useBookingStore = create(
  combine(
    {
      bookings: [] as Array<Record<string, string>>,
      isTimeslotVisible: false,
      isFilterVisible: false,
      filters: [] as Filter[],
      filterType: "" as "vehicle" | "service" | "",
      selectedFilters: [] as Filter[],
      vehicleTypeFilters: [] as Filter[],
      serviceTypeFilters: [] as Filter[],
      selectedStation: null as Station | null,
      timeSlots: [] as TimeSlot[],
      selectedTimeSlot: null as TimeSlot | null,
      bookingDetails: null as BookingDetails | null,
      loading: {
        stations: false,
        timeSlots: false,
        booking: false,
      },
      bookingComplete: false,
      bookingError: null as string | null,
      currentStep: "selecting-filters" as
        | "selecting-filters"
        | "selecting-station"
        | "selecting-timeslot"
        | "entering-details"
        | "booking-complete",
    },
    (set) => {
      return {
        setBookings: (newBookings: Array<Record<string, string>>) => {
          set(() => ({
            bookings: newBookings,
          }));
        },
        setIsTimeslotVisible: (newState: boolean) => {
          set(() => ({
            isTimeslotVisible: newState,
          }));
        },
        toggleFilterVisibility: (filterType?: "vehicle" | "service") => {
          set((state) => ({
            isFilterVisible: !state.isFilterVisible,
            filterType: !state.isFilterVisible && filterType ? filterType : "",
          }));
        },
        setFilters: (filters: Filter[]) => {
          set(() => ({
            filters: filters,
          }));
        },
        setSelectedFilters: (filters: Filter[]) => {
          set(() => ({
            selectedFilters: filters,
            isFilterVisible: false, // Close the filter modal after selection
            currentStep:
              filters.length > 0 ? "selecting-station" : "selecting-filters",
          }));
        },
        setSelectedStation: (station: Station | null) => {
          set(() => ({
            selectedStation: station,
            isTimeslotVisible: station !== null,
            currentStep:
              station !== null ? "selecting-timeslot" : "selecting-station",
            timeSlots: [], // Reset time slots when a new station is selected
            selectedTimeSlot: null,
          }));
        },
        setTimeSlots: (timeSlots: TimeSlot[]) => {
          set(() => ({
            timeSlots,
          }));
        },
        setSelectedTimeSlot: (timeSlot: TimeSlot | null) => {
          set(() => ({
            selectedTimeSlot: timeSlot,
            currentStep:
              timeSlot !== null ? "entering-details" : "selecting-timeslot",
          }));
        },
        setLoading: (
          key: "stations" | "timeSlots" | "booking",
          value: boolean,
        ) => {
          set((state) => ({
            loading: {
              ...state.loading,
              [key]: value,
            },
          }));
        },
        setBookingDetails: (details: Partial<BookingDetails>) => {
          set((state) => ({
            bookingDetails: {
              ...(state.bookingDetails || {
                customerName: "",
                email: "",
                phone: "",
                notes: "",
                timeSlotId: state.selectedTimeSlot?.id || "",
                stationId: state.selectedStation?.id || 0,
                selectedServices: state.selectedFilters,
                vehicleType: null,
              }),
              ...details,
            } as BookingDetails,
          }));
        },
        completeBooking: (success: boolean, error?: string) => {
          set(() => ({
            bookingComplete: success,
            bookingError: error || null,
            currentStep: success ? "booking-complete" : "entering-details",
            isTimeslotVisible: !success,
          }));
        },
        resetBooking: () => {
          set(() => ({
            selectedTimeSlot: null,
            bookingDetails: null,
            bookingComplete: false,
            bookingError: null,
            currentStep: "selecting-filters",
            isTimeslotVisible: false,
            selectedStation: null,
            selectedFilters: [],
          }));
        },
      };
    },
  ),
);
