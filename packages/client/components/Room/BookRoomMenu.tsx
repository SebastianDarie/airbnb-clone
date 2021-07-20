import { ArrowDownSvg, ArrowUpSvg, ReviewSvg } from '@airbnb-clone/controller';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import btnStyles from '../../sass/pages/CreateListing.module.scss';
import { useGradient } from '../../shared-hooks/useGradient';
import styles from './BookRoomMenu.module.scss';
import { GuestPicker } from './GuestPicker';

interface BookRoomMenuProps {
  id: string;
  dates: Date[];
  currGuests: number;
  maxGuests: number;
  nights: number;
  price: number;
  roomStyles: {
    readonly [key: string]: string;
  };
}

export const BookRoomMenu: React.FC<BookRoomMenuProps> = ({
  id,
  dates,
  currGuests,
  maxGuests,
  nights,
  price,
  roomStyles,
}) => {
  const router = useRouter();
  const [coords, setCoords] = useGradient();
  const [active, setActive] = useState<boolean>(false);
  const ref = useOnclickOutside(() => {
    setActive(false);
  });

  const currency = '$';
  const prePrice = price * nights;
  const serviceFee = Math.floor((price / 100) * 17);
  const isDate = dates[0] && dates[1] !== null;

  return (
    <div className={roomStyles.booking__side}>
      <div className={roomStyles.sticky__menu}>
        <div className={roomStyles.menu__padding}>
          <div className={roomStyles.room__section__flex}>
            <div className={styles.menu__topmargin}>
              <div className={styles.menu__border}>
                <div className={styles.menu__text__style}>
                  <div className={styles.menu__column}>
                    <div className={styles.menu__price__container}>
                      <div className={styles.menu__price__flex}>
                        <div className={styles.menu__price__align}>
                          <span className={styles.price__span}>
                            {currency + price}
                          </span>
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
                                    {isDate
                                      ? dates[0].toLocaleDateString('en-GB')
                                      : 'Add date'}
                                  </div>
                                </div>
                                <div className={styles.checkout__container}>
                                  <div className={styles.checkin__text}>
                                    Checkout
                                  </div>
                                  <div className={styles.add__date}>
                                    {isDate
                                      ? dates[1].toLocaleDateString('en-GB')
                                      : 'Add date'}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={styles.dates__border__right}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.menu__dates__flex}>
                          <div className={styles.menu__dates__relative}>
                            <div className={styles.menu__dates__grow} ref={ref}>
                              <div
                                className={styles.dates__border__left}
                                style={{ borderRadius: '0px 0px 8px 8px' }}
                              ></div>
                              <div
                                className={styles.dates__container}
                                onClick={() => setActive(!active)}
                              >
                                <label className={styles.guest__label}>
                                  <div className={styles.checkin__text}>
                                    Guests
                                  </div>
                                  <div className={styles.guest__btn}>
                                    <span className={styles.guest__span}>
                                      {currGuests ? currGuests : 0} guests
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
                                guests={maxGuests}
                                menu={ref}
                                styles={styles}
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
                        onClick={() => {
                          if (isDate && currGuests) {
                            router.push(`/book/${id}`);
                          }
                        }}
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
                          {isDate ? 'Reserve' : 'Check Availability'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {isDate ? (
                    <>
                      {' '}
                      <ul className={styles.nocharge__font}>
                        <li className={styles.nocharge__li}>
                          You won't be charged yet
                        </li>
                      </ul>
                      <div className={styles.total__margin}>
                        <div className={styles.menu__text__style}>
                          <div className={styles.pre__price__container}>
                            <div className={styles.price__flex}>
                              <span className={styles.nights__order}>
                                {currency + price} x {nights} nights
                              </span>
                              <span className={styles.price__order}>
                                {currency + prePrice}
                              </span>
                            </div>
                            <div className={styles.price__flex}>
                              <span className={styles.nights__order}>
                                Service fee
                              </span>
                              <span className={styles.price__order}>
                                {currency + serviceFee}
                              </span>
                            </div>
                          </div>

                          <div className={styles.total__price__container}>
                            <span className={styles.nights__order}>Total</span>
                            <span className={styles.price__order}>
                              {currency + (prePrice + serviceFee)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
