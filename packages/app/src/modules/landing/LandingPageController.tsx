import {FetchResult} from '@apollo/client';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {registerSchema} from '@second-gear/common';
import {RegisterFormProps, RegisterMutation} from '@second-gear/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Button, Card, Colors} from 'react-native-paper';
import {GradientButton} from '../../components/button/GradientBtn';
import {InputField} from '../../components/InputField';
import {AuthStackParamList} from '../../navigation/AuthNavigator';

interface LandingControllerProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'LandingModal'>;
  data: RegisterMutation | null | undefined;
  loading: boolean | undefined;
  submit: (
    values: RegisterFormProps,
    extra?: void | undefined,
  ) => Promise<
    FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>
  >;
}

export const LandingController: React.FC<LandingControllerProps> = ({
  navigation,
  data: registerData,
  loading,
  submit,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<RegisterFormProps>({
    criteriaMode: 'all',
    defaultValues: {confirm: '', email: '', name: '', password: ''},
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  React.useEffect(() => {
    if (registerData?.register.errors) {
      registerData.register.errors.map(err =>
        setError(err.path as 'name' | 'email' | 'password' | 'confirm', {
          type: 'server',
          message: err.message,
        }),
      );
    }
  }, [registerData?.register.errors, setError]);

  const disabled = !isDirty || isSubmitting || !isValid;

  return (
    <Card mode="elevated">
      <Card.Title title="Register" titleStyle={styles.title} />
      <InputField
        control={control}
        errors={errors}
        name="name"
        label="Name"
        mode="outlined"
        placeholder="e.g. Bob"
      />

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

      <InputField
        control={control}
        errors={errors}
        name="confirm"
        label="Confirm Password"
        mode="outlined"
        placeholder="same as above"
        secureTextEntry
      />

      <Card.Actions>
        <View style={styles.loginContainer}>
          {loading || isSubmitting ? (
            <ActivityIndicator animating={true} color={Colors.red800} />
          ) : (
            <>
              <GradientButton
                disabled={disabled}
                onPress={handleSubmit(data => submit(data))}
              />
              <Text style={styles.text}>or</Text>
              <Button onPress={() => navigation.navigate('LoginModal')}>
                Log In
              </Button>
            </>
          )}
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },

  text: {
    color: '#000000',
    fontSize: 18,
  },

  title: {
    fontSize: 25,
    marginBottom: -5,
  },
});
