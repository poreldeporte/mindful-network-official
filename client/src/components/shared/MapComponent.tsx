"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  position: [number, number];
  className?: string;
}

export const MapComponent: React.FC<MapProps> = ({
  position,
  className = "",
}) => {
  const mapRef = useRef<L.Map | null>(null);

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = L.map("map", {
        center: position,
        zoom: 11,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      L.marker(position).addTo(mapRef.current);
    } else {
      mapRef.current.setView(position, 11);
      L.marker(position).addTo(mapRef.current);
    }
  }, [position]);

  return <div id="map" className={className} style={{ zIndex: "5" }}></div>;
};
