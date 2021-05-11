import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormReturn,
} from 'react-hook-form';
import {Checkbox, Subheading} from 'react-native-paper';
import {ErrorMessage} from '@hookform/error-message';
import {ListingFormProps} from '@airbnb-clone/controller';

interface CheckboxFieldProps {
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  label: string;
  name: string;
  options: string[];
  form: UseFormReturn<ListingFormProps>;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  control,
  errors,
  name,
  options,
  form,
}) => {
  const value = form.getValues(name as 'amenities');

  const onPress = (optionName: string, checked: boolean) => {
    if (checked) {
      form.setValue(
        name as 'amenities',
        value.filter((val: string) => val !== optionName),
      );
    } else {
      form.setValue(name as 'amenities', [...value, optionName]);
    }
  };

  return (
    <>
      {options.map(option => {
        const checked = value.includes(option);
        return (
          <>
            <Controller
              control={control}
              name={name}
              render={() => (
                <Checkbox.Android
                  status="unchecked"
                  onPress={() => onPress(name, checked)}
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
      })}
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
