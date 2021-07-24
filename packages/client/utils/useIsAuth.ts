import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '@airbnb-clone/controller';

export const useIsAuth = (): void => {
  const { asPath, replace } = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && !data?.me) {
      replace(`/login?next=${asPath}`);
    }
  }, [data, loading, asPath, replace]);
};
