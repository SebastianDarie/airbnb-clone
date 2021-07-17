interface markerProps {
  html: string;
  map: google.maps.Map<Element>;
  position: google.maps.LatLng;
  OverlayView?: typeof google.maps.OverlayView;
}

const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  position,
  html,
  map,
}: markerProps) => {
  class HTMLMapMarker extends OverlayView {
    map!: google.maps.Map<Element>;
    position: google.maps.LatLng;
    html: string;
    div!: HTMLDivElement;

    constructor() {
      super();
      this.position = position;
      this.html = html;
      //this.setMap(map);
    }

    onAdd() {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      if (this.html) {
        this.div.innerHTML = this.html;
      }

      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.div);
      // google.maps.event.addDomListener(this.div, 'click', () => {
      //   google.maps.event.trigger(this, 'click');
      // });
    }

    // appendDivToOverlay() {
    //   const panes = this.getPanes();
    //   panes.overlayLayer.appendChild(this.div);
    // }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.position);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - offset}px`;
        this.div.style.top = `${point.y - offset}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.onAdd();
        //  this.appendDivToOverlay();
      }
      //  this.positionDiv();
      const point = this.getProjection().fromLatLngToDivPixel(this.position);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - offset}px`;
        this.div.style.top = `${point.y - offset}px`;
      }
    }

    onRemove() {
      if (this.div) {
        this.div.parentNode?.removeChild(this.div);
        //delete this.div
      }
    }

    getPosition() {
      return this.position;
    }

    getDraggable() {
      return false;
    }
  }

  return new HTMLMapMarker();
};

export default createHTMLMapMarker;
