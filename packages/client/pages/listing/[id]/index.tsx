import { ListingView } from '../../../modules/views/ListingView';
import { useGetListingFromUrl } from '../../../shared-hooks/useGetListingFromUrl';
import { withApollo } from '../../../utils/withApollo';

interface ListingProps {}

const Listing: React.FC<ListingProps> = () => {
  const { data, error, loading, variables } = useGetListingFromUrl();

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

  return <>{data && <ListingView id={variables?.id} data={data} />}</>;
};

export default withApollo({ ssr: false })(Listing);
