import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLatestHeaderQuery } from '../../../controller/dist';
import { withApollo } from '../../utils/withApollo';

interface InboxProps {}

const Inbox: React.FC<InboxProps> = ({}) => {
  const router = useRouter();
  const { data } = useLatestHeaderQuery();

  useEffect(() => {
    if (data) {
      router.push(`/inbox/header/${data.latestHeader.id}`);
    }
  }, [data]);

  return <></>;
};

export default withApollo({ ssr: true })(Inbox);
