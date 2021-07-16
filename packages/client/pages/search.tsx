import shallow from 'zustand/shallow';
import {
  SearchListingsDocument,
  useSearchListingsLazyQuery,
  useSearchListingsQuery,
} from '@airbnb-clone/controller';
import { FiltersBar } from '../components/FiltersBar';
import Layout from '../components/Layout';
import { ListingCard } from '../components/Search/ListingCard';
import styles from '../sass/pages/Search.module.scss';
import cardStyles from '../sass/components/ListingCard.module.scss';
import SearchStore from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  memo,
} from 'react';
import FiltersStore from '../stores/useFiltersStore';
import { useApolloClient } from '@apollo/client';
import { GoogleMap, InfoWindow, useLoadScript } from '@react-google-maps/api';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import MarkerManager from '../utils/markerManager';
import { ImageCard } from '../components/Search/ImageCard';
//import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier';

interface SearchProps {}

interface DirectionsBoundsLiteral extends google.maps.LatLngBoundsLiteral {
  north: number;
  east: number;
  south: number;
  west: number;
}

// const options: google.maps.MapOptions = {
//   scrollwheel: false,
//   zoomControl: true,
// };

const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const mapContainerStyle: CSSProperties = {
  height: '100%',
  width: '100%',
};

const options = {
  scrollwheel: false,
  zoomControl: true,
};

const Search: React.FC<SearchProps> = ({}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });
  const [markers, setMarkers] = useState<MarkerWithLabel[]>([]);
  const [selected, setSelected] = useState<MarkerWithLabel | null>(null);
  const mapRef = useRef<google.maps.Map<Element> | null>(null);

  let markerManager: MarkerManager;
  // let geocoder: google.maps.Geocoder = new google.maps.Geocoder();
  // let oms: OverlappingMarkerSpiderfier | null = null;
  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
    markerManager = new MarkerManager(map);
    //geocoder = new google.maps.Geocoder();
    //oms = new OverlappingMarkerSpiderfier(mapRef.current);
    //  addMarkers();
  }, []);

  const addMarkers = () => {
    data?.searchListings.listings.map((l) => {
      //if (!!markers.filter((m) => m.get('id') !== l.id)) {
      const { latitude: lat, longitude: lng } = l;
      const marker = new MarkerWithLabel({
        position: { lat, lng },
        clickable: true,
        draggable: false,
        map: mapRef.current!,
        icon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        labelContent: `
            <div class='label__transform'>
              <button class='label__btn' type='button'>
                <div class='label__scale'>
                  <div class='label__padding'>
                    <div class='label__align'>
                      <span class='marker__label__content'>
                        $${l.price}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
        `,
      });

      marker.addListener('click', () => setSelected(marker));
      // marker.addListener('mouseover', () => setShowControls(true));
      // marker.addListener('mouseout', () => setShowControls(false));
      marker.setValues({ id: l.id });
      // oms?.addMarker(marker, () => setSelected(marker));
      //setMarkers((curr) => [...curr, marker]);
      return marker;
      //}
    });
  };

  const apolloClient = useApolloClient();

  // useEffect(() => {
  //   apolloClient.cache.evict({ fieldName: 'searchListings:{}' });
  //   apolloClient.cache.gc();
  // }, []);

  const [
    latitude,
    longitude,
    adults,
    children,
    infants,
  ] = SearchStore.useSearchStore(
    (state) => [
      state.latitude,
      state.longitude,
      state.adults,
      state.children,
      state.infants,
    ],
    shallow
  );
  // const { data, error, loading, variables, fetchMore } = useSearchListingsQuery(
  //   {
  //     variables: {
  //       input: { latitude, longitude, guests: adults + children + infants },
  //       limit: 20,
  //       cursor: null,
  //     },
  //     notifyOnNetworkStatusChange: true,
  //   }
  // );
  const [
    searchListings,
    { data, error, loading, fetchMore },
  ] = useSearchListingsLazyQuery();
  //const filtersRef = useRef(FiltersStore.useFiltersStore.getState());

  // useEffect(
  //   () =>
  //     FiltersStore.useFiltersStore.subscribe(
  //       (filters) => (filtersRef.current = filters as any),
  //       (state) => state
  //     ),
  //   []
  // );

  //const filteredListings = data?.searchListings.listings.filter(l => l.amenities)

  if (!data && error) {
    return (
      <>
        <div>Failed To Load Listings</div>
        <div>{error.message}</div>
      </>
    );
  }

  useEffect(() => {
    if (data && isLoaded && markerManager) {
      markerManager.updateMarkers(data.searchListings.listings);
      // addMarkers();
      // oms = new OverlappingMarkerSpiderfier(mapRef.current!, {
      //   markersWontMove: true,
      //   markersWontHide: true,
      //   basicFormatEvents: true,
      // });
      // new MarkerClusterer(mapRef.current!, markers, {
      //   imagePath:
      //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      // });
    }
    return () => {};
  }, [data, isLoaded]);

  const [showControls, setShowControls] = useState<boolean>(false);

  // if(isLoaded)

  return (
    <Layout filter search>
      <div className={styles.inset__div}>
        {/* <FiltersBar filtersRef={filtersRef} /> */}

        <div className={styles.stays__container}>
          <div className={styles.filters__bar__padding}>
            <div style={{ width: '100%' }}>
              <div className={styles.meta__padding}>
                <div className={styles.top__padding}>
                  <div className={styles.stays__count}>
                    {data?.searchListings.hasMore
                      ? '20+ stays'
                      : `${data?.searchListings.listings.length} listings`}
                  </div>
                  <div className={styles.stays__header}>
                    <h1 className={styles.heading}>
                      Stays in selected map area
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.listings__container}>
              <div style={{ overflowAnchor: 'none' }}>
                <div className={styles.listings__section}>
                  <div className={styles.listings__padding}>
                    <div className={styles.listings__margin}>
                      {data?.searchListings.listings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          loading={loading}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.padding__bottom}></div>

          <div
            className={styles.load__more__margin}
            style={{ display: data?.searchListings.hasMore ? 'flex' : 'none' }}
          >
            <button
              className={styles.load__more__btn}
              onClick={() =>
                fetchMore!({
                  query: SearchListingsDocument,
                  variables: {
                    input: {
                      latitude,
                      longitude,
                      guests: adults + children + infants,
                    },
                    limit: 20,
                    cursor:
                      data?.searchListings.listings[
                        data.searchListings.listings.length - 1
                      ].createdAt,
                  },
                })
              }
            >
              Load more
            </button>
          </div>
        </div>

        <div className={styles.map__container}>
          <aside className={styles.map__position}>
            {isLoaded ? (
              <GoogleMap
                id='map'
                mapContainerStyle={mapContainerStyle}
                center={{ lat: latitude, lng: longitude }}
                zoom={12}
                options={options}
                // onBoundsChanged={() => {
                //   console.log(
                //     mapRef.current?.getCenter().toString(),
                //     mapRef.current?.getBounds()?.toString()
                //   );
                //   geocoder.geocode(
                //     {
                //       bounds: mapRef.current?.getBounds()!,
                //     },
                //     (results, status) => {
                //       if (status === 'OK') {
                //         console.log(results[0].geometry.location);
                //       } else {
                //         console.log(status);
                //       }
                //     }
                //   );
                // }}
                onCenterChanged={() => {
                  // console.log(mapRef.current?.getBounds());
                  //  geocoder.geocode(
                  //   {
                  //     bounds: mapRef.current.getBounds()!,
                  //   },
                  //   (results, status) => {
                  //     if (status === 'OK') {
                  //       console.log(results[0].geometry.location);
                  //     } else {
                  //       console.log(status);
                  //     }
                  //   }
                  // )

                  const newLat = mapRef.current?.getCenter().lat();
                  const newLng = mapRef.current?.getCenter().lng();
                  if (latitude !== newLat || longitude !== newLng) {
                    SearchStore.setLocation(
                      '',
                      mapRef.current?.getCenter().lat()!,
                      mapRef.current?.getCenter().lng()!
                    );

                    // if (data && markerManager) {
                    //   markerManager.updateMarkers(data.searchListings.listings);
                    // }
                  }
                }}
                onIdle={() => {
                  const {
                    north,
                    east,
                    south,
                    west,
                  } = mapRef.current
                    ?.getBounds()
                    ?.toJSON() as DirectionsBoundsLiteral;
                  const bounds = {
                    northEast: { lat: north, lng: east },
                    southWest: { lat: south, lng: west },
                  };
                  //console.log(bounds);
                  // apolloClient.cache.evict({ fieldName: 'searchListings:{}' });
                  // apolloClient.cache.gc();
                  searchListings({
                    variables: {
                      input: { bounds },
                      limit: 50,
                      cursor: null,
                    },
                  });
                }}
                onLoad={onMapLoad}
              >
                {selected ? (
                  <InfoWindow
                    position={{
                      lat: selected.getPosition()!.lat(),
                      lng: selected.getPosition()!.lng(),
                    }}
                    onCloseClick={() => setSelected(null)}
                  >
                    <div className={styles.info__window__position}>
                      <div className={styles.info__window__width}>
                        <div className={styles.info__window__card}>
                          <ImageCard
                            listing={
                              data?.searchListings.listings.find(
                                (l) => l.id === selected.get('id')
                              )!
                            }
                            showControls={showControls}
                            styles={cardStyles}
                          />
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                ) : null}
              </GoogleMap>
            ) : null}
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(memo(Search));
