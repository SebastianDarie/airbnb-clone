import { ListingQuery } from '@airbnb-clone/controller';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';

const { Title } = Typography;

type ListingViewProps = {
  id: string | undefined;
  data: ListingQuery | undefined;
};

export const ListingView: React.FC<ListingViewProps> = ({ id, data }) => {
  const router = useRouter();

  return (
    <>
      {data && (
        <>
          <Title>{data.listing?.title}</Title>
          <Button
            type='primary'
            onClick={() => router.push(`/listing/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => router.push(`/listing/${id}/chat`)}
          >
            Chat
          </Button>
        </>
      )}
    </>
  );
};
