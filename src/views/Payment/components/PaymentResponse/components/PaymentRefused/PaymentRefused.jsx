import React from 'react'
import{makeStyles}from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import { 
  Typography,
  Button,
} from '@material-ui/core'
import {
  CancelOutlined as CancelOutlinedIcon,
} from '@material-ui/icons';
const useStyles = makeStyles(theme=>({
    root:{      
      padding:theme.spacing(1),
      position:'relative'
    },
    boxStatus:{
    //   backgroundColor: theme.palette.background.default, 
      padding:theme.spacing(2),  
      textAlign:'center'
    },
    title:{
      color:theme.palette.error.light,
      textAlign:'center'
    },
    iconTitle:{  
      color:theme.palette.error.main,
      fontSize: '4.5rem'
    },
    details:{
        marginTop:theme.spacing(2)
    },
    text:{
        textAlign:'left'
    },
    messageTitle:{
        textAlign:'center',
        marginTop:theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
      textAlign:'center'
    },
    list: {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
      textAlign:'center'
    },
    logo: {
      height: "150px",
      margin: theme.spacing(2, 0),
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        height: "150px",
      },
    },
    logoImg: {
      height: "100%",
    },
  }))
const PaymentRefused = () => {
  const history = useHistory()
  const classes = useStyles()

  const handleClick=()=>{
    
      history.push('/seguimiento')
    
  }

    return (
        <div className={classes.root}>
          <div className={classes.boxStatus}>
            
            <CancelOutlinedIcon className={classes.iconTitle} />
            
            <Typography className={classes.title} variant="h3" component="h4">
              ¡PAGO RECHAZADO!
            </Typography>  
          
                  
            <Typography variant="h5" component="div" className={classes.messageTitle}>
              Algo salió mal...
            </Typography> 
            
            <Typography variant="h5" component="div" className={classes.messageTitle}>
              Su pago ha sido rechazado
            </Typography>   
          </div>
          
            <div className={classes.button}>
                <Button 
                  variant="contained"
                  color="primary"
                  size='large'
                  className={classes.button}
                  onClick={()=>handleClick()}
                >
                  FINALIZAR
                </Button>
              </div>
        </div>
    )
}
export default PaymentRefused