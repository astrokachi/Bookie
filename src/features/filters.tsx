import { useEffect, useState } from "react";
import { Filter } from "../components/filter";
import { FilterModal } from "../components/modals/filterModal";
import { useBookingStore } from "../store/useBookingStore";

export interface Filter {
  name: string;
  id: number;
}

export default function Filters() {
  const [carTypes, setCarTypes] = useState<Filter[]>([]);
  const [repairServices, setRepairServices] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFilterVisible = useBookingStore((state) => state.isFilterVisible);
  const setVehicleTypeFilters = useBookingStore((state) => state.setVehicleTypeFilters);
  const setServiceTypeFilters = useBookingStore((state) => state.setServiceTypeFilters);

  async function fetchFilters() {
    try {
      setIsLoading(true);
      const carResponse = await fetch("/api/cars");
      const repairServicesResponse = await fetch("/api/services");
      const carData = await carResponse.json();
      const repairServiceData = await repairServicesResponse.json();

      setCarTypes(carData.data);
      setRepairServices(repairServiceData.data);
      
      // Store these in our global state for reference
      setVehicleTypeFilters(carData.data);
      setServiceTypeFilters(repairServiceData.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <form className="mx-8 mt-28 md:mx-4">
        <h1 className="text-2xl font-bold text-neutral-800">Filters</h1>
        <div className="mt-4 px-2 md:px-12">
          {isLoading ? (
            <div className="space-y-5">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                  <div className="mt-2 h-10 w-full rounded-md border border-gray-200 bg-gray-100"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {carTypes && <Filter name="Vehicle Types" filters={carTypes} />}
              {repairServices && (
                <Filter filters={repairServices} name="Repair Services" />
              )}
            </>
          )}
        </div>
      </form>
      <div className="relative">{isFilterVisible && <FilterModal />}</div>
    </div>
  );
}
