import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  type: Scalars['String'];
  photos: Array<Scalars['String']>;
  price: Scalars['String'];
  bathrooms: Scalars['Float'];
  bedrooms: Scalars['Float'];
  beds: Scalars['Float'];
  guests: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  highlights: Array<Scalars['String']>;
  creatorId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
};

export type ListingInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  type: Scalars['String'];
  photos: Array<Scalars['String']>;
  price: Scalars['String'];
  bathrooms: Scalars['Int'];
  bedrooms: Scalars['Int'];
  beds: Scalars['Int'];
  guests: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  highlights: Array<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['String'];
  listingId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  text: Scalars['String'];
  listingId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signS3: Array<Scalars['String']>;
  createListing: Scalars['Boolean'];
  updateListing?: Maybe<Listing>;
  deleteListing: Scalars['Boolean'];
  createMessage: Message;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  confirmEmail: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  deleteUser: Scalars['Boolean'];
};


export type MutationSignS3Args = {
  photos: Array<Photo>;
};


export type MutationCreateListingArgs = {
  input: ListingInput;
};


export type MutationUpdateListingArgs = {
  input: UpdateListing;
  id: Scalars['String'];
};


export type MutationDeleteListingArgs = {
  id: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  input: MessageInput;
};


export type MutationRegisterArgs = {
  credentials: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};

export type PaginatedListings = {
  __typename?: 'PaginatedListings';
  listings: Array<Listing>;
  hasMore: Scalars['Boolean'];
};

export type Photo = {
  name: Scalars['String'];
  src: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listings: Array<Listing>;
  listing?: Maybe<Listing>;
  searchListings: PaginatedListings;
  messages: Array<Message>;
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryListingArgs = {
  id: Scalars['String'];
};


export type QuerySearchListingsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  input: SearchInput;
};


export type QueryMessagesArgs = {
  listingId: Scalars['String'];
};

export type SearchInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  beds?: Maybe<Scalars['Int']>;
  guests?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  listingId: Scalars['String'];
};

export type UpdateListing = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['String']>;
  bathrooms?: Maybe<Scalars['Int']>;
  bedrooms?: Maybe<Scalars['Int']>;
  beds?: Maybe<Scalars['Int']>;
  guests?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  amenities?: Maybe<Array<Scalars['String']>>;
  highlights?: Maybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  confirmed: Scalars['Boolean'];
  forgotPasswordLocked: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirm: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  sessionID?: Maybe<Scalars['String']>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'path' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'confirmed' | 'forgotPasswordLocked'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = (
  { __typename?: 'Mutation' }
  & { confirmEmail: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateListingMutationVariables = Exact<{
  input: ListingInput;
}>;


export type CreateListingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createListing'>
);

export type CreateMessageMutationVariables = Exact<{
  text: Scalars['String'];
  listingId: Scalars['String'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'creatorId' | 'listingId'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'sessionID'>
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  confirm: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SignS3MutationVariables = Exact<{
  photos: Array<Photo> | Photo;
}>;


export type SignS3Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signS3'>
);

export type UpdateListingMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateListing;
}>;


export type UpdateListingMutation = (
  { __typename?: 'Mutation' }
  & { updateListing?: Maybe<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'category' | 'type' | 'photos' | 'price' | 'bathrooms' | 'bedrooms' | 'beds' | 'guests' | 'latitude' | 'longitude' | 'amenities'>
  )> }
);

export type ListingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ListingQuery = (
  { __typename?: 'Query' }
  & { listing?: Maybe<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'category' | 'photos' | 'price' | 'bathrooms' | 'bedrooms' | 'beds' | 'guests' | 'latitude' | 'longitude' | 'amenities' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'confirmed' | 'email'>
    ) }
  )> }
);

export type ListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListingsQuery = (
  { __typename?: 'Query' }
  & { listings: Array<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'category' | 'price' | 'photos'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MessagesQueryVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'creatorId' | 'listingId'>
  )> }
);

export type SearchListingsQueryVariables = Exact<{
  input: SearchInput;
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type SearchListingsQuery = (
  { __typename?: 'Query' }
  & { searchListings: (
    { __typename?: 'PaginatedListings' }
    & Pick<PaginatedListings, 'hasMore'>
    & { listings: Array<(
      { __typename?: 'Listing' }
      & Pick<Listing, 'id' | 'title' | 'category' | 'photos' | 'bathrooms' | 'beds' | 'guests' | 'price' | 'createdAt'>
    )> }
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  listingId: Scalars['String'];
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'creatorId' | 'createdAt'>
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  path
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  confirmed
  forgotPasswordLocked
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateListingDocument = gql`
    mutation CreateListing($input: ListingInput!) {
  createListing(input: $input)
}
    `;
export type CreateListingMutationFn = Apollo.MutationFunction<CreateListingMutation, CreateListingMutationVariables>;

/**
 * __useCreateListingMutation__
 *
 * To run a mutation, you first call `useCreateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListingMutation, { data, loading, error }] = useCreateListingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateListingMutation(baseOptions?: Apollo.MutationHookOptions<CreateListingMutation, CreateListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument, options);
      }
export type CreateListingMutationHookResult = ReturnType<typeof useCreateListingMutation>;
export type CreateListingMutationResult = Apollo.MutationResult<CreateListingMutation>;
export type CreateListingMutationOptions = Apollo.BaseMutationOptions<CreateListingMutation, CreateListingMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($text: String!, $listingId: String!) {
  createMessage(input: {text: $text, listingId: $listingId}) {
    id
    text
    creatorId
    listingId
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
    sessionID
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $confirm: String!) {
  register(credentials: {email: $email, password: $password, confirm: $confirm}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirm: // value for 'confirm'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SignS3Document = gql`
    mutation signS3($photos: [Photo!]!) {
  signS3(photos: $photos)
}
    `;
export type SignS3MutationFn = Apollo.MutationFunction<SignS3Mutation, SignS3MutationVariables>;

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      photos: // value for 'photos'
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: Apollo.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, options);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = Apollo.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = Apollo.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
export const UpdateListingDocument = gql`
    mutation UpdateListing($id: String!, $input: UpdateListing!) {
  updateListing(id: $id, input: $input) {
    id
    title
    description
    category
    type
    photos
    price
    bathrooms
    bedrooms
    beds
    guests
    latitude
    longitude
    amenities
  }
}
    `;
export type UpdateListingMutationFn = Apollo.MutationFunction<UpdateListingMutation, UpdateListingMutationVariables>;

/**
 * __useUpdateListingMutation__
 *
 * To run a mutation, you first call `useUpdateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListingMutation, { data, loading, error }] = useUpdateListingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateListingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListingMutation, UpdateListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListingMutation, UpdateListingMutationVariables>(UpdateListingDocument, options);
      }
export type UpdateListingMutationHookResult = ReturnType<typeof useUpdateListingMutation>;
export type UpdateListingMutationResult = Apollo.MutationResult<UpdateListingMutation>;
export type UpdateListingMutationOptions = Apollo.BaseMutationOptions<UpdateListingMutation, UpdateListingMutationVariables>;
export const ListingDocument = gql`
    query Listing($id: String!) {
  listing(id: $id) {
    id
    title
    description
    category
    photos
    price
    bathrooms
    bedrooms
    beds
    guests
    latitude
    longitude
    amenities
    createdAt
    creator {
      id
      confirmed
      email
    }
  }
}
    `;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<ListingQuery, ListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingQuery, ListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingQueryResult = Apollo.QueryResult<ListingQuery, ListingQueryVariables>;
export const ListingsDocument = gql`
    query Listings {
  listings {
    id
    title
    description
    category
    price
    photos
  }
}
    `;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListingsQuery(baseOptions?: Apollo.QueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
      }
export function useListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
        }
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<typeof useListingsLazyQuery>;
export type ListingsQueryResult = Apollo.QueryResult<ListingsQuery, ListingsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query Messages($listingId: String!) {
  messages(listingId: $listingId) {
    id
    text
    creatorId
    listingId
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const SearchListingsDocument = gql`
    query SearchListings($input: SearchInput!, $limit: Int!, $cursor: String) {
  searchListings(input: $input, limit: $limit, cursor: $cursor) {
    listings {
      id
      title
      category
      photos
      bathrooms
      beds
      guests
      price
      createdAt
    }
    hasMore
  }
}
    `;

/**
 * __useSearchListingsQuery__
 *
 * To run a query within a React component, call `useSearchListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchListingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchListingsQuery(baseOptions: Apollo.QueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
      }
export function useSearchListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
        }
export type SearchListingsQueryHookResult = ReturnType<typeof useSearchListingsQuery>;
export type SearchListingsLazyQueryHookResult = ReturnType<typeof useSearchListingsLazyQuery>;
export type SearchListingsQueryResult = Apollo.QueryResult<SearchListingsQuery, SearchListingsQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage($listingId: String!) {
  newMessage(listingId: $listingId) {
    id
    text
    creatorId
    createdAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;