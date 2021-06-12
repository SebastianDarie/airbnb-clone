import { useIsAuth } from '@airbnb-clone/controller';
import React from 'react';
import Layout from '../components/Layout';
import { ListingFormView } from '../modules/listing/ListingForm';
import { withApollo } from '../utils/withApollo';

interface CreateListingProps {}

const CreateListing: React.FC<CreateListingProps> = ({}) => {
  useIsAuth();

  return (
    <Layout search={false}>
      <ListingFormView update={false} />
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
