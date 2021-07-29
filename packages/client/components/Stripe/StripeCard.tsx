import {
  CreatePaymentIntentMutation,
  ErrorSvg,
  ListingResult,
  useCreateHeaderMutation,
  useCreateMessageMutation,
  useCreateReservationMutation,
} from '@second-gear/controller';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { GradientBtn } from '../GradientBtn';
import styles from './Stripe.module.scss';

interface StripeCardProps {
  clientSecret: CreatePaymentIntentMutation | null | undefined;
  dates: [Date, Date];
  guests: number;
  listing: ListingResult | undefined;
  message: string;
  succeeded: boolean;
  setSucceeded: Dispatch<SetStateAction<boolean>>;
}

const CARD_OPTIONS = {
  hidePostalCode: true,
  iconStyle: 'solid' as 'solid' | 'default' | undefined,
  style: {
    base: {
      color: '#32325d',
      fontWeight: 500,
      fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#32325d',
      },
      '::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      iconColor: '#E25950',
      color: '#E25950',
    },
  },
};

const ErrorMessage = ({ error }: { error: string }) => (
  <div
    className={`${styles.error__message} ${error ? styles.visible : ''}`}
    role='alert'
  >
    <ErrorSvg />
    <span>Your card number is incomplete.</span>
  </div>
);

export const StripeCard: React.FC<StripeCardProps> = ({
  clientSecret,
  dates,
  guests,
  listing,
  message,
  succeeded,
  setSucceeded,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createReservation] = useCreateReservationMutation();
  const [createHeader] = useCreateHeaderMutation();
  const [createMessage] = useCreateMessageMutation();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit:
    | React.FormEventHandler<HTMLFormElement>
    | undefined = async (
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.confirmCardPayment(
      clientSecret?.createPaymentIntent!,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      if (listing) {
        const { data: reservationData } = await createReservation({
          variables: {
            input: {
              arrival: dates[0],
              departure: dates[1],
              guests,
              listingId: listing.id,
              paymentIntent: payload.paymentIntent.id,
            },
          },
        });

        const { data: headerData } = await createHeader({
          variables: {
            input: {
              listingId: listing.id,
              reservationId: reservationData?.createReservation.id,
              subject: 'Reservation',
              toId: listing.creator.id,
            },
          },
        });

        if (headerData) {
          createMessage({
            variables: {
              input: {
                headerId: headerData.createHeader.id,
                isFromSender: 1,
                text: message,
              },
            },
          });
        }
      }
    }
  };

  return (
    <div
      className={
        processing
          ? styles.stripe__submitting
          : succeeded
          ? styles.stripe__submitted
          : styles.stripe__align
      }
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        style={{ display: processing || succeeded ? 'none' : '' }}
      >
        <fieldset className={styles.form__group}>
          <legend className={styles.form__legend}>Pay with card</legend>
          <legend className={styles.form__legend} style={{ display: 'none' }}>
            Or enter your card details
          </legend>
          <div className={styles.container}>
            <CardElement
              id={styles.card}
              options={CARD_OPTIONS}
              onChange={handleChange}
            />

            <GradientBtn
              type='submit'
              disabled={
                !stripe || !elements || processing || disabled || succeeded
              }
              text={
                processing ? (
                  <div className={styles.processing}></div>
                ) : (
                  'Request to book'
                )
              }
              style={{ borderRadius: 2, height: 45, width: '100%' }}
            />
          </div>
        </fieldset>
        {error && <ErrorMessage error={error} />}
      </form>

      <div className={styles.success}>
        <div className={styles.success__icon}>
          <svg
            width='84px'
            height='84px'
            viewBox='0 0 84 84'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              className={styles.success__circle}
              cx='42'
              cy='42'
              r='40'
              strokeLinecap='round'
              strokeWidth='4'
              stroke='#000'
              fill='none'
            ></circle>
            <path
              className={styles.success__checkmark}
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338'
              strokeWidth='4'
              stroke='#000'
              fill='none'
            ></path>
          </svg>
        </div>

        <h3 className={styles.success__title}>Payment successful</h3>
      </div>
    </div>
  );
};
