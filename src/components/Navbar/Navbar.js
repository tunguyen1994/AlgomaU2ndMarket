import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { auth } from '../firebase'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Icon } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/AlgomaU_Icon.png'
import useStyles from './styles';
import { CartContext } from '../../Global/CartContext';

export const Navbar = ({user, totalProducts}) => {
    const classes = useStyles();
    const history = useHistory();
    
    const logout = () =>{
        auth.signOut().then(()=>{
            history.push('/login')
        })
    }
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Commerce.js' height='25px' className={classes.image}/>
                        AlgomaU 2nd Hand Market
                    </Typography>
                    {!user && <div className={classes.navRight}>
                        <span><Link to='/signup' className={classes.navlink}>Sign Up</Link></span>
                        <br/>
                        <span><Link to='/login' className={classes.navlink}>Login</Link></span>
                    </div>}
                    <div className={classes.grow} />
                    {user &&<div className={classes.button} >
                        <span><Link to='/'>{user}</Link></span>
                        <span>
                        <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={totalProducts} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        </span>
                        <span><Button onClick={logout}>Log Out</Button></span>
                    </div>}
                </Toolbar>
            </AppBar>   
        </>
    )
}

