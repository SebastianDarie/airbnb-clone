import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegisterController, RegisterFormProps} from '@second-gear/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, Button, Card, Colors} from 'react-native-paper';
import {Header} from '../components/Header';
import {InputField} from '../components/InputField';
import {RootStackParamList} from '../navigation/MainNavigator';
import * as RootNavigation from '../navigation/RootNavigation';
import {loginSchema} from '@second-gear/common';

type LoginModalNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginModal'
>;

export const LandingController: React.FC = () => {
  const navigation = useNavigation<LoginModalNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<RegisterFormProps>({
    criteriaMode: 'all',
    defaultValues: {confirm: '', email: '', name: '', password: ''},
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const disabled = !isDirty || isSubmitting || !isValid;

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <RegisterController>
        {({loading, submit}) => (
          <Card mode="elevated">
            <Card.Title
              title="Register"
              // eslint-disable-next-line react-native/no-inline-styles
              titleStyle={{fontSize: 25, marginBottom: -5}}
            />
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Name"
              mode="outlined"
              placeholder="e.g. Bob"
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

            <InputField
              control={control}
              errors={errors}
              name="confirm"
              label="Confirm Password"
              mode="outlined"
              placeholder="same as above"
              secureTextEntry
            />

            <Card.Actions>
              <View style={styles.loginContainer}>
                {loading || isSubmitting ? (
                  <ActivityIndicator animating={true} color={Colors.red800} />
                ) : (
                  <>
                    <Pressable
                      android_ripple={{
                        borderless: true,
                        color: 'rgb(227, 28, 95)',
                        radius: 15,
                      }}
                      disabled={disabled}
                      onPress={handleSubmit(data => {
                        console.log(data);
                        submit(data);
                      })}>
                      {!disabled ? (
                        <LinearGradient
                          colors={[
                            'rgb(230, 30, 77)',
                            'rgb(227, 28, 95)',
                            'rgb(215, 4, 102)',
                          ]}
                          style={styles.linearGradient}>
                          <Text style={styles.buttonText}>Continue</Text>
                        </LinearGradient>
                      ) : (
                        <Button mode="contained" disabled={true}>
                          Continue
                        </Button>
                      )}
                    </Pressable>
                    <Text style={styles.text}>or</Text>
                    <Button
                      onPress={() => RootNavigation.navigate('LoginModal')}>
                      {/* <LinearGradient
                      colors={[
                        'rgb(230, 30, 77)',
                        'rgb(227, 28, 95)',
                        'rgb(215, 4, 102)',
                      ]}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>Log In</Text>
                    </LinearGradient> */}
                      Log In
                    </Button>
                  </>
                )}
                {/* <Button
                loading={isSubmitting}
                mode="contained"
                onPress={handleSubmit(data => {
                  console.log(data);
                  submit(data);
                })}
                style={styles.button}>
                Continue
              </Button>
              <Text>or</Text>
              <Button
                mode="outlined"
                onPress={() => {
                  console.log('log in');
                }}
                style={styles.button}>
                Log in
              </Button> */}
              </View>
            </Card.Actions>
          </Card>
        )}
      </RegisterController>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },

  buttonText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
  },

  text: {
    color: '#000000',
    fontSize: 18,
  },
});
