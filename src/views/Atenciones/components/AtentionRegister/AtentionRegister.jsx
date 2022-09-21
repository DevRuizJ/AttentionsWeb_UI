import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { Typography } from "@material-ui/core";

import {
  CardInfoPatient,
  PreviewTicket
} from "./components";

import { TariffBox as ListServicesView } from '../../../Tariff/components'

import { actionCreators as actionCreatorsBranchOffice } from "../../../../store/BranchOffice";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const AtentionRegister = props => {

  const classes = useStyles()
  const { dataIafas, listarUnidadTicket, companyList } = props

  //simple autocomplete
  const [companiaSelected, setCompaniaSelected] = useState('')

  //Estado de control para guardar Celular para envío de Resultados
  const [cellPhone, setCellPhone] = useState('');

  //Estado de control para guardar el EMAIL
  const [email, setEmail] = useState('');

  const[branchOffice, setBranchOffice] = useState('');



  return (
    <div className={classes.root}>

      <CardInfoPatient
        companyList={companyList}
        setCompaniaSelected={setCompaniaSelected}
        cellPhone={cellPhone}
        setCellPhone={setCellPhone}
        email={email}
        setEmail={setEmail}
        setBranchOffice={setBranchOffice}
      />

      <Typography variant="h4" color="textPrimary" component="h4" className={classes.title}>
        Servicios de Atención
      </Typography>

      <PreviewTicket
        selectCompania={companiaSelected}
        dataIafas={dataIafas}
        listarUnidadTicket={listarUnidadTicket}
        cellPhone={cellPhone}
        email={email}
        branchOffice={branchOffice}
      />

      <ListServicesView
        tableSelect={true}
        selectCompania={companiaSelected}
      />
    </div>
  );
};

export default AtentionRegister

