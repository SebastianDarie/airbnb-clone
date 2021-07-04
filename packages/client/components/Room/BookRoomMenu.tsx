import { ArrowDownSvg, ArrowUpSvg, ReviewSvg } from '@airbnb-clone/controller';
import { useCallback, useRef, useState } from 'react';
import styles from './BookRoomMenu.module.scss';
import btnStyles from '../../sass/pages/CreateListing.module.scss';
import useClickAway, { useClickOutside } from '../../shared-hooks/useClickAway';
import { GuestPicker } from './GuestPicker';
import { useGradient } from '../../shared-hooks/useGradient';

interface BookRoomMenuProps {
  dates: string[];
  guests: number;
  price: string;
}

export const BookRoomMenu: React.FC<BookRoomMenuProps> = ({
  dates,
  guests,
  price,
}) => {
  const [coords, setCoords] = useGradient();
  const [active, setActive] = useState<boolean>(false);
  const picker = useRef<HTMLDivElement | null>(null);
  // const handler = () => {
  //   useCallback(() => {
  //     () => setActive(false);
  //   }, [setActive]);
  // };
  useClickAway(picker, () => setActive(false));
  const handleMouseDown = useClickOutside(
    useCallback(() => {
      () => setActive(false);
    }, [setActive])
  );

  return (
    <div className={styles.booking__side}>
      <div className={styles.sticky__menu}>
        <div className={styles.room__section__flex}>
          <div className={styles.menu__topmargin}>
            <div className={styles.menu__border}>
              <div className={styles.menu__text__style}>
                <div className={styles.menu__column}>
                  <div className={styles.menu__price__container}>
                    <div className={styles.menu__price__flex}>
                      <div className={styles.menu__price__align}>
                        <span className={styles.price__span}>{price}</span>
                        <span className={styles.night__span}>/ night</span>
                      </div>
                    </div>

                    <div className={styles.menu__rating__margin}>
                      <div className={styles.menu__rating__flex}>
                        <span className={styles.review__svg}>
                          <ReviewSvg />
                        </span>
                        <span className={styles.rating}>5.0</span>
                        <span className={styles.invisible__span}></span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.menu__dates__container}>
                    <div className={styles.menu__dates__border}>
                      <div className={styles.menu__dates__flex}>
                        <div className={styles.menu__dates__relative}>
                          <div className={styles.menu__dates__grow}>
                            <div className={styles.dates__border__left}></div>
                            <div className={styles.dates__container}>
                              <div
                                className={styles.checkin__container}
                                onClick={() => console.log('date')}
                              >
                                <div className={styles.checkin__text}>
                                  Check-in
                                </div>
                                <div className={styles.add__date}>
                                  {dates[0]}
                                </div>
                              </div>
                              <div className={styles.checkout__container}>
                                <div className={styles.checkin__text}>
                                  Checkout
                                </div>
                                <div className={styles.add__date}>
                                  {dates[1]}
                                </div>
                              </div>
                            </div>

                            <div className={styles.dates__border__right}></div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.menu__dates__flex}>
                        <div className={styles.menu__dates__relative}>
                          <div className={styles.menu__dates__grow}>
                            <div
                              className={styles.dates__border__left}
                              style={{ borderRadius: '0px 0px 8px 8px' }}
                            ></div>
                            <div
                              className={styles.dates__container}
                              ref={picker}
                              onClick={() => setActive(true)}
                              //onMouseDownCapture={handleMouseDown}
                            >
                              <label className={styles.guest__label}>
                                <div className={styles.checkin__text}>
                                  Guests
                                </div>
                                <div className={styles.guest__btn}>
                                  <span className={styles.guest__span}>
                                    {guests} guests
                                  </span>
                                </div>
                              </label>
                              <div className={styles.arrow__position}>
                                {active ? <ArrowUpSvg /> : <ArrowDownSvg />}
                              </div>
                            </div>
                            <div
                              className={styles.dates__border__right}
                              style={{ borderRadius: '0px 0px 8px 8px' }}
                            ></div>
                          </div>

                          <div>
                            <GuestPicker
                              active={active}
                              guests={guests}
                              picker={picker}
                              styles={styles}
                              handler={handleMouseDown}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.menu__btn__container}>
                    <button
                      className={btnStyles.btn__save}
                      id={styles.btn__save}
                      onMouseMove={(e) => setCoords(e)}
                    >
                      <span className={btnStyles.absolute__span}>
                        <span
                          className={btnStyles.radial__span}
                          style={{
                            backgroundPosition: `calc((100 - ${coords.x}) * 1%) calc((100 - ${coords.y}) * 1%)`,
                          }}
                        ></span>
                      </span>
                      <span className={btnStyles.text__span}>
                        Check Availability
                      </span>
                    </button>
                  </div>
                </div>

                <ul></ul>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
