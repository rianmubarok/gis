import L from "leaflet";
import { STYLE_URLS } from "./constants";

export const getStyleUrl = (style: string, apiKey: string): string => {
  const styleId = STYLE_URLS[style] || STYLE_URLS.streets;
  return `https://api.maptiler.com/maps/${styleId}/style.json?key=${apiKey}`;
};

export const createMarkerIcon = (
  color: string,
  size: number,
  isSelected: boolean = false
): L.DivIcon => {
  const anchor = size / 2;
  const strokeWidth = isSelected ? 3 : 0;
  const strokeColor = isSelected ? "#1d4ed8" : "none";

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="${color}" opacity="0.9" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
      <circle cx="12" cy="12" r="5" fill="#fff"/>
    </svg>`;

  return L.divIcon({
    className: `custom-map-marker ${isSelected ? "selected" : ""}`,
    html: svgIcon,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor],
    popupAnchor: [0, -anchor],
  });
};

export const getMarkerSize = (zoom: number): number => {
  if (zoom < 12) return 8;
  if (zoom < 14) return 16;
  if (zoom < 16) return 22;
  return 28;
};

export const parseCoordinate = (value: number | string): number | null => {
  const parsed = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(parsed) ? null : parsed;
};
