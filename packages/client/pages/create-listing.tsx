import { ListingFormProps, useIsAuth } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { ListingFormView } from '../modules/listing/ListingForm';
import { defaultListingState } from '../stores/useListingStore';
import { withApollo } from '../utils/withApollo';

interface CreateListingProps {}

const CreateListing: React.FC<CreateListingProps> = ({}) => {
  useIsAuth();
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors, isDirty, isSubmitting },
  //   setValue,
  // } = useForm<ListingFormProps>({
  //   defaultValues: defaultListingState,
  //   mode: 'onBlur',
  //   resolver: yupResolver(ListingSchema),
  // });

  return (
    <Layout search={false}>
      <ListingFormView
        update={false}
        // control={control}
        // errors={errors}
        // isDirty={isDirty}
        // isSubmitting={isSubmitting}

        // handleSubmit={handleSubmit}
        // setValue={setValue}
      />
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
