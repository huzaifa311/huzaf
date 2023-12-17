import { Formik } from 'formik';
import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email address is required'), password: Yup.string().required().min(6, 'Your password has to be at least 6 characters long')
  })

  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
    } catch (error) {
      Alert.alert('Oh no!😲...', error.message)
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={values => {
        onLogin(values.email, values.password)
      }} validationSchema={LoginFormSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => {
          return <>
            <View style={[
              styles.inputField,
              {
                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
              }
            ]}>
              <TextInput
                placeholder='PhoneNumber, UserName or Email'
                placeholderTextColor={'#444'}
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                // autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email} />
            </View>
            <View style={[
              styles.inputField,
              {
                borderColor: 1 > values.password.length || values.password.length > 6 ? "#ccc" : 'red',
              },
            ]}>
              <TextInput
                placeholder='Password'
                placeholderTextColor={'#444'}
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                autoCorrect={false}
                // autoFocus={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password} />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#0096f6', fontSize: 15 }}>Forgot Password?</Text>
            </View>
            <Pressable titleSize={20} style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20 }}>Log In</Text>
            </Pressable>
            <View style={styles.signupCont}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{ color: '#0096f6' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        }}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1
  },
  wrapper: {
    marginTop: 80,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096f6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 43,
    borderRadius: 4,
  }),
  signupCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
})

export default LoginForm