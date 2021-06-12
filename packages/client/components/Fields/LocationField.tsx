import { PropertyTypeFormProps } from '@airbnb-clone/controller';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import React, { useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { UseFormSetValue } from 'react-hook-form';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder, { Result } from '@mapbox/mapbox-gl-geocoder';
import { Map, Placemark } from 'react-yandex-maps';

interface LocationFieldProps {
  setValue: UseFormSetValue<PropertyTypeFormProps> | undefined;
}

type CoordinateFeature = {
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  place_name: string;
  place_type: string[];
  properties: object;
  type: string;
};

export const LocationField: React.FC<LocationFieldProps> = React.memo(
  ({ setValue }) => {
    const [center, setCenter] = useState<number[]>([-74.5, 40]);

    // const onSuggestSelect = (place: Suggest) => {
    //   const {
    //     location: { lat, lng },
    //   } = place;
    //   setValue!('latitude', lat);
    //   setValue!('longitude', lng);

    //   setCenter({
    //     lat,
    //     lng,
    //   });
    // };

    // mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    // if (typeof window !== 'undefined') {
    //   const map = new mapboxgl.Map({
    //     container: 'mapbox',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: Center,
    //     zoom: 9,
    //   });

    //   const coordinatesGeocoder = (query: string): Result[] | null => {
    //     const matches = query.match(
    //       /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    //     );

    //     if (!matches) {
    //       return null;
    //     }

    //     const coordinateFeature = (
    //       lng: number,
    //       lat: number
    //     ): CoordinateFeature => {
    //       return {
    //         center: [lng, lat],
    //         geometry: {
    //           type: 'Point',
    //           coordinates: [lng, lat],
    //         },
    //         place_name: 'Lat: ' + lat + ' Lng: ' + lng,
    //         place_type: ['coordinate'],
    //         properties: {},
    //         type: 'Feature',
    //       };
    //     };

    //     const coord1: number = Number(matches[1]);
    //     const coord2: number = Number(matches[2]);
    //     const geocodes: CoordinateFeature[] = [];

    //     if (coord1 < -90 || coord1 > 90) {
    //       geocodes.push(coordinateFeature(coord1, coord2));
    //     }

    //     if (coord2 < -90 || coord2 > 90) {
    //       geocodes.push(coordinateFeature(coord2, coord1));
    //     }

    //     if (geocodes.length === 0) {
    //       geocodes.push(coordinateFeature(coord1, coord2));
    //       geocodes.push(coordinateFeature(coord2, coord1));
    //     }

    //     return geocodes as Result[];
    //   };

    //   map.addControl(new mapboxgl.NavigationControl());
    //   map.addControl(new mapboxgl.FullscreenControl());
    //   map.addControl(
    //     new MapboxGeocoder({
    //       accessToken: mapboxgl.accessToken,
    //       localGeocoder: coordinatesGeocoder as any,
    //       zoom: 4,
    //       placeholder: 'Try: -40, 170',
    //       mapboxgl,
    //     })
    //   );
    //   map.addControl(
    //     new MapboxGeocoder({
    //       accessToken: mapboxgl.accessToken,
    //       mapboxgl: mapboxgl,
    //     })
    //   );

    //   const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    //   mapboxClient.geocoding
    //     .forwardGeocode({
    //       query: 'Wellington, New Zealand',
    //       autocomplete: false,
    //       limit: 1,
    //     })
    //     .send()
    //     .then(function (response) {
    //       if (
    //         response &&
    //         response.body &&
    //         response.body.features &&
    //         response.body.features.length
    //       ) {
    //         var feature = response.body.features[0];

    //         var map = new mapboxgl.Map({
    //           container: 'map',
    //           style: 'mapbox://styles/mapbox/streets-v11',
    //           center: feature.center,
    //           zoom: 10,
    //         });

    //         // Create a marker and add it to the map.
    //         new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    //       }
    //     });
    // }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '400px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{center[0]}</div>
          <div>{center[1]}</div>

          <Map
            state={{
              center,
              zoom: 9,
              controls: ['control.ZoomControl', 'control.FullscreenControl'],
            }}
          >
            <Placemark
              geometry={center}
              modules={['geoObject.addon.balloon']}
              properties={{ balloonContentBody: 'Your location' }}
            />
          </Map>
        </div>
      </div>
    );
  }
);
