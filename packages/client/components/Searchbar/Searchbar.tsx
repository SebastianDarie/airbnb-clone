import {
  ActiveElement,
  BigSearchSvg,
  ClearSvg,
} from '@airbnb-clone/controller';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import shallow from 'zustand/shallow';
import styles from '../../sass/components/Searchbar.module.scss';
import useClickAway from '../../shared-hooks/useClickAway';
import { useSearchStore } from '../../stores/useSearchStore';
import { GuestsMenu } from './GuestsMenu';

interface SearchbarProps {
  scrolled: boolean;
}

export const Searchbar: React.FC<SearchbarProps> = ({ scrolled }) => {
  const router = useRouter();
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    active: false,
    el: '',
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setActiveElement({
      active: false,
      el: '',
    });
  };

  useClickAway(ref, handleClickOutside);

  const barScroll = scrolled ? styles.scroll : styles.Searchbar;
  const barActive = activeElement.active ? styles.active : '';

  const [adults, children, infants] = useSearchStore(
    (state) => [state.adults, state.children, state.infants],
    shallow
  );

  // if (typeof window !== 'undefined') {
  //   function loadMapScenario() {
  //     window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
  //       callback: onLoad,
  //       errorCallback: onError,
  //     });
  //     function onLoad() {
  //       const options = { maxResults: 5 };
  //       const manager = new Microsoft.Maps.AutosuggestManager(options);
  //       manager.attachAutosuggest(
  //         '#location',
  //         '#location_box',
  //         selectedSuggestion
  //       );
  //     }
  //     function onError(message: any) {
  //       //document.getElementById('printoutPanel').innerHTML = message;
  //       console.log(message);
  //     }
  //     function selectedSuggestion(suggestionResult: {
  //       formattedSuggestion: string;
  //       location: { latitude: string; longitude: string };
  //     }) {
  //       // document.getElementById('printoutPanel').innerHTML =
  //       //   'Suggestion: ' +
  //       //   suggestionResult.formattedSuggestion +
  //       //   '<br> Lat: ' +
  //       //   suggestionResult.location.latitude +
  //       //   '<br> Lon: ' +
  //       //   suggestionResult.location.longitude;
  //       console.log(suggestionResult);
  //     }
  //   }

  //   loadMapScenario();
  // }

  return (
    <div className={`${barScroll} ${barActive}`} ref={ref}>
      <div className={styles.container}>
        <div className={styles.part1}>
          <div
            className={styles.part1__container}
            onClick={() => setActiveElement({ active: true, el: 'searchbar' })}
          >
            <label className={styles.location}>
              <div className={styles.location__position} id='location_box'>
                <div className={styles.location__label}>Location</div>
                {/* Switch to react hook form */}
                <input
                  className={styles.location__input}
                  id='location'
                  aria-expanded='false'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck='false'
                  placeholder='Where are you going?'
                />
              </div>
            </label>
          </div>
        </div>

        <div className={styles.vline}></div>

        <div className={styles.part2__container}>
          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkin' })}
          >
            <div className={styles.btn} role='button'>
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check in</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </div>
          </div>

          <div className={styles.vline}></div>

          <div
            className={styles.part2__checkin}
            onClick={() => setActiveElement({ active: true, el: 'checkout' })}
          >
            <div className={styles.btn} role='button'>
              <div className={styles.text__container}>
                <div className={styles.text__bold}>Check out</div>
                <div className={styles.text__gray}>Add dates</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.vline}></div>

        <div className={styles.part3__container} ref={searchRef}>
          <div
            className={
              activeElement.el === 'guests' && activeElement.active
                ? styles.btn__clicked
                : styles.btn
            }
            onClick={() => setActiveElement({ active: true, el: 'guests' })}
            role='button'
          >
            <div className={styles.text__container}>
              <div className={styles.text__bold}>Guests</div>
              {adults || children || infants > 0 ? (
                <div className={styles.text__guests}>
                  {adults + children} guests
                  {infants ? ', ' + infants + ' infants' : null}
                </div>
              ) : (
                <div className={styles.text__gray}>Add guests</div>
              )}
            </div>
          </div>

          {adults || children || infants > 0 ? (
            <div className={styles.clear__container}>
              <div className={styles.clearbtn__container}>
                <button
                  className={styles.clear__btn}
                  onClick={useSearchStore.getState().resetGuests}
                >
                  <span style={{ position: 'relative' }}>
                    <ClearSvg />
                  </span>
                </button>
              </div>
            </div>
          ) : null}

          <GuestsMenu activeElement={activeElement} menuRef={menuRef} />

          <div className={styles.icon__btn__container}>
            <button
              className={
                activeElement.el === 'guests' && activeElement.active
                  ? styles.icon__btn__active
                  : styles.icon__btn
              }
              onClick={() => {
                router.push('/search');
              }}
            >
              <div className={styles.inner__icon__container}>
                <BigSearchSvg />

                <div
                  className={
                    activeElement.el === 'guests' && activeElement.active
                      ? styles.hidden__text__active
                      : styles.hidden__text
                  }
                >
                  Search
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
