import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx'
import { Button, TextField, Typography, InputAdornment } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
  },
  mensaje: {
    margin: theme.spacing(4),
    textAlign: 'justify',
    textTransform: 'uppercase',
    fontSize:'2px'
  },
  mensaje1: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  tokenBox: {
    marginTop: theme.spacing(1.5),
    textAlign: 'center'
  },
  tokenInvalide: {
    color: theme.palette.error.main

  },
  tokenValide: {
    fontWeight: 600,
    color: theme.palette.success.main
  }
}));


const FormToken = ({ data: dataRecovery, token, onChange }) => {
  const classes = useStyles();
  //VERSION 2
  const [tokenUser, setTokenUser] = useState(null)
  const handleChange = (event) => {
    setTokenUser(event.target.value.toUpperCase())
  }
  return (
    <div className={classes.root}>
      <div className={classes.mensaje}>
        <Typography variant='body1' component='div'>
          Estimado <b>{dataRecovery.usuario || 'Usuario'}</b>, se envió un token de validación para poder recuperar su contraseña al:
        </Typography>
        <Typography variant="subtitle2" className={classes.mensaje1}>
          {dataRecovery.sendMail && (' Correo: ' + dataRecovery.email)}
        </Typography>
        <Typography variant="subtitle2" className={classes.mensaje1}>
          {dataRecovery.sendNotificacion && (' Teléfono: ' + dataRecovery.telefono)}.
        </Typography>
        <Typography variant='body1' component='p'>Por favor ingreselo para poder continuar.
        </Typography>
      </div>
      <div className={classes.tokenBox}>
        <TextField
          id="standard-error-helper-text"
          error={token !== tokenUser}
          className={classes.textField}
          label="Token"
          onChange={handleChange}
          type="text"
          value={tokenUser || ''}
          variant="filled"
          InputProps={{
            startAdornment: <InputAdornment position="start">SL-</InputAdornment>,
          }}
          autoFocus
          required
          autoComplete='off'
          placeholder='****'
        />
        <div
          className={clsx({
            [classes.tokenValide]: token === tokenUser,
            [classes.tokenInvalide]: token !== tokenUser,
          })}
        >
          {
            tokenUser
              ? token === tokenUser
                ? '¡Token Validado!'
                : '¡Su Token es inválido!'
              : '¡Ingrese su Token..!'
          }
        </div>
      </div>

      <div className={classes.tokenBox}>
        <Button
          className={classes.signInButton}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          disabled={tokenUser !== token}
          onClick={(event) => {
            event.preventDefault();
            onChange(2);
          }}
        >
          Cambiar Contraseña
        </Button>
      </div>
    </div>
  );
};

export default FormToken;
