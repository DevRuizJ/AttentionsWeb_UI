import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LogoSuiza from '../../../src/assets/logos/LogoSuizaXS.svg';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/User";
import { generateToken } from '../../common/GlobalFunction'
import {
  Container,
  Typography,
  Divider,
  Grid,
  Hidden,
  Button
} from '@material-ui/core';
import {
  SocialButtons,
  Slider,
  FormRecovery,
  FormToken,
  FormChangePass
} from './Components';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '90vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    [theme.breakpoints.up('>sm')]: {
      height: '90%'
    },
    [theme.breakpoints.down('>sm')]: {
      height: 'auto'
    }
  },

  wrapLogin: {
    maxWidth: '876px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: '10px'
  },
  container: {
    backgroundColor: theme.palette.background.paper
  },
  boxLogin: {
    maxWidth: '400px',
    left: 0,
    right: 0,
    margin: 'auto',
    paddingBottom: theme.spacing(1.5)
  },
  logo: {
    height: '150px',
    margin: theme.spacing(2, 0),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '150px'
    }
  },
  logoImg: {
    height: '100%',
    cursor: 'pointer'
  },
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
  }
}));

const ForgotPassword = ({ userCompany, sendTokenRecovery, changePassword }) => {
  const classes = useStyles();
  const history = useHistory();

  const [stepRecovery, setStepRecovery] = useState(0);
  const [tokenGenerado, setTokenGenerado] = useState(null)
  const [changePassOk, setChangePassOk] = useState(false)

  useEffect(() => {
    const { dataRecovery, isChangePassword } = userCompany
    if (dataRecovery) {
      setStepRecovery(1)
    }

    if (isChangePassword)
      setChangePassOk(true); // Se redirecciona a la principal

  }, [userCompany, history])

  const handleSendTokenRecoveryPaswd = data => {
    let _token = generateToken(5)
    _token = _token.toUpperCase()
    sendTokenRecovery({ usuario: data, token: _token })
    setTokenGenerado(_token)
  }
  const handleChangePassword = data => {
    const _data = {
      "Compania": userCompany.dataRecovery.compania,
      "Usuario": userCompany.dataRecovery.usuario,
      "contrasenia": data.password
    }
    changePassword(_data)
  }
  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.wrapLogin}>
        <Grid
          container
          className={classes.container}
          direction="row"
          justify="center"
          alignItems="center">
          <Hidden smDown>
            <Slider />
          </Hidden>

          <Grid item sx={12} md={6} className={classes.boxLogin} >
            <div className={classes.logo} >
              <img
                className={classes.logoImg}
                src={LogoSuiza}
                alt="logoEmpresa"
                onClick={() => {
                  history.push('/login')
                }}
              />
            </div>

            <Typography
              className={classes.title}
              variant="h3"
              component="h2"
              color="primary">
              <b>ATENCIONES WEB</b>
            </Typography>
            <Typography
              className={classes.subtitle}
              variant="h6"
              component="h2"
              color="primary">
              <b>RESTABLECER CONTRASEÑA</b>
            </Typography>
            {
              changePassOk
                ?
                <div className={classes.changePassword}>
                  <Typography
                    className={classes.changePasswordText}
                    variant="h6"
                    component="h2"
                    color="primary">
                    ¡Su contraseña se cambio correctamente..!
                  </Typography>
                  <Button
                    className={classes.signInButton}
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {
                      history.push('/login')
                    }}
                  >
                    INICIAR SESIÓN
                  </Button>
                </div>
                :
                <div className={classes.contentBody}>
                  {stepRecovery === 0 ? (
                    <FormRecovery
                      onSave={handleSendTokenRecoveryPaswd}
                      userCompany={userCompany}
                    />
                  ) : stepRecovery === 1 ? (
                    <FormToken
                      onChange={setStepRecovery}
                      data={userCompany.dataRecovery}
                      token={tokenGenerado}
                    />
                  ) : !changePassOk && (
                    <FormChangePass
                      onSave={handleChangePassword}
                      userCompany={userCompany}
                    />
                  )}
                </div>
            }
            <Divider />
            <SocialButtons />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

ForgotPassword.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = (state) => ({
  userCompany: state.userCompany,
});

export default connect(mapStateToProps, (dispatch) =>
  bindActionCreators(actionCreators, dispatch)
)(ForgotPassword);
