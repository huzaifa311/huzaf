import { View, TouchableOpacity, Image, StyleSheet, } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const Icon = ({ icon }) => {
        return (
            <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
                <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inActive }} style={[
                    styles.icon,
                    icon.name === 'profile' ? styles.profilePic() : null,
                    activeTab === 'profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null]} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => {
                    return <Icon key={index} icon={icon} />
                })}
            </View>
        </View>
    )
}

export const BottomIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inActive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inActive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png'
    },
    {
        name: "reels",
        active: 'https://img.icons8.com/ios-filled/500/ffffff/instagram-reel.png',
        inActive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'
    },
    {
        name: 'shop',
        active: 'https://img.icons8.com/fluency-systems-filled/500/ffffff/shopping-bag-full.png',
        inActive: 'https://img.icons8.com/fluency-systems-regular/500/ffffff/shopping-bag-full.png'
    },
    {
        name: 'profile',
        active: 'https://firebasestorage.googleapis.com/v0/b/react-blog-42ef4.appspot.com/o/profileImagesHuzaifaPic.jpg?alt=media&token=0130cca1-9274-4561-829d-d6201411c8e5',
        inActive: 'https://firebasestorage.googleapis.com/v0/b/react-blog-42ef4.appspot.com/o/profileImagesHuzaifaPic.jpg?alt=media&token=0130cca1-9274-4561-829d-d6201411c8e5'
    },
]

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10
    },
    wrapper: {
        width: '100%',
        zIndex: 100,
        backgroundColor: '#000'
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: activeTab === 'profile' ? 2 : 0
    })
})

export default BottomTabs