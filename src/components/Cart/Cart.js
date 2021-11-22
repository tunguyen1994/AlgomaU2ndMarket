import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from '../firebase'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import useStyles from './styles'
import { CartContext } from '../../Global/CartContext'
import { CartProd } from './CartProd'
import { PlaceOrder } from '../Checkout/PlaceOrder';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export const Cart = () => {
  const classes = useStyles();
  const history = useHistory();

  // getting current user function
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('UsersData').doc(user.email).get().then(snapshot=>{
                    setUser(snapshot.data().Name);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}

const user = GetCurrentUser();
// console.log(user);

// state of cart products
const [cartProducts, setCartProducts]=useState([]);

// getting cart products from firestore collection and updating the state
useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user){
          db.collection('UsersData').doc(user.email).collection('Cart').onSnapshot(snapshot=>{
                const newCartProduct = snapshot.docs.map((doc)=>({
                    ID: doc.id,
                    ...doc.data(),
                }));
                setCartProducts(newCartProduct);                    
            })
        }
        else{
            console.log('user is not signed in to retrieve cart');
        }
    })
},[])

// console.log(cartProducts);

// getting the qty from cartProducts in a seperate array
const qty = cartProducts.map(cartProduct=>{
    return cartProduct.qty;
})

// reducing the qty in a single value
const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

const totalQty = qty.reduce(reducerOfQty,0);

// console.log(totalQty);

// getting the TotalProductPrice from cartProducts in a seperate array
const price = cartProducts.map((cartProduct)=>{
    return cartProduct.TotalProductPrice;
})

// reducing the price in a single value
const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

const totalPrice = price.reduce(reducerOfPrice,0);

// global variable
let Product;

// cart product increase function
const cartProductInc=(cartProduct)=>{
    // console.log(cartProduct);
    Product=cartProduct;
    Product.qty=Product.qty+1;
    Product.TotalProductPrice=Product.qty*Product.ProductPrice;
    // updating in database
    auth.onAuthStateChanged(user=>{
        if(user){
          db.collection('UsersData').doc(user.email).collection('Cart').doc(cartProduct.ID).update(Product).then(()=>{
                console.log('increment added');
            })
        }
        else{
            console.log('user is not logged in to increment');
        }
    })
}

// cart product decrease functionality
const cartProductDec =(cartProduct)=>{
    Product=cartProduct;
    if(Product.qty > 1){
        Product.qty=Product.qty-1;
        Product.TotalProductPrice=Product.qty*Product.ProductPrice;
         // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
              db.collection('UsersData').doc(user.email).collection('Cart').doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('decrement');
                })
            }
            else{
                console.log('user is not logged in to decrement');
            }
        })
    }
}

 // state of totalProducts
 const [totalProducts, setTotalProducts]=useState(0);
 // getting cart products   
 useEffect(()=>{        
     auth.onAuthStateChanged(user=>{
         if(user){
          db.collection('UsersData').doc(user.email).collection('Cart').onSnapshot(snapshot=>{
                 const qty = snapshot.docs.length;
                 setTotalProducts(qty);
             })
         }
     })       
 },[])

  /* const handleToken = async(token) =>{
    const cart = {name: 'All Products', totalPrice}
    const response = await axios.post()
    const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
    console.log(response);
    let {status}=response.data;
    console.log(status);
    if(status==='success'){
        history.push('/');
        toast.success('Your order has been placed successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          
          const uid = auth.currentUser.uid;
          const carts = await fs.collection('Cart ' + uid).get();
          for(var snap of carts.docs){
              fs.collection('Cart ' + uid).doc(snap.id).delete();
          }
    }
    else{
        alert('Something went wrong in checkout');
    }
  } */

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your shopping cart,
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
  );
  
  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} /> 
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
        {cartProducts.length > 0 && (
          <div className='container-fluid'>
            <div className={classes.productBox}>
              <CartProd cartProduct={cartProducts} cartProductInc={cartProductInc} cartProductDec={cartProductDec} />
            </div>
            <br/>
            <div className={classes.sumBox}>
              <Typography variant="h4">Cart Summary</Typography>
              <br></br>
              <div>Total Number of Products: <span>{totalQty}</span></div>
              <div>Total Price: <span>{totalPrice}</span></div>
              <Button className={classes.checkoutButton} component={Link} to="/placeorder" size="large" type="button" variant="contained" color="primary">Place Order and Pick up at School</Button>
            </div>
          </div>
        )}
        {cartProducts.length < 1 &&(
          renderEmptyCart()
        )}
      
    </>
  )
} 

/* export const Cart = ({ user }) => {
  const classes = useStyles();
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

  const history = useHistory();

  useEffect(() => {
      auth.onAuthStateChanged(user => {
          if (!user) {
              history.push('/login');
          }
      })
  })

  return (
      <>
          <Navbar user={user} />
          <>
              {shoppingCart.length !== 0 && <h1>Cart</h1>}
              <div className={classes.cartContainer}>
                  {
                      shoppingCart.length === 0 && <>
                          <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                          <div><Link to="/">Return to Home page</Link></div>
                      </>
                  }
                  {shoppingCart && shoppingCart.map(cart => (
                      <div className={classes.cartCard} key={cart.ProductID}>

                          <div className={classes.cartImg}>
                              <img src={cart.ProductImg} alt="not found" />
                          </div>

                          <div className={classes.cartName}>{cart.ProductName}</div>

                          <div className={classes.cartPriceRaw}>$ {cart.ProductPrice} CAD</div>

                          <div className={classes.Inc} onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                              <Icon icon={ic_add} size={24} />
                          </div>

                          <div className='quantity'>{cart.qty}</div>

                          <div className={classes.Dec} onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                              <Icon icon={ic_remove} size={24} />
                          </div>

                          <div className={classes.cartPrice}>
                              Rs {cart.TotalProductPrice}.00
                          </div>

                          <button className={classes.cartBtnDelete} onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                              <Icon icon={iosTrashOutline} size={24} />
                          </button>
                      </div>
                  ))
                  }
                  {shoppingCart.length > 0 && <div className='cart-summary'>
                      <div className={classes.cartSumHeadin}>
                          Cart-Summary
                      </div>
                      <div className={classes.cartSumPrice}>
                          <span>Total Price</span>
                          <span>{totalPrice}</span>
                      </div>
                      <div className={classes.cartSumPrice}>
                          <span>Total Qty</span>
                          <span>{totalQty}</span>
                      </div>
                      <Link to='cashout' className={classes.checkOutLink}>
                          <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                              Cash on delivery
                      </button>
                      </Link>
                  </div>}
              </div>
          </>
      </>
  )
} */