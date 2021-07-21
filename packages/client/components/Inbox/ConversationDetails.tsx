import Link from 'next/link';

interface ConversationDetailsProps {
  details: boolean;
  roomStyles: {
    readonly [key: string]: string;
  };
  styles: {
    readonly [key: string]: string;
  };
}

// interface ReservationDetail {
//   divider: boolean;
//   option: string;
//   value: string;
// }

// type Props = ConversationDetailsProps & ReservationDetail;

// const ReservationDetail: React.FC<Props> = ({
//   divider,
//   option,
//   value,
//   roomStyles,
//   styles,
// }) => {
//   return (
//     <div className={roomStyles.room__section__flex}>
//       {divider ? <div className={roomStyles.section__divider}></div> : null}
//       <div className={styles.item__padding}>
//         <div className={styles.reservation__header__table}>
//           <div className={styles.header__cell}>
//             <span className={styles.profile__link__font}>{option}</span>
//           </div>
//           <div className={styles.img__cell}>
//             <div className={roomStyles.profile__margin}>
//               <div className={styles.cell__wrap}>
//                 <div className={styles.profile__link__font}>{value}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const ConversationDetails: React.FC<ConversationDetailsProps> = ({
  details,
  roomStyles,
  styles,
}) => {
  return (
    // <div className={styles.reservation__position}>
    <div
      className={
        details
          ? styles.conversation__list__panel__transition
          : styles.conversation__details__empty
      }
    >
      <div className={styles.conversation__list__position}>
        <section className={styles.message__content__grow}>
          <div className={styles.message__thread__toolbar}>
            <div className={styles.messages__header}>
              <h2 className={roomStyles.section__heading}>Details</h2>
            </div>
          </div>
          {/* <div className={styles.reservation__details__margin}>
            <div className={styles.reservation__control__padding}>
              <div className={styles.reservation__details__text}>
                Reservation details
              </div>
            </div>
          </div> */}

          <div className={styles.details__padding}>
            <div>
              <div className={roomStyles.room__section__flex}>
                <div className={styles.reservation__header}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <div className={styles.header__firstname}>Darie</div>
                      <div className={styles.header__summary}>
                        1 guest · 7 nights · $14.46
                      </div>
                      <div className={styles.header__summary}>Test listing</div>
                    </div>
                    <div className={styles.img__cell}>
                      <Link href='/users/'>
                        <a>
                          <img
                            src='https://a0.muscache.com/defaults/user_pic-225x225.png?v=3'
                            className={styles.profile__img}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}></div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.user__profile__padding}>
                  <div className={styles.profile__item__margin}>
                    <div className={styles.reservation__header__table}></div>
                  </div>
                  <div className={styles.profile__item__margin}>
                    <div className={styles.reservation__header__table}></div>
                  </div>
                  <div className={styles.profile__item__margin}>
                    <div className={styles.reservation__header__table}></div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.amenities__heading__padding}>
                  <div className={styles.profile__link__font}>
                    <Link href=''>
                      <a className={styles.profile__link}></a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <ReservationDetail
              divider
              option='Guests'
              value='1 guest'
              styles={styles}
              roomStyles={roomsStyles}
            /> */}

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.item__padding}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <span className={styles.profile__link__font}>Guests</span>
                    </div>
                    <div className={styles.img__cell}>
                      <div className={roomStyles.profile__margin}>
                        <div className={styles.cell__wrap}>
                          <div className={styles.profile__link__font}>
                            1 adult
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.item__padding}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <span className={styles.profile__link__font}>
                        Check-in
                      </span>
                    </div>
                    <div className={styles.img__cell}>
                      <div className={roomStyles.profile__margin}>
                        <div className={styles.cell__wrap}>
                          <div className={styles.profile__link__font}>
                            Tue,Jul 13,2021
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.item__padding}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <span className={styles.profile__link__font}>
                        Check-out
                      </span>
                    </div>
                    <div className={styles.img__cell}>
                      <div className={roomStyles.profile__margin}>
                        <div className={styles.cell__wrap}>
                          <div className={styles.profile__link__font}>
                            Tue,Jul 20,2021
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.potential__earnings__padding}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <div className={styles.potential__earnings}>
                        Potential earnings
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={styles.reservation__header__table}>
                  <div className={styles.header__cell}>
                    <span className={styles.profile__link__font}>
                      $2.14 x 7 nights
                    </span>
                  </div>
                  <div className={styles.img__cell}>
                    <div className={roomStyles.profile__margin}>
                      <div className={styles.cell__wrap}>
                        <div className={styles.profile__link__font}>$15.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={styles.reservation__header__table}>
                  <div className={styles.header__cell}>
                    <span className={styles.profile__link__font}>
                      Service fee (host)
                    </span>
                  </div>
                  <div className={styles.img__cell}>
                    <div className={roomStyles.profile__margin}>
                      <div className={styles.cell__wrap}>
                        <div className={styles.profile__link__font}>-$0.54</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={roomStyles.room__section__flex}>
                <div className={roomStyles.section__divider}></div>
                <div className={styles.item__padding}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <span className={styles.profile__link__font}>
                        Total (USD)
                      </span>
                    </div>
                    <div className={styles.img__cell}>
                      <div className={roomStyles.profile__margin}>
                        <div className={styles.cell__wrap}>
                          <div className={styles.profile__link__font}>
                            $14.46
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    //  </div>
  );
};
