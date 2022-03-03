import { collectionGroup, getDoc, getDocs, getFirestore, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'

export const BlogSingle = () =>
{
    const [p, setP] = useState({})
    // pull the parameter id from the url
    const match = useMatch("/blog/:id")
    const paramId = match.params.id

    // just so we won't get any ugly 'undefined' messages before our data loads, we're going to create a loading state that
    // shows text instead of 'undefined'
    const [loadingState, setloadingState] = useState(false)

    const db = getFirestore()
    
    const getPost = useCallback(
        async () => {
            // firebase 'users' collection has 'posts' subcollection
            // here we are pulling all subcollections with a name of 'posts'
            const q = query(collectionGroup(db, 'posts'))

            // get all the documents from the query
            const querySnapshot = await getDocs(q)

            // loop through posts 
            querySnapshot.forEach(async doc =>
            {
                // get the current user's posts
                const userRef = await getDoc(doc.ref.parent.parent);
                // console.log(userRef.data())

                // if the document is found set the post data
                if ( doc.id === paramId ) {

                    setP({
                        id: doc.id,
                        ...doc.data(),
                        user: { ...userRef.data() }
                    })

                    setloadingState(true)
                }
            })
        },  
        [ paramId ],
    )

    useEffect( () => {
        getPost();
    }, [ getPost ])
    
    // no longer pulling posts from our api
    // useEffect(() => {
    //     axios.get(`https://fakebook-january-derek.herokuapp.com/api/v1/blog/${ paramId }`).then(res => setP( res.data ))
    // }, [paramId])

    return (
        <React.Fragment>
            <Link to="/">&laquo; Go Back</Link>

            <hr />

            <div className="row">
                <div className="col-12">
                   {
                       !loadingState
                       ?
                        <h2>Loading post...</h2>
                       :
                        <ul className="list-group">
                            <li key={p.id} className="list-group-item">
                                <div>
                                    {p.body}
                                    <span className="float-right">
                                        <small>
                                            {moment(p.dateCreated?.toDate()).fromNow()}
                                        </small>
                                    </span>
                                </div>
                                <div>
                                    <cite> &mdash; {`${ p.user?.name }`}</cite>
                                </div>
                            </li>
                        </ul>
                   }
                </div>
            </div>
        </React.Fragment>
    )
}
