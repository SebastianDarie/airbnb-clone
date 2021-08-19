import dynamic from "next/dynamic";
import { CreateListingLayout } from "../../components/CreateListingLayout";
import { withApollo } from "../../utils/withApollo";

interface LocationProps {}

const Map = dynamic(() => import("../../components/Map/LocationField"), {
  ssr: false,
});

const Location: React.FC<LocationProps> = ({}) => {
  return (
    <CreateListingLayout location>
      <Map />
    </CreateListingLayout>
  );
};

export default withApollo({ ssr: false })(Location);
