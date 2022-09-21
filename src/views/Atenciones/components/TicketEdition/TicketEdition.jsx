import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Select,
    FormHelperText,
    TextField,
    Typography,
    Divider
} from '@material-ui/core';
import React, { useState } from 'react'

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';


import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from './useStyles'
import { display } from '@mui/system';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const useStyles = makeStyles((theme)=>({
//     root:{
//       margin:theme.spacing(2),
//     },
//     title:{    
//       marginBottom:theme.spacing(3)
//     },
//     dialog:{
//      minWith:"500px"
//   }
//   }));

const TicketEdition = (props) => {
    const classes = useStyles()
    const { ticket, listaUnidades, actualizarUnidadTicket, onCloseEditTicket } = props;

    const [openViewer, setOpenViewer] = useState(ticket);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    })
    // const [fileArray, setFileArray] = useState(file);
    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false

    //Función para cambiar los valores del formulario
    const handleChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value.toUpperCase()
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    }


    const handleRegisterPaciente = () => {

        const parametros = {
            ...ticket,
            ...formState.values
            // "observacion": formState.values.observacion,
            // "unidad": formState.values.unidades,

        }
        actualizarUnidadTicket(parametros);
        onCloseEditTicket();
    }

    return (
        <div>
            <Dialog
                open={openViewer}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >

                <DialogTitle id="alert-dialog-title"><b>EDITAR TICKET</b></DialogTitle>
                <DialogContent>

                    <Typography variant="body1" component="p" color="secondary" className={classes.title}>
                        Ticket: {ticket.numoscab}{ticket.peroscab}{ticket.anooscab}{ticket.numsuc}
                    </Typography>
                    <Typography variant="body1" component="p" color="secondary" className={classes.title}>
                        Paciente: {ticket.paciente}
                    </Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                className={classes.textField}
                                error={hasError('observacion')}
                                fullWidth
                                helperText={
                                    hasError('observacion') ? formState.errors.observacion[0] : null
                                }
                                label="observacion"
                                name="observacion"
                                onChange={handleChange}
                                type="text"
                                value={formState.values.observacion || ''}
                                variant="outlined"
                                autoFocus
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >

                            {
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '500px' }}>
                                    <InputLabel id="demo-simple-select-error-label">Seleccione la Unidad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        id="demo-simple-select-error"
                                        value={formState.values.unidad}
                                        onChange={handleChange}
                                        label="Seleccione la Unidad"
                                        name="unidad"
                                    >
                                        <MenuItem value="">
                                        </MenuItem>
                                        {
                                            listaUnidades.dataUnidad && listaUnidades.dataUnidad.map(c =>
                                                <MenuItem key={c.codigo} value={c.codigo}>{c.unidad}</MenuItem>
                                            )
                                        }
                                        {
                                            !listaUnidades.existDataUnidad &&
                                            <MenuItem value={''}>No se cargo las unidades de ticket </MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            }
                        </Grid>

                    </Grid>


                </DialogContent>



                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    {/* <Divider /> */}

                    <div style={{ width: '30%', display: 'flex', gap: '10px' }}>
                        <Button
                            className={classes.buttonRegister}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            size='large'
                            // disabled={!formState.isValid ||patient.isLoading}
                            onClick={handleRegisterPaciente}
                        >
                            Registrar
                        </Button>
                        <Button
                            className={classes.buttonRegister}
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={onCloseEditTicket}>CANCELAR</Button>
                    </div>


                </div>


            </Dialog>
        </div>
    )
}



export default TicketEdition;

