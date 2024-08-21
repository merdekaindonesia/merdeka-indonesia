"use client";

import { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import NextLink from "next/link";
import { Button, Anchor } from "@mantine/core";
import dayjs from "dayjs";

import { IProtestData } from "@/data/protest";

import "leaflet/dist/leaflet.css";

// FIX LEAFLET ICONS
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconAnchor: [12, 41],
  className: "hue-rotate-[150deg]",
});

L.Marker.prototype.options.icon = DefaultIcon;
// END FIX LEAFLET ICONS

export default function ProtestMap({
  protestData,
}: {
  protestData: IProtestData[];
}) {
  return (
    <MapContainer
      center={[-2.0591899, 111.4539954]}
      zoom={5}
      className="z-0 h-full w-full"
      zoomControl
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {protestData.map((protest) => {
        return (
          <Marker position={[protest.lat, protest.long]} key={protest.id}>
            <Popup>
              <div
                key={protest.id} // FOR GETTING REF INDEX
                className="flex flex-col space-y-2"
              >
                <h3 className="text-md font-bold">
                  {dayjs(protest.datetime).format("DD MMMM YYYY, HH:mm")}
                </h3>
                <h3 className="text-lg font-bold leading-tight">
                  {protest.location} - {protest.detail_location}
                </h3>
                <Anchor
                  component={NextLink}
                  underline="always"
                  href={protest.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </Anchor>

                {/* buka google maps */}
                <Button
                  component={NextLink}
                  href={`https://www.google.com/maps/search/?api=1&query=${protest.lat},${protest.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  classNames={{
                    label: "text-white",
                  }}
                >
                  Buka Google Maps
                </Button>
              </div>
            </Popup>
            <Tooltip>{protest.location}</Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
