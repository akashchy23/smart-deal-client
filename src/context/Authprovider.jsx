import React, { useEffect, useState } from 'react';
import { Authcontext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider()
const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInuser = (email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInwihGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    console.log(user)
    useEffect(()=>{
          const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
          })
          return ()=>{
            unSubscribe()
          }
    },[])
    const authInfo = {
        createUser,
        signInuser,
        signInwihGoogle,
        user,
        loading,
        logOut
    }
    return (
        <Authcontext value={authInfo}>{children}</Authcontext>
    );
};

export default Authprovider;