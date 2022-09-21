import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import validator from '../../../../../../common/validators'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 350,
  },
  tableHeader: {
    backgroundColor: theme.palette.personalized.tableHeader,
    '& *': {
      color: `${theme.palette.background.default}!important`
    }
  },
  textResumen: {
    width: 120,
    textAlign: 'end'
  },
  inline: {
    display: 'flex',
  },
  boxResumen: {
    padding: theme.spacing(2)
  },
  boxResumenTotal: {
    padding: theme.spacing(2),
    '& *': {
      color: theme.palette.warning.dark
    }
  }
}));


const PaymentDetails = ({ data, paymentData }) => {

  const classes = useStyles();

  const rows = data.map(a => {
    return ({
      ticket: a.ticket,
      fecha: a.fechaAtencion,
      paciente: a.paciente,
      lote: a.lote,
      total: validator.MontoPENDecimal(a.total),
    })
  }
  )
  const handleTotal = () => {
    const totalTickets = data.length ? data.map(s => parseFloat(s.total)) : []
    const suma = totalTickets.reduce((acumulador, valor) => acumulador + valor)
    return validator.MontoDecimal(suma)
  }
  const handleIGV = () => {
    const totalTickets = data.length ? data.map(s => parseFloat(s.total)) : []
    const suma = totalTickets.reduce((acumulador, valor) => acumulador + valor)
    return validator.MontoDecimal(suma * 0.18)
  }
  return (
    <div className={classes.root}>
      {
        data.length > 0
        &&
        <React.Fragment>
          {/* tabla entra aca */}
          <TableContainer>
            <Table
              className={classes.table}
              aria-label="spanning table"
              size={'medium'}
            >
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell>TICKET</TableCell>
                  <TableCell align="center">FECHA</TableCell>
                  <TableCell >PACIENTE</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.ticket}>
                    <TableCell align="center">{row.ticket}</TableCell>
                    <TableCell align="center">{row.fecha}</TableCell>
                    <TableCell>{row.paciente}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {
            !paymentData
              ?
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                className={classes.boxResumen}
              >
                <Grid item xs>
                  <div className={classes.inline}>
                    <Typography variant='subtitle1' component='div'>
                      <b>SUB TOTAL</b>
                    </Typography>
                    <Typography variant='subtitle1' component='div' className={classes.textResumen}>
                      {validator.MontoPENDecimal(parseFloat(handleTotal()) - parseFloat(handleIGV()))}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs>
                  <div className={classes.inline}>
                    <Typography variant='subtitle1' component='div'>
                      <b>IGV 18%</b>
                    </Typography>
                    <Typography variant='subtitle1' component='div' className={classes.textResumen}>
                      S/.{handleIGV()}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs>
                  <Divider />
                  <div className={classes.inline}>
                    <Typography variant='subtitle1' component='div'>
                      <b>TOTAL</b>
                    </Typography>
                    <Typography variant='subtitle1' component='div' className={classes.textResumen}>
                    S/.{handleTotal()}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              :
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                className={classes.boxResumenTotal}
              >
                <Grid item xs>
                  <div className={classes.inline}>
                    <Typography variant='subtitle1' component='div'>
                      <b>TOTAL A CANCELAR </b>
                    </Typography>
                    <Typography variant='subtitle1' component='div' className={classes.textResumen}>
                {validator.MontoPENDecimal(parseFloat(paymentData.total))}
              </Typography>
            </div>
          </Grid>
        </Grid>
          }
        </React.Fragment>
      }
    </div>
  );
};



export default PaymentDetails;

