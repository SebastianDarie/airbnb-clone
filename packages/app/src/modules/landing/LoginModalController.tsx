import {FetchResult} from '@apollo/client';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '@second-gear/common';
import {AuthFormProps, LoginMutation} from '@second-gear/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GradientButton} from '../../components/button/GradientBtn';
import {InputField} from '../../components/InputField';

interface LoginModalProps {
  data: LoginMutation | null | undefined;
  loading: boolean | undefined;
  submit: (
    values: AuthFormProps,
    extra?: void | undefined,
  ) => Promise<
    FetchResult<LoginMutation, Record<string, any>, Record<string, any>>
  >;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  data: loginData,
  loading,
  submit,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isDirty, isSubmitting, isValid},
  } = useForm<AuthFormProps>({
    criteriaMode: 'all',
    defaultValues: {email: '', password: ''},
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  React.useEffect(() => {
    if (loginData?.login.errors) {
      loginData.login.errors.map(err =>
        setError(err.path as 'email' | 'password', {
          type: 'server',
          message: err.message,
        }),
      );
    }
  }, [loginData?.login.errors, setError]);

  const disabled = !isDirty || isSubmitting || !isValid;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Card mode="outlined">
        <Card.Title title="Login" titleStyle={styles.title} />
        <InputField
          control={control}
          errors={errors}
          name="email"
          label="E-mail"
          mode="outlined"
          placeholder="e.g. bob@bob.com"
        />

        <InputField
          control={control}
          errors={errors}
          name="password"
          label="Password"
          mode="outlined"
          placeholder="e.g. booga ooga"
          secureTextEntry
        />

        <Card.Actions>
          <View style={styles.loginContainer}>
            {loading || isSubmitting ? (
              <ActivityIndicator animating={true} color={Colors.red800} />
            ) : (
              <GradientButton
                disabled={disabled}
                onPress={handleSubmit(data => submit(data))}
              />
            )}
          </View>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },

  title: {
    fontSize: 25,
    marginBottom: -5,
  },
});
