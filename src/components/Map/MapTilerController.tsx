"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { getStyleUrl } from "./utils";

interface MapTilerControllerProps {
  mapStyle: string;
  apiKey: string | undefined;
}

export const MapTilerController = ({
  mapStyle,
  apiKey,
}: MapTilerControllerProps) => {
  const map = useMap();
  const layerRef = useRef<InstanceType<typeof MaptilerLayer> | null>(null);

  // Initialize layer
  useEffect(() => {
    if (!apiKey) return;

    if (!layerRef.current) {
      try {
        const styleUrl = getStyleUrl(mapStyle, apiKey);
        layerRef.current = new MaptilerLayer({
          apiKey,
          style: styleUrl,
        }).addTo(map);
      } catch (err) {
        console.error("Failed to initialize MapTiler layer:", err);
      }
    }

    return () => {
      if (layerRef.current) {
        try {
          map.removeLayer(layerRef.current);
          layerRef.current = null;
        } catch (err) {
          console.error("Error removing MapTiler layer:", err);
        }
      }
    };
  }, [map, apiKey]);

  // Update style
  useEffect(() => {
    if (!layerRef.current || !apiKey) return;

    try {
      const styleUrl = getStyleUrl(mapStyle, apiKey);
      layerRef.current.setStyle(styleUrl);
    } catch (err) {
      console.error("Failed to set MapTiler style:", err);
    }
  }, [mapStyle, apiKey]);

  return null;
};
