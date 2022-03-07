import React, { useContext, useEffect, useState } from 'react'
import { BlogList } from '../components/BlogList'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const Profile = () =>
{
  // console.log('first thing')
  const { currentUser } = useAuth()
  const { posts, addPost } = useContext(DataContext)
  const [filteredPosts, setfilteredPosts] = useState([])
  const db = getFirestore()

  // console.log( currentUser )

  const handleSubmit = async (e) =>
  {
    e.preventDefault()

    let formData = {
      body: e.target.status.value,
      dateCreated: serverTimestamp(),
    }

    addPost(formData)

    e.target.status.value = ''
  }

  // useEffect always run once the component renders
  useEffect(() => {
    // console.log(currentUser.id)
    let filteredPosts = posts.filter( p => p.user.id === currentUser.id )
    // let filteredPosts = posts.filter( p => p.user.id === currentUser.id )
    setfilteredPosts( filteredPosts )
    // console.log(filteredPosts)
  }, [ currentUser.id, posts ])
  

  return (
    <React.Fragment>

      <div className="row">
        <div className="col-2 offset-5">
          <img className='img-fluid' src={ currentUser.image } alt={ currentUser.name } />  
        </div>  
      </div>

      <hr />

      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-10">
            <div className="form-group">
              <input type="text" className="form-control" name='status' placeholder='Type status here' />
            </div>
          </div>
          <div className="col-2">
            <input type="submit" value="Post" className='btn btn-info btn-block' />
          </div>
        </div>
      </form>

      <hr />

      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            <BlogList posts={filteredPosts} />
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}