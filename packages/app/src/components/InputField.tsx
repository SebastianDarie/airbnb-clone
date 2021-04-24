import React from 'react';
import {StyleSheet} from 'react-native';
import {Control, Controller, DeepMap, FieldError} from 'react-hook-form';
import {Subheading, TextInput} from 'react-native-paper';
import {FormProps} from '@airbnb-clone/controller';
import {ErrorMessage} from '@hookform/error-message';

interface InputFieldProps {
  control: Control<FormProps>;
  errors: DeepMap<FormProps, FieldError>;
  label: string;
  mode: 'outlined' | 'flat' | undefined;
  name: 'email' | 'password' | 'confirm';
  placeholder: string;
  rules: any;
  secureTextEntry?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  control,
  errors,
  name,
  rules,
  ...props
}) => {
  console.log(errors.email, !!errors.email, errors.password, !!errors.password);
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            autoCapitalize="none"
            error={!!errors?.email}
            onBlur={onBlur}
            onChangeText={val => onChange(val)}
            value={value}
            {...props}
            style={styles.input}
          />
        )}
        rules={rules}
        defaultValue=""
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({messages}) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <Subheading key={type} style={styles.subheading}>
              {message}
            </Subheading>
          ))
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 10,
    marginTop: 5,
  },
  subheading: {
    color: 'red',
    marginHorizontal: 12,
  },
});
