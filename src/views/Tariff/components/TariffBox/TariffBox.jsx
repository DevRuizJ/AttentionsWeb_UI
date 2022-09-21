import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Services";
/*************REDUX *********************/

import {
  Grid,
} from "@material-ui/core";

import { TariffTable, SearchSwitch } from "../../components";
import { SearchBox } from "../../../../components";
import { Paper, Typography } from "@mui/material";
import { color } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '15px'
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  sectionSearch: {
    display: 'flex',
    margin: theme.spacing(1, 0)
  },
}));


const TariffBox = props => {
  const classes = useStyles()

  //actionCreators del store
  const { /*getGroupService,*/ getListService, getFilteredServices, tableSelect, selectCompania, ...rest } = props

  //store
  const { services, userCompany: usercompany } = rest

  const [itemGroup, setItemGroup] = useState(0);
  const [dataFilter, setDataFilter] = useState(null)
  const [filtroGeneral, setFiltroGeneral] = useState(true)

  const [filter, setFilter] = useState("")

  //Estado de control para listar los servicios que corresponden a la compania
  const [servicesList, setServicesList] = useState([])



  // useEffect(() => {
  //   if (itemGroup)
  //     getListService({
  //       "compania": selectCompania || null,
  //     })
  //   setDataFilter(null)
  //   setFilter("")
  //   setFiltroGeneral(true)
  // }, [getListService, itemGroup, usercompany.compania, selectCompania])

  useEffect(() => {
    if (!services.existTariff) {
      getListService({
        "compania": selectCompania || null,
      })
    }
  }, [services.existTariff, usercompany.compania, selectCompania])

  useEffect(() => {
    getListService({
      "compania": selectCompania || null,
    })
  }, [selectCompania])

  useEffect(() => {
    if (services.listFilter) {
      setDataFilter(services.listFilter)
    }
  }, [services.listFilter, selectCompania])

  useEffect(() => {
    setServicesList(services.payload)
  }, [services.payload]);


  const handleChangeFilterEspecific = filterText => {

    setFilter(filterText)

    if (filterText.length > 0) {
      if (!filtroGeneral) {

        const dataFiltrada = []

        services.payload.forEach(s => {
          if (s.id.includes(filterText) || s.descripcion.includes(filterText)) {
            dataFiltrada.push(s)
          }
        })
        setDataFilter(dataFiltrada)
      }
      else {

        if (filterText.length > 2) {

          getFilteredServices({
            "compania": selectCompania || null,
            "filtro": filterText
          })
        }
      }
    }
    else {
      setDataFilter(null)
    }
  }

  return (
    <div className={classes.root}>
      {
        services.existTariff ? (
          <div>

            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <div hidden={true}>
                <Grid item>
                  <SearchSwitch onChangeSwitch={setFiltroGeneral} stateSwitch={filtroGeneral} />
                </Grid>
              </div>
              <div>
                <Grid item>
                  <SearchBox onChangeFilter={handleChangeFilterEspecific} filter={filter} />
                </Grid>
              </div>
            </Grid>

            <TariffTable
              listServices={dataFilter || servicesList}
              tableSelect={tableSelect}
            />

          </div>
        ) : (
          <div>
            <Paper className={classes.root}>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  <b style={{ color: 'red' }}>
                    Seleccione una compañía.
                  </b>
                </Typography>
              </Grid>
            </Paper>
          </div>
        )
      }
    </div>
  );
};


const mapStateToProps = state => ({
  services: state.services,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TariffBox)
