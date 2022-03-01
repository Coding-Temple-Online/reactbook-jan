import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'

export const BlogSingle = () =>
{
    const [p, setP] = useState({})
    const match = useMatch("/blog/:id")
    const paramId = match.params.id

    console.log(match)

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
                                        {moment(p.date_created).fromNow()}
                                    </small>
                                </span>
                            </div>
                            <div>
                                <cite> &mdash; {`${ p.user_id?.first_name } ${ p.user_id?.last_name }`}</cite>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
