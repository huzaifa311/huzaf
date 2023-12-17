import React from 'react'
import { SignedInStack, SignedOutStack } from './Navigation'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const userHandler = user=>{
        user? setCurrentUser(user) : setCurrentUser(null)
    }
    useEffect(() => {
        return onAuthStateChanged(auth, user => userHandler(user))
    }, [])
    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation