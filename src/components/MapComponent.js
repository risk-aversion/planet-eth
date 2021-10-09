/// app.js
import React from "react";
import { styled } from 'baseui';
import DeckGL from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";

import countriesGeoJson from "../countries.json";
import { BLUE, BLACK } from "../utils/constants";

const MapContainer = styled("div", ({ $theme }) => ({
  height: "80vh",
  width: "60vw",
  position: "relative",
}));

const viewState = {
  longitude: 0,
  latitude: 0,
  zoom: 0,
};

const data = countriesGeoJson;

export default function MapComponent() {
  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: true,
    lineWidthUnits: "pixels",
    filled: true,
    // lineWidthUnits: 'pixels',
    // getFillColor: (d) => hexToRGB(d.properties.color),
    // getLineColor: [0, 0, 0, 255],//d => colorToRGBArray(d.properties.color),
    getLineWidth: 1,
    getFillColor: BLACK,
    getLineColor: BLUE,
  });

  return (
    <MapContainer>
      <DeckGL
        initialViewState={viewState}
        width={"100%"}
        height={"100%"}
        controller={true}
        layers={[geoJsonLayer]}
        getTooltip={({ object }) => {
          // const meta = mapMetaData?.items?.find(country => {
          //   return country?.meta?.name?.includes(object?.properties?.ADMIN)
          // })
          return object && object.properties.ADMIN;
        }}
        views={new MapView({ repeat: true })}
      />
    </MapContainer>
  );
}
