import React, { useEffect, useState } from 'react';
import { Products } from './Products/Products'
import { Navbar } from './Navbar/Navbar'
import './Home.css'
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom';

export const Home = (props) => {
    const history = useHistory();

   // getting current user uid
   function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
    }

    const uid = GetUserUid();

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
    function GetCurrentUser(){
        const [userEmail, setUserEmail]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('UsersData').doc(user.email).get().then(snapshot=>{
                        setUserEmail(snapshot.data().Email);
                    })
                }
                else{
                    setUserEmail(null);
                }
            })
        },[])
        return userEmail;
        }
    
        const userEmail = GetCurrentUser();

    // state of products
    const [products, setProducts]=useState([]);

    // getting products function
    const getProducts = async ()=>{
    const products = await db.collection('Products').get();
    const productsArray = [];
    for (var snap of products.docs){
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
            ...data
        })
        if(productsArray.length === products.docs.length){
            setProducts(productsArray);
        }
    }
    }

    useEffect(()=>{
    getProducts();
    },[])

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

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
    if(uid !== null){
        // console.log(product);
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice'] = Product.qty * Product.ProductPrice;
        db.collection('UsersData').doc(userEmail).collection('Cart').doc(product.ID).set(Product).then(()=>{
            console.log('successfully added to cart');
        })

    }
    else{
        props.history.push('/login');
    }

    }
    
    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
        </>
    )
}