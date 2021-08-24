import {
  SearchListingsDocument,
  useSearchListingsQuery,
} from "@second-gear/controller";
import { NetworkStatus, useApolloClient } from "@apollo/client";
import MarkerWithLabel from "@googlemaps/markerwithlabel";
import { GoogleMap } from "@react-google-maps/api";
import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import shallow from "zustand/shallow";
import { DotLoader } from "../components/DotLoader";
import { ListingCard } from "../components/Search/ListingCard";
import styles from "../sass/pages/Search.module.scss";
import SearchStore from "../stores/useSearchStore";
import { useGoogleMaps } from "../utils/GoogleMapsProvider";
import MarkerManager from "../utils/markerManager";
import { withApollo } from "../utils/withApollo";
import dynamic from "next/dynamic";
import { InfoCardProps, SearchControlProps } from "../types";

const Layout = dynamic(() => import("../components/Layout"));
const InfoCard = dynamic<InfoCardProps>(() =>
  import("../components/Search/InfoCard").then((mod) => mod.InfoCard)
);
const SearchControl = dynamic<SearchControlProps>(() =>
  import("../components/Search/SearchControl").then((mod) => mod.SearchControl)
);
const ServerError = dynamic<{}>(() =>
  import("../components/ServerError").then((mod) => mod.ServerError)
);

interface SearchProps {}

interface DirectionsBoundsLiteral extends google.maps.LatLngBoundsLiteral {
  north: number;
  east: number;
  south: number;
  west: number;
}

const mapContainerStyle: CSSProperties = {
  height: "100%",
  width: "100%",
};

const options: google.maps.MapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  scrollwheel: false,
  streetViewControl: false,
  zoomControl: true,
};

const Search: React.FC<SearchProps> = ({}) => {
  const apolloClient = useApolloClient();
  const { isLoaded } = useGoogleMaps();
  const [checked, setChecked] = useState<boolean>(true);
  const [markerManager, setMarkerManager] = useState<MarkerManager>();
  const [selected, setSelected] = useState<MarkerWithLabel | null>(null);
  const mapRef = useRef<google.maps.Map<Element> | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
    setMarkerManager(new MarkerManager(map));
    if (controlRef.current) {
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        controlRef.current
      );
    }
  }, []);

  const [bounds, latitude, longitude, adults, children, infants] =
    SearchStore.useSearchStore(
      (state) => [
        state.bounds,
        state.latitude,
        state.longitude,
        state.adults,
        state.children,
        state.infants,
      ],
      shallow
    );
  const { data, error, loading, networkStatus, fetchMore, refetch } =
    useSearchListingsQuery({
      variables: {
        input: {
          bounds: {
            northEast: bounds.getNorthEast().toJSON(),
            southWest: bounds.getSouthWest().toJSON(),
          },
          guests: adults + children + infants,
        },
        limit: 20,
        cursor: null,
      },
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    return () => {
      apolloClient.cache.evict({ fieldName: "searchListings:{}" });
    };
  }, []);

  if (!data && error) {
    return (
      <Layout filter room>
        <ServerError />
      </Layout>
    );
  }

  return (
    <Layout isLoaded={isLoaded} filter search>
      <div className={styles.inset__div}>
        <div className={styles.stays__container}>
          <div className={styles.filters__bar__padding}>
            <div style={{ width: "100%" }}>
              <div className={styles.meta__padding}>
                <div className={styles.top__padding}>
                  <div className={styles.stays__count}>
                    {loading ? (
                      <div>
                        <DotLoader /> listings
                      </div>
                    ) : data?.searchListings.hasMore ? (
                      "20+ stays"
                    ) : (
                      `${data?.searchListings.listings.length} listings`
                    )}
                  </div>
                  <div className={styles.stays__header}>
                    <h1 className={styles.heading}>
                      Stays in selected map area
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <DotLoader />
            ) : (
              <div className={styles.listings__container}>
                <div style={{ overflowAnchor: "none" }}>
                  <div className={styles.listings__section}>
                    <div className={styles.listings__padding}>
                      <div className={styles.listings__margin}>
                        {data?.searchListings.listings.map((listing) => (
                          <ListingCard
                            key={listing.id}
                            id={listing.id}
                            listing={listing}
                            loading={
                              loading || networkStatus === NetworkStatus.refetch
                            }
                            searchStyles={styles}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.padding__bottom}></div>

          <div
            className={styles.load__more__margin}
            style={{ display: data?.searchListings.hasMore ? "flex" : "none" }}
          >
            <button
              className={styles.load__more__btn}
              onClick={() =>
                fetchMore!({
                  query: SearchListingsDocument,
                  variables: {
                    input: {
                      bounds,
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
                id="map"
                mapContainerStyle={mapContainerStyle}
                center={{ lat: latitude, lng: longitude }}
                zoom={12}
                options={options}
                onDragEnd={async () => {
                  if (checked) {
                    const newLat = mapRef.current?.getCenter().lat();
                    const newLng = mapRef.current?.getCenter().lng();
                    const currBounds = mapRef.current?.getBounds();

                    if (latitude !== newLat || longitude !== newLng) {
                      SearchStore.setLocation(
                        "",
                        newLat!,
                        newLng!,
                        currBounds!
                      );
                    }

                    const { north, east, south, west } =
                      currBounds?.toJSON() as DirectionsBoundsLiteral;

                    const bounds = {
                      northEast: { lat: north, lng: east },
                      southWest: { lat: south, lng: west },
                    };

                    const { data: newData } = await refetch({
                      input: { bounds },
                      limit: 50,
                      cursor: null,
                    });

                    if (markerManager && newData) {
                      markerManager.updateMarkers(
                        newData.searchListings.listings,
                        setSelected
                      );
                    }
                  } else if (!checked) {
                    const newLat = mapRef.current?.getCenter().lat();
                    const newLng = mapRef.current?.getCenter().lng();
                    const currBounds = mapRef.current?.getBounds();
                    if (latitude !== newLat || longitude !== newLng) {
                      SearchStore.setLocation(
                        "",
                        newLat!,
                        newLng!,
                        currBounds!
                      );
                    }
                  }
                }}
                onLoad={onMapLoad}
              >
                <SearchControl
                  checked={checked}
                  loading={loading}
                  controlRef={controlRef}
                  setChecked={setChecked}
                />
                {selected ? (
                  <InfoCard
                    data={data}
                    selected={selected}
                    setSelected={setSelected}
                    styles={styles}
                  />
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
