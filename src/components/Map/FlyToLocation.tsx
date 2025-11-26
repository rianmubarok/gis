"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Location } from "@/types";
import { parseCoordinate } from "./utils";
import { FOCUS_ZOOM } from "./constants";

interface FlyToLocationProps {
  location: Location | null;
  onComplete?: () => void;
}

export const FlyToLocation = ({ location, onComplete }: FlyToLocationProps) => {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    const lat = parseCoordinate(location.latitude);
    const lng = parseCoordinate(location.longitude);

    if (lat === null || lng === null) return;

    // Fly to location with animation
    map.flyTo([lat, lng], FOCUS_ZOOM, {
      duration: 1.5,
    });

    // Callback after flying completes
    const handleMoveEnd = () => {
      onComplete?.();
      map.off("moveend", handleMoveEnd);
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [location, map, onComplete]);

  return null;
};
