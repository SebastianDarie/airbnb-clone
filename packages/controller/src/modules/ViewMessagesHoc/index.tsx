import React from 'react';
import { ApolloError } from '@apollo/client';
import { MessagesQuery, useMessagesQuery } from '../../generated/graphql';

export interface WithMessagesProps {
  data: MessagesQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

export const connect = (
  mapStateToProps: Function,
  mapDispatchToProps: Function
) => {
  return function <T, P extends WithMessagesProps, C>(
    WrappedComponent: React.ComponentType<T>
  ) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P, 'data'>>;

    return class ComponentWithListings extends React.PureComponent<Props> {
      public render() {
        const mappedStateProps = mapStateToProps(this.state, this.props);
        const mappedDispatchProps = mapDispatchToProps(this.state, this.props);

        return (
          <WrappedComponent
            {...this.props}
            {...mappedStateProps}
            {...mappedDispatchProps}
          />
        );
      }
    };
  };
};

export const connectMessages = (
  mapStateToProps?: Function,
  mapDispatchToProps?: Function | Object
) => {
  return function <P extends WithMessagesProps, C>(
    WrappedComponent: React.ComponentType<WithMessagesProps>
  ) {
    type ComponentProps = JSX.LibraryManagedAttributes<
      C,
      Omit<P, 'data' | 'error' | 'loading'>
    >;

    return (props: ComponentProps) => {
      console.log(mapStateToProps, mapDispatchToProps);

      const { data, error, loading } = useMessagesQuery({
        notifyOnNetworkStatusChange: true,
        variables: { listingId: 'cc056aa8-651a-482d-8adc-3ceb27d1ccd1' },
      });

      return (
        <WrappedComponent
          {...props}
          data={data}
          error={error}
          loading={loading}
        />
      );
    };
  };
};

export function withMessages<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithMessagesProps>,
  id: string
) {
  return (props: ComponentProps) => {
    const { data, error, loading } = useMessagesQuery({
      notifyOnNetworkStatusChange: true,
      variables: { listingId: id },
    });

    return (
      <WrappedComponent
        {...props}
        data={data}
        error={error}
        loading={loading}
      />
    );
  };
}
