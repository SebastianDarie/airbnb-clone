import { ListingFormProps } from '@airbnb-clone/controller';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import React, { useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { UseFormSetValue } from 'react-hook-form';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

interface LocationFieldProps {
  setValue: UseFormSetValue<ListingFormProps> | undefined;
}

//const google = typeof window === 'undefined' ? null : window.google;
// const libraries: Libraries = ['places'];
// const mapContainerStyle = {
//   height: '350px',
//   width: '600px',
// };
// const options: google.maps.MapOptions = {};

export const LocationField: React.FC<LocationFieldProps> = React.memo(
  ({ setValue }) => {
    // const { isLoaded, loadError } = useLoadScript({
    //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
    //   libraries,
    // });
    const [defaultCenter, setDefaultCenter] = useState<number[]>([-74.5, 40]);

    // const onSuggestSelect = (place: Suggest) => {
    //   const {
    //     location: { lat, lng },
    //   } = place;
    //   setValue!('latitude', lat);
    //   setValue!('longitude', lng);

    //   setDefaultCenter({
    //     lat,
    //     lng,
    //   });
    // };

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (typeof window !== 'undefined') {
      const map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: defaultCenter,
        zoom: 9,
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());

      // const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      // mapboxClient.geocoding
      //   .forwardGeocode({
      //     query: 'Wellington, New Zealand',
      //     autocomplete: false,
      //     limit: 1,
      //   })
      //   .send()
      //   .then(function (response) {
      //     if (
      //       response &&
      //       response.body &&
      //       response.body.features &&
      //       response.body.features.length
      //     ) {
      //       var feature = response.body.features[0];

      //       var map = new mapboxgl.Map({
      //         container: 'map',
      //         style: 'mapbox://styles/mapbox/streets-v11',
      //         center: feature.center,
      //         zoom: 10,
      //       });

      //       // Create a marker and add it to the map.
      //       new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
      //     }
      //   });
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '400px',
          width: '100%',
        }}
      >
        {/* {google && ( */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Geosuggest
            placeholder='Find your location'
            //location={defaultCenter}
            radius={20}
            //onSuggestSelect={onSuggestSelect}
          />

          <div>{defaultCenter[0]}</div>
          <div>{defaultCenter[1]}</div>

          {/* {defaultCenter && (
            <>
              {loadError ? (
                <div>Failed to load maps</div>
              ) : !isLoaded ? (
                <div>Loading map...</div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={defaultCenter}
                  options={options}
                  zoom={8}
                ></GoogleMap>
              )}
            </>
          )} */}
          <div id='mapbox' style={{ height: '100%' }}></div>
        </div>
        {/* )} */}
      </div>
    );
  }
);
