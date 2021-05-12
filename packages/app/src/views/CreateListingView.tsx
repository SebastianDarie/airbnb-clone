import {
  ListingFormProps,
  withPhotoUpload,
  WithPhotoUploadProps,
} from '@airbnb-clone/controller';
import {ApolloError} from '@apollo/client';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CheckboxField} from '../components/CheckBoxField';
import {InputField} from '../components/InputField';

type CreateListingViewProps = {
  error: ApolloError | undefined;
  loading: boolean | undefined;
  submit: (values: ListingFormProps, photoUrl: string) => Promise<boolean>;
} & WithPhotoUploadProps;

const CreateListingView: React.FC<CreateListingViewProps> = ({
  error,
  loading,
  submit,
  uploadPhoto,
}) => {
  const [photo, setPhoto] = useState<string>('');
  const form = useForm<ListingFormProps>({criteriaMode: 'all'});
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = form;

  const onSubmit = handleSubmit(async values => {
    const photoUrl = await uploadPhoto({variables: {photo}});
    console.log(photoUrl, typeof photoUrl);
    submit(values, 'photoUrl');
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
              loading={isSubmitting}
              mode="contained"
              onPress={() =>
                launchImageLibrary({mediaType: 'photo'}, res => {
                  console.log(res);

                  if (res && res.errorCode) {
                    console.log(res.errorMessage);
                  } else {
                    console.log(res.uri, res.fileName, res.fileSize);
                    setPhoto(res.uri!);
                  }
                })
              }
              style={styles.button}>
              Pick Image
            </Button>
          </Card.Actions>

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

export default withPhotoUpload(CreateListingView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },

  button: {flex: 1, marginTop: 10},
});
