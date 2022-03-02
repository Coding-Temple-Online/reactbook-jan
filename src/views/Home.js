import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BlogList } from '../components/BlogList'
import { DataContext } from '../contexts/DataProvider'

export const Home = () =>
{
    const { posts, setPosts } = useContext( DataContext )
    
    const handleSubmit = ( e ) => {
        e.preventDefault()
        // console.log( e.target.status.value )
        let formData = {
            body: e.target.status.value,
            user_id: 2
        } 
        e.target.status.value = ''
        axios.post('https://fakebook-january-derek.herokuapp.com/api/v1/blog', formData).then( res => setPosts( [ res.data, ...posts ] ) )
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