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

  const [isActive, setIsActive] = useState(false);

  // Determine if this is a vehicle filter
  const isVehicleFilter = name.includes("Vehicle");

  // Get selected filters for the specific filter type
  const selectedFilter = useMemo(() => {
    if (isVehicleFilter) {
      // For vehicle types, find the vehicle filter among selected filters
      return selectedFilters.find((filter) =>
        filters.some((f) => f.id === filter.id)
      );
    } else {
      // For service types, find all service filters among selected filters
      const serviceFilters = selectedFilters.filter((filter) =>
        filters.some((f) => f.id === filter.id)
      );
      
      // Return the first service filter if any (for display purposes)
      return serviceFilters.length > 0 ? serviceFilters[0] : undefined;
    }
  }, [selectedFilters, filters, isVehicleFilter]);

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
        {name.includes("Vehicle") &&
          !selectedFilter &&
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
            {isVehicleFilter ? (
              // For vehicle types, display single selection
              selectedFilter ? (
                <div className="text-neutral-800">{selectedFilter.name}</div>
              ) : (
                <div className="text-neutral-400">Select {name}</div>
              )
            ) : (
              // For service types, display multiple selections or default text
              selectedFilters.some(f => filters.some(filter => filter.id === f.id)) ? (
                <div className="text-neutral-800">
                  {selectedFilters
                    .filter(f => filters.some(filter => filter.id === f.id))
                    .map(f => f.name)
                    .join(", ")}
                </div>
              ) : (
                <div className="text-neutral-400">Select {name}</div>
              )
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
