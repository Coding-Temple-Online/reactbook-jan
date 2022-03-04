import React, { useContext } from 'react'
import { BlogPost } from './BlogPost'
import { DataContext } from '../contexts/DataProvider'


export const BlogList = ( props ) =>
{

    // const { posts } = useContext( DataContext )

    return (
        <React.Fragment>
            { props.posts.map(p => <BlogPost post={ p } key={p.id} /> ) }
        </React.Fragment>
    )
}
