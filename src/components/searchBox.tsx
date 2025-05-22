import { GoSearch } from "react-icons/go";
import { useRef, useEffect } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-neutral-300 px-3 py-2 transition-all duration-150 focus-within:border-blue-400 focus-within:shadow-sm">
      <div>
        <GoSearch className="text-neutral-500" />
      </div>
      <div className="flex-1">
        <input
          ref={inputRef}
          type="search"
          name="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Stations"
          className="w-full text-sm outline-none focus:outline-none"
        />
      </div>
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-xs text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
}
