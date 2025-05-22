import { useBookingStore } from "../store/useBookingStore";
import { useEffect, useRef, useState } from "react";

export function Feedback() {
  const selectedFilters = useBookingStore((state) => state.selectedFilters);
  const currentStep = useBookingStore((state) => state.currentStep);

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (currentStep !== "selecting-station") {
      setVisible(false);
      return;
    }

    const hasVehicle = selectedFilters.some((filter) =>
      ["Toyota", "Honda", "Nissan", "BMW", "Ford"].some((brand) =>
        filter.name.includes(brand),
      ),
    );

    if (selectedFilters.length > 0 && !hasVehicle) {
      setMessage("Please select a vehicle type for better results");
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [selectedFilters, currentStep]);

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="animate-fadeInDown fixed top-16 right-0 left-0 z-30 mx-auto max-w-md rounded-md bg-amber-50 p-3 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-amber-800">{message}</p>
        <button
          className="text-amber-700 hover:text-amber-900"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
