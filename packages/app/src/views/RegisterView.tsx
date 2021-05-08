import {RegisterFormProps, RegisterMutation} from '@airbnb-clone/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../components/InputField';

interface RegisterViewProps {
  submit: (
    values: RegisterFormProps,
  ) => Promise<RegisterMutation | null | undefined>;
}

export const RegisterView: React.FC<RegisterViewProps> = ({submit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormProps>({criteriaMode: 'all'});

  const onSubmit = handleSubmit(data => {
    console.log(data);
    console.log(isSubmitting);
    submit(data);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          <Card.Title
            title="Register"
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
