import { HomePinSvg, MarkerSvg } from '@airbnb-clone/controller';
import shallow from 'zustand/shallow';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { GoogleMap } from '@react-google-maps/api';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import React, {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useRef,
} from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import styles from '../../sass/layout/Location.module.scss';
import { useGoogleMaps } from '../../utils/GoogleMapsProvider';
import ListingStore from '../../stores/useListingStore';

import '@reach/combobox/styles.css';

interface LocationFieldProps {}

const mapContainerStyle: CSSProperties = {
  height: '100%',
  width: '100%',
};

const options: google.maps.MapOptions = {
  clickableIcons: false,
  fullscreenControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  streetViewControl: false,
  zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
};

const SearchAddress = ({
  addressFound,
  map,
  marker,
}: {
  addressFound: boolean;
  map: google.maps.Map<Element>;
  marker: MutableRefObject<MarkerWithLabel | undefined>;
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
  const pinMarker = useRef<MarkerWithLabel | null>(null);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const res = await getGeocode({ address });
      const latLng = await getLatLng(res[0]);
      //marker.current?.setPosition({ lat: latLng.lat, lng: latLng.lng });
      ListingStore.updateLocation(res[0].formatted_address, latLng);
      if (!addressFound) {
        marker.current?.setMap(null);
        if (pinMarker.current === null && latLng) {
          console.log('new pin marker');
          pinMarker.current = new MarkerWithLabel({
            position: {
              lat: latLng.lat,
              lng: latLng.lng,
            },
            animation: google.maps.Animation.BOUNCE,
            clickable: false,
            draggable: true,
            map: map,
            icon:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
            labelContent: `
            <div class='location__pin__position'>
        <div>
          test
        </div>
      </div>
            `,
          });
        }
        //   marker.current?.setLabel(`
        //   <div class='location__pin__position'>
        //   <div>
        //     ${(<HomePinSvg />)}
        //   </div>
        // </div>
        //   `);
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
  const [addressFound, coords] = ListingStore.useListingStore(
    (state) => [state.addressFound, state.coords],
    shallow
  );

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

          // createHTMLMapMarker({
          //   position: {
          //     lat: () => position.coords.latitude,
          //     lng: () => position.coords.longitude,
          //   },
          //   html: `<div classname='circle__flex'>
          //   <div classname='circle__outer'>
          //     <div classname='circle__inner'></div>
          //   </div>
          // </div>`,
          //   map,
          // });
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
                  options={{
                    ...options,
                    draggable: addressFound ? true : false,
                    zoomControl: addressFound ? true : false,
                  }}
                  onLoad={onMapLoad}
                ></GoogleMap>
              </div>

              {/* <div className={styles.location__pin__position}>
                <div>
                  <HomePinSvg />
                </div>
              </div> */}

              <div className={styles.popover__container}>
                <div
                  className={styles.popover__style}
                  style={{ opacity: addressFound ? 1 : 0 }}
                >
                  <span className={styles.popover__text}>
                    Drag the map to reposition the pin
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.search__wrapper}>
            <div className={styles.search__form}>
              {addressFound ? (
                <a className={styles.inner__padding__small} role='button'>
                  <div className={styles.svg__padding__small}>
                    <MarkerSvg />
                  </div>
                  <SearchAddress
                    addressFound={addressFound}
                    map={mapRef.current!}
                    marker={marker}
                  />
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
                            map={mapRef.current!}
                            marker={marker}
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
