import { Formik } from 'formik'
import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import * as Yup from 'yup'
import Validator from 'email-validator';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false)
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email address is required'), password: Yup.string().required().min(6, 'Your password has to be at least 6 characters long'), username: Yup.string().required().min(2, 'A username is required')
  });
  const getRandomUser = async () => {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json();
    return data.results[0].picture.large;
  }
  const onSignup = async (email, password, username) => {
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully');
      const uid = authUser.user.email;
      await setDoc(doc(db, 'users', uid), {
        owner_uid: uid,
        username,
        email: authUser.user.email,
        profile_picture: await getRandomUser()
      })
    } catch (error) {
      Alert.alert('Oh no!😲...', error.message)
    }
  }
  return (
    <View style={styles.wrapper}>
      <Formik initialValues={{ email: '', password: '', username: '' }} onSubmit={values => {
        onSignup(values.email, values.password, values.username)
      }} validationSchema={SignupFormSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => {
          return <>
            <View style={[
              styles.inputField,
              {
                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
              }
            ]}>
              <TextInput
                placeholder='Email Address'
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
                borderColor: 1 > values.username.length || values.username.length >= 6 ? "#ccc" : 'red'
              }
            ]}>
              <TextInput
                placeholder='Username'
                placeholderTextColor={'#444'}
                // autoCapitalize='none'
                // keyboardType='email-address'
                // textContentType='emailAddress'
                // autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username} />
            </View>
            <View style={[
              styles.inputField,
              {
                borderColor: 1 > values.password.length || values.password.length >= 6 ? "#ccc" : 'red', position: 'relative'
              },
            ]}>
              <TextInput
                placeholder='Password'
                placeholderTextColor={'#444'}
                autoCapitalize='none'
                secureTextEntry={showPassword ? false : true}
                textContentType={'password'}
                autoCorrect={false}
                // autoFocus={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password} />
              <TouchableOpacity style={{ position: 'absolute', right: 10, top: 12, color: '#0096f6'}} onPress={() => setShowPassword(!showPassword)}><Text>{showPassword ? 'hide' : 'show'}</Text></TouchableOpacity>
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#0096f6', fontSize: 15 }}>Forgot Password?</Text>
            </View>
            <Pressable titleSize={20} style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20 }}>Sign Up</Text>
            </Pressable>
            <View style={styles.signupCont}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#0096f6' }}>Log In</Text>
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

export default SignupForm