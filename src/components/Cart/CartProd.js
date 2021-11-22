import React from 'react'
import { CartItem } from "./CartItem/CartItem"
export const CartProd = ({cartProduct, cartProductInc, cartProductDec}) => {
    return cartProduct.map((cartP) =>(
        <CartItem key={cartP.ID} product={cartP}
        cartProductInc={cartProductInc}
        cartProductDec={cartProductDec}
        />
    ))
}
