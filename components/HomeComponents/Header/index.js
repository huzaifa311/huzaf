import React from 'react'
import { signOut } from "firebase/auth";
import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Image, Text } from 'react-native'
import { auth } from '../../../firebase';

const handleSignOut = async () => {
    try {
        await signOut(auth);
        console.log('signed out successfully');
    } catch (error) {
        console.log(error.message);
    }
}

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <TouchableOpacity>

                <Image style={styles.logo} source={require('../../../assets/igLogo1.png')}></Image>

            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{ color: 'white', marginLeft: 10, height: 30 }}>SignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png',
                        }}
                        style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
                        }}
                        style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>9+</Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png',
                        }}
                        style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        // paddingTop: 20,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
        // backgroundColor: 'white'
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600',
    },
})

export default Header
