import { paymentSchema } from '@airbnb-clone/common';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { BaseSyntheticEvent, InputHTMLAttributes } from 'react';
import { useGradient } from '../../shared-hooks/useGradient';
import styles from './Stripe.module.scss';
import btnStyles from '../../sass/pages/CreateListing.module.scss';
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreatePaymentIntentMutation } from '@airbnb-clone/controller';

interface StripeCardProps {
  clientSecret: CreatePaymentIntentMutation | null | undefined;
}

const CARD_OPTIONS = {
  iconStyle: 'solid' as 'solid' | 'default' | undefined,
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

type PayInput = {
  name: string;
  email: string;
  phone: string;
};

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  register: any;
  name: string;
  id: string;
  label: string;
};

const Field: React.FC<FieldProps> = ({
  register,
  name,
  id,
  label,
  ...rest
}) => (
  <div className={styles.form__row}>
    <label htmlFor={id} className={styles.form__row__label}>
      {label}
    </label>
    <input className={styles.form__row__input} {...register(name)} {...rest} />
  </div>
);

const SubmitButton: React.FC<{
  processing: boolean;
  error: any;
  disabled: boolean;
}> = ({ processing, error, children, disabled }) => (
  <button
    className={`${styles.submit__button} ${
      error ? `${styles.submit__button__error}` : ''
    }`}
    type='submit'
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage: React.FC<{}> = ({ children }) => (
  <div className={styles.error__message} role='alert'>
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#FFF'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#6772e5'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    {children}
  </div>
);

const ResetButton = (reset: UseFormReset<PayInput>) => (
  <button type='button' className='ResetButton' onClick={() => reset()}>
    <svg width='32px' height='32px' viewBox='0 0 32 32'>
      <path
        fill='#FFF'
        d='M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z'
      />
    </svg>
  </button>
);

export const StripeCard: React.FC<StripeCardProps> = ({ clientSecret }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<PayInput>({
    defaultValues: { email: '', name: '', phone: '' },
    mode: 'onChange',
    resolver: yupResolver(paymentSchema),
  });
  const stripe = useStripe();
  const elements = useElements();
  const [coords, setCoords] = useGradient();
  // const [cardComplete, setCardComplete] = useState(false);
  // const [processing, setProcessing] = useState(false);

  const onSubmit: SubmitHandler<PayInput> = async (
    data,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    console.log(data);

    if (!stripe || !elements) {
      return;
    }

    if (errors) {
      elements.getElement('card')?.focus();
      return;
    }

    // if (cardComplete) {
    //   setProcessing(true);
    // }

    const payload = await stripe.confirmCardPayment(
      clientSecret?.createPaymentIntent!,
      {
        payment_method: {
          billing_details: getValues(),
          card: elements.getElement(CardElement)!,
        },
      }
    );

    //setProcessing(false);

    if (payload.error) {
      //setError();
      console.log(payload.error);
    } else {
      //  setPaymentMethod(payload.paymentMethod);
      console.log(payload.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='FormGroup'>
        <Field
          label='Name'
          id='name'
          name='name'
          type='text'
          placeholder='Jane Doe'
          required
          autoComplete='name'
          register={register}
        />
        <Field
          label='Email'
          id='email'
          name='email'
          type='email'
          placeholder='janedoe@gmail.com'
          required
          autoComplete='email'
          register={register}
        />
        <Field
          label='Phone'
          id='phone'
          name='phone'
          type='tel'
          placeholder='(941) 555-0123'
          required
          autoComplete='tel'
          register={register}
        />
      </fieldset>
      <div className={styles.form__row}>
        <CardElement options={CARD_OPTIONS} />
      </div>
      {/* {errors && <ErrorMessage>{errors.email}</ErrorMessage>}
      <SubmitButton processing={false} error={false} disabled={!stripe}>
        Pay $25
      </SubmitButton> */}
      <button
        className={btnStyles.btn__save}
        onMouseMove={(e) => setCoords(e)}
        type='submit'
        disabled={!stripe || !elements}
      >
        <span className={btnStyles.absolute__span}>
          <span
            className={btnStyles.radial__span}
            style={{
              backgroundPosition: `calc((100 - ${coords.x}) * 1%) calc((100 - ${coords.y}) * 1%)`,
            }}
          ></span>
        </span>
        <span className={btnStyles.text__span}>Confirm and Pay</span>
      </button>
    </form>
  );
};
