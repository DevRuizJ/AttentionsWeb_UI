import React from "react";
import { makeStyles } from "@material-ui/styles";
import { LoadingMessage } from 'components';

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Payment";
/*************REDUX *********************/

import { PaymentDeposit, PaymentCard } from './components'
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));


const MakePayment = ({ type, onConfirm, userCompany, payment, getPaymentAccount }) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (type === 2 && payment.paymentData) getPaymentAccount()
  }, [type, payment.paymentData,getPaymentAccount])
  return (
    <div className={classes.root}>
      {payment.paymentData
        ?

        type === 1
          ? <PaymentCard />
          :
          payment.paymentAccount
            ? <PaymentDeposit data={payment} onConfirm={onConfirm} compania={userCompany.razonSocial} />
            : <LoadingMessage message="Obteniendo las cuenta de la empresa...." />
        : <LoadingMessage message="Procesando información...." />
      }
    </div>
  )
};
const mapStateToProps = state => ({
  userCompany: state.userCompany,
  payment: state.payment,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MakePayment)

