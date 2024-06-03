import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUers = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const facebookSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, facebookProvider)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser)
            setLoading(false)
            // const userEmail = currentuser?.email || user?.email;
            // const loggedUser = { email: userEmail }
            // // if user exisits then issue a token
            // if (currentuser) {
            //     axiosPublic.post('/jwt', loggedUser)
            //         .then((res) => {
            //             // console.log('token response', res.data)
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token)
            //                 setLoading(false);
            //             }
            //         })
            // }
            // else {
            //     localStorage.removeItem('access-token');
            //     setLoading(false);
            // }
        });

        return () => {
            unSubscribe();
        }

    }, [axiosPublic, user?.email])

    const info = { user, loading, createUers, loginUser, logOut, updateUserProfile, setUser, googleSignIn, facebookSignIn };

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;