import {
  AuthFormProps,
  LoginMutation,
  useMeLazyQuery,
  useMeQuery,
} from '@airbnb-clone/controller';
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../components/InputField';

interface LoginViewProps {
  data: LoginMutation | null | undefined;
  loading: boolean | undefined;
  submit: (values: AuthFormProps) => Promise<LoginMutation | null | undefined>;
}

const meQuery = gql`
  query me {
    id
    email
    confirmed
    forgotPasswordLocked
    createdAt
  }
`;

export const LoginView: React.FC<LoginViewProps> = ({
  data,
  loading,
  submit,
}) => {
  const {data: newdata, loading: newloading, error} = useQuery(meQuery);
  const [me, {data: medata, loading: meloading}] = useMeLazyQuery();
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<AuthFormProps>({criteriaMode: 'all'});

  const onSubmit = handleSubmit(values => {
    console.log(values);
    console.log(isSubmitting);
    console.log(data);
    console.log(loading);
    submit(values);
  });

  if (data?.login.errors) {
    console.log(data.login.errors);
  }
  console.log(medata, meloading);
  console.log(
    newdata,
    newloading,
    error,
    error?.extraInfo,
    error?.message,
    error?.networkError,
  );
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          <Card.Title
            title="Login"
            // eslint-disable-next-line react-native/no-inline-styles
            titleStyle={{fontSize: 25, marginBottom: -5}}
          />
          <InputField
            control={control}
            errors={errors}
            name="email"
            label="E-mail"
            mode="outlined"
            placeholder="e.g. bob@bob.com"
          />

          <InputField
            control={control}
            errors={errors}
            name="password"
            label="Password"
            mode="outlined"
            placeholder="e.g. booga ooga"
            secureTextEntry
          />

          <Card.Actions>
            <Button
              loading={isSubmitting}
              mode="contained"
              onPress={onSubmit}
              style={styles.button}>
              Submit
            </Button>
          </Card.Actions>
          <Card.Actions>
            <Button
              loading={isSubmitting}
              mode="contained"
              onPress={me}
              style={styles.button}>
              Me query
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },

  button: {flex: 1, marginTop: 10},
});
