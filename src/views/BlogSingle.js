import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BlogSingle extends Component
{
    constructor ()
    {
        super()

        this.state = {
            p: {}
        }
    }

    componentDidMount()
    {
        let paramId = window.location.pathname.split('/')[ 2 ]

        axios.get( `https://fakebook-january-derek.herokuapp.com/api/v1/blog/${ paramId }` ).then(res => this.setState({ p: res.data }))
    }

    render()
    {
        const p = this.state.p;

        return (
            <main className='container' data-testid="blog-single-test">

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

            </main>
        )
    }
}
