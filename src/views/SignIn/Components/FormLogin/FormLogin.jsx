import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import validate from "validate.js";
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
  IconButton,
  Link,
} from "@material-ui/core";
import {
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@material-ui/icons";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/User";

import useStyles from "./UseStyles";

const FormLogin = ({ loginCompany, userCompany, setInitialState, loginUsuario }) => {
  const classes = useStyles();
  const history = useHistory();

  //funciones de usuario
  const [showPassword, SetShowPassword] = useState(false)

  const preventDefault = (event) => event.preventDefault();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema)
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

  //Cuando el usuario se loggee
  useEffect(() => {
    if (userCompany.isExistUser) {
      //Se guarda a nivel local el usuario

      history.push("/"); // Se redirecciona a la principal
    } else {
      //Verificamos si existe el token del usuario a nivel local
      if (localStorage.getItem("token")) {
        history.push("/"); // Se redirecciona a la principal
      }
    }
  }, [userCompany, history, setInitialState]);

  const handleClickShowPassword = () => {
    SetShowPassword(!showPassword);
  }
  const handleMouseDownPassword = (event) => {
    preventDefault(event)
  }

  const handleLogin = (event) => {
    preventDefault(event)
    loginUsuario(formState.values)
  }

  

  return (
    <form
      className={classes.form}
      onSubmit={handleLogin}
    >
      <TextField
        className={classes.textField}
        error={hasError("user")}
        fullWidth
        helperText={hasError("user") ? formState.errors.user[0] : null}
        label="USUARIO"
        name="user"
        onChange={handleChange}
        type="text"
        value={formState.values.user || ""}
        variant="outlined"
        autoComplete="off"
      />

      {/* <TextField
        className={classes.textField}
        error={hasError("password")}
        fullWidth
        helperText={hasError("password") ? formState.errors.password[0] : null}
        label="CONTRASEÑA"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ""}
        variant="outlined"
        autoComplete="off"
        aria-describedby="helper-text-password"
      /> */}

      <FormControl
        className={clsx(classes.textField)}
        variant="outlined"
        fullWidth
      >
        <InputLabel htmlFor="password">
          CONTRASEÑA
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formState.values.password || ""}
          onChange={handleChange}
          error={hasError("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={90}
          aria-describedby="helper-text-password"
          autoComplete="current-password"
        />
        <FormHelperText id="helper-text-password" className={classes.error}>
          {hasError("password") ? formState.errors.password[0] : null}
        </FormHelperText>

      </FormControl>


      {!userCompany.isLoading && userCompany.requestMessage && (
        <div className={classes.mensajeLogin}>
          <WarningIcon /> {userCompany.requestMessage}
        </div>
      )}

      <div className={classes.checkBox}>
        <Checkbox
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          inputProps={{ "aria-label": "decorative checkbox" }}
        />{" "}
        <p>Recordar contraseña</p>
      </div>

      <div className={classes.wrapper}>
        <Button
          className={classes.signInButton}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        //disabled={!formState.isValid || userCompany.isLoading}
        //onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
        {userCompany.isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        <div className={classes.subItem} >
          <Link
            href='/forgot-password'
            color='inherit'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </form>
  );
};

const schema = {
  user: {
    presence: { allowEmpty: false, message: ". Usuario incorrecto!" },
    length: {
      maximum: 11,
      minimum: 4,
    },
  },
  password: {
    presence: { allowEmpty: false, message: ". Contraseña incorrecta!" },
    length: {
      maximum: 15,
      minimum: 4,
    },
  },
};

const mapStateToProps = (state) => ({
  userCompany: state.userCompany,
});

export default connect(mapStateToProps, (dispatch) =>
  bindActionCreators(actionCreators, dispatch)
)(FormLogin);
