import React, {useState, useEffect} from "react";
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {Icon} from 'react-icons-kit'

import useStyles from './styles'
import { auth, db } from "../../firebase";

export const CartItem = ({ product, cartProductInc, cartProductDec }) =>{
    const classes = useStyles();

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

    const handleCartProductInc=()=>{
        cartProductInc(product);
    }

    const handleCartProductDec=()=>{
        cartProductDec(product);
    }

    const hhandleCartProductRemove=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('UsersData').doc(user.email).collection('Cart').doc(product.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }
    return(
        <Card className='cart-item'>
            <CardMedia image={product.ProductImg} alt={product.ProductName} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='h4'>{product.ProductName}</Typography>
                <Typography variant='h5'>${product.ProductPrice}</Typography>
            </CardContent>
            <Typography variant='h6'>{product.ProductDes}</Typography>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={handleCartProductDec}><Icon icon={minus} size={20}/></Button>
                    <Typography>&nbsp;{product.qty}&nbsp;</Typography>
                    <Button type='button' size='small' onClick={handleCartProductInc}><Icon icon={plus} size={20}/></Button>
                </div>
                <div>$ {product.TotalProductPrice} CAD</div>
                <Button variant='contained' type='button' color='secondary' onClick={hhandleCartProductRemove}>Remove</Button>
            </CardActions>
        </Card>
    )
}