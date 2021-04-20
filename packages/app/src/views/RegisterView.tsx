import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Subheading, Text, TextInput} from 'react-native-paper';
import {
  useForm,
  Controller,
  Control,
  DeepMap,
  FieldError,
  FieldValues,
} from 'react-hook-form';
//import { InputField } from '../../components/InputField';
import {FormProps, RegisterMutation} from '@airbnb-clone/controller';
import {InputField} from '../components/InputField';
import {SafeAreaView} from 'react-native-safe-area-context';

interface RegisterViewProps {
  control: Control<FormProps>;
  errors: DeepMap<FormProps, FieldError>;
  isSubmitting: boolean;
  submit: (values: FormProps) => Promise<RegisterMutation | null | undefined>;
  // submit: (
  //   e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  // ) => Promise<void>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
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
            title="Register"
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
              maxLength: {message: 'That is enough stop', value: 255},
            }}
            label="E-mail"
            mode="outlined"
            placeholder="e.g. bob@bob.com"
          />
          {/* <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            error={!!errors?.email}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            label="E-mail"
            mode="outlined"
            placeholder="e.g. bob@bob.com"
          />
        )}
        rules={{
          pattern: {
            message: 'The email address is invalid.',
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          },
          required: true,
          maxLength: 255,
        }}
        defaultValue=""
      />
      {errors.email && errors.email.type === 'pattern' && (
        <Subheading>The email address is invalid.</Subheading>
      )}
      {errors.email && errors.email.type === 'required' && (
        <Subheading>This is required</Subheading>
      )}
      {errors.email && errors.email.type === 'maxLength' && (
        <Subheading>Max length exceeded</Subheading>
      )} */}

          <InputField
            control={control}
            errors={errors}
            name="password"
            rules={{
              required: 'The password is required',
              maxLength: {message: 'I think that is pretty secure', value: 256},
              minLength: {message: 'That is too short', value: 3},
            }}
            label="Password"
            mode="outlined"
            placeholder="e.g. booga ooga"
            secureTextEntry
          />

          {/* <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry
            error={!!errors?.password}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            label="Password"
            mode="outlined"
          />
        )}
        name="password"
        rules={{required: true, maxLength: 256, minLength: 3}}
        defaultValue=""
      />
      {errors?.password && errors?.password.type === 'required' && (
        <Subheading>This is required</Subheading>
      )}
      {errors?.password && errors?.password.type === 'maxLength' && (
        <Subheading>Max length exceeded</Subheading>
      )}
      {errors?.password && errors?.password.type === 'minLength' && (
        <Subheading>Min length not ok</Subheading>
      )} */}

          <Card.Actions>
            <Button
              loading={isSubmitting}
              mode="contained"
              onPress={submit as any}
              style={styles.button}>
              Submit
            </Button>
          </Card.Actions>

          {/* <Button loading mode="contained" style={{marginTop: 10}}>
        Testing purpose
      </Button> */}
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
