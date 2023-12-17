import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { BottomIcons, BottomTabs, Header, Post, Stories } from '../../components'
import { POSTS } from '../../data/posts'
import { collectionGroup, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  let tempArr = [];
  useEffect(() => {
    (async () => {
      const unsub = onSnapshot(collectionGroup(db, 'posts'), doc => {
        tempArr = []
        doc.forEach(data => {
          tempArr.push({ ...data.data(), id: data.id })
        })
        setPosts(tempArr)
      })
    })()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <Stories />
        {/* {posts?.map((post, index) => {
          return <Post post={post} key={index} />;
        })} */}
        {posts.map((post, index) => {
          console.log(post.profile_picture);
          return <Post post={post} key={index} />;
        })}
      </ScrollView>
      <BottomTabs icons={BottomIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    // marginTop: 25,
    paddingTop: 25,
  }
})

export default HomeScreen
