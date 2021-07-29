import {
  ApolloError,
  FetchResult,
  gql,
  Reference,
  StoreObject,
} from '@apollo/client';
import React from 'react';
import {
  CreateReviewMutation,
  ReviewInput,
  useCreateReviewMutation,
} from '../../generated/graphql';

interface CreateReviewControllerProps {
  children: (data: {
    error?: ApolloError | undefined;
    loading?: boolean;
    submit: (
      input: ReviewInput
    ) => Promise<
      FetchResult<
        CreateReviewMutation,
        Record<string, any>,
        Record<string, any>
      >
    >;
  }) => (JSX.Element & React.ReactNode) | null;
}

export const CreateReviewController: React.FC<CreateReviewControllerProps> = ({
  children,
}) => {
  const [createReview, { loading }] = useCreateReviewMutation();

  const submit = ({
    accuracy,
    checkIn,
    cleanliness,
    communication,
    listingId,
    location,
    rating,
    review,
    value,
  }: ReviewInput) => {
    return createReview({
      variables: {
        input: {
          accuracy,
          checkIn,
          cleanliness,
          communication,
          location,
          value,
          listingId,
          rating,
          review,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify({
            __typename: 'Listing',
            id: listingId,
          }),
          fields: {
            reviews(existingReviewsRef = [], { readField }) {
              const newReviewRef = cache.writeFragment({
                data,
                fragment: gql`
                  fragment NewReview on Review {
                    id
                    rating
                    review
                    listingId
                    creatorId
                  }
                `,
              });

              if (
                existingReviewsRef.some(
                  (ref: StoreObject | Reference | undefined) =>
                    readField('id', ref) === data?.createReview.id
                )
              ) {
                return existingReviewsRef;
              }

              return [...existingReviewsRef, newReviewRef];
            },
          },
        });
      },
    });
  };

  return <>{children({ loading, submit })}</>;
};
