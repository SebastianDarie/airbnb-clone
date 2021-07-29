import { forgotPasswordSchema } from '@second-gear/common';
import { ForgotPasswordProps } from '@second-gear/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputField } from '../../components/Fields/InputField';
import styles from '../../sass/layout/Form.module.scss';

interface ForgotPasswordViewProps {
  loading?: boolean;
  submit: (values: ForgotPasswordProps) => Promise<boolean>;
}

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
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
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
      />

      <input
        type='submit'
        value='Register'
        className={styles.submit}
        disabled={!isDirty || isSubmitting || !isValid}
      />
    </form>
  );
};
