import React, { createContext } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AuthContext, useAuth } from './contexts/AuthProvider'
import { BlogSingle } from './views/BlogSingle'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { Profile } from './views/Profile'
import { Register } from './views/Register'
import { ShopCart } from './views/ShopCart'
import { ShopList } from './views/ShopList'

export const App = () =>
{

  // const { signIn } = createContext( AuthContext )
  const { signIn, currentUser, logOut } = useAuth()

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   signIn();
  // }

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Reactbook</Link>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/profile">Profile</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="." id="dropdownId" data-toggle="dropdown" aria-expanded="false">Shop</a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <Link className="dropdown-item" to="/shop">Products</Link>
                  <Link className="dropdown-item" to="/shop/cart">Cart</Link>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {/* { condition ? condition to execute if true : condition to execute if false } */}
              
              {
                !currentUser.loggedIn
                ?
                <li className="nav-item">
                  <Link onClick={ () => signIn() } to="." className="nav-link">Login</Link>
                </li>
                :
                <li className="nav-item">
                  <Link onClick={ () => logOut() } to="." className="nav-link">Logout</Link>
                </li>
              }
            </ul>
          </div>
        </nav>
      </header>

      <main className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/auth/login' element={<Login />} />
          <Route exact path='/auth/register' element={<Register />} />
          <Route exact path='/auth/profile' element={<Profile />} />
          <Route exact path='/shop/cart' element={<ShopCart />} />
          <Route exact path='/shop' element={<ShopList />} />
          {/* <Route exact path='/shop/:id' element={<ShopSingle />} /> */}
          <Route exact path='/blog/:id' element={<BlogSingle />} />
        </Routes>
      </main>

      <footer>

      </footer>
    </React.Fragment>
  )
}
