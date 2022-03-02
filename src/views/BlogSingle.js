import axios from 'axios'
import { collectionGroup, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'

export const BlogSingle = () =>
{
    const [p, setP] = useState({})
    const match = useMatch("/blog/:id")
    const paramId = match.params.id

    const db = getFirestore()
    
    const getPost = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'posts'))

            const querySnapshot = await getDocs(q)

            // let newPosts = [];
            querySnapshot.forEach(async doc =>
            {
                const userRef = await getDoc(doc.ref.parent.parent);
                // console.log(userRef.data())

                if ( doc.id === paramId) {
                    setP({
                        id: doc.id,
                        ...doc.data(),
                        user: { ...userRef.data() }
                    })
                }
            })
        },  
        [ paramId ],
    )

    useEffect( () => {
        // const docRef = doc( db, 'posts', paramId )
        // console.log(docRef)
        // const docSnapShot = await getDoc(docRef )
        // console.log(docSnapShot.exists())
        // console.log(docSnapShot.data())
        getPost();
    }, [ getPost ])
    

    useEffect(() => {
        axios.get(`https://fakebook-january-derek.herokuapp.com/api/v1/blog/${ paramId }`).then(res => setP( res.data ))
      
    }, [paramId])
    


    return (
        <React.Fragment>
            <Link to="/">&laquo; Go Back</Link>

            <hr />

            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        <li key={p.id} className="list-group-item">
                            <div>
                                {p.body}
                                <span className="float-right">
                                    <small>
                                        {moment(p.date_created.toDate()).fromNow()}
                                    </small>
                                </span>
                            </div>
                            <div>
                                <cite> &mdash; {`${ p.user.name }`}</cite>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
