import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { useAuth } from './contexts/AuthProvider'
import { BlogSingle } from './views/BlogSingle'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { Profile } from './views/Profile'
import { Register } from './views/Register'
import { ShopCart } from './views/ShopCart'
import { ShopList } from './views/ShopList'
import { Unauthorized } from './views/Unauthorized'

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
        <Navbar />
      </header>

      <main className='container'>
        {
          !currentUser.loggedIn
          ?
            <Unauthorized />
          :
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
        }
      </main>

      <footer>

      </footer>
    </React.Fragment>
  )
}
