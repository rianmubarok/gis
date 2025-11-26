"use client";

import { MapPin, Search } from "lucide-react";
import { Location } from "@/types";
import { useState, useMemo } from "react";

interface ListViewProps {
  locations: Location[];
  loading: boolean;
  onLocationClick?: (location: Location) => void;
}

export const ListView = ({
  locations,
  loading,
  onLocationClick,
}: ListViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const query = searchQuery.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.name?.toLowerCase().includes(query) ||
        loc.description?.toLowerCase().includes(query) ||
        loc.address?.toLowerCase().includes(query)
    );
  }, [locations, searchQuery]);

  return (
    <>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Location List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Daftar Lokasi
          </h2>
          <span className="text-[10px] text-gray-500">
            {filteredLocations.length} lokasi
          </span>
        </div>

        {loading ? (
          <div className="text-xs text-gray-500">Memuat lokasi...</div>
        ) : filteredLocations.length === 0 ? (
          <div className="text-xs text-gray-500 italic">
            {searchQuery ? "Lokasi tidak ditemukan." : "Belum ada lokasi."}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredLocations.map((location) => (
              <LocationItem
                key={location.id}
                location={location}
                onClick={() => onLocationClick?.(location)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// Location item component
interface LocationItemProps {
  location: Location;
  onClick?: () => void;
}

const LocationItem = ({ location, onClick }: LocationItemProps) => {
  const conditionColor =
    {
      Baik: "bg-green-100 text-green-700",
      "Rusak Ringan": "bg-yellow-100 text-yellow-700",
      "Rusak Berat": "bg-red-100 text-red-700",
    }[location.condition || ""] || "bg-gray-100 text-gray-600";

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-200"
    >
      <div className="flex items-start gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
          style={{ backgroundColor: location.color || "#3b82f6" }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 truncate group-hover:text-blue-600">
            {location.name}
          </h3>
          {location.address && (
            <p className="text-[10px] text-gray-500 truncate mt-0.5">
              {location.address}
            </p>
          )}
          <div className="flex items-center gap-1.5 mt-1">
            {location.condition && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${conditionColor}`}
              >
                {location.condition}
              </span>
            )}
            {location.dusun && (
              <span className="text-[9px] text-gray-400">{location.dusun}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
