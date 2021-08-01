import { MarkerSvg } from '@second-gear/controller';
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
import { labelContent } from '../../constants/markerLabel';

interface LocationFieldProps {}

interface SearchAddressProps {
  addressFound: boolean;
  map: MutableRefObject<google.maps.Map<Element> | undefined>;
  marker: MutableRefObject<MarkerWithLabel | undefined>;
  pinMarker: MutableRefObject<MarkerWithLabel | null>;
}

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
