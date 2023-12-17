import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { SignupForm } from '../../components'

const instagramLogo = 'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-512.png'
export default function SignupScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: instagramLogo }} height={100} width={100} />
            </View>
            <SignupForm navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60
    },
})