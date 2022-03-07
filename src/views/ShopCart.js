import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopCartItem } from '../components/ShopCartItem'
import { DataContext } from '../contexts/DataProvider'

export const ShopCart = () => {

  const { cart } = useContext( DataContext )

  const handleCheckout = ( e ) => {
    e.preventDefault()
    
    fetch( 'https://fakebook-january-derek.herokuapp.com/api/v1/products/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartData: cart.items, redirect: `${ window.location.protocol }//${ window.location.host }` })
    } )
      .then( res => res.json() )
      .then( data => {
        console.log( data )

        // redirect to the Stripe Popup Checkout session
        window.location.href = data.sessionURL
      } )
    
  }

  return (
    <React.Fragment>
      <h1>
        Cart
        <span className="float-right">
          <form onSubmit={ (e) => handleCheckout( e ) }>
            <input id="checkout-button" type="submit" className="btn btn-primary" value="Checkout" />
          </form>
        </span>
      </h1>
      <hr />

      <div className="card shopping-cart">
        <div className="card-header bg-dark text-light">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping Cart
          <Link to='/shop/products' className="btn btn-outline-info btn-sm pull-right float-right">Continue Shopping</Link>
          <div className="clearfix"></div>
        </div>
        <div className="card-body">

          { cart.items.map( item => <ShopCartItem key={ item.id } data={ item } /> ) }

        </div>
        <div className="card-footer">
          <div className="text-right">
            <div className="cart-totals">
              Subtotal: <b> {`$${ (cart.subtotal / 100).toFixed( 2 ) }`} </b>
            </div>
            <div className="cart-totals">
              Tax: <b>{`$${ 0 }`}</b>
              {/* Tax: <b>{`$${ cart.tax }`}</b> */}
            </div>
            <div className="cart-totals">
              Grand total: <b>{`$${ (cart.grandtotal / 100).toFixed( 2 ) }`}</b>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
