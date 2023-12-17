import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import { auth, db } from '../../../firebase';
import { FieldValue, addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, snapshotEqual, where } from 'firebase/firestore';

const UploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'The caption has reached the character limit')
})

const FormikPostUploader = ({ navigation }) => {
    const PLACEHOLDER_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzphXZv4PYs0xwYdMYPxsGsEhcss4Bcxqyqw&usqp=CAU'
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUserName = () => {
        const user = auth.currentUser;
        console.log('---------------------------------')
        console.log(user.email)
        const q = query(collection(db, 'users'), where('owner_uid','==', user.email)); 
        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        })
        return unsubscribe
    }
    useEffect(() => {
       const unsubscribe = getUserName()    

        return()=>{
            unsubscribe()
        }

    }, [])
    const uploadPostFirebase = async (imageUrl, caption) => {
        const getUserFirst = await getDoc(doc(db, 'users', auth.currentUser.email));
        const unsubscribe = await addDoc(collection(getUserFirst.ref, 'posts'), {
                imageUrl,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: auth.currentUser.uid,
                owner_email: auth.currentUser.email,
                caption,
                createdAt: serverTimestamp(),
                likes: 0,
                likes_by_users: [],
                comments: [],
            }).then(() => navigation.goBack())
        return unsubscribe
    };



    return (
        <Formik initialValues={{ caption: '', imageUrl: '' }} onSubmit={values => {
            uploadPostFirebase(values.imageUrl, values.caption)
        }} validationSchema={UploadPostSchema} /* validateOnMount={true} */ >

            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => {
                return <>
                    <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>

                        <Image style={{ width: 100, height: 100, }} source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput style={{ color: 'white', fontSize: 20 }} placeholder='Write a Caption...' placeholderTextColor='gray' multiline={true} onChangeText={handleChange('caption')} onBlur={handleBlur('caption')} value={values.caption} />
                        </View>

                    </View>
                    <Divider width={0.1} orientation='vertical' />
                    <TextInput onChange={e => setThumbnailUrl(e.nativeEvent.text)} style={{ color: 'white', fontSize: 20 }} placeholder='Enter img Url' placeholderTextColor='gray' onChangeText={handleChange('imageUrl')} onBlur={handleBlur('imageUrl')} value={values.imageUrl} />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.imageUrl}</Text>
                    )}
                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            }}

        </Formik>
    )
}

export default FormikPostUploader