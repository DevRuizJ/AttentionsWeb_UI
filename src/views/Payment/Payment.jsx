
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from 'react-router-dom'

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Payment";
import { actionCreators as actionCreatorsUser } from "../../store/User";
/*************REDUX **********************/

import {
  MakePayment,
  PartnerInfo, PaymentTableList,
  PaymentMethod,
  PaymentDetails
} from "./components";
import { Breadcrumbs, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  consten: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Payment = ({ getUser, userCompany, payment, cancelAttentions }) => {
  const classes = useStyles();
  const history = useHistory()
  const [step, setStep] = React.useState(0);
  const [servicesSelectPay, setServicesSelectPay] = React.useState([]);
  const [methodPay, setMethodPay] = React.useState(null);

  useEffect(() => {
    if (!userCompany.isExistUser) {
      //Se guarda a nivel local el compania      
      const token = localStorage.getItem('token');
      if (!token)
        history.push('/login')
      else {
        const userLocal = localStorage.getItem('user');
        getUser({ usuario: userLocal })
      }
    }

  }, [userCompany.isExistUser, history, getUser])

  const handleSelectTickets = items => {
    setStep(1)
    setServicesSelectPay(items)
  }
  const handleConfirmMethodPay = data => {
    setStep(2)
    setMethodPay(data)

    cancelAttentions({
      "Atenciones": servicesSelectPay.map(a => a.ticket + a.numsuc + a.numemp),
      "Compania": userCompany.compania
    })
  }
  const handleConfirmPay = () => {

    if (methodPay === 2) {
      history.push('/seguimiento')
    }
  }
  return (
    <div className={classes.root}>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" component="h4" className={classes.title}>
            FACTURACIÓN {payment.payload}
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">
              PAGO TICKETS
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs >
            <Paper className={classes.paper}>
              {userCompany.isExistUser && <PartnerInfo />}
            </Paper>
            <br />
            {
              step === 0 && userCompany.isExistUser &&
              <div className={classes.paper}>
                {userCompany.isExistUser && <PaymentTableList onConfirmPay={handleSelectTickets} />}
              </div>
            }
            {
              step !== 0 &&
              <Paper className={classes.paper}>
                <PaymentDetails data={servicesSelectPay} paymentData={(step === 2 && payment.paymentData) || null} />
              </Paper>
            }
          </Grid>
          {
            step === 1 &&
            <Grid item xs >
              <Paper className={classes.paper}>
                <PaymentMethod data={payment.dataBilling} onConfirm={handleConfirmMethodPay} totalTickets={servicesSelectPay.length} />
              </Paper>
            </Grid>
          }
          {
            step === 2 &&
            <Grid item xs >
              <Paper className={classes.paper}>
                <MakePayment type={methodPay} onConfirm={handleConfirmPay} />
              </Paper>
            </Grid>
          }
        </Grid>
      </div>

    </div>
  )
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Payment)

