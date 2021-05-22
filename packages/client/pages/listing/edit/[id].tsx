import { textPageSchema } from '@airbnb-clone/common';
import { ListingFormProps, useIsAuth } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListingFormView } from '../../../modules/listing/ListingForm';
import { useGetListingFromUrl } from '../../../shared-hooks/useGetListingFromUrl';
import { withApollo } from '../../../utils/withApollo';

const { Content } = Layout;

interface UpdateListingProps {}

const UpdateListing: React.FC<UpdateListingProps> = ({}) => {
  useIsAuth();
  const { data, error, loading } = useGetListingFromUrl();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setValue,
  } = useForm<ListingFormProps>({
    defaultValues: { ...data?.listing },
    mode: 'onBlur',
    resolver: yupResolver(textPageSchema),
  });

  const [currImg, setCurrImg] = useState('');

  if (!data && loading) {
    return <div>loading values...</div>;
  }

  if ((!data && !loading) || error) {
    return (
      <div>
        <div>failed to load previous values</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <ListingFormView
          update
          control={control}
          errors={errors}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          isValid={isValid}
          currImg={currImg}
          setCurrImg={setCurrImg}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UpdateListing);
