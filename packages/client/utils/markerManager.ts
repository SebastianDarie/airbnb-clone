// import { Listing } from "@airbnb-clone/controller";
// import MarkerWithLabel from "@googlemaps/markerwithlabel";

// export default class MarkerManager {
//   map: google.maps.Map<Element>;
//   markers: {};

//   constructor(map: google.maps.Map<Element>) {
//     this.map = map;
//     this.markers = {};
//   }

//   updateMarkers(
//     listings: ({
//       __typename?: 'Listing' | undefined;
//     } & Pick<
//       Listing,
//       | 'id'
//       | 'title'
//       | 'category'
//       | 'city'
//       | 'photos'
//       | 'bathrooms'
//       | 'bedrooms'
//       | 'beds'
//       | 'guests'
//       | 'amenities'
//       | 'price'
//       | 'latitude'
//       | 'longitude'
//       | 'createdAt'
//     >)[]
//   ) {
//     Object.keys(this.markers).filter(listingId => !listings).forEach(listingId => )

//     Object.values(listings)
//       .forEach(listing => {
//         if (!this.markers[listing.id]) {
//           this.createMarkerFromListing(listing);
//         }});
//   }

//   removeMarker (markerId: string) {
//     this.markers[markerId]
//   }
// }
