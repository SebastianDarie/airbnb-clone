import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '@second-gear/common';
import { ForgotPasswordProps } from '@second-gear/controller';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import styles from '../../sass/layout/Form.module.scss';
import { ForgotPasswordViewProps, InputFieldProps } from '../../types';

const InputField = dynamic<InputFieldProps>(() =>
  import('../../components/Fields/InputField').then((mod) => mod.InputField)
);

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  submit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<ForgotPasswordProps>({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(forgotPasswordSchema as any),
  });

  return (
    <div className={styles.center}>
      <form
        name='forgot-password'
        onSubmit={handleSubmit((data) => submit(data))}
      >
        <InputField
          control={control}
          errors={errors}
          label='E-mail'
          name='email'
          placeholder=' '
          type='email'
        />

        <input
          type='submit'
          value='Reset Password'
          className={styles.submit}
          disabled={!isDirty || isSubmitting || !isValid}
        />
        <br />
      </form>
    </div>
  );
};
