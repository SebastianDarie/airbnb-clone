import {ListingFormProps} from '@airbnb-clone/controller';
import {ApolloError} from '@apollo/client';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CheckboxField} from '../components/CheckBoxField';
import {InputField} from '../components/InputField';

interface CreateListingViewProps {
  error: ApolloError | undefined;
  loading: boolean | undefined;
  submit: (values: ListingFormProps, photoUrl: string) => Promise<boolean>;
}

export const CreateListingView: React.FC<CreateListingViewProps> = ({
  error,
  loading,
  submit,
}) => {
  const form = useForm<ListingFormProps>({criteriaMode: 'all'});
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = form;

  const onSubmit = handleSubmit(values => {
    submit(values, '');
  });

  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          <Card.Title
            title="Create Listing"
            // eslint-disable-next-line react-native/no-inline-styles
            titleStyle={{fontSize: 25, marginBottom: -5}}
          />
          <InputField
            control={control}
            errors={errors}
            name="title"
            label="Title"
            placeholder="e.g. Lovely Studio Flat in the Center of the City"
          />

          <InputField
            control={control}
            errors={errors}
            name="description"
            label="Description"
            placeholder="e.g. details to persuade customers"
          />

          <InputField
            control={control}
            errors={errors}
            name="category"
            label="Category"
          />

          <InputField
            control={control}
            errors={errors}
            name="price"
            label="Price"
            keyboardType="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="beds"
            label="Beds"
            keyboardType="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="guests"
            label="Guests"
            keyboardType="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="latitude"
            label="Latitude"
            keyboardType="numeric"
          />
          <InputField
            control={control}
            errors={errors}
            name="longitude"
            label="Longitude"
            keyboardType="numeric"
          />

          <CheckboxField
            control={control}
            errors={errors}
            name="amenities"
            label="Amenities"
            options={['pool', 'wifi', 'garden', 'lawn']}
            form={form}
          />

          <Card.Actions>
            <Button
              loading={loading || isSubmitting}
              mode="contained"
              onPress={onSubmit}
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
