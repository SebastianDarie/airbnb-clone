import dynamic from "next/dynamic";
import { CreateListingLayout } from "../../components/CreateListingLayout";
import ListingStore from "../../stores/useListingStore";
import { withApollo } from "../../utils/withApollo";

const TitleDescription = dynamic<{ description?: string; title?: string }>(() =>
  import("../../components/Fields/TitleDescription").then(
    (mod) => mod.TitleDescription
  )
);

interface TitleProps {}

const Title: React.FC<TitleProps> = ({}) => {
  const title = ListingStore.useListingStore((state) => state.title);

  return (
    <CreateListingLayout disabled={title.length === 0}>
      <TitleDescription title={title} />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Title);
