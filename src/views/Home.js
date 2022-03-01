import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>Home</div>
  )
}

export default class Home extends Component {

    constructor() {
        super()

        console.log('constructed')

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        console.log('mounted')
        // fetch( 'https://fakebook-january-derek.herokuapp.com/api/v1/blog' )
        //     .then( res => res.json() )
        //     .then( data => console.log(data) )

        axios.get( 'https://fakebook-january-derek.herokuapp.com/api/v1/blog' ).then( res => this.setState( { posts: res.data } ) )
    }
    
  render() {
      console.log('rendered')
    return (
        <React.Frament>
            <form action="">
                <div className="row">
                    <div className="col-10">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder='Type status here' />
                        </div>
                    </div>
                    <div className="col-2">
                        <input type="button" value="Post" className='btn btn-info btn-block' />
                    </div>
                </div>
            </form>

            <hr />

            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        { this.state.posts.map( p => (
                            <li key={ p.id } className="list-group-item">
                                <div>
                                    <Link to={ `/blog/${ p.id }` }>{ p.body }</Link>
                                    <span className="float-right">
                                        <small>
                                            { moment( p.date_created ).fromNow() }
                                        </small>
                                    </span>
                                </div>
                                <div>
                                    <cite> &mdash; {`${ p.user_id.first_name } ${ p.user_id.last_name }` }</cite>
                                </div>
                            </li>
                        ) ) }
                    </ul>
                </div>
            </div>
        </React.Frament>
    )
}
