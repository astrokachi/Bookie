import { useBookingStore } from "../../store/useBookingStore";
import { format } from "date-fns";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export function BookingSuccess() {
  const bookingComplete = useBookingStore((state) => state.bookingComplete);
  const selectedStation = useBookingStore((state) => state.selectedStation);
  const selectedTimeSlot = useBookingStore((state) => state.selectedTimeSlot);
  const bookingDetails = useBookingStore((state) => state.bookingDetails);
  const resetBooking = useBookingStore((state) => state.resetBooking);

  if (!bookingComplete) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="animate-fadeInUp w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center text-white">
          <div className="bg-opacity-25 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <IoMdCheckmarkCircleOutline className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="mt-1 text-blue-100">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <div className="p-6">
          <div className="mb-4 rounded-md bg-blue-50 p-4">
            <h3 className="font-medium text-blue-800">Booking Details</h3>
            <div className="mt-2 space-y-2 text-sm text-blue-700">
              <p>
                <span className="font-medium">Date & Time:</span>{" "}
                {selectedTimeSlot &&
                  format(
                    new Date(selectedTimeSlot.startTime),
                    "EEEE, MMMM d, yyyy 'at' h:mm a",
                  )}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {selectedStation?.name}, {selectedStation?.location.address}
              </p>
              {bookingDetails?.selectedServices.length ? (
                <p>
                  <span className="font-medium">Services:</span>{" "}
                  {bookingDetails.selectedServices
                    .map((s) => s.name)
                    .join(", ")}
                </p>
              ) : null}
              {bookingDetails?.vehicleType && (
                <p>
                  <span className="font-medium">Vehicle:</span>{" "}
                  {bookingDetails.vehicleType.name}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 rounded-md bg-green-50 p-4">
            <h3 className="font-medium text-green-800">Customer Information</h3>
            <div className="mt-2 space-y-2 text-sm text-green-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {bookingDetails?.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {bookingDetails?.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {bookingDetails?.phone}
              </p>
              {bookingDetails?.notes && (
                <p>
                  <span className="font-medium">Notes:</span>{" "}
                  {bookingDetails.notes}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={resetBooking}
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
