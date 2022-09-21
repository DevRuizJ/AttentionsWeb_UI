import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import {
  Paper,
  Grid,
  Button,
  Divider,
  Typography,
  FormLabel
} from "@material-ui/core";
import { Search as SearchIcon } from "../../../../assets/icons";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
  },
  cardHeader: {
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 1, 1),
    border: "0px solid #000",
  },
  grid: {
    margin: theme.spacing(2),
    marginTop: 0,
    width: "100%",
  },
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(2),
  },
  text: {
    color: theme.palette.text.secondary,
    "& *": {
      color: theme.palette.text.secondary,
    },
  },
  btnSearch: {
    marginBottom: theme.spacing(0),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }

}));

const AtencionesToolbar = (props) => {

  const { optionsSelect, onSelect, setTypeDoc, typeDoc, onSearch, atencion } = props;

  const [numeroDocumento, setNumeroDocumento] = useState('');

  //FLAG para Check iafas
  const [state, setState] = useState({
    iafas: false,
  });

  //agregar diseño
  const classes = useStyles();



  const handleFind = (e) => {
    e.preventDefault();
    if (typeDoc) {
      onSearch({
        "TipoDocumento": typeDoc || optionsSelect[0].id,
        "NumeroDocumento": numeroDocumento,
        "iafasFlag": iafas
      })
    }
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked
    });

    setTypeDoc('1');
  };

  //Desestructuración del flag para iafas
  const { iafas } = state;
  const error = [iafas].filter((v) => v).length !== 2;



  useEffect(() => {
    setNumeroDocumento(numeroDocumento);
  }, [numeroDocumento])



  return (
    <Paper className={classes.root}>

      <form onSubmit={handleFind}>

        <Grid item xs={12} sm={12} container spacing={3} className={classes.grid} alignItems="flex-end">

          <Grid item xs={12} sm={12}>
            <Typography
              color="textSecondary"
              variant="h6"
              gutterBottom
            >
              BÚSQUEDA DE PACIENTE
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={10} sm={10} hidden={true}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  label="BÚSQUEDA EN IAFAS"
                  control={
                    <Checkbox
                      checked={iafas}
                      onChange={handleChange}     //Ejecuta el evento
                      name="iafas"
                      color="primary" />
                  }
                />
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={10} sm={10} hidden={false}>
            <FormControl className={classes.formControl} variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="documento-label">Tipo de Documento</InputLabel>
              <Select
                labelId="documento-label"
                id="documento-label"
                label="Tipo de Documento"
                name="documento"
                value={typeDoc}
                onChange={(e) => setTypeDoc(e.target.value)}     //Ejecuta el evento
              >
                {
                  iafas ? (
                    <MenuItem key="008" value="008" text="CIP">CIP</MenuItem>
                  ) : (
                    optionsSelect && optionsSelect.map(c => <MenuItem key={c.id} value={c.id} text={c.title} >{c.title}</MenuItem>)
                  )
                }

              </Select>
              {!optionsSelect && <FormHelperText className={classes.error}>Tipo de documento</FormHelperText>}
            </FormControl>
          </Grid>

          {
            // typeDoc &&
            <Grid item xs={8} sm={4}>
              <TextField
                label="N° Documento"
                value={numeroDocumento || ''}
                onChange={(e) => setNumeroDocumento(e.target.value)}      //Ejecuta el evento
                style={{ width: '80%' }}
              />
            </Grid>
          }

          {
            <Grid item xs={10} sm={8}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.btnSearch}
                endIcon={
                  <SearchIcon />
                }
                disabled={atencion.isLoading || numeroDocumento.length < 8}
              >
                BUSCAR PACIENTE
              </Button>
            </Grid>
          }

        </Grid>

      </form>

    </Paper>
  );
};

AtencionesToolbar.propTypes = {
  className: PropTypes.string,
};

export default AtencionesToolbar;
