import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

import { IconButton, Tooltip } from "@material-ui/core";
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import validators from '../../../../common/validators';

import { DataTable } from "./components";
import { SearchBox } from "components";


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

const TablePayments = (props) => {
  const { className } = props;
  const classes = useStyles();
  const { data, onPreview, onCancel, onSelectPayment } = props;

  const [listResults, setListResults] = useState([]);
  //configuramos la data de la tabla
  useEffect(() => {
    const getActionTable = (state, rowData) => {
      if (state !== "SI")
        return (
          <div>

            <Tooltip title="Pagar con Tarjeta">
              <IconButton
                aria-label="Select"
                onClick={() => onSelectPayment(rowData)}>
                <PaymentIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Adjuntar Comprobante">
              <IconButton
                aria-label="Select"
                onClick={() => onCancel(rowData)}>
                <AccountBalanceWalletIcon />
              </IconButton>
            </Tooltip>
          </div>

        )
      else
        return (
          <Tooltip title="Ver Factura">
            <IconButton
              aria-label="Select"
              onClick={() => onPreview(rowData)}>
              <ReceiptIcon />
            </IconButton>
          </Tooltip>
        )
    }
    const getCancelacion = (state) => {
      if (state === "SI")
        return (<DoneAllIcon />)
      else
        return null
    }
    if (data) {
      const dataRows = data.map((c) => {
        return {
          documento: c.comprobante,
          fecha: c.fecha,
          total: validators.MontoPENDecimal(c.total),
          tickets: c.totalTickets,
          cancelado: getCancelacion(c.cancelacion),
          actions: getActionTable(c.cancelacion, c),

        };
      });
      setListResults(dataRows);
    }
  }, [data, onPreview, onCancel]);


  const [filter, setFilter] = React.useState("")
  const [dataFilter, setDataFilter] = React.useState(null)
  const handleFilter = filterText => {
    setFilter(filterText)

    if (filterText.length > 0) {
      const dataFiltrada = []
      listResults.forEach(s => {
        if (s.documento.includes(filterText) || s.fecha.includes(filterText) || s.total.includes(filterText)) {
          dataFiltrada.push(s)
        }
      })
      setDataFilter(dataFiltrada)

    }
    else {
      setDataFilter(null)
    }
  }


  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.actions}>
        <SearchBox
          onChangeFilter={handleFilter}
          filter={filter}
        />
      </div>
      <DataTable
        classes={classes}     
        rows={dataFilter || listResults}
      />
    </div>

  );
}
TablePayments.propTypes = {
  className: PropTypes.string,
};

export default TablePayments;
