import React, { Component } from 'react'

export default class App extends Component {
  // lifecycle method
  // constructor() {

  // }

  // lifecycle method
  // componentDidMount() {

  // }

  // lifecycle method
  render() {
    return (
      <React.Fragment>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href=".">Reactbook</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href=".">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href=".">Profile</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-expanded="false">Shop</a>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <a className="dropdown-item" href=".">Products</a>
                    <a className="dropdown-item" href=".">Cart</a>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="." className="nav-link">Login</a>
                </li>
                <li className="nav-item">
                  <a href="." className="nav-link">Register</a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

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
        
        <footer>

        </footer>
      </React.Fragment>
    )
  }
}
