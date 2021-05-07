import React from 'react';
import { ApolloError } from '@apollo/client';
import { ListingsQuery, useListingsQuery } from '../../generated/graphql';

export interface WithListingsProps {
  data: ListingsQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export const withListings = (WrappedComponent: React.ComponentType<T & WithListingsProps>) => {
//    const {data, error, loading} = useListingsQuery({notifyOnNetworkStatusChange: true});

//   if(!data && !loading){
//     return {error}
//   }

//   return {data, error, loading}
// };

// const connect = (mapStateToProps: Function, mapDispatchToProps: Function) => {
//   return function <T, P extends WithListingsProps, C>(WrappedComponent: React.ComponentType<T>) {
//     type Props = JSX.LibraryManagedAttributes<C, Omit<P, 'data'>>

//     return class ComponentWithListings extends React.PureComponent<Props> {
//       public render () {
//         const mappedStateProps = mapStateToProps(this.state, this.props)
//         const mappedDispatchProps = mapDispatchToProps(this.state, this.props)

//         return (
//           <WrappedComponent {...this.props} {...mappedStateProps} {...mappedDispatchProps} />
//         )
//       }
//     }
//   }
// }

// export const DataSource = {
//   addChangeListener(_e: Function) {
//     // do something
//   },
//   removeChangeListener(_e: Function) {
//     // do something
//   },
//   getListings() {
//     const { data, error, loading } = useListingsQuery({
//       notifyOnNetworkStatusChange: true,
//     });

//     if (!data && !loading) {
//       return { error };
//     }

//     return { data, loading };
//   },
// };

// export type DataType = typeof DataSource;

// interface WithDataProps<T> {
//   data: T;
// }

// export const withListings = <T, P extends WithListingsProps<T>, C>(
//   WrappedComponent: React.JSXElementConstructor<P> & C,
//   selectData: (
//     dataSource: typeof DataSource,
//     props: Readonly<JSX.LibraryManagedAttributes<C, Omit<P, 'data'>>>
//   ) => T
// ) => {
//   type Props = JSX.LibraryManagedAttributes<C, Omit<P, 'data'>>;
//   type State = {
//     data: T;
//   };
//   return class WithData extends React.Component<Props, State> {
//     constructor(props: Props) {
//       super(props);
//       this.handleChange = this.handleChange.bind(this);
//       this.state = {
//         data: selectData(DataSource, props),
//       };
//     }

//     componentDidMount = () => DataSource.addChangeListener(this.handleChange);

//     componentWillUnmount = () =>
//       DataSource.removeChangeListener(this.handleChange);

//     handleChange = () =>
//       this.setState({
//         data: selectData(DataSource, this.props),
//       });

//     render() {
//       return (
//         <WrappedComponent data={this.state.data} {...(this.props as any)} />
//       );
//     }
//   };
// };

export function withListings<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithListingsProps>
) {
  return (props: ComponentProps) => {
    const { data, error, loading } = useListingsQuery({
      notifyOnNetworkStatusChange: true,
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
