import { MarkerSvg } from '@airbnb-clone/controller';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { GoogleMap } from '@react-google-maps/api';
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import shallow from 'zustand/shallow';
import styles from '../../sass/layout/Location.module.scss';
import ListingStore from '../../stores/useListingStore';
import { useGoogleMaps } from '../../utils/GoogleMapsProvider';

interface LocationFieldProps {}

interface SearchAddressProps {
  addressFound: boolean;
  map: MutableRefObject<google.maps.Map<Element> | undefined>;
  marker: MutableRefObject<MarkerWithLabel | undefined>;
  pinMarker: MutableRefObject<MarkerWithLabel | null>;
}

const labelContent = `
<div class='location__pin__position'>
<div>
<svg
xmlns='http://www.w3.org/2000/svg'
viewBox='0 0 40 63'
width='100%'
height='100%'
preserveAspectRatio='xMidYMid meet'
>
<defs>
<clipPath id='animationMask_RJKVqmc2fL'>
<rect width='40' height='63' x='0' y='0'></rect>
</clipPath>
</defs>
<g clip-path='url(#animationMask_RJKVqmc2fL)'>
<g></g>
<g
transform='matrix(0.9183,0,0,0.9896,3.4771,10.368)'
opacity='1'
>
<g opacity='1' transform='matrix(1,0,0,1,18,45)'>
  <path
    fill='rgb(0,0,0)'
    fill-opacity='1'
    d='M0 0 M0,3 C1.657,3 3,1.657 3,0 C3,-1.657 1.657,-3 0,-3 C-1.657,-3 -3,-1.657 -3,0 C-3,1.657 -1.657,3 0,3z'
  ></path>
</g>
</g>
<g
transform='matrix(0.9896,0,0,0.9896,2.0053,3.6688)'
opacity='1'
style={{ userSelect: 'none' }}
>
<g opacity='1' transform='matrix(1,0,0,1,18.198,21.725)'>
  <path
    fill='rgb(0,0,0)'
    fill-opacity='1'
    d='M0 0 M-18,-4.597 C-18,-13.955000000000002 -9.652,-21.64 0,-21.64 C9.652,-21.64 18,-14.873999999999999 18,-4.597 C18,5.410999999999999 11.822000000000001,11.093999999999998 1.864,20.644 C0.8260000000000001,21.639999999999997 -0.915,21.555999999999997 -2,20.644 C-11.921,11.074999999999998 -18,5.397999999999999 -18,-4.597z'
  ></path>
</g>
</g>
<g
transform='matrix(0.9896,0,0,0.9896,2.0053,3.6688)'
opacity='1'
>
<g opacity='1' transform='matrix(1,0,0,1,18,16.992)'>
  <path
    fill='rgb(255,255,255)'
    fill-opacity='1'
    d='M0 0 M-2.481,0.865 C-3.165,0.865 -3.719,0.31100000000000005 -3.719,-0.372 C-3.719,-1.056 -3.165,-1.611 -2.481,-1.611 C-1.7979999999999998,-1.611 -1.243,-1.056 -1.243,-0.372 C-1.243,0.31100000000000005 -1.7979999999999998,0.865 -2.481,0.865zM0 0 M7.63,-3.499 C7.63,-3.499 0.148,-7.944 0.148,-7.944 C0.06,-8.008 -0.06,-8.008 -0.148,-7.944 C-0.148,-7.944 -7.63,-3.499 -7.63,-3.499 C-8.031,-3.209 -8.119,-2.649 -7.829,-2.249 C-7.654,-2.0060000000000002 -7.382000000000001,-1.878 -7.105,-1.878 C-7.105,-1.878 -5.806,-1.878 -5.806,-1.878 C-5.806,-1.878 -5.806,7.749 -5.806,7.749 C-5.806,7.8919999999999995 -5.69,8.008 -5.546,8.008 C-5.546,8.008 -0.387,8.008 -0.387,8.008 C-0.276,8.008 -0.187,7.919 -0.187,7.808 C-0.187,7.808 -0.187,3.632 -0.187,3.632 C-0.187,2.911 0.5950000000000001,2.326 1.316,2.326 C2.037,2.326 2.87,2.911 2.87,3.632 C2.87,3.632 2.87,7.808 2.87,7.808 C2.87,7.919 2.96,8.008 3.07,8.008 C3.07,8.008 5.547,8.008 5.547,8.008 C5.6899999999999995,8.008 5.807,7.8919999999999995 5.807,7.749 C5.807,7.749 5.807,-1.878 5.807,-1.878 C5.807,-1.878 7.123,-1.878 7.123,-1.878 C7.393000000000001,-1.878 7.6579999999999995,-2.012 7.829,-2.249 C8.119,-2.649 8.03,-3.209 7.63,-3.499z'
  ></path>
</g>
</g>
</g>
</svg>
</div>
</div>
`;

