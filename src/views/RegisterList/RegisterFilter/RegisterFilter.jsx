import { makeStyles } from '@material-ui/styles';
import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import AddCircleIcon from '@material-ui/icons/AddCircle';

/*************REDUX **********************/
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { actionCreators as actionCreatorsCompania } from "../../../store/Compania";
import { actionCreators as actionCreatorsBranchOffice } from "../../../store/BranchOffice";
/*************REDUX **********************/


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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}



const RegisterFilter = (props) => {

    const { setCodigoCompania, setBranchOffice, handleAttentionList } = props;

    //store
    const { compania, getListCompania, branchOffice, getBranchOfficeList } = props;



    //agregar diseño
    const classes = useStyles();

    //al seleccionar compania - options = lista de compañias
    const [options, setOptions] = useState([]);

    //simple autocomplete
    const [company, setCompania] = useState('')

    //AUTOCOMPLETE ASync
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    //Estado de control para obtener SUCURSAL seleccionada
    const [sucursal, setSucursal] = useState('02');



    const handleFind = (e) => {
        e.preventDefault();
        handleAttentionList();
    }

    const handleChangeCompania = (company) => {
        setCompania(company.seekcia);
    }



    //PARA COMPANIA ASYNC
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(0.2e3);

            if (active) {
                setOptions([...compania.data.companyList]);
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
        getBranchOfficeList({});
        setBranchOffice(sucursal)
    }, [sucursal])

    useEffect(() => {
        getListCompania({})
    }, [])

    useEffect(() => {
        setCodigoCompania(company)
    }, [company]);



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
                            LISTA DE ATENCIONES GENERADAS
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={10} sm={10} >
                        <Autocomplete
                            id="compania controllable-states-demo"
                            sx={{ width: 300 }}
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
                                e.preventDefault();
                                handleChangeCompania(companyChange)    //setCompania()
                            }}
                            // onChange={(e) => setCompania(e.target.value)}
                            renderInput={(params) => (
                                <TextField
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

                    <Grid item xs={10} sm={10} style={{ display: 'flex' }}>
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

                        <Grid item xs={8} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.btnSearch}
                                endIcon={
                                    <AddCircleIcon />
                                }
                                disabled={!company}
                            >
                                BUSCAR ATENCIONES
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </form>

        </Paper>
    )
};


const mapStateToProps = state => ({
    compania: state.compania,
    branchOffice: state.branchOffice
})

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            ...actionCreatorsCompania,
            ...actionCreatorsBranchOffice,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFilter)