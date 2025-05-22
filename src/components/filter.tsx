import type { Filter as FilterType } from "../features/filters";
import { RiArrowDownSLine } from "react-icons/ri";
import { useBookingStore } from "../store/useBookingStore";
import { useState, useMemo } from "react";

export function Filter({
  name,
  filters,
}: {
  name: string;
  filters: FilterType[];
}) {
  const setFilterData = useBookingStore((state) => state.setFilters);
  const toggleFilterVisibility = useBookingStore(
    (state) => state.toggleFilterVisibility,
  );
  const selectedFilters = useBookingStore((state) => state.selectedFilters);
  const vehicleTypeFilters = useBookingStore(
    (state) => state.vehicleTypeFilters,
  );
  const serviceTypeFilters = useBookingStore(
    (state) => state.serviceTypeFilters,
  );

  const [isActive, setIsActive] = useState(false);
  const isVehicleFilter = name.includes("Vehicle");

  // const filterIds = filters.map((f) => f.name);

  const selectedFilterItems = useMemo(() => {
    if (isVehicleFilter) {
      return selectedFilters.filter((filter) =>
        vehicleTypeFilters.some((vf) => vf.name === filter.name),
      );
    } else {
      return selectedFilters.filter((filter) =>
        serviceTypeFilters.some((sf) => sf.name === filter.name),
      );
    }
  }, [
    selectedFilters,
    isVehicleFilter,
    vehicleTypeFilters,
    serviceTypeFilters,
  ]);

  function handleClick() {
    setIsActive(true);

    const filterType = isVehicleFilter ? "vehicle" : "service";

    toggleFilterVisibility(filterType);
    setFilterData(filters);

    setTimeout(() => setIsActive(false), 300);
  }

  return (
    <div className="my-5 w-full" onClick={handleClick}>
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-600 md:text-sm">
          <label htmlFor={name}>{name}</label>
        </div>
        {isVehicleFilter &&
          selectedFilterItems.length === 0 &&
          selectedFilters.length > 0 && (
            <div className="text-xs text-amber-600">
              Please select a vehicle type
            </div>
          )}
      </div>
      <div
        className={`mt-2 flex items-center rounded-md border ${
          isActive ? "border-blue-400 shadow-sm" : "border-neutral-300"
        } px-4 py-2 transition-all duration-150`}
      >
        <div className="flex-1">
          <div className="w-full bg-none p-0 text-sm md:text-base">
            {selectedFilterItems.length > 0 ? (
              <div className="text-neutral-800">
                {selectedFilterItems.map((f) => f.name).join(", ")}
              </div>
            ) : (
              <div className="text-neutral-400">Select {name}</div>
            )}
          </div>
        </div>
        <div>
          <RiArrowDownSLine className="text-neutral-400" />
        </div>
      </div>
    </div>
  );
}