const mapContainerStyle: CSSProperties = {
  height: '100%',
  width: '100%',
};

const options: google.maps.MapOptions = {
  clickableIcons: false,
  draggable: false,
  fullscreenControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  streetViewControl: false,
  zoomControl: false,
  zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
};

const SearchAddress: React.FC<SearchAddressProps> = ({
  addressFound,
  map,
  marker,
  pinMarker,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ['address'],
    },
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const res = await getGeocode({ address });
      const latLng = await getLatLng(res[0]);
      ListingStore.updateLocation(latLng, res[0].formatted_address);

      if (!addressFound) {
        marker.current?.setMap(null);

        if (pinMarker.current === null) {
          map.current?.setOptions({
            clickableIcons: true,
            draggable: true,
            zoomControl: true,
          });

          pinMarker.current = new MarkerWithLabel({
            position: {
              lat: latLng.lat,
              lng: latLng.lng,
            },
            animation: google.maps.Animation.BOUNCE,
            clickable: false,
            draggable: true,
            map: map.current,
            icon:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            labelContent,
          });
        } else {
          pinMarker.current.setPosition({ lat: latLng.lat, lng: latLng.lng });
        }
        ListingStore.setAddressFound(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder='Enter your address'
        className={
          addressFound ? styles.location__input__small : styles.location__input
        }
      />
      <ComboboxPopover style={{ zIndex: 999 }}>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const LocationField: React.FC<LocationFieldProps> = ({}) => {
  const { isLoaded } = useGoogleMaps();
  const mapRef = useRef<google.maps.Map<Element>>();
  const marker = useRef<MarkerWithLabel>();
  const pinMarker = useRef<MarkerWithLabel | null>(null);
  const popover = useRef<HTMLDivElement | null>(null);
  const [addressFound, coords] = ListingStore.useListingStore(
    (state) => [state.addressFound, state.coords],
    shallow
  );

  useEffect(() => {
    return () => {
      ListingStore.setAddressFound(false);
    };
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          marker.current = new MarkerWithLabel({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            animation: google.maps.Animation.BOUNCE,
            clickable: false,
            draggable: false,
            map: map,
            icon:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            labelContent: `
            <div class='circle__container'>
            <div class='circle__outer'>
              <div class='circle__inner'></div>
            </div>
          </div>
            `,
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <div className={styles.position}>
        <div className={styles.wrapper}>
          <div className={styles.map__container}>
            <div className={styles.map__flex}>
              <div className={styles.map__height}>
                <GoogleMap
                  id='map'
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: coords.lat, lng: coords.lng }}
                  zoom={12}
                  options={options}
                  onDragEnd={() => {
                    const pos = mapRef.current?.getCenter();

                    if (pos && popover.current) {
                      pinMarker.current?.setPosition(pos);
                      popover.current.style.visibility = 'hidden';

                      ListingStore.updateLocation({
                        lat: pos.lat(),
                        lng: pos.lng(),
                      });
                    }
                  }}
                  onLoad={onMapLoad}
                ></GoogleMap>
              </div>

              <div className={styles.popover__container}>
                <div
                  className={styles.popover__style}
                  style={{ opacity: addressFound ? 1 : 0 }}
                  ref={popover}
                >
                  <span className={styles.popover__text}>
                    Drag the map to reposition the pin
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.search__wrapper}
            style={{ pointerEvents: addressFound ? 'none' : 'auto' }}
          >
            <div className={styles.search__form}>
              {addressFound ? (
                <a className={styles.inner__padding__small} role='button'>
                  <div className={styles.svg__padding__small}>
                    <MarkerSvg />
                  </div>
                  {isLoaded ? (
                    <SearchAddress
                      addressFound={addressFound}
                      map={mapRef}
                      marker={marker}
                      pinMarker={pinMarker}
                    />
                  ) : null}
                </a>
              ) : (
                <div className={styles.inner__padding}>
                  <div className={styles.margin__container}>
                    <div className={styles.inner__flex}>
                      <div className={styles.svg__flex}>
                        <div className={styles.svg__padding}>
                          <MarkerSvg />
                        </div>
                      </div>

                      <label htmlFor='location' className={styles.label}>
                        {isLoaded ? (
                          <SearchAddress
                            addressFound={addressFound}
                            map={mapRef}
                            marker={marker}
                            pinMarker={pinMarker}
                          />
                        ) : null}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationField;
