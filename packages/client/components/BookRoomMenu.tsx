import { ArrowDownSvg } from '@airbnb-clone/controller';
import { useState } from 'react';
import styles from '../sass/layout/BookRoomMenu.module.scss';
import btnStyles from '../sass/pages/CreateListing.module.scss';

interface BookRoomMenuProps {
  guests: number;
  price: string;
}

const BookRoomButton: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.menu__dates__flex}>
      <div className={styles.menu__dates__grow}>
        <div className={styles.dates__boder__left}></div>
        <div className={styles.dates__container}>{children}</div>
        <div className={styles.dates__border__right}></div>
      </div>
    </div>
  );
};

export const BookRoomMenu: React.FC<BookRoomMenuProps> = ({
  guests,
  price,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
                  </div>

                  <BookRoomButton>
                    <div className={styles.checkin__container}>
                      <div className={styles.checkin__text}>Check-in</div>
                      <div className={styles.add__date}>Add date</div>
                    </div>
                    <div className={styles.checkout__container}>
                      <div className={styles.checkin__text}>Checkout</div>
                      <div className={styles.add__date}>Add date</div>
                    </div>
                  </BookRoomButton>

                  <BookRoomButton>
                    <label className={styles.guest__label}>
                      <div className={styles.checkin__text}>Guests</div>
                      <div className={styles.guest__btn} role='button'>
                        <span className={styles.guest__span}>
                          {guests} guests
                        </span>
                      </div>
                    </label>
                    <div className={styles.arrow__position}>
                      <ArrowDownSvg />
                    </div>
                  </BookRoomButton>

                  <div className={styles.menu__btn__container}>
                    <button
                      className={btnStyles.btn__save}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        setCoords({ x, y });
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
