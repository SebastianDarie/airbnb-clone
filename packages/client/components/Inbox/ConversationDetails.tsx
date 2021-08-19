import Link from "next/link";
import {
  HeaderResult,
  useListingLazyQuery,
  useListingQuery,
  useReservationQuery,
} from "@second-gear/controller";
import { DotLoader } from "../DotLoader";

interface ConversationDetailsProps {
  currHeader: HeaderResult;
  details: boolean;
  roomStyles: {
    readonly [key: string]: string;
  };
  styles: {
    readonly [key: string]: string;
  };
}

export const ConversationDetails: React.FC<ConversationDetailsProps> = ({
  currHeader,
  details,
  roomStyles,
  styles,
}) => {
  const {
    data: reservationData,
    loading: reservationLoading,
  } = useReservationQuery({
    skip: !currHeader.reservationId,
    variables: { id: currHeader.reservationId! },
  });
  const id = reservationData?.reservation?.listingId;
  const { data } = useListingQuery({
    skip: !id,
    variables: { id: id!, noreviews: true, slim: false },
  });

  let nights: number = 2;
  if (reservationData?.reservation) {
    nights = Math.ceil(
      Math.abs(
        new Date(reservationData.reservation.departure).getTime() -
          new Date(reservationData.reservation.arrival).getTime()
      ) /
        (60 * 60 * 24 * 1000)
    );
  }

  const total = Math.floor((data?.listing?.price ?? 1) * nights);
  const serviceFee = Math.floor((total / 100) * 17);

  return (
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

          <div className={styles.details__padding}>
            {reservationLoading ? (
              <DotLoader />
            ) : (
              <div>
                <div className={roomStyles.room__section__flex}>
                  <div className={styles.reservation__header}>
                    {reservationData?.reservation?.cancelled ? (
                      <div className={styles.reservation__status}>
                        <span className={styles.cancelled}>Cancelled</span>
                      </div>
                    ) : null}
                    <div className={styles.reservation__header__table}>
                      <div className={styles.header__cell}>
                        <div className={styles.header__firstname}>Darie</div>
                        <div className={styles.header__summary}>
                          {reservationData?.reservation?.guests ?? 2} guests ·{" "}
                          {nights} nights · $
                          {nights * (data?.listing?.price ?? 1)}
                        </div>
                        <div className={styles.header__summary}>
                          Test listing
                        </div>
                      </div>
                      <div className={styles.img__cell}>
                        <Link href="/users/">
                          <a>
                            <img
                              src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
                              className={styles.profile__img}
                              alt="profile image"
                            />
                          </a>
                        </Link>
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
                          Guests
                        </span>
                      </div>
                      <div className={styles.img__cell}>
                        <div className={roomStyles.profile__margin}>
                          <div className={styles.cell__wrap}>
                            <div className={styles.profile__link__font}>
                              {reservationData?.reservation?.guests ?? 2} guests
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
                              {new Date(
                                reservationData?.reservation?.arrival!
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })}
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
                              {new Date(
                                reservationData?.reservation?.departure!
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })}
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
                          Payment Details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={roomStyles.room__section__flex}>
                  <div className={styles.reservation__header__table}>
                    <div className={styles.header__cell}>
                      <span className={styles.profile__link__font}>
                        ${data?.listing?.price ?? 1} x {nights} nights
                      </span>
                    </div>
                    <div className={styles.img__cell}>
                      <div className={roomStyles.profile__margin}>
                        <div className={styles.cell__wrap}>
                          <div className={styles.profile__link__font}>
                            ${total}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={roomStyles.room__section__flex}>
                  <div className={styles.fee__padding}>
                    <div className={styles.reservation__header__table}>
                      <div className={styles.header__cell}>
                        <span className={styles.profile__link__font}>
                          Service fee
                        </span>
                      </div>
                      <div className={styles.img__cell}>
                        <div className={roomStyles.profile__margin}>
                          <div className={styles.cell__wrap}>
                            <div className={styles.profile__link__font}>
                              ${serviceFee}
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
                          Total (USD)
                        </span>
                      </div>
                      <div className={styles.img__cell}>
                        <div className={roomStyles.profile__margin}>
                          <div className={styles.cell__wrap}>
                            <div className={styles.profile__link__font}>
                              ${total + serviceFee}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
