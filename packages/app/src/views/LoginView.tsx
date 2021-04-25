import {FormProps, LoginMutation} from '@airbnb-clone/controller';
import React from 'react';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../components/InputField';

interface LoginViewProps {
  control: Control<FormProps>;
  errors: DeepMap<FormProps, FieldError>;
  isSubmitting: boolean;
  submit: (values: FormProps) => Promise<LoginMutation | null | undefined>;
}

export const LoginView: React.FC<LoginViewProps> = ({
  control,
  errors,
  isSubmitting,
  submit,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          <Card.Title
            title="Login"
            // eslint-disable-next-line react-native/no-inline-styles
            titleStyle={{fontSize: 25, marginBottom: -5}}
          />
          <InputField
            control={control}
            errors={errors}
            name="email"
            rules={{
              pattern: {
                message: 'The email address is invalid.',
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
              required: 'The email is required',
              maxLength: {message: 'You have reached the maximum', value: 255},
            }}
            label="E-mail"
            mode="outlined"
            placeholder="e.g. bob@bob.com"
          />

          <InputField
            control={control}
            errors={errors}
            name="password"
            rules={{
              required: 'The password is required',
              maxLength: {
                message: 'It can not be longer than this',
                value: 256,
              },
              minLength: {message: 'That is too short', value: 3},
            }}
            label="Password"
            mode="outlined"
            placeholder="e.g. booga ooga"
            secureTextEntry
          />

          <Card.Actions>
            <Button
              loading={isSubmitting}
              mode="contained"
              onPress={submit as any}
              style={styles.button}>
              Submit
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },

  button: {flex: 1, marginTop: 10},
});
