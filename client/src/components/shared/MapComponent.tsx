"use client";

import { Positions } from "@/models";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  positions: Positions[];
  className?: string;
}

const LeafletMapComponent: React.FC<MapProps> = ({
  positions,
  className = "",
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/marker-icon-2x.png",
          iconUrl: "/marker-icon.png",
          shadowUrl: "/marker-shadow.png",
        });

        if (mapRef.current === null) {
          const initialPosition =
            positions.length > 0
              ? [positions[0].lat, positions[0].lng]
              : [0, 0];
          mapRef.current = L.map("map", {
            center: initialPosition as L.LatLngExpression,
            zoom: 11,
          });

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
          }).addTo(mapRef.current);
        } else {
          const bounds = L.latLngBounds(
            positions.map((pos) => [pos.lat, pos.lng])
          );
          mapRef.current.fitBounds(bounds);
        }

        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.current?.removeLayer(layer);
          }
        });

        positions.forEach((position) => {
          L.marker([position.lat, position.lng]).addTo(mapRef.current!);
        });
      });
    }
  }, [positions]);

  return (
    <div
      id="map"
      className={className}
      style={{ zIndex: "5", height: "100%" }}
    ></div>
  );
};

export const MapComponent = dynamic(
  () => Promise.resolve(LeafletMapComponent),
  { ssr: false }
);
