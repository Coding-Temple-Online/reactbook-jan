import React, { useContext } from 'react'
import { BlogList } from '../components/BlogList'
import { DataContext } from '../contexts/DataProvider'
import { serverTimestamp } from 'firebase/firestore'

export const Home = () =>
{
    const { posts, addPost } = useContext( DataContext )
    
    const handleSubmit = async ( e ) => {
        e.preventDefault()
        
        let formData = {
            body: e.target.status.value,
            dateCreated: serverTimestamp(),
        }

        addPost( formData )
        
        e.target.status.value = ''
    }

    return (
        <React.Fragment>
            <form action="" onSubmit={ ( e ) => handleSubmit( e ) }>
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
                        <BlogList posts={ posts } />
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}