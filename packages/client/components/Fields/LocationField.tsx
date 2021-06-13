import { PropertyTypeFormProps } from '@airbnb-clone/controller';
import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Map, Placemark } from 'react-yandex-maps';

interface LocationFieldProps {
  setValue: UseFormSetValue<PropertyTypeFormProps> | undefined;
}

export const LocationField: React.FC<LocationFieldProps> = ({ setValue }) => {
  const [center, setCenter] = useState<number[]>([-74.5, 40]);

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
};
