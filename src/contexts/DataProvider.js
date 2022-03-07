import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc, orderBy } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = (props) =>
{

    const [ posts, setPosts ] = useState([])
    const { currentUser } = useAuth()
    const db = getFirestore()

    // loop over posts collection and setPosts
    const getPosts = useCallback(
        async () =>
        {
            const q = query( collectionGroup(db, 'posts'), orderBy( 'dateCreated', 'desc' ) )

            const querySnapshot = await getDocs(q)

            let newPosts = [];
            querySnapshot.forEach(async doc =>
            {
                const userRef = await getDoc(doc.ref.parent.parent);

                newPosts.push({
                    id: doc.id,
                    ...doc.data(),
                    user: { id: userRef.id, ...userRef.data() }
                })
                setPosts( posts.concat(newPosts) )
            })

            return querySnapshot;
        },
        [ db ],
    )

    const addPost = async (formData) =>
    {
        let collectionRef = await collection( db, `users/${ currentUser.id }/posts` )
        const docRef = await addDoc( collectionRef, formData )
        const newDoc = await getDoc( docRef )
        const userRef = await getDoc( docRef.parent.parent );
        let newPost = { 
            id: newDoc.id, 
            ...newDoc.data(), 
            user: { 
                ...userRef.data() 
            } 
        }
        setPosts([ newPost, ...posts ])
    }


    useEffect(() =>
    {
        getPosts()
    }, [ getPosts ])

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        posts, setPosts, addPost
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}