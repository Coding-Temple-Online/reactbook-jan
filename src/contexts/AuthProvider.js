import { createContext, useContext, useEffect, useState } from "react";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext()

// to make your own React Hook
export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {

    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    
    function signIn() {
        return setPersistence( auth, browserLocalPersistence )
                .then( () => {
                    signInWithPopup( auth, provider )
                        .then( result => {
                            console.log( result )
                        } )
                } )
                .catch( err => console.error( err ) )
    }

    function logOut() {
        signOut( auth )
            .then( () => {
                setCurrentUser({ loggedIn: false })
                console.log( 'User logged out successfully' )
            } )
    }

    useEffect(() => {
        onAuthStateChanged( auth, ( user ) => {
            if ( user ) {
                setCurrentUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            }
        } )
    }, [ auth ])
    

    const values = {
        signIn, currentUser, logOut
    }

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )

}