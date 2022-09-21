import React from 'react'
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
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { LoadingMessage } from 'components';

import {DialogPDF} from '../../components'
const useStyles = makeStyles(theme=>({
    root:{      
      padding:theme.spacing(2),
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
  }))
const ShowLote = ({onPreviewLote,data, onFinalizar,onShowLote}) => {
    const classes = useStyles()
    const {loteGenerate } = data
    const [open, setOpen] = React.useState(false);
    
    const handlePreviewReporteLote = () => {
      setOpen(true);
      onPreviewLote()
    };
    return (
        <div className={classes.root}>
          <div className={classes.boxStatus}>
            <CheckCircleOutlineIcon className={classes.iconTitle} />
            <Typography className={classes.title} variant="h3" component="h4">
              ¡GENERACIÓN DE LOTE EXITOSO!
            </Typography>        
            
            <Typography variant="h5" component="div" className={classes.messageTitle}>
              Se generó su lote de envio N°{loteGenerate.lote||'000000'} correctamente con {loteGenerate.totalTickets} Tickets.
            </Typography>   
          </div>
          <div className={classes.details}>
            <Typography variant="h5" component="div" className={classes.text}>
              Importante:              
            </Typography>   
            
            <div className={classes.list}>            
            <List>
                <ListItem>
                  <ListItemIcon >
                    <CheckIconIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Para la recepción de sus muestras, es necesario mostrar el reporte del lote impreso para agilizar el escaneo de sus muestras. "
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
                  startIcon={<VisibilityIcon/>}
                  onClick={()=>onShowLote(loteGenerate.lote)}
                >
                  MOSTRAR LOTE
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  size='large'
                  className={classes.button}
                  startIcon={<VisibilityIcon/>}
                  onClick={()=>handlePreviewReporteLote()}
                >
                  VER  REPORTE LOTE
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
          {
            open?
              loteGenerate.pdf 
              ? <DialogPDF onClose ={setOpen} openState={open} datosLote={loteGenerate} />
              : <LoadingMessage message='Obteniendo Reporte de Lote, por favor, espere...'/> 
            :null
          }
          
        </div>
    )
}
export default ShowLote
