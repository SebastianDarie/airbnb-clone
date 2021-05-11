import React from 'react';
import {StyleSheet} from 'react-native';
import {Control, Controller, DeepMap, FieldError} from 'react-hook-form';
import {Subheading, TextInput} from 'react-native-paper';
import {ErrorMessage} from '@hookform/error-message';

interface InputFieldProps {
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  label: string;
  mode?: 'outlined' | 'flat' | undefined;
  name: string;
  placeholder?: string;
  keyboardType?: 'numeric';
  secureTextEntry?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  control,
  errors,
  mode = 'outlined',
  name,
  ...props
}) => {
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
            style={styles.input}
            mode={mode}
            {...props}
          />
        )}
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
