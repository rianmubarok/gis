"use client";

import { useMapEvents } from "react-leaflet";

interface MapEventsProps {
  onZoomChange: (zoom: number) => void;
}

export const MapEvents = ({ onZoomChange }: MapEventsProps) => {
  const map = useMapEvents({
    zoomend: () => onZoomChange(map.getZoom()),
  });
  return null;
};
