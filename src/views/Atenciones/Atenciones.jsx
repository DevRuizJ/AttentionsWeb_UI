import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useHistory } from 'react-router-dom'

import { Typography, Grid, Breadcrumbs, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  AtencionesToolbar,
  AtencionesTable,
  AtentionRegister as AtentionRegisterView,
  ResultadosPDF
} from "./components";
/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Atencion";
import { actionCreators as actionCreatorsCompania } from "../../store/Compania";
import { actionCreators as actionCreatorsUser } from "../../store/User";
/*************REDUX *********************/

import { typeDocument } from "./data";

import { PacienteIafas as PacienteIafasView } from './components'

import { Load as LoadView } from './components'

import { BotSuiza as BotSuizaIcon } from "../../assets/icons";
import Alert from "@material-ui/lab/Alert";
import PdfViewer from "components/PdfViewer/PdfViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  content: {
    // marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  boxCreateAtc: {
    margin: theme.spacing(2, 0),
  },
  subtitle: {
    margin: theme.spacing(2, 0),
  },

  gridButton: {
    textAlign: 'center',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
  },
  button: {
    // border: "1px solid",
    lineHeight: 2,
    marginLeft: "auto",
    margin: theme.spacing(1, 0),
    borderRadius: "0.5rem",
    justifyContent: "center",
    // width: "100%",
  },
  bot: {
    fontSize: '120px'
  }
}));

function MessageNotfoundPatient(props) {

  const { classes, hidden } = props
  const history = useHistory();

  const handleClickOpen = () => {
    history.push('/atenciones/newpacient/default')
  }

  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
      alignItems="flex-end"
    >
      <Grid item xs={12} className={classes.gridButton}>
        <BotSuizaIcon className={classes.bot}></BotSuizaIcon>
      </Grid>

      <Grid item xs={12} className={classes.gridButton}>
        <Typography>
          Lo sentimos, el número de documento ingresado no coincide con ninguno de nuestros pacientes. Verifique el tipo/número de documento registre un nuevo paciente
        </Typography>
      </Grid>

      <Grid item xs={12} className={classes.gridButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className={classes.button}
          startIcon={<AddCircleIcon />}
        >
          REGISTRAR PACIENTE
        </Button>
      </Grid>
    </Grid>
  )
}

const Atenciones = props => {
  const classes = useStyles()
  const history = useHistory()

  //actionCreators del store
  const { searchPatient, getUser, clearPatient, clearPatientIafas, searchPatientIafasCip, searchPatientIafasDni, clearDataAtencion, listarUnidadTicket, getCieDiagnosisList } = props

  //store
  const { userCompany: usercompany, atencion, getListCompania, compania } = props

  const [typeDoc, setTypeDoc] = useState('001');
  const [codigoCompania, setCodigoCompania] = useState(null);

  const [codigoCompaniaPatient, setCodigoCompaniaPatient] = useState(null);

  const [pacienteIafas, setPacienteIafas] = useState(null);

  const [flagselect, setFlagselect] = useState(false);

  const [openPopupI, setOpenPopUp] = useState(true);

  const handleClean = (event) => {
    clearPatient();
    clearPatientIafas();
  }

  const handleSearchPatient = data => {

    if (data.iafasFlag) {

      clearPatientIafas();

      if (data.TipoDocumento == 1) {
        searchPatientIafasDni(data);
      }
      else {
        searchPatientIafasCip(data);
      }
    }
    else {
      searchPatient(data);
    }

  };

  useEffect(() => {
    if (atencion.patientDataIafas) {
      setPacienteIafas(atencion.patientDataIafas);
      setOpenPopUp(true)
    }
  }, [!atencion.patientDataIafas])

  useEffect(() => {
    getListCompania({})
  }, [])


  useEffect(() => {
    if (!usercompany.isExistUser) {
      //Se guarda a nivel local el compania    
      const token = localStorage.getItem('token');
      if (!token)
        history.push('/login')
      else {
        const userLocal = localStorage.getItem('user');
        getUser({ usuario: userLocal })
      }
    }
  }, [usercompany.isExistUser, history, getUser])

  useEffect(() => {
    if (!openPopupI) {
      clearPatientIafas();
      clearDataAtencion();
    }
  }, [openPopupI])


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
            GENERAR ATENCIONES
          </Typography>
        </Grid>
        {
          !atencion.searchPatient && !atencion.existPatientDataIafasMostrar
            ? (
              <Grid item>
                <Breadcrumbs aria-label="breadcrumb">
                  <Typography color="textPrimary">
                    Generar Atencion
                  </Typography>
                </Breadcrumbs>
              </Grid>
            ) : (
              <Grid item>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/atenciones"
                    onClick={e => handleClean()}
                  >
                    Generar Atenciones
                  </Link>
                  <Typography
                    color="textPrimary"
                  >
                    Registro Atencion
                  </Typography>
                </Breadcrumbs>
              </Grid>)
        }
      </Grid>

      {
        !atencion.existPatitent &&
        !atencion.existPatientDataIafasMostrar &&
        <AtencionesToolbar
          optionsSelect={typeDocument}
          setTypeDoc={setTypeDoc}
          typeDoc={typeDoc}
          atencion={atencion}
          onSearch={handleSearchPatient}
        />
      }

      <div className={classes.content}>
        {
          atencion.searchPatient &&
            !atencion.existPatitent ? (
            <MessageNotfoundPatient
              classes={classes}
            />
          ) : (
            atencion.existPatitent &&
            <AtentionRegisterView
              companyList={compania}
            />
          )
        }
      </div>

      {/* {
        pacienteIafas &&
        atencion.existPatitentIafas &&
        <PacienteIafasView
          onClose={setPacienteIafas}
          afiliadosData={pacienteIafas}
          companiaSeleccionada={companiaSeleccionadaPatient}
          openPopup={setOpenPopUp}
        />
      }

      {
        atencion.existPatientDataIafasMostrar && //se agrego
        <AtentionRegisterView
          companyList={compania}
        />
      } */}

      <LoadView open={atencion.isLoading} />

    </div>
  );
};

const mapStateToProps = state => ({
  atencion: state.atencion,
  userCompany: state.userCompany,
  compania: state.compania,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser,
      ...actionCreatorsCompania,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Atenciones)

