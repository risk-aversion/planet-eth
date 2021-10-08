/// app.js
import React from "react";
import { styled } from "baseui";
import DeckGL from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";

import countriesGeoJson from "./countries.json";
import { BLUE, BLACK } from "./utils/constants";

import { RaribleHook } from "./hooks/api";

const Leaderboard = styled("div", ({ $theme }) => {
  return {
    fontFamily: "Chakra Petch",
    color: "white",
    width: "40vw",
    height: "100vh",
    float: "right",
  };
});

const Row = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const viewState = {
  longitude: 0,
  latitude: 0,
  zoom: 0,
};

export default function MapComponent() {
  const { ownerList, metadata } = RaribleHook();

  const data = countriesGeoJson;

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
    <div>
      <DeckGL
        initialViewState={viewState}
        width={window.screen.width * 0.6}
        height={window.screen.height}
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
      <Leaderboard>
        Leaderboard
        {ownerList &&
          Object.entries(ownerList).map(([key, val]) => (
            <Row key={key}>
              <div>{key}:</div>
              <div>{val.length}</div>
            </Row>
          ))}
      </Leaderboard>
    </div>
  );
}
