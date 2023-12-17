import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { USERS } from '../../../data/users.js';

export default function Stories() {
    return (
        <View style={{ marginBottom: 13, }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {USERS.map((story, index) => {
                    return (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Image source={{ uri: story.image }} style={styles.story} />
                            <Text style={{ color: 'white' }}>
                                {story.user.length > 11 ? story.user.slice(0, 8).toLowerCase() + '...' : story.user.toLowerCase()}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
            {/* <Text style={{ color: 'white' }}>Stories</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 3,
        borderColor: '#ff8501',
    }
})