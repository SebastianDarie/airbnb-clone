import { ActiveElement, BigSearchSvg, ClearSvg } from "@second-gear/controller";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import shallow from "zustand/shallow";
import useOnclickOutside from "react-cool-onclickoutside";
import SearchStore from "../../stores/useSearchStore";
import { GuestsMenu } from "./GuestsMenu";
import styles from "../../sass/components/Searchbar.module.scss";

import "@reach/combobox/styles.css";

interface SearchbarProps {
  isLoaded: boolean;
  scrolled: boolean;
}

const PlacesAutocomplete = ({
  setLocation,
}: {
  setLocation: (
    s: string,
    lat: number,
    lng: number,
    bounds: google.maps.LatLngBounds
  ) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const res = await getGeocode({ address });
      const { lat, lng } = await getLatLng(res[0]);
      setLocation(res[0].formatted_address, lat, lng, res[0].geometry.bounds);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Combobox aria-label="search for place" onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      <ComboboxPopover style={{ zIndex: 999 }}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export const Searchbar: React.FC<SearchbarProps> = ({ isLoaded, scrolled }) => {
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    active: false,
    el: "",
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const geoRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setActiveElement({
      active: false,
      el: "",
    });
  };

  const ref = useOnclickOutside(handleClickOutside);

  const [adults, children, infants] = SearchStore.useSearchStore(
    (state) => [state.adults, state.children, state.infants],
    shallow
  );

  const barScroll = scrolled ? styles.scroll : styles.Searchbar;
  const barActive = activeElement.active ? styles.active : "";

  return (
    <div className={`${barScroll} ${barActive}`} ref={ref}>
      <div className={styles.container}>
        <div className={styles.part1}>
          <div
            className={styles.part1__container}
            onClick={() => setActiveElement({ active: true, el: "searchbar" })}
          >
            <label className={styles.location}>
              <div className={styles.location__position} id="location_box">
                <div className={styles.location__label}>Location</div>
                {isLoaded ? (
                  <PlacesAutocomplete setLocation={SearchStore.setLocation} />
                ) : null}
              </div>
            </label>
          </div>

          <div id="output" style={{ visibility: "hidden" }} ref={geoRef}></div>
        </div>

        <div
          className={styles.vline}
          style={{
            visibility:
              activeElement.el === "searchbar" || activeElement.el === "checkin"
                ? "hidden"
                : "visible",
          }}
        ></div>

        <div className={styles.part2__container}>
          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: "checkin" })}
          >
            <button className={styles.btn} type="button">
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check in</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </button>
          </div>

          <div
            className={styles.vline}
            style={{
              visibility:
                activeElement.el === "checkin" ||
                activeElement.el === "checkout"
                  ? "hidden"
                  : "visible",
            }}
          ></div>

          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: "checkout" })}
          >
            <button className={styles.btn} type="button">
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check out</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={styles.vline}
          style={{
            visibility:
              activeElement.el === "checkout" || activeElement.el === "guests"
                ? "hidden"
                : "visible",
          }}
        ></div>

        <div className={styles.part3__container} ref={searchRef}>
          <button
            className={
              activeElement.el === "guests" && activeElement.active
                ? styles.btn__clicked
                : styles.btn
            }
            type="button"
            onClick={() => setActiveElement({ active: true, el: "guests" })}
          >
            <div className={styles.text__container}>
              <div className={styles.text__bold}>Guests</div>
              {adults || children || infants > 0 ? (
                <div className={styles.text__guests}>
                  {adults + children} guests
                  {infants ? ", " + infants + " infants" : null}
                </div>
              ) : (
                <div className={styles.text__gray}>Add guests</div>
              )}
            </div>
          </button>

          {adults || children || infants > 0 ? (
            <div className={styles.clear__container}>
              <div className={styles.clearbtn__container}>
                <button
                  className={styles.clear__btn}
                  onClick={SearchStore.resetGuests}
                >
                  <span style={{ position: "relative" }}>
                    <ClearSvg />
                  </span>
                </button>
              </div>
            </div>
          ) : null}

          <GuestsMenu activeElement={activeElement} menuRef={menuRef} />

          <div className={styles.icon__btn__container}>
            <Link href="/search">
              <button
                className={
                  activeElement.el === "guests" && activeElement.active
                    ? styles.icon__btn__active
                    : styles.icon__btn
                }
              >
                <div className={styles.inner__icon__container}>
                  <BigSearchSvg />

                  <div
                    className={
                      activeElement.el === "guests" && activeElement.active
                        ? styles.hidden__text__active
                        : styles.hidden__text
                    }
                  >
                    Search
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
