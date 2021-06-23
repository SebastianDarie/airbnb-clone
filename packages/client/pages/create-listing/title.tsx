import { CreateListingLayout } from '../../components/CreateListingLayout';
import { TitleDescription } from '../../components/Fields/TitleDescription';
import { useListingStore } from '../../stores/useListingStore';
import { withApollo } from '../../utils/withApollo';

interface TitleProps {}

const Title: React.FC<TitleProps> = ({}) => {
  const title = useListingStore((state) => state.title);

  return (
    <CreateListingLayout disabled={title.length === 0}>
      <TitleDescription title={title} />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Title);
