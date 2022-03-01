import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ( props ) => {

    const [ posts, setPosts ] = useState([])

    useEffect(() =>
    {
        axios.get('https://fakebook-january-derek.herokuapp.com/api/v1/blog').then(res => setPosts(res.data))
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