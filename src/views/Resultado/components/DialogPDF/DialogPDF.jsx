import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  Divider,
  TextField,
  Tooltip,
  Paper,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { PdfViewer } from "../../../../components";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 1px",
    display: "flex",
    alignItems: "center",
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  button: {
    border: "1px solid",
    lineHeight: 2,
    marginLeft: "auto",
    margin: theme.spacing(1, 0),
    borderRadius: "0.5rem",
    justifyContent: "center",
    width: "100%",
  },
  button1: {
    margin: theme.spacing(1),
  },

  formEmail: {
    margin: theme.spacing(1, 0),
    //padding: theme.spacing(1),
    padding: "10px 30px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  textField: {
    // marginTop: theme.spacing(2),
    "& *": {
      borderRadius: "0.5rem",
    },
    "& label": {
      color: theme.palette.text.secondary,
    },
    // display: "flex",
  },
  title: {
    marginTop: theme.spacing(1),
    padding: "10px 30px",
  },
  dialogContent: {
    background: 'red',
    maxWidth: '1000px'
  },
  radioButtons:{
    padding: "8px 30px",
    '& *':{
      color:theme.palette.text.secondary,
    },
  },
  radioGroup:{
      flexDirection: 'row',
  },
}));

const DialogPDF = ({ data, onSave }) => {
  
  const [open, setOpen] = React.useState(false);
  const {resultadoPaciente,resultadoPacientePdf}= data
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [emailPaciente, setEmailPaciente] = useState(resultadoPaciente.correo)
  const [typeNotification, setTypeNotification] = useState('DEFAULT')

  //Función para cambiar el tipo tipo de notifican
  
  const handleChangeEmail = event => {
    event.persist();
    setEmailPaciente(event.target.value);
  }

  const handleChangeTypeNotification = event => {
    event.persist();
    setTypeNotification(event.target.value);
  }

  const handleSendResultado = (event)=>{
    event.preventDefault()
    onSave({
      "EmailPaciente":emailPaciente,
      "TipoNotificacion":typeNotification
    })
    handleClose()
  }
  return (
    <div >
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.button}
        startIcon={<EmailIcon />}
      >
        Enviar Resultados
        </Button>

      <div className={classes.dialogContent}>

        <Dialog
          fullWidth={true}
          maxWidth={'lg'}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            ENVIO DE RESULTADOS
          </DialogTitle>

          <DialogContent >
            <Paper className={classes.paperEmail}>
              <div>
                <Typography
                  className={classes.title}
                  variant="subtitle1"
                  component="h2"
                  color="secondary"
                >
                  Tipo de Notificacion:
                </Typography>
                <FormControl component="fieldset" className={classes.radioButtons}>
                  <RadioGroup className={classes.radioGroup}
                    aria-label="Sexo" name="Sexo"
                    value={typeNotification || ''}
                    onChange={handleChangeTypeNotification}
                  >
                    <FormControlLabel value="DEFAULT" control={<Radio />} label="Default" />
                    <FormControlLabel value="PERSONALIZADO" control={<Radio />} label="Personalizado" disabled={true} />
                  </RadioGroup>
                </FormControl>
              </div>
              <form
                className={classes.formEmail}
                noValidate autoComplete="off"
                onSubmit={handleSendResultado}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="correo"
                  label="Ingrese Correo"
                  type="Email"
                  value={emailPaciente}
                  onChange={handleChangeEmail}
                />

                <Divider
                  className={classes.divider}
                  orientation="vertical"
                />

                <Tooltip title="Enviar correo al paciente">
                  <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    endIcon={<EmailIcon />}
                    onClick={handleSendResultado}
                  >
                    Enviar
                  </Button>
                </Tooltip>
              </form>
            </Paper>
            {open&&<PdfViewer file={resultadoPacientePdf} type="base64"  />}
            

          </DialogContent>

          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color="primary"
              className={classes.button1}
            >
              CERRAR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>

  );
};

export default DialogPDF;
