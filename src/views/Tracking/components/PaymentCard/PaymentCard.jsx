import React from 'react'
import { PartnerInfo, PaymentDetails } from "views/Payment/components";
import { PaymentCard as PaymentCardVisa } from "../../../Payment/components/MakePayment/components";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

const PaymentCard = ({datosComprobante}) => {
  const {atenciones, ...rest} = datosComprobante
  
  const _data = atenciones.map(atencion=>{
    return({
      ticket: atencion.ticket,
    fechaAtencion: atencion.fechaCreacion,
    paciente:atencion.paciente,
    total: atencion.total})
  })

  return (
    <div>
      <PartnerInfo />
      <PaymentDetails data={_data} paymentData={rest} />
      <PaymentCardVisa />
    </div>
  )
}

export default PaymentCard
