import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
  productBox:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '50px',
  },
  sumBox:{
    width: '300px',
    margin: '30px auto',
    border: '1px solid #b9b5b5',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px'
  }
}));