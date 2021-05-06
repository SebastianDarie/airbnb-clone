import React from 'react';
import { useCreateListingMutation } from '../../generated/graphql';
import { ListingFormProps } from '../../types';

interface CreateListingControllerProps {
  children: (data: {
    loading?: boolean;
    submit: (values: ListingFormProps, photoUrl: string) => Promise<boolean>;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CreateListingController: React.FC<CreateListingControllerProps> = ({
  children,
}) => {
  const [createListing, { loading }] = useCreateListingMutation();

  const submit = async (values: ListingFormProps, photoUrl: string) => {
    await createListing({
      variables: { input: { ...values, photoUrl } },
    });

    return true;
  };

  return <>{children({ loading, submit })}</>;
};
