import { Map } from 'leaflet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';

interface MinimapBoundsProps {
  parentMap: Map;
  zoom: number;
  setHandlers: React.Dispatch<
    React.SetStateAction<{
      move: () => void;
      zoom: () => void;
    }>
  >;
}

interface MinimapControlProps {
  position: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
  zoom: number;
}

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds: React.FC<MinimapBoundsProps> = ({
  parentMap,
  zoom,
  setHandlers,
}) => {
  const minimap = useMap();

  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);

  useEffect(() => {
    setHandlers(handlers);
  }, [handlers]);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

export const MinimapControl: React.FC<MinimapControlProps> = ({
  position,
  zoom,
}) => {
  const [handlers, setHandlers] = useState<{
    move: () => void;
    zoom: () => void;
  }>({ move: () => null, zoom: () => null });

  const parentMap = useMap();
  const mapZoom = zoom || 0;

  useMapEvents(handlers);

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <MinimapBounds
          parentMap={parentMap}
          zoom={5}
          setHandlers={setHandlers}
        />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className='leaflet-control leaflet-bar'>{minimap}</div>
    </div>
  );
};
