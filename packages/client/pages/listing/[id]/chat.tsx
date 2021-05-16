import { useGetMessagesFromUrl } from '../../../shared-hooks/useGetMessagesFromUrl';
import { withApollo } from '../../../utils/withApollo';

interface ListingChatProps {}

const ListingChat: React.FC<ListingChatProps> = () => {
  const { data, error, loading } = useGetMessagesFromUrl();

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
    <>{data && data.messages.map((msg) => <p key={msg.id}>{msg.text}</p>)}</>
  );
};

export default withApollo({ ssr: false })(ListingChat);
