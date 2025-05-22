import stationImg from "../assets/stations.svg";
import type { Station } from "../features/stations";
import { CiCalendar } from "react-icons/ci";

export function Station({
  bookings,
  location,
  name,
  servicesOffered,
  onclick,
}: Station & { onclick: () => void }) {
  return (
    <div
      onClick={onclick}
      className="group hover:border-primary-blue cursor-pointer rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300 ease-out"
    >
      <div className="mb-4 flex flex-col items-start gap-4 md:flex-row">
        <div className="flex-shrink-0">
          <div className="hidden h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 transition-colors duration-300 group-hover:from-blue-100 group-hover:to-blue-200 md:flex">
            <img
              src={stationImg}
              alt="station"
              className="h-8 w-8 object-contain"
            />
          </div>
        </div>

        <div className="w-full min-w-0 md:flex-1">
          <h2 className="group-hover:text-primary-blue text-md truncate font-semibold text-neutral-900 transition-colors duration-200 md:text-lg">
            {name}
          </h2>
          <div className="mt-1 flex items-center gap-1 text-sm text-neutral-600">
            <span className="truncate">{location.address}</span>
          </div>
          <div className="mt-0.5 text-sm text-neutral-500">
            {location.state}
          </div>
        </div>
      </div>

      {servicesOffered && servicesOffered.length > 0 && (
        <div>
          <div className="mb-3 text-sm text-neutral-500 md:hidden">
            <h3>
              {servicesOffered.length}
              {servicesOffered.length === 1
                ? " service offered"
                : " services offered"}
            </h3>
          </div>
          <div className="mb-4 hidden md:block">
            <h3 className="mb-2 text-sm font-medium text-neutral-700">
              Services
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {servicesOffered.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-500"
                >
                  {service}
                </span>
              ))}
              {servicesOffered.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                  +{servicesOffered.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between gap-3 border-t border-neutral-100 pt-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <CiCalendar />
          <span>
            {bookings?.length || 0}
            {bookings.length === 1 ? " active booking" : " active bookings"}
          </span>
        </div>

        <div className="text-primary-blue flex items-center text-sm font-medium group-hover:text-blue-700">
          <span>View Details</span>
        </div>
      </div>
    </div>
  );
}
