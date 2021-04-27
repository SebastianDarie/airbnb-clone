import { useRouter } from 'next/router';
import React from 'react';
import {
  ConfirmEmailMutation,
  useConfirmEmailMutation,
} from '../../generated/graphql';

interface ConfirmEmailControllerProps {
  children: (data: {
    data?: ConfirmEmailMutation | null | undefined;
    loading?: boolean;
    submit: () => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const ConfirmEmailController: React.FC<ConfirmEmailControllerProps> = ({
  children,
}) => {
  const router = useRouter();
  const [confirmEmail, { data, loading }] = useConfirmEmailMutation();

  const submit = async () => {
    // await confirmEmail({
    //   variables: {
    //     token: typeof router.query.token === 'string' ? router.query.token : '',
    //   },
    // });
    console.log(router.query.token === 'string');

    return true;
  };

  return <>{children({ data, loading, submit })}</>;
};
