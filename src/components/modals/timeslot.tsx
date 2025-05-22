import { useEffect, useState, useRef } from "react";
import { useBookingStore } from "../../store/useBookingStore";
import { IoMdClose } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { format } from "date-fns";

export function Timeslot() {
  const selectedStation = useBookingStore((state) => state.selectedStation);
  const isTimeslotVisible = useBookingStore((state) => state.isTimeslotVisible);
  const setSelectedStation = useBookingStore(
    (state) => state.setSelectedStation,
  );
  const timeSlots = useBookingStore((state) => state.timeSlots);
  const setTimeSlots = useBookingStore((state) => state.setTimeSlots);
  const setSelectedTimeSlot = useBookingStore(
    (state) => state.setSelectedTimeSlot,
  );
  const loading = useBookingStore((state) => state.loading);
  const setLoading = useBookingStore((state) => state.setLoading);
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot);
  const bookingDetails = useBookingStore((state) => state.bookingDetails);
  const setBookingDetails = useBookingStore((state) => state.setBookingDetails);
  const completeBooking = useBookingStore((state) => state.completeBooking);

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchTimeSlots() {
      if (selectedStation && isTimeslotVisible) {
        try {
          setLoading("timeSlots", true);
          const response = await fetch(
            `/api/stations/${selectedStation.id}/timeslots`,
          );
          const data = await response.json();

          if (isMounted.current) {
            setTimeSlots(data.data);

            if (data.data && data.data.length > 0) {
              const firstDate = new Date(data.data[0].startTime).toDateString();
              setActiveDate(firstDate);
            }
          }
        } catch (error) {
          console.error("Error fetching time slots:", error);
        } finally {
          if (isMounted.current) {
            setLoading("timeSlots", false);
          }
        }
      }
    }

    fetchTimeSlots();
  }, [selectedStation, isTimeslotVisible, setLoading, setTimeSlots]);

  const groupedTimeSlots = timeSlots.reduce(
    (acc, slot) => {
      const date = new Date(slot.startTime).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    },
    {} as Record<string, typeof timeSlots>,
  );

  // Available dates for the calendar
  const availableDates = Object.keys(groupedTimeSlots);

  const handleDateChange = (date: string) => {
    setActiveDate(date);
  };

  const handleTimeSlotSelect = (slot: (typeof timeSlots)[0]) => {
    setSelectedTimeSlot(slot);
  };

  const handleClose = () => {
    setSelectedStation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors: Record<string, string> = {};
    if (!bookingDetails?.customerName) errors.customerName = "Name is required";
    if (!bookingDetails?.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.email)) {
      errors.email = "Email is invalid";
    }
    if (!bookingDetails?.phone) errors.phone = "Phone number is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit booking
    try {
      setLoading("booking", true);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: bookingDetails?.customerName,
          email: bookingDetails?.email,
          phone: bookingDetails?.phone,
          notes: bookingDetails?.notes,
          timeSlotId: selectedTimeSlot?.id,
          stationId: selectedStation?.id,
          services: bookingDetails?.selectedServices
            .map((s) => s.name)
            .join(", "),
          vehicleType: bookingDetails?.vehicleType?.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        completeBooking(true);
      } else {
        completeBooking(false, "Failed to complete booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      completeBooking(false, "An error occurred. Please try again.");
    } finally {
      setLoading("booking", false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookingDetails({ [name]: value });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  if (!isTimeslotVisible || !selectedStation) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
          aria-label="Close"
        >
          <IoMdClose className="h-6 w-6" />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-800">
              {selectedStation.name}
            </h2>
            <p className="text-neutral-600">
              {selectedStation.location.address},{" "}
              {selectedStation.location.city}
            </p>
          </div>

          {!selectedTimeSlot ? (
            <div>
              {/* Calendar view */}
              <div className="mb-4 border-b border-neutral-200 pb-4">
                <h3 className="mb-3 flex items-center gap-2 font-medium text-neutral-700">
                  <HiOutlineCalendar className="h-5 w-5" />
                  <span>Select Date</span>
                </h3>

                {loading.timeSlots ? (
                  <div className="flex animate-pulse space-x-2 overflow-x-auto py-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-28 rounded-md bg-gray-200"
                      ></div>
                    ))}
                  </div>
                ) : availableDates.length > 0 ? (
                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateChange(date)}
                        className={`rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                          activeDate === date
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {format(new Date(date), "MMM d, EEE")}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-neutral-500">
                    No available dates
                  </div>
                )}
              </div>

              {/* Time slots */}
              <div>
                <h3 className="mb-3 font-medium text-neutral-700">
                  Available Times
                </h3>

                {loading.timeSlots ? (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="h-10 animate-pulse rounded-md bg-gray-200"
                      ></div>
                    ))}
                  </div>
                ) : activeDate && groupedTimeSlots[activeDate]?.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {groupedTimeSlots[activeDate].map((slot) => (
                      <button
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() =>
                          slot.available && handleTimeSlotSelect(slot)
                        }
                        className={`rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
                          !slot.available
                            ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                            : "bg-neutral-100 text-neutral-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {format(new Date(slot.startTime), "h:mm a")}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-neutral-500">
                    No available time slots for this date
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="mb-6 rounded-md bg-blue-50 p-4 text-blue-800">
                <h3 className="mb-1 font-medium">Booking Details</h3>
                <p className="text-sm">
                  <span className="font-medium">Date & Time:</span>{" "}
                  {format(
                    new Date(selectedTimeSlot.startTime),
                    "EEEE, MMMM d, yyyy 'at' h:mm a",
                  )}
                </p>

                {bookingDetails?.selectedServices.length ? (
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Services:</span>{" "}
                    {bookingDetails.selectedServices
                      .map((s) => s.name)
                      .join(", ")}
                  </p>
                ) : null}

                {bookingDetails?.vehicleType ? (
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Vehicle:</span>{" "}
                    {bookingDetails.vehicleType.name}
                  </p>
                ) : null}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="customerName"
                    className="mb-1 block text-sm font-medium text-neutral-700"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={bookingDetails?.customerName || ""}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${
                      formErrors.customerName
                        ? "border-red-300"
                        : "border-neutral-300"
                    } focus:ring-opacity-50 px-3 py-2 text-neutral-800 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none`}
                    placeholder="Your name"
                  />
                  {formErrors.customerName && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.customerName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-neutral-700"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingDetails?.email || ""}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${
                      formErrors.email ? "border-red-300" : "border-neutral-300"
                    } focus:ring-opacity-50 px-3 py-2 text-neutral-800 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-neutral-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingDetails?.phone || ""}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${
                      formErrors.phone ? "border-red-300" : "border-neutral-300"
                    } focus:ring-opacity-50 px-3 py-2 text-neutral-800 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none`}
                    placeholder="Your phone number"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-sm font-medium text-neutral-700"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingDetails?.notes || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="focus:ring-opacity-50 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-800 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Any specific requests or information for your booking"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedTimeSlot(null)}
                    className="rounded-md bg-neutral-100 px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-200"
                  >
                    Back to Time Slots
                  </button>

                  <button
                    type="submit"
                    disabled={loading.booking}
                    className="flex items-center rounded-md bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    {loading.booking ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Complete Booking"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
