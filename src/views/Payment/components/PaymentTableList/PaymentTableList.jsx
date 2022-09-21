import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { TableContent } from './components'
import { LoadingMessage } from 'components';

import MessageBoot from '../../../../components/MessageBoot'

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Payment";
/*************REDUX *********************/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

const PaymentTableList = ({ userCompany, getPendientBillingAtention, payment, onConfirmPay }) => {
  const classes = useStyles();
  const { compania } = userCompany

  React.useEffect(() => {
    getPendientBillingAtention({
      "compania": compania
    })
  }, [getPendientBillingAtention, compania])

  return (
    <div className={classes.root}>
      {
        !payment.isLoading
          ?
          payment.existAtcSNFacturar
            ? <TableContent data={payment.listAtenciones} onConfirmPay={onConfirmPay} />
            : <MessageBoot message={'Sin pendientes de pago'} />
          : <LoadingMessage message='Obteniendo atenciones para facturar, por favor, espere...' />
      }
    </div>
  );
}


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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentTableList)
