import { textPageSchema } from '@airbnb-clone/common';
import { ListingFormProps, useIsAuth } from '@airbnb-clone/controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListingForm } from '../../../modules/listing/ListingForm';
import { withApollo } from '../../../utils/withApollo';

const { Content } = Layout;

interface UpdateListingProps {}

const UpdateListing: React.FC<UpdateListingProps> = ({}) => {
  useIsAuth();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
    setValue,
  } = useForm<ListingFormProps>({
    mode: 'onBlur',
    resolver: yupResolver(textPageSchema),
  });

  const [currImg, setCurrImg] = useState('');

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
        <ListingForm
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
