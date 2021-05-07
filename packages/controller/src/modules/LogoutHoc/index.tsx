import React from 'react';
import { LogoutMutationFn, useLogoutMutation } from '../../generated/graphql';

export interface WithLogoutProps {
  logout: LogoutMutationFn;
}

export function withLogout<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithLogoutProps>
) {
  return (props: ComponentProps) => {
    const [logout] = useLogoutMutation();

    return <WrappedComponent {...props} logout={logout} />;
  };
}
