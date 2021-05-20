import { ListingFormProps } from '@airbnb-clone/controller';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import React, { useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { UseFormSetValue } from 'react-hook-form';

interface LocationFieldProps {
  setValue: UseFormSetValue<ListingFormProps> | undefined;
}

interface DefaultCenter {
  lat: number;
  lng: number;
}

//const google = typeof window === 'undefined' ? null : window.google;
const libraries: Libraries = ['places'];
const mapContainerStyle = {
  height: '350px',
  width: '600px',
};
const options: google.maps.MapOptions = {};

export const LocationField: React.FC<LocationFieldProps> = React.memo(
  ({ setValue }) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
      libraries,
    });
    const [defaultCenter, setDefaultCenter] = useState<
      DefaultCenter | undefined
    >({
      lat: 59.95,
      lng: 30.33,
    });

    const onSuggestSelect = (place: Suggest) => {
      const {
        location: { lat, lng },
      } = place;
      setValue!('latitude', lat);
      setValue!('longitude', lng);

      setDefaultCenter({
        lat,
        lng,
      });
    };

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
            onSuggestSelect={onSuggestSelect}
          />

          <div>{defaultCenter?.lat}</div>
          <div>{defaultCenter?.lng}</div>

          {defaultCenter && (
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
          )}
        </div>
        {/* )} */}
      </div>
    );
  }
);
