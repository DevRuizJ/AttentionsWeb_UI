import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import validate from "validate.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";


const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: "0.5rem",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    "& *": {
      textAlign: "left",
    },
  },
  textField: {
    marginTop: theme.spacing(2),
    "& *": {
      borderRadius: "0.5rem",
    },
    "& label": {
      color: theme.palette.text.secondary,
    },
  },
  signInButton: {
    margin: theme.spacing(1, 0),
    borderRadius: "0.5rem",

  },
  mensajeLogin: {
    ...theme.typography.caption,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    textAlign: "center",
    color: theme.palette.danger.main,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FormChangePass = ({ onSave, userCompany }) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>

      <Typography variant='subtitle1' component='p'>
        INGRESE UNA NUEVA CONTRASEÑA:
        </Typography>
      <form
        className={classes.form}
        onSubmit={(event) => {
          event.preventDefault();
          onSave(formState.values);
        }}
      >

        <TextField
          className={classes.textField}
          error={hasError('usuario')}
          fullWidth
          helperText={
            hasError('usuario') ? formState.errors.usuario[0] : null
          }
          label="Usuario"
          name="usuario"
          onChange={handleChange}
          type="text"
          value={userCompany.dataRecovery.usuario || ''}
          variant="outlined"
          disabled={true}
        />
        <TextField
          className={classes.textField}
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('usuario') ? formState.errors.usuario[0] : null
          }
          label="Nueva Contraseña"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
          autoFocus
          required
          autoComplete='off'
        />
        <TextField
          className={classes.textField}
          error={formState.values.password2 && formState.values.password !== formState.values.password2}
          fullWidth
          helperText={
            formState.values.password2 && formState.values.password !== formState.values.password2 ? 'Contraseñas no coinciden' : null
          }
          label="Confirmar Contraseña"
          name="password2"
          onChange={handleChange}
          type="password"
          value={formState.values.password2 || ''}
          variant="outlined"
          required
          autoComplete='off'
        />

        {!userCompany.isLoading && userCompany.requestMessage && (
          <div className={classes.mensajeLogin}>
            <WarningIcon /> {userCompany.requestMessage}
          </div>
        )}
        <div className={classes.wrapper}>
          <Button
            className={classes.signInButton}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
            disabled={(formState.values.password2 && formState.values.password !== formState.values.password2) || userCompany.isLoading}
            onClick={(event) => {
              event.preventDefault();
              onSave(formState.values);
            }}
          >
            CAMBIAR CONTRASEÑA
        </Button>
          {userCompany.isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </div>

  );
};

const schema = {
  usuario: {
    presence: { allowEmpty: false, message: '. Su usuario es requerido.' },
    length: {
      maximum: 15
    }
  },
  password: {
    presence: { allowEmpty: false, message: '. Su usuario es requerido.' },
    length: {
      maximum: 15
    }
  },
};

export default FormChangePass
