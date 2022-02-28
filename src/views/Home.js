import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
        <main className='container'>

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
                        <li className="list-group-item">
                            <div>
                                Post Body
                                <span className="float-right">
                                    <small>
                                        3 seconds ago
                                    </small>
                                </span>
                            </div>
                            <div>
                                <cite> &mdash; Author Name</cite>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </main>
    )
  }
}
