import type { Filter } from "../../features/filters";
import { useBookingStore } from "../../store/useBookingStore";
import { IoMdClose } from "react-icons/io";

export function FilterModal() {
  const setSelectedFilters = useBookingStore(
    (state) => state.setSelectedFilters,
  );
  const selectedFilters = useBookingStore((state) => state.selectedFilters);
  const filters = useBookingStore((state) => state.filters);
  const toggleFilterVisibility = useBookingStore(
    (state) => state.toggleFilterVisibility,
  );
  const filterType = useBookingStore((state) => state.filterType);

  function handleItemSelect(item: Filter) {
    let updatedFilters: Filter[];
    const isSelected = selectedFilters.some((filter) => filter.id === item.id);

    if (isSelected) {
      updatedFilters = selectedFilters.filter(
        (filter) => filter.id !== item.id,
      );
    } else {
      if (filterType === "vehicle") {
        const nonVehicleFilters = selectedFilters.filter(
          (filter) => !filters.some((f) => f.id === filter.id)
        );
        updatedFilters = [...nonVehicleFilters, item];
      } else {
        updatedFilters = [...selectedFilters, item];
      }
    }

    setSelectedFilters(updatedFilters);
  }

  function handleClose() {
    toggleFilterVisibility();
  }

  return (
    <div
      className="bg-opacity-30 fixed inset-0 z-40 flex items-start justify-center bg-black"
      onClick={handleClose}
    >
      <div
        className="absolute z-50 mt-20 max-h-80 w-full max-w-md overflow-y-auto rounded-md bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-3">
          <h3 className="font-medium text-neutral-800">
            {filterType === "vehicle" ? "Select Vehicle Type" : "Select Repair Service"}
          </h3>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>

        {filters.length > 0 ? (
          <div className="p-2">
            {filters.map((item, index) => {
              const isSelected = selectedFilters.some(
                (filter) => filter.id === item.id,
              );

              return (
                <div
                  key={item.id}
                  className={\`flex cursor-pointer items-center justify-between rounded-md p-3 transition-colors duration-150 \${
                    isSelected
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-neutral-50"
                  }\`}
                  onClick={() => handleItemSelect(item)}
                  style={{
                    animation: \`fadeInUp 0.3s ease-out \${index * 0.05}s both\`,
                  }}
                >
                  <span className="text-sm md:text-base">{item.name}</span>
                  {isSelected && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Selected
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-neutral-500">
            No options available
          </div>
        )}
      </div>
    </div>
  );
}
