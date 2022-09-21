// @ts-nocheck
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Breadcrumbs,
  Box,
  Tab,
  Tabs,
  AppBar,
  Button,
} from "@material-ui/core";

import {
  TableDenied,
  TablePayments,
  FilterTable as FilterTableView,
  DialogOptionsCancel,
  DialogPDF,
  TableLotes,
  SampleReception,
  PaymentCard
} from "./components";
/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Payment";
import { actionCreators as actionCreatorsUser } from "../../store/User";
/*************REDUX **********************/

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  content: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Tracking = React.memo(({ getUser, userCompany, payment, getPayList, getPaymentReport, registroComprobantePago, datosComprobante, clearDatosComprobantes }) => {
  const classes = useStyles();
  const history = useHistory()
  const { isExistUser, compania } = userCompany
  const [step, setStep] = useState(0);
  const [optionCancel, setOptionCancel] = useState(null);

  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setStep(newValue);
  };

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

  const setFilterCallback = useCallback(
    (data) => {
      // setFiltro({...data,compania})
      getPayList({ ...data, compania })
    },
    [getPayList, compania],
  )

  const handleCancel = data => {
    //Cancelacion options
    setOptionCancel(data)
  }
  const handlePreview = data => {
    //Se guarda a nivel local el compania 
    getPaymentReport({
      "Tipo": data.numtdven,
      "Serie": data.serfac,
      "Numero": data.numfac,
      "Empresa": "01"
    })
    setOpen(true)
  }

  const handleUploadVoucher = data => {
    registroComprobantePago(data)
    handleCancel(null)
  }

  const handleGetBill = (data) => {

    datosComprobante(
      {
        "Tipo": data.numtdven,
        "Serie": data.serfac,
        "Numero": data.numfac,
      }
    )
  }
  const handleClearPayment = () => {
    clearDatosComprobantes()
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
            SEGUIMIENTO DE
            {step === 0 && " PAGOS"}
            {step === 1 && " LOTES"}
            {step === 2 && " MUESTRAS RECHAZADAS"}
          </Typography>
        </Grid>
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">
              Seguimiento
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <div className={classes.content}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={step}
            onChange={handleChange}
            aria-label="Tabs de Seguimientos"
          >
            <LinkTab label="PAGOS" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="LOTES" href="/lote" {...a11yProps(1)} />
            <LinkTab label="RECHAZADOS" href="/trash" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={step} index={0}>
          {
            isExistUser &&
            <Fragment>
              <FilterTableView
                onFilter={setFilterCallback}
              />

            </Fragment>
          }
          {payment.listPays && !payment.datosComprobante && <TablePayments data={payment.listPays} onCancel={handleCancel} onPreview={handlePreview} onSelectPayment={handleGetBill} />}

          {
            payment.datosComprobante && <PaymentCard datosComprobante={payment.datosComprobante} />
          }

          {
            payment.datosComprobante && <Button onClick={handleClearPayment}>Regresar</Button>
          }


        </TabPanel>
        <TabPanel value={step} index={1}>
          <TableLotes />
        </TabPanel>
        <TabPanel value={step} index={2}>
          <TableDenied />
        </TabPanel>
      </div>
      {
        optionCancel && <DialogOptionsCancel itemCancel={optionCancel} onClose={handleCancel} onSaveVoucher={handleUploadVoucher} />
      }
      { open && payment.paymentData && <DialogPDF onClose={setOpen} openState={open} data={payment.paymentData} />}
    </div>
  );
});

const mapStateToProps = state => ({
  payment: state.payment,
  userCompany: state.userCompany,
  attention: state.attention
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tracking)



