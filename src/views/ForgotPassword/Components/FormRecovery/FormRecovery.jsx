import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button } from "@material-ui/core";
import validate from "validate.js";

import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";


const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: "0.5rem",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]: {
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

const FormRecovery = ({ onSave, userCompany }) => {
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
    <form
      className={classes.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSave(formState.values.usuario);
      }}
    >
      <TextField
        className={classes.textField}
        error={hasError("usuario")}
        fullWidth
        helperText={hasError("usuario") ? formState.errors.usuario[0] : null}
        label="Usuario"
        name="usuario"
        onChange={handleChange}
        type="text"
        value={formState.values.usuario || ""}
        variant="outlined"
        autoFocus
        required
        autoComplete="off"
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
          disabled={!formState.isValid || userCompany.isLoading}
          onClick={(event) => {
            event.preventDefault();
            onSave(formState.values.usuario);
          }}
        >
          RECUPERAR CONTRASEÑA
        </Button>
        {userCompany.isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};

const schema = {
  usuario: {
    presence: { allowEmpty: false, message: ". Su usuario es requerido." },
    length: {
      maximum: 15,
    },
  },
};

export default FormRecovery
