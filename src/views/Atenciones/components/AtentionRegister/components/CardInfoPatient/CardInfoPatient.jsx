import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import {
  Paper,
  Grid,
  Divider,
  Typography,
  Avatar,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  useFormControl
} from "@material-ui/core";

/*************REDUX **********************/
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actionCreatorsBranchOffice } from "../../../../../../store/BranchOffice";
import { actionCreators as actionCreatorsAtencion } from "../../../../../../store/Atencion";
/*************REDUX *********************/

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
  },
  grid: {
    marginTop: 0,
    width: "100%",
  },
  text: {
    color: theme.palette.text.secondary,
    "& *": {
      color: theme.palette.text.secondary,
    },
  },
  avatar: {
    width: 90,
    height: 90,
  },

}));


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}



const CardInfoPatient = (props) => {

  //seteo la compañia seleccionada
  const { companyList, setCompaniaSelected, cellPhone, setCellPhone, email, setEmail, setBranchOffice } = props;

  //Estado de control para obtener SUCURSAL seleccionada
  const [sucursal, setSucursal] = useState('02');

  //STORE
  const { atencion, branchOffice, getBranchOfficeList } = props;

  const classes = useStyles();
  const patient = /*atencion.existPatientDataIafasMostrar ? atencion.patientDataIafasMostrar : */atencion.patientData


  //al seleccionar compania
  const [options, setOptions] = useState([]);

  //AUTOCOMPLETE ASync
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;


  const handleChangeCompania = (company) => {
    company && setCompaniaSelected(company.seekcia);
  }


  useEffect(() => {
    getBranchOfficeList({});
    setBranchOffice(sucursal)
  }, [sucursal])

  //PARA COMPANIA ASYNC
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(0.2e3);

      if (active) {
        setOptions([...companyList.data.companyList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  //AUTOCOMPLETE
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    setCellPhone(cellPhone);
  }, [cellPhone])

  useEffect(() => {
    setEmail(email);
  }, [email])



  return (
    <Paper className={classes.root}>
      <Typography
        color="textSecondary"
        variant="h6"
        gutterBottom
      >
        DATOS DEL PACIENTE
      </Typography>
      <Divider />
      <Grid
        container
        spacing={3}
        className={classes.grid}
        alignItems="center"
      >
        <Grid item>
          {
            patient.sexo === 'F' ?
              <Avatar
                className={classes.avatar}
                alt="LogoEmpresa"
                src="https://www.flaticon.com/premium-icon/icons/svg/1312/1312064.svg"
              />
              :

              <Avatar
                className={classes.avatar}
                alt="LogoEmpresa"
                src="https://www.flaticon.com/premium-icon/icons/svg/2202/2202112.svg"
              />
          }
        </Grid>

        <Grid item xs={12} sm container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <div style={{ display: 'flex' }}>
                <div style={{ width: '175px' }}>
                  <b>APELLIDOS Y NOMBRES</b>
                </div>
                <div style={{ width: '2%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.paciente ? patient.paciente : patient.apellidoPaterno + ' ' + patient.apellidoMaterno + ' ' + patient.nombre}
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '175px' }}>
                  <b>N° DOCUMENTO</b>
                </div>
                <div style={{ width: '2%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.numeroDocumento}
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <div style={{ display: 'flex' }}>
                <div style={{ width: '175px' }}>
                  <b>FECHA DE NACIMIENTO</b>
                </div>
                <div style={{ width: '2%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.fechaNacimiento}
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <div style={{ display: 'flex' }}>
                <div style={{ width: '175px' }}>
                  <b>EDAD</b>
                </div>
                <div style={{ width: '2%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.edad + ' años'}
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <div style={{ display: 'flex' }}>
                <div style={{ width: '175px' }}>
                  <b>SEXO</b>
                </div><div style={{ width: '2%' }}>
                  <b>:</b>
                </div>
                <div>
                  {patient.sexo === 'F' ? 'FEMENINO' : 'MASCULINO'}
                </div>
              </div>
            </Typography>
          </Grid>
          <div style={{ width: '70%' }}>
            <div style={{ display: 'flex', padding: '10px 0px 10px 0px' }}>
              <Grid item xs={12} sm={6} style={{ padding: '0 10px 0 0' }}>
                <TextField
                  required={true}
                  label="N° celular para envío de Resultados"
                  value={cellPhone || ''}
                  onChange={(e) => setCellPhone(e.target.value)}      //Ejecuta el evento
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{ padding: '0 10px 0 0' }}>
                <TextField
                  required={true}
                  label="Correo electrónico"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}      //Ejecuta el evento
                  style={{ width: '100%' }}
                />
              </Grid>
            </div>
            <div style={{ display: 'flex' }}>
              <Grid item xs={8} sm={6} style={{ padding: '0 10px 0 0' }}>
                <FormControl className={classes.formControl} variant="outlined" style={{ width: '100%' }} required={true}>
                  <InputLabel id="documento-label">Sucursal</InputLabel>
                  <Select
                    labelId="branchOffice-label"
                    id="branchOffice-label"
                    label="Sucursal"
                    name="branchOffice"
                    value={sucursal}
                    onChange={(e) => setSucursal(e.target.value)}     //Ejecuta el evento
                  >
                    {
                      branchOffice.data && branchOffice.data.branchOfficeList.map(s => <MenuItem key={s.numSuc} value={s.numSuc} text={s.nombre} >{s.nombre}</MenuItem>)
                    }

                  </Select>
                  {!branchOffice.data && <FormHelperText className={classes.error}>Sucursal</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={6} style={{ padding: '0 10px 0 0' }}>
                <Autocomplete
                  id="compania controllable-states-demo"
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => option.seekcia === value.seekcia}
                  getOptionLabel={(companySelected) => companySelected.descripcion}
                  options={options}
                  loading={loading}
                  onChange={(e, companyChange) => {
                    handleChangeCompania(companyChange)    //setCompaniaSelected()
                  }}
                  renderInput={(params) => (
                    <TextField
                      required={true}
                      {...params}
                      label="Seleccionar compañía"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper >


  );
};


const mapStateToProps = state => ({
  atencion: state.atencion,
  branchOffice: state.branchOffice
})

// CardInfoPatient.propTypes = {
//   className: PropTypes.string,
// };

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreatorsBranchOffice,
      ...actionCreatorsAtencion
    }, dispatch)
  }
}

export default connect(mapStateToProps, /*{},*/ mapDispatchToProps)(CardInfoPatient)
