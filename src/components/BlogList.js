import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { BlogPost } from './BlogPost'
import { DataContext } from '../contexts/DataProvider'


export const BlogList = ( props ) =>
{

    const { posts } = useContext( DataContext )

    return (
        <React.Fragment>
            { posts.map(p => <BlogPost post={ p } key={p.id} /> ) }
        </React.Fragment>
    )
}
