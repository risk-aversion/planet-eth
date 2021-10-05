/// app.js
import React from "react";

import DeckGL from "@deck.gl/react";
import { MapView } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import countriesGeoJson from "./countries.json";

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b, 255];
}

const getCountries = async function() {
  const meta = await fetch('https://api-staging.rarible.com/protocol/v0.1/ethereum/nft/items/byCollection?collection=0x8e3ab56dff9ad1954c8cb7e8890ba049ca4adf13&includeMeta=true')
  return meta.json()
}

export default function MapComponent() {
  const [mapMetaData, setMapMetaData] = React.useState() 
  React.useEffect(() => {
    if (!mapMetaData) {
      getCountries().then(setMapMetaData)
    }
  }, [mapMetaData])
  
  const data = countriesGeoJson;
  const viewState = {
    longitude: 0,
    latitude: 0,
    zoom: 0,
  };

  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    // stroked: true,
    filled: true,
    // lineWidthUnits: 'pixels',
    getFillColor: (d) => hexToRGB(d.properties.color),
    // getLineColor: [0, 0, 0, 255],//d => colorToRGBArray(d.properties.color),
    // getLineColor: [0, 0, 0, 255],
    // getLineWidth: 0.1,
  })
  const layers = [geoJsonLayer];

  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
      getTooltip={({ object }) => {
        // const meta = mapMetaData?.items?.find(country => {
        //   return country?.meta?.name?.includes(object?.properties?.ADMIN)
        // })
        return object && object.properties.ADMIN
      }}
      views={new MapView({ repeat: true })}
    />
  );
}
