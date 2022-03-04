import { serverTimestamp } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { BlogList } from '../components/BlogList'
import { useAuth } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'

export const Profile = () =>
{

  const { currentUser } = useAuth()
  const { addPost } = useContext(DataContext)
  const [ filteredPosts, setFilteredPosts ] = useState([])
  const { posts } = useContext(DataContext)


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

  useEffect(() => {
    console.log(posts)
    let filteredPosts = posts.filter( p => p.user.id === currentUser.id )
    setFilteredPosts( filteredPosts )
  }, [ currentUser.id, posts ])
  

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2 offset-5 mb-4">
          <img src={currentUser.image} alt={currentUser.name} className="img-fluid" />
        </div>
      </div>

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
            <BlogList posts={ filteredPosts } />
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}
