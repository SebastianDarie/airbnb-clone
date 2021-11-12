import { SearchListingResult } from "@second-gear/controller";
import MarkerWithLabel from "@googlemaps/markerwithlabel";
import { Dispatch, SetStateAction } from "react";

export default class MarkerManager {
  map: google.maps.Map;
  markers: { [id: string]: MarkerWithLabel };

  constructor(map: google.maps.Map) {
    this.map = map;
    this.markers = {};
  }

  createMarker(
    listing: SearchListingResult,
    setSelected: Dispatch<SetStateAction<MarkerWithLabel | null>>
  ) {
    const position = new google.maps.LatLng(
      listing.latitude,
      listing.longitude
    );

    const marker = new MarkerWithLabel({
      position,
      animation: google.maps.Animation.DROP,
      clickable: true,
      draggable: false,
      map: this.map,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
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

    marker.setValues({ id: listing.id });
    marker.addListener("click", () => setSelected(marker));

    this.markers[listing.id] = marker;
  }

  updateMarkers(
    listings: SearchListingResult[],
    setSelected: Dispatch<SetStateAction<MarkerWithLabel | null>>
  ) {
    Object.keys(this.markers)
      .filter((listingId) => !listings.find((l) => l.id === listingId))
      .forEach((listingId) => this.removeMarker(listingId));

    Object.values(listings).forEach((listing) => {
      if (!this.markers[listing.id]) {
        this.createMarker(listing, setSelected);
      }
    });
  }

  removeMarker(markerId: string) {
    this.markers[markerId].setMap(null);
    delete this.markers[markerId];
  }
}
