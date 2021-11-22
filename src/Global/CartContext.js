import React, { createContext, useReducer } from "react";
import { CartManage } from './CardManage'

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(CartManage, { shoppingCart: [], totolPrice: 0, totalQty: 0 })
    return(
        <CartContext.Provider value = {{...cart, dispatch}}>
            {props.children}
        </CartContext.Provider>
    )
}