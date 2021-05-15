import { WithListingProps, withListing } from '@airbnb-clone/controller';
import { Typography } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { withApollo } from '../../utils/withApollo';

const { Title } = Typography;

type ListingProps = {} & WithListingProps;

const router = useRouter();
const id = router.query.id === 'string' ? router.query.id : '';

const RealListing: React.FC<ListingProps> = ({ data, error, loading }) => {
  if ((!data && !loading) || error) {
    return (
      <div>
        <div>failed to load listings</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!data && loading) {
    return <div>loading...</div>;
  }

  return <>{data && <Title>{data.listing?.id}</Title>}</>;
};

const Listing = withListing(RealListing, id);

export default withApollo({ ssr: false })(Listing);
