import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LatLng,
  LatLngExpression,
  LayerGroup,
  Map,
  marker,
  Marker as MarkerType,
} from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { LocationSvg } from '@airbnb-clone/controller';
import styles from '../../sass/layout/Location.module.scss';
import { MinimapControl } from './MinimapControl';

interface LocationFieldProps {}

const center: LatLngExpression = [51.505, -0.09];
const zoom = 13;

const SetViewOnClick = () => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
};

const DisplayPosition = ({ map }: { map: Map }) => {
  const [position, setPosition] = useState(map.getCenter());
  console.log(position);

  // const onClick = useCallback(() => {
  //   map.setView(center, zoom);
  // }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return null;
};

const LocationMarker = () => {
  const [draggable, setDraggable] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLng | null>(null);
  const markerRef = useRef<MarkerType>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return position === null ? null : (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'You are here. (Marker is draggable'
            : 'You are here. (Click here to make marker draggable)'}
        </span>
      </Popup>
    </Marker>
  );
};

const LocationField: React.FC<LocationFieldProps> = ({}) => {
  const [map, setMap] = useState<Map | null>(null);
  const mapRef = useRef<Map | null>(null);

  // useEffect(() => {
  //   const searchControl = new ELG.Geosearch().addTo(mapRef.current!);
  //   const results = new LayerGroup().addTo(mapRef.current!);

  //   searchControl.on('results', (data: { results: string | any[]; }) => {
  //     results.clearLayers();
  //     for (let i = data.results.length - 1; i >= 0; i--) {
  //       results.addLayer(marker(data.results[i].latlng));
  //     }
  //   });
  // }, []);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
        ref={mapRef}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* <LocationMarker /> */}
        <MinimapControl position='topright' zoom={0} />
        <SetViewOnClick />
      </MapContainer>
    ),
    []
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.search__form}>
          <div className={styles.inner__padding}>
            <div className={styles.margin__container}>
              <div className={styles.inner__flex}>
                <div className={styles.svg__flex}>
                  <div className={styles.svg__padding}>
                    <LocationSvg />
                  </div>
                </div>

                <label htmlFor='location' className={styles.label}>
                  <input
                    id='location'
                    className={styles.location__input}
                    placeholder='Enter your address'
                    type='text'
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {map ? <DisplayPosition map={map} /> : null}
        {displayMap}
      </div>
    </div>
  );
};

export default LocationField;
