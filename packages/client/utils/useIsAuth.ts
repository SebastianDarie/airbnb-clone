import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '@airbnb-clone/controller';

export const useIsAuth = (): void => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [data, loading, router]);
};
