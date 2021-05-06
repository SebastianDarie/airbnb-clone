import { withListings, WithListingsProps } from '@airbnb-clone/controller';
import { Card } from 'antd';
import Image from 'next/image';
import { withApollo } from '../utils/withApollo';

type ListingsProps = {} & WithListingsProps;

const RealListings: React.FC<ListingsProps> = ({ data, error, loading }) => {
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

  return (
    <>
      {data &&
        data.listings.map((listing) => (
          <Card
            key={listing.id}
            hoverable={true}
            style={{ width: 240 }}
            cover={
              <Image
                src={listing.photoUrl}
                alt={listing.title}
                height={200}
                width={300}
              />
            }
          >
            <Card.Meta
              title={listing.title}
              description={listing.description}
            />
          </Card>
        ))}
    </>
  );
};

const Listings = withListings(RealListings);

export default withApollo({ ssr: true })(Listings);
