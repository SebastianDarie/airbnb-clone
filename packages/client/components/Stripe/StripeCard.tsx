import { CreatePaymentIntentMutation } from '@airbnb-clone/controller';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import btnStyles from '../../sass/pages/CreateListing.module.scss';
import { useGradient } from '../../shared-hooks/useGradient';
import styles from './Stripe.module.scss';

interface StripeCardProps {
  clientSecret: CreatePaymentIntentMutation | null | undefined;
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
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#e25950'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#fff'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    <span>Your card number is incomplete.</span>
  </div>
);

export const StripeCard: React.FC<StripeCardProps> = ({
  clientSecret,
  succeeded,
  setSucceeded,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [coords, setCoords] = useGradient();
  //const [succeeded, setSucceeded] = useState<boolean>(false);
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
    }
  };

  return (
    <div
      className={
        processing
          ? styles.stripe__submitting
          : succeeded
          ? styles.stripe__submitted
          : undefined
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

            <button
              className={btnStyles.btn__save}
              onMouseMove={(e) => setCoords(e)}
              type='submit'
              disabled={
                !stripe || !elements || processing || disabled || succeeded
              }
              style={{ borderRadius: 2, height: 45, width: '100%' }}
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
                {processing ? (
                  <div className={styles.processing}></div>
                ) : (
                  'Confirm and Pay'
                )}
              </span>
            </button>
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
