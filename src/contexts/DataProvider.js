import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { firebaseApp } from '../firebase/config';

export const DataContext = createContext()

export const DataProvider = ( props ) => {

    const [ posts, setPosts ] = useState([])
    useEffect(() =>
    {
        axios.get('https://fakebook-january-derek.herokuapp.com/api/v1/blog').then(res => setPosts(res.data))
    }, [])
    
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