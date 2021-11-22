import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  cartContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontSize: '14px',
    fontWeight: 600,
  },
  cartCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-round',
    alignItems: 'center',
    marginBottom: '20px'
  },
  cartImg:{
    width: '150px',
    height: '120px',
  },
  cartName: {
    width: '150px',
    marginLeft: '20px',
  }, 
  cartPrice: {
    width: '150px',
    marginLeft: '20px',
  },
  cartPriceRaw:{
    width: '150px',
    marginLeft: '20px',
    color: '#f57224'
  },
  cartInc: {
    cursor: 'pointer',
  }, 
  cartDes:{
    cursor: 'pointer',
  },
  cartBtnDelete:{
    backgroundColor: 'transparent',
    border: 'hidden',
    outline: 'none',
    cursor: 'pointer',
    color: 'red',
  },
  cartSum:{
    display: 'flex',
    flexDirection: 'column',
    padding: '50px',
    border: '1px solid #e4e4e4',
    width: '300px',
  },
  cartSumHeading:{
    borderBottom: '1px solid #f57224'
  },
  cartSumPrice:{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },
  checkOutLink:{
    fontSize:'12px',
    fontWeight: '600',
    textDecoration: 'none',
    color: '#000',
  }
}));