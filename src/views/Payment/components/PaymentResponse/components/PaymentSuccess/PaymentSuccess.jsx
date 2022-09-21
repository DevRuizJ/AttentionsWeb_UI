import React, { Fragment } from 'react'
import{makeStyles}from '@material-ui/styles'
import { 
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core'
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  Check as CheckIconIcon,
  Receipt as ReceiptIcon,
} from '@material-ui/icons';
// import { LoadingMessage } from 'components';
import {DialogPDF} from 'components'

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
      color:theme.palette.success.light,
      textAlign:'center'
    },
    iconTitle:{  
      color:theme.palette.success.main,
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
    LoadingPay:{
      margin: theme.spacing(3),
    },
    LoadingPayImg:{
      textAlign:'center'
    }
  }))
const PaymentSuccess = ({data,dataCompania,onFinalizar}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    
    const handlePreview= () => {
      setOpen(true);
    };
    return (
        <div className={classes.root}>
          {
          !data.isLoading &&data.paymentData
          ?
          <Fragment> 
          <div className={classes.boxStatus}>
            <CheckCircleOutlineIcon className={classes.iconTitle} />
            <Typography className={classes.title} variant="h3" component="h4">
              ¡PAGO EXITOSO!
            </Typography>        
            
            <Typography variant="h5" component="div" className={classes.messageTitle}>
            Estimado {dataCompania.RazonSocial||""}, su pago ha sido procesado con éxito
            </Typography>   
          </div>
          <div className={classes.details}>
            <Typography variant="h5" component="div" className={classes.text}>
              Importante:              
            </Typography>  
            
            <Typography variant="subtitle2" component="div" className={classes.text}>
              La constancia de pago ha sido enviada a su Correo Electrónico.
            </Typography>  
            
            <div className={classes.list}>
            
            <List>
                <ListItem>
                  <ListItemIcon >
                    <CheckIconIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText
                    primary={"Se generó el comprobante F"+data.paymentData.serie+"-"+data.paymentData.numero}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckIconIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="En su resumen de pagos verá el cargo como SUIZA LAB ECOMMERCE WEB."
                  />
                </ListItem>
            </List>
            </div>
            <div className={classes.button}>
                <Button 
                  variant="contained"
                  color="primary"
                  size='large'
                  className={classes.button}
                  startIcon={<ReceiptIcon/>}
                  onClick={()=>handlePreview()}
                >
                  VER FACTURA
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size='large'                  
                  onClick={()=>onFinalizar()}
                  className={classes.button}
                >
                  FINALIZAR
                </Button>
              </div>
          </div>
          </Fragment>
          :<div className={classes.LoadingPay}>
            <div className={classes.LoadingPayImg}>
              <img src="/images/gif-maker.gif" alt="gif de pago"/>
            </div>
          </div>
        }        
        { open && <DialogPDF onClose ={setOpen} openState={open} data={data.paymentData} />}
      </div>
    )
}
export default PaymentSuccess
