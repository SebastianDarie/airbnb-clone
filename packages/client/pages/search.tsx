import shallow from 'zustand/shallow';
import { Listing, useSearchListingsQuery } from '@airbnb-clone/controller';
import { FiltersBar } from '../components/FiltersBar';
import Layout from '../components/Layout';
import { ListingCard } from '../components/ListingCard';
import styles from '../sass/pages/Search.module.scss';
import { useSearchStore } from '../stores/useSearchStore';
import { withApollo } from '../utils/withApollo';
import { useCallback, useEffect, useRef, useState, CSSProperties } from 'react';
import FiltersStore from '../stores/useFiltersStore';
import { useApolloClient } from '@apollo/client';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import markWithLabel from '../utils/markerWithLabel';
import MarkerWithLabel from '@googlemaps/markerwithlabel';

interface SearchProps {}

type position = {
  lat: number;
  lng: number;
};

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
  const [markers, setMarkers] = useState<position[]>([]);
  const [selected, setSelected] = useState<MarkerWithLabel | null>(null);
  const mapRef = useRef<google.maps.Map<Element> | null>(null);
  //let MarkerWithLabel: any = null;

  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
    // MarkerWithLabel = markWithLabel(map);
  }, []);

  const addMarkers = () => {
    data?.searchListings.listings.map((l) => {
      const { latitude: lat, longitude: lng } = l;
      const marker = new MarkerWithLabel({
        position: { lat, lng },
        clickable: true,
        draggable: false,
        map: mapRef.current!,
        icon:
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        labelContent: `
          <div className='label__position'>
            <div className='label__transform'>
              <button className='label__btn' type='button'>
                <div className='label__scale'>
                  <div className='label__padding'>
                    <div className='label__align'>
                      <span className='marker__label__content'>
                        $${l.price}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        `,
      });
      return marker.addListener('click', () => setSelected(marker));
    });
  };

  // const getMarkerLabelOptions = (
  //   position: position,
  //   room: {
  //     __typename?: 'Listing' | undefined;
  //   } & Pick<
  //     Listing,
  //     | 'id'
  //     | 'title'
  //     | 'category'
  //     | 'city'
  //     | 'photos'
  //     | 'bathrooms'
  //     | 'bedrooms'
  //     | 'beds'
  //     | 'guests'
  //     | 'amenities'
  //     | 'price'
  //     | 'latitude'
  //     | 'longitude'
  //     | 'createdAt'
  //   >,
  //   map: GoogleMap | null
  // ) => {
  //   return {
  //     map,
  //     position,
  //     icon: '',
  //     draggable: false,
  //     raiseOnDrag: true,
  //     labelContent: `<span key={${room.id}}>$${room.price}</span>`,
  //   };
  // };

  const apolloClient = useApolloClient();

  useEffect(() => {
    apolloClient.cache.evict({ fieldName: 'searchListings:{}' });
    apolloClient.cache.gc();
  }, []);

  const [latitude, longitude, adults, children, infants] = useSearchStore(
    (state) => [
      state.latitude,
      state.longitude,
      state.adults,
      state.children,
      state.infants,
    ],
    shallow
  );
  const { data, error, loading, variables, fetchMore } = useSearchListingsQuery(
    {
      variables: {
        input: { latitude, longitude, guests: adults + children + infants },
        limit: 20,
        cursor: null,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const filtersRef = useRef(FiltersStore.useFiltersStore.getState());

  useEffect(
    () =>
      FiltersStore.useFiltersStore.subscribe(
        (filters) => (filtersRef.current = filters as any),
        (state) => state
      ),
    []
  );

  console.log(loading, loadError);
  //const filteredListings = data?.searchListings.listings.filter(l => l.amenities)

  if (!data && error) {
    console.log(error);

    return (
      <>
        <div>Failed To Load Listings</div>
        <div>{error.message}</div>
      </>
    );
  }

  if (data && isLoaded) {
    addMarkers();
  }

  return (
    <Layout filter search>
      <div className={styles.inset__div}>
        <FiltersBar filtersRef={filtersRef} />

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
                fetchMore({
                  variables: {
                    input: variables?.input,
                    limit: variables?.limit,
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
                onLoad={onMapLoad}
              >
                {/* {markers.map((m) => (
                  <Marker
                    key={`${m.lat}-${m.lng}`}
                    position={{ lat: m.lat, lng: m.lng }}
                    onClick={() => setSelected(m)}
                  />
                ))} */}

                {selected ? (
                  <InfoWindow
                    position={{
                      lat: selected.getPosition()!.lat(),
                      lng: selected.getPosition()!.lng(),
                    }}
                    onCloseClick={() => setSelected(null)}
                  >
                    <div>test info window</div>
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

export default withApollo({ ssr: true })(Search);
