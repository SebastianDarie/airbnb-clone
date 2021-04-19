import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
//import { InputField } from '../../components/InputField';
import {FormProps, RegisterMutation} from '@airbnb-clone/controller';

interface RegisterViewProps {
  data?: RegisterMutation | null | undefined;
  submit: (values: FormProps) => Promise<RegisterMutation | null | undefined>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({data, submit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormProps>();
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            error={!!errors.email}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            label="E-mail"
            mode="outlined"
            placeholder="e.g. bob@bob.com"
          />
        )}
        name="email"
        rules={{required: true, maxLength: 255}}
        defaultValue=""
      />
      {errors.email && errors.email.type === 'required' && (
        <span>This is required</span>
      )}
      {errors.email && errors.email.type === 'maxLength' && (
        <span>Max length exceeded</span>
      )}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry
            error={!!errors.password}
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
      {errors.password && errors.password.type === 'required' && (
        <span>This is required</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span>Max length exceeded</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span>Min length not ok</span>
      )}

      <Button
        loading={isSubmitting}
        mode="contained"
        onPress={() => handleSubmit(onSubmit as any)}>
        Submit
      </Button>
    </View>
  );
};
