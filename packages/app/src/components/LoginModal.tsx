import {AuthFormProps} from '@second-gear/controller';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {InputField} from './InputField';

export const LoginModal: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AuthFormProps>({
    criteriaMode: 'firstError',
    defaultValues: {email: '', password: ''},
  });

  return (
    <View style={styles.container}>
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

      <Pressable
        android_ripple={{
          borderless: true,
          color: 'rgb(227, 28, 95)',
          radius: 15,
        }}
        onPress={handleSubmit(data => {
          console.log(data);
        })}>
        <LinearGradient
          colors={['rgb(230, 30, 77)', 'rgb(227, 28, 95)', 'rgb(215, 4, 102)']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
