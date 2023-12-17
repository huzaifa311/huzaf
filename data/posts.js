import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: 'https://scontent.fkhi2-2.fna.fbcdn.net/v/t1.6435-9/38289250_313327142743677_2430973578552803328_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7a1959&_nc_ohc=FSt3fG35ozcAX-tqaas&_nc_oc=AQnrG0orO6j8rzat6h0g4wdT2DWYXLwQz1GcsQMS2RIKTMwDNGajahMgGNru-vrrGwY&_nc_ht=scontent.fkhi2-2.fna&oh=00_AfBpdjhUpuIG4Vs4S_F-uK4fRt9MubvVTb_-jMFD7-j8mA&oe=658D6631',
        user: USERS[1].user,
        likes: 7878,
        caption: 'Debugging: being the detective in a crime movie where you are also the murderer.',
        profile_pic: USERS[1].image,
        comments: [
            {
                user: 'Daniyal',
                comment: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.'
            },
            {
                user: 'Taha',
                comment: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.'
            },
        ]
    },
    {
        imageUrl: 'https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-6/343969608_610204037450067_8156718055992456274_n.jpg?stp=dst-jpg_p960x960&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZqH0XGSj51wAX9EGjKk&_nc_ht=scontent.fkhi2-2.fna&oh=00_AfBAbEFN-hriHnH-ZTtpHL_XAuMYjVHE0TxcAEGXB2rlIw&oe=6569F1F6',
        user: USERS[4].user,
        likes: 3156,
        caption: 'Darkness cannot drive out darkness',
        profile_pic: USERS[4].image,
        comments: [
            {
                user: 'Anas',
                comment: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.'
            }
        ]
    },
]