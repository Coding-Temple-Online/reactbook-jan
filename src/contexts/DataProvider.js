import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc } from "firebase/firestore";
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
            const q = query(collectionGroup(db, 'posts'))

            const querySnapshot = await getDocs(q)

            let newPosts = [];
            querySnapshot.forEach(async doc =>
            {
                const userRef = await getDoc(doc.ref.parent.parent);
                console.log(userRef.data())

                newPosts.push({
                    id: doc.id,
                    ...doc.data(),
                    user: { ...userRef.data() }
                })
                setPosts( posts.concat(newPosts) )
            })

            return querySnapshot;
        },
        [ db ],
    )

    const addPost = async (formData) =>
    {
        let collectionRef = await collection(db, `users/${ currentUser.id }/posts`)


        await addDoc(collectionRef, formData)
        setPosts([ ...posts ])
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