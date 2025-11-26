"use client";

import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { Location } from "@/types";
import { createMarkerIcon, getMarkerSize, parseCoordinate } from "./utils";

interface LocationMarkerProps {
  location: Location;
  zoom: number;
  isSelected?: boolean;
}

export const LocationMarker = ({
  location,
  zoom,
  isSelected = false,
}: LocationMarkerProps) => {
  const lat = parseCoordinate(location.latitude);
  const lng = parseCoordinate(location.longitude);

  const size = getMarkerSize(zoom);
  const icon = useMemo(
    () => createMarkerIcon(location.color || "#3b82f6", size, isSelected),
    [location.color, size, isSelected]
  );

  if (lat === null || lng === null) return null;

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div className="p-1 font-sans">
          <h3 className="font-bold text-sm">{location.name}</h3>
          {location.description && (
            <p className="text-xs mt-1">{location.description}</p>
          )}
          {location.address && (
            <p className="text-xs text-gray-500 mt-1">{location.address}</p>
          )}
          {location.condition && (
            <span className="inline-block text-xs bg-gray-100 px-2 py-0.5 rounded mt-1">
              {location.condition}
            </span>
          )}
        </div>
      </Popup>
    </Marker>
  );
};
