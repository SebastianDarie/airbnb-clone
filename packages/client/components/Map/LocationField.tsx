import { Icon, LatLng, LatLngExpression, Map } from 'leaflet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import styles from '../../sass/layout/Location.module.scss';
import ListingStore from '../../stores/useListingStore';
import { MinimapControl } from './MinimapControl';

interface LocationFieldProps {}

// const center: LatLngExpression = [51.505, -0.09];
// const zoom = 10;

// const LocationMarker = ({ parentMap }: { parentMap: Map | null }) => {
//   const [position, setPosition] = useState<LatLng | undefined>(
//     parentMap?.getCenter()
//   );
//   const updateLocation = ListingStore.updateLocation;

//   const map = useMapEvents({
//     click(e) {
//       if (position === undefined) {
//         map.locate();
//       } else {
//         map.setView(e.latlng, map.getZoom(), {
//           animate: true,
//         });
//       }
//     },
//     locationfound(e) {
//       updateLocation([e.latlng.lat, e.latlng.lng]);
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   const onMove = useCallback(() => {
//     setPosition(map.getCenter());
//   }, [map]);

//   const onDragEnd = useCallback(() => {
//     setPosition(map.getCenter());
//     updateLocation([map.getCenter().lat, map.getCenter().lng]);
//   }, [map]);

//   const onMoveEnd = useCallback(() => {
//     updateLocation([map.getCenter().lat, map.getCenter().lng]);
//   }, [map]);

//   useEffect(() => {
//     map.on('dragend', onDragEnd);
//     map.on('move', onMove);
//     map.on('moveend', onMoveEnd);
//     return () => {
//       map.off('dragend', onDragEnd);
//       map.off('move', onMove);
//       map.off('moveend', onMoveEnd);
//     };
//   }, [map, onDragEnd, onMove, onMoveEnd]);

//   return position === undefined ? null : (
//     <Marker
//       icon={
//         new Icon({
//           iconRetinaUrl:
//             'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
//           iconUrl:
//             'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
//           shadowUrl:
//             'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
//         })
//       }
//       position={position}
//     >
//       <Popup minWidth={90}>You are here</Popup>
//     </Marker>
//   );
// };

const LocationField: React.FC<LocationFieldProps> = ({}) => {
  // const [map, setMap] = useState<Map | null>(null);

  // const displayMap = useMemo(
  //   () => (
  //     <MapContainer
  //       center={center}
  //       zoom={zoom}
  //       scrollWheelZoom={false}
  //       whenCreated={setMap}
  //       style={{ height: '100vh' }}
  //     >
  //       <TileLayer
  //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //       />
  //       <EsriLeafletGeoSearch
  //         key={process.env.NEXT_PUBLIC_ARCGIS_API_KEY}
  //         providers={{
  //           arcgisOnlineProvider: {
  //             token: process.env.NEXT_PUBLIC_ARCGIS_API_KEY,
  //             label: 'ArcGIS Online Results',
  //             maxResults: 10,
  //           },
  //         }}
  //         eventHandlers={{
  //           requeststart: () => console.log('Started request...'),
  //           requestend: () => console.log('Ended request...'),
  //           results: (r: {
  //             latlng: { lat: number; lng: number };
  //             results: { properties: { City: string } }[];
  //           }) => {
  //             ListingStore.updateLocation([r.latlng.lat, r.latlng.lng]);
  //             ListingStore.setCity(r.results[0].properties.City);
  //           },
  //         }}
  //         useMapBounds={false}
  //         position='topleft'
  //       />
  //       <LocationMarker parentMap={map} />
  //       <MinimapControl position='topright' zoom={zoom} />
  //     </MapContainer>
  //   ),
  //   []
  // );

  return (
    <div>
      <div className={styles.wrapper}>{}</div>
    </div>
  );
};

export default LocationField;
