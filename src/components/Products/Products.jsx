import React, { useContext } from 'react'
import { CartContext } from '../../Global/CartContext';
import { ProductsContext } from '../../Global/ProductContext'
import {Product} from './Product/Product'
import Grid from '@material-ui/core/Grid';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './style';

export const Products = ({products, addToCart}) => {
    const classes = useStyles;
    return products.map((product) =>(
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <Product key = {product.ID} product={product} addToCart={addToCart} />
            </Grid>
        </Grid>
        </main> 
    ))
}

/* export const Products = () =>{
    const classes = useStyles();
    const {products} = useContext(ProductsContext);
    const {dispatch} = useContext(CartContext);
    if (!products.length) return <p>Loading...</p>;
    return(
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.root}>
                    <CardMedia className={classes.media} image={product.ProductImg} title={product.ProductName} />
                    <CardContent>
                        <div className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.ProductName}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            ${product.ProductPrice} CAD
                        </Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.ProductDes}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        <IconButton aria-label="Add to Cart" onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>
                        <AddShoppingCart />
                        </IconButton>
                    </CardActions>
                    </Card>
            </Grid>
            ))}
        </Grid>
        </main>
    )
} */