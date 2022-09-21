import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { AccountProfile, FormAccount } from './components';

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Payment";
import { actionCreators as actionCreatorsUser } from "../../store/User"
/*************REDUX *********************/

import LoadingMessage from "components/LoadingMessage/LoadingMessage";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Account = props => {
  const classes = useStyles()
  const history = useHistory()

  //actionCreators del store
  const { getUser, getDataBilling, setInitialState } = props

  //store
  const { userCompany, payment, changeProfile, changePassword } = props

  const { isExistUser, compania, isChangePassword, usuario } = userCompany


  useEffect(() => {

    if (!isExistUser) {
      //Se guarda a nivel local el compania      
      const token = localStorage.getItem('token');
      if (!token)
        history.push('/login')
      else {
        const userLocal = localStorage.getItem('user');
        getUser({ usuario: userLocal })
      }
    }

  }, [isExistUser, history, getUser])

  useEffect(() => {
    if (!payment.existDataBilling && isExistUser) {
      getDataBilling({
        "compania": compania
      })
    }
  }, [getDataBilling, payment.existDataBilling, isExistUser, compania])

  const handleChangeLogo = logo => {
    changeProfile({ compania, logo, usuario })
  }
  const handlechangePassword = contrasenia => {
    changePassword({ compania, usuario, contrasenia })
  }


  useEffect(() => {
    if (isChangePassword) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setInitialState();
    }
  }, [isChangePassword, setInitialState])

  return (
    <div className={classes.root}>
      {
        isExistUser ?
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={12}
            >
              {
                payment.dataBilling && <AccountProfile onChange={handleChangeLogo} userCompany={userCompany} payment={payment} />
              }

            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={12}
            >
              {

                payment.dataBilling && <FormAccount onChangePass={handlechangePassword} userCompany={userCompany} />
              }

            </Grid>
          </Grid>
          : <LoadingMessage message='Cargando datos de la compañia...' />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
