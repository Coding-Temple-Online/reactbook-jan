import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const BlogPost = ( props ) =>
{
    const p = props.post
    return (
        <li className="list-group-item">
            <div>
                <Link to={`/blog/${ p.id }`}>{p.body}</Link>
                <span className="float-right">
                    <small>
                        {moment(p.date_created).fromNow()}
                    </small>
                </span>
            </div>
            <div>
                <cite> &mdash; {`${ p.user_id.first_name } ${ p.user_id.last_name }`}</cite>
            </div>
        </li>
    )
}
