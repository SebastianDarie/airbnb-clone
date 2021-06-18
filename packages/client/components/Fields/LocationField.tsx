import React, { useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

interface LocationFieldProps {}

export const LocationField: React.FC<LocationFieldProps> = ({}) => {
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

        {/* <YMaps
        query={{
          apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
          lang: 'en_US',
        }}
        >
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
        </YMaps> */}
      </div>
    </div>
  );
};
