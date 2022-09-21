import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import { BotSuiza } from "assets/icons";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
  },
  text: {
    color: theme.palette.text.secondary,
    "& *": {
      color: theme.palette.text.secondary,
    },
  },

  button: {
    margin: theme.spacing(3),
    textAlign: "center"
  },
  comprobantePago: {
    display: "flex",
    alignItems: "center",
  },
  contentItem: {
    margin: theme.spacing(2, 1),
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  DialogIcon: {
    fontSize: '3.5rem'
  },
  alerta: {
    color: theme.palette.danger.main,
  },
}));


const PaymentMethod = ({ data, onConfirm, totalTickets = 0 }) => {

  const classes = useStyles();
  const [metodoPago, setMetodoPago] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <Typography
        color="textSecondary"
        variant="h5"
        gutterBottom
      >
        SELECCIONE MÉTODO DE PAGO
      </Typography>
      <Divider />
      <div className={classes.contentItem} >
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="metodoPago"
            name="metodoPago"
            value={metodoPago || ""}
            onChange={event => setMetodoPago(event.target.value)}
          >
            <FormControlLabel
              value="1"
              control={<Radio color='primary' />}
              label="Tarjeta de Crédito o Débito"
            />
            <FormControlLabel
              value="2"
              control={<Radio color='primary' />}
              label="Depósito"
            />
          </RadioGroup>
        </FormControl>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.alerta}
        >
          * <b>Importante:</b> En caso el pago de las muestras se realizará al contado (Pago en Caja), genere directamente su lote de muestras en el modulo <Link to='/envio-muestra'><b>Envio Muestra</b></Link> y envielo con el motorizado, adjuntado el total del pago.
        </Typography>
      </div>
      <Typography
        color="textSecondary"
        variant="h6"
        gutterBottom
      >
        COMPROBANTE DE PAGO
      </Typography>
      <Divider />

      <div className={classes.contentItem} >
        <div className={classes.comprobantePago}>
          <RadioButtonCheckedIcon color='primary' className={classes.icon} />
          <Typography variant='body1' component="div">
            {data.tipoDocumentoPagoDesc}
          </Typography>
        </div>
      </div>
      <div className={classes.button} >
        <Button
          variant="contained"
          color="primary"
          type='submit'
          endIcon={<LockIcon />}
          onClick={() => setOpenDialog(true)}
          disabled={!metodoPago}
        >
          REALIZAR PAGO
        </Button>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <InfoOutlinedIcon fontSize='large' color='error' className={classes.DialogIcon} />
          </div>
          <Typography variant='h4' component='h4'>
            ¿Está seguro de facturar los {totalTickets} tickets seleccionados?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onConfirm(parseInt(metodoPago))} color="primary" autoFocus>
            Confirmar
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancelar
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  )
};



export default PaymentMethod;

