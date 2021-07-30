import { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
  });
  return (
    <div style={{ height: 400, position: "relative" }} className="rounded">
      <h1 className="absolute top-0 bg-blue-800 z-50 text-white p-2 rounded-br">
        Last Known Location
      </h1>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYzduYXNyIiwiYSI6ImNrNG4zOHludTByYzgzbG1pbHMxeWpleGQifQ.aVGDM-f4GZeKtcG2CLT7VA"
        onViewportChange={(viewport) => setViewport(viewport)}
      />
    </div>
  );
}
