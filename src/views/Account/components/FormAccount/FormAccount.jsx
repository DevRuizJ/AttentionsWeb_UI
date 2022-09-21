import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  signInButton: {
    margin: theme.spacing(1, 0),
    borderRadius: "0.5rem",
  },
  changePassword: {
    textAlign: 'center',
  },
  changePasswordText: {
    marginTop: theme.spacing(3),
    color: theme.palette.success.main,
  },
  // textField: {
  //   marginTop: theme.spacing(2),
  //   "& *": {
  //     borderRadius: "0.5rem",
  //   },
  //   "& label": {
  //     color: theme.palette.text.secondary,
  //   },
  // },

}));



const FormAccount = ({ userCompany, onChangePass }) => {
  const classes = useStyles();
  const { usuario } = userCompany

  // TODO Observar la renderizacion/Mary



  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePass = e => {
    e.preventDefault();
    onChangePass(values.password)
  }

  return (
    <Card>
      <form onSubmit={handleChangePass}>
        <CardHeader title="INFORMACIÓN DE ACCESO" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Compania"
                name="user"
                type="text"
                variant="outlined"
                autoComplete="off"
                value={usuario}
                disabled
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControl
                className={clsx(classes.textField)}
                variant="outlined"
                fullWidth
                value={values.password}
                onChange={handleChange}
              >
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <OutlinedInput
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                className={classes.signInButton}
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                fullWidth
                onClick={handleChangePass}
                disabled={!values.password}
              >
                ACTUALIZAR
              </Button>
            </Grid>
          </Grid>
        </CardContent>

      </form>
    </Card>
  )
}

export default FormAccount

