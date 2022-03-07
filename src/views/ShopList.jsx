import React, { useContext, useEffect, useState } from 'react'
import { ShopProduct } from '../components/ShopProduct'
import { DataContext } from '../contexts/DataProvider'

export const ShopList = () =>
{

    const { products } = useContext( DataContext )
    

    return (
        <React.Fragment>
            <div className="row">

                {products.map(product => <ShopProduct key={product.id} product={ product } /> ) }

            </div>
        </React.Fragment>
    )
}
