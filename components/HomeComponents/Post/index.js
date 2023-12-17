import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';

export default function Post({ post }) {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            {/* <Text style={{color:'white'}}>Posts</Text> */}
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter />
                {/* <Likes post={post} /> */}
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: post.profile_pic }} style={styles.story} />
                <Text style={{ color: 'white', marginLeft: 5, fontWeight: 700 }}>{post.user}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: 900 }}>...</Text>
        </View>
    );
};

const PostImage = ({ post }) => {
    return (
        <View style={{ width: '100%', height: 450 }}>
            <Image source={{ uri: post.imageUrl }} style={{
                height: '100%', resizeMode: 'cover'
            }} />
        </View>
    )
}

const PostFooter = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.leftFooterIconsContainer}>
                <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[0].imageUrl} />
                <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[1].imageUrl} />
                <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={PostFooterIcons[2].imageUrl} />
            </View>
            <View>
                <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[3].imageUrl} />
            </View>
        </View>
    )
}

const PostFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_like-256.png',
        likedImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BvtpdZEHWnN29p81xKFtERi9WSAkY6_2Yg&usqp=CAU'
    },
    {
        name: 'Comment',
        imageUrl: 'https://cdn0.iconfinder.com/data/icons/social-media-logo-4/32/Social_Media_instagram_comment-512.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://cdn1.iconfinder.com/data/icons/instagram-23/512/182_Instagram_Sets_Share-256.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://cdn3.iconfinder.com/data/icons/instagram-latest/1000/Instagram_save_archive-256.png',
    },
]

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ post }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>{post.likes_by_user.length.toLocaleString('en')} likes</Text>
        </View>
    )
}

const Caption = ({ post }) => {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={{ color: 'white' }}>
                <Text style={{ fontWeight: '900' }}>{post.user}{' '}</Text>
                <Text style={{ fontWeight: '400' }}> {post.caption}</Text>
            </Text>
        </View>
    )
}

const CommentSection = ({ post }) => {
    return (
        <View style={{ marginTop: 5 }}>
            {!!post?.comments?.length && (
                <Text style={{ color: 'gray' }}>
                    View {post?.comments?.length > 1 ? 'all ' : ''}{post?.comments?.length} {post?.comments?.length > 1 ? 'comments' : 'comment'}
                </Text>
            )}
        </View>
    )
}

const Comments = ({ post }) => {
    return <>
        {post.comments.map((comment, index) => {
            return (
                <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: 'white' }}>
                        <Text style={{ fontWeight: '600' }}>{comment.user}{'  '}</Text>
                        {comment.comment}
                    </Text>
                </View>
            )
        })}
    </>
}

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    },
    shareIcon: {
        marginTop: 1
    }
})