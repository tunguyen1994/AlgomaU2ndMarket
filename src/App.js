import React, { Component } from 'react'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';
import { Home } from './components/Home'
import { Signup } from './components/Authentication/Signup'
import { Login } from './components/Authentication/Login';
import { AddProduct } from './components/Products/Product/AddProduct';
import { Cart } from './components/Cart/Cart';
import { ProductsContextProvider } from './Global/ProductContext';
import { AuthProvider } from './components/contexts/AuthContext';
import { CartContextProvider } from './Global/CartContext';

export const App = () => {
  
  return (
    <BrowserRouter>
        <CssBaseline />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/cart' component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;