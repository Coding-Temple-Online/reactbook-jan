import axios from "axios";
import { collection, getDocs, getDoc, getFirestore, orderBy, query, collectionGroup } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { firebaseApp } from '../firebase/config';

export const DataContext = createContext()

export const DataProvider = ( props ) => {

    const [ posts, setPosts ] = useState([])

    const db = getFirestore()

    const getPosts = useCallback(
      async () => {
        //   const q = query( collection( db, 'posts' ), orderBy( 'dateCreated', 'desc' ) );
          const q = query( collectionGroup( db, 'posts' ) )

          const querySnapshot = await getDocs( q )

          let newPosts = [];
          querySnapshot.forEach(  async doc => {
              const userRef = await getDoc(doc.ref.parent.parent);
              console.log( userRef.data() )

              newPosts.push({
                  id: doc.id,
                  ...doc.data(),
                  user: { ...userRef.data() }
              })
            //   console.log( doc.data() )
            setPosts( newPosts )
          } )


        //   console.log(querySnapshot)
        return querySnapshot;
      },
      [ db ],
    )
    

    useEffect(() =>
    {
        // axios.get('https://fakebook-january-derek.herokuapp.com/api/v1/blog').then(res => setPosts(res.data))
        getPosts()
    }, [ getPosts ])
    
    useEffect(() => {
        console.log(firebaseApp)
    }, [])
    
    

    const values = {
        posts, setPosts
    }

    return (
        <DataContext.Provider value={ values } >
            { props.children }
        </DataContext.Provider>
    )
}