import { ListingFormProps } from '@airbnb-clone/controller';
import React, { useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import GoogleMapReact from 'google-map-react';
import { UseFormSetValue } from 'react-hook-form';

interface LocationFieldProps {
  setValue: UseFormSetValue<ListingFormProps> | undefined;
}

interface DefaultCenter {
  lat: number;
  lng: number;
}

const google = typeof window === 'undefined' ? null : window.google;

export const LocationField: React.FC<LocationFieldProps> = ({ setValue }) => {
  const [defaultCenter, setDefaultCenter] = useState<DefaultCenter | null>(
    null
  );

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
    <div style={{ height: '100%', width: '100%' }}>
      {google && (
        <>
          <Geosuggest
            placeholder='Find your location'
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius={20}
            onSuggestSelect={onSuggestSelect}
          />

          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
            }}
            //defaultCenter={center}
            //defaultZoom={zoom}
          >
            test
          </GoogleMapReact>
        </>
      )}
    </div>
  );
};
