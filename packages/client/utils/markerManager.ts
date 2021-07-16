import { ListingResult } from '@airbnb-clone/controller';
import MarkerWithLabel from '@googlemaps/markerwithlabel';

export default class MarkerManager {
  map: google.maps.Map<Element>;
  markers: { [id: string]: google.maps.Marker };
  markerArr: google.maps.Marker[];

  constructor(map: google.maps.Map<Element>) {
    this.map = map;
    this.markers = {};
    this.markerArr = [];
  }

  createMarker(listing: ListingResult) {
    //console.count('new marker');
    const position = new google.maps.LatLng(
      listing.latitude,
      listing.longitude
    );

    const mapIcon = {
      path: 'm22,-28.38281l-44,0l0,20l16,0l6,5l6,-5l16,0l0,-20z',
      labelOrigin: new google.maps.Point(0, -18),
      fillColor: 'white',
      fillOpacity: 1,
      scale: 1.15,
      strokeColor: '#484848',
      strokeWeight: 0.3,
    };

    if (!this.markers[listing.id]) {
      const marker = new MarkerWithLabel({
        position,
        animation: google.maps.Animation.DROP,
        clickable: true,
        draggable: false,
        map: this.map,
        icon: mapIcon,
        labelContent: `
          <div class='label__transform'>
            <button class='label__btn' type='button'>
              <div class='label__scale'>
                <div class='label__padding'>
                  <div class='label__align'>
                    <span class='marker__label__content'>
                      $${listing.price}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
      `,
      });
      // const marker = new google.maps.Marker({
      //   position,
      //   animation: google.maps.Animation.DROP,
      //   clickable: true,
      //   draggable: false,
      //   map: this.map,
      //   icon: mapIcon,
      // });
      marker.setValues({ id: listing.id });

      this.markers[listing.id] = marker;
      this.markerArr.push(marker);
    }

    //console.log(this.markers[listing.id]);
  }

  updateMarkers(listings: ListingResult[]) {
    //console.log(Object.keys(this.markers), this.markers);
    //console.log(this.markers, this.markerArr);
    let listingObj: { [id: string]: ListingResult } = {};
    listings.forEach((listing) => (listingObj[listing.id] = listing));

    listings
      .filter((listing) => !this.markers[listing.id])
      .forEach((newListing) => this.createMarker(newListing));

    Object.keys(this.markers)
      .filter((listingId) => !listingObj[listingId])
      .forEach((listingId) => this.removeMarker(listingId));

    // Object.keys(this.markers)
    //   .filter((listingId) => !listings.find((l) => l.id === listingId))
    //   .forEach((listingId) => this.removeMarker(listingId));

    // Object.values(listings).forEach((listing) => {
    //   if (!this.markers[listing.id]) {
    //     this.createMarker(listing);
    //   }
    // });
  }

  removeMarker(markerId: string) {
    this.markers[markerId].setMap(null);
    delete this.markers[markerId];
  }
}
