import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

import { IconButton, Tooltip } from "@material-ui/core";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GetAppIcon from '@material-ui/icons/GetApp';

import {
  FilterTable as FilterTableView,
} from '../../components'
import { DataTable, SampleReception } from "./components";
import { SearchBox } from "components";

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "store/Atencion";
import { actionCreators as actionCreatorsAttention } from "store/Attention";
/*************REDUX **********************/

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  content: {
    marginTop: '15px'
  }
})


const TableLotes = (props) => {
  const { className } = props;
  const classes = useStyles();
  const { getLoteReport, getReporteLote, getListLote, attention, atencion, clearLote } = props;

  const [listResults, setListResults] = useState(null);
  const [selectLote, setSelecLote] = React.useState(null)
  //Obtenemos la lista de datos del Lote
  const setFilterCallback = useCallback(
    (data) => {
      getListLote({ ...data })
    },
    [getListLote],
  )


  const handleDownloadReporteLote = (numlote) => {
    if (numlote) {
      setSelecLote(numlote)
      getLoteReport(numlote)
    }
  }

  const handleListAtencionesLote = (numlote) => {
    getReporteLote({
      lote: parseInt(numlote)
    })
  }

  //configuramos la data de la tabla
  useEffect(() => {
    const getIconLoteAtenttion = (numlote) => {
      return (
        <Tooltip title="Seguimiento de Lote">
          <IconButton
            aria-label="Select"
            onClick={() => handleListAtencionesLote(numlote)}>
            <TrendingUpIcon />
          </IconButton>
        </Tooltip>
      )
    }
    const getIconReporte = (numlote) => {
      return (
        <Tooltip title="Descargar Lote">
          <IconButton
            aria-label="Select"
            onClick={() => handleDownloadReporteLote(numlote)}>
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      )
    }
    if (!listResults && atencion.listLotes) {
      const dataRows = atencion.listLotes.map((c) => {
        return {
          lote: c.numeroLote,
          fecha: c.fechaLote,
          tickets: c.tickets,
          atencion: getIconLoteAtenttion(c.numeroLote),
          reporte: getIconReporte(c.numeroLote),
        };
      });
      setListResults(dataRows);
    }
  }, [atencion.listLotes, handleListAtencionesLote, handleDownloadReporteLote]);

  const [filter, setFilter] = React.useState("")
  const [dataFilter, setDataFilter] = React.useState(null)

  const handleFilter = filterText => {
    setFilter(filterText)

    if (filterText.length > 0) {
      const dataFiltrada = []
      listResults.forEach(s => {
        if (`${s.lote}`.includes(filterText)) { dataFiltrada.push(s) }
      })
      setDataFilter(dataFiltrada)
    }
    else {
      setDataFilter(null)
    }
  }
  useEffect(() => {
    if (atencion.loteGenerate && atencion.loteGenerate.pdf.length > 0) {
      const linkSource = `data:application/pdf;base64,${atencion.loteGenerate.pdf}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = `SuizaLab Lote-${selectLote}.pdf`;
      downloadLink.click();
    }
    // window.open("data:application/pdf;base64," + atencion.loteGenerate.pdf);
  }, [atencion.loteGenerate])

  return (
    <div className={clsx(classes.root, className)}>
      {
        attention.loteAtenciones.length === 0
          ?
          <div className={classes.TableLote}>
            <FilterTableView
              onFilter={setFilterCallback}
            />
            {
              listResults &&
              <div className={classes.content}>
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
            }
          </div>
          :
          <SampleReception
            loteAtenciones={attention.loteAtenciones}
            clearLote={clearLote}
          />
      }
    </div>
  );
}
TableLotes.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  atencion: state.atencion,
  attention: state.attention
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsAttention,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableLotes)

