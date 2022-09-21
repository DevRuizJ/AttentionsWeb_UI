import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MessageBoot from '../../components/MessageBoot'

import {
  Typography,
  Breadcrumbs,
  Grid,
  CircularProgress
} from '@material-ui/core';

import {
  ListaResultados as ListaResultadosView,
  FilterResultados as FilterResultadosView,
} from './components'
import { useHistory } from 'react-router-dom'

/*************REDUX*************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Resultado";
import { actionCreators as actionCreatorsUser } from "../../store/User";
import { actionCreators as actionCreatorsCompania } from "../../store/Compania";
import { actionCreators as actionCreatorsAtencion } from "../../store/Atencion";

/*************REDUX*************/

import LoadingMessage from "components/LoadingMessage/LoadingMessage";
import validators from 'common/validators';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '3px'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

// const Resultados = ({compania,getListaResultados,resultado}) => {

const Resultados = props => {

  const classes = useStyles();
  const history = useHistory()

  //actionCreators del store
  const { getListaResultados, selectResultado, getUser, getListCompania, compania, clearDataAtencion } = props

  //store
  const { userCompany, resultado } = props
  const { isExistUser, razonSocial } = userCompany
  const { resultadosExist, isLoading, filter, } = resultado
  const [filtro, setFiltro] = useState(filter)
  const [newFiltro, setNewFiltro] = useState(null)

  useEffect(() => {
    getListCompania(
      {
        //"seekcia":"1848"
        usuario: "usercompany.usuario"
      });
  }, [getListCompania])

  useEffect(() => {
    clearDataAtencion();
  })

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

  const handleSelectResultado = useCallback((itemSelect) => {
    selectResultado(itemSelect)
    history.push("/resultado/view");

  }, [selectResultado, history])

  const setFilterCallback = useCallback(
    (data) => {
      //setNewFiltro({...data,compania})      
      setNewFiltro({ ...data })
    },
    //[setNewFiltro,compania],
    [setNewFiltro],
  )

  const GetListResult = useCallback(
    () => {
      getListaResultados({ ...newFiltro, ...newFiltro.companiaR })
      setFiltro(newFiltro)
    },
    [getListaResultados, newFiltro, compania],
  )

  useEffect(() => {
    if (newFiltro) {
      const isEquealsFilter = validators.objectEquals(filtro, newFiltro)
      if (compania && !isEquealsFilter) {
        GetListResult()
      }
    }
  }, [getListaResultados, compania, newFiltro, filtro, GetListResult])


  const ListResultadosCallback = useMemo(
    () => {
      return resultado.atenciones
    },
    [resultado.atenciones],
  )
  return (
    <>
      {isExistUser
        ?
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant='h4'
                component='h4'
                className={classes.title}
              >
                RESULTADOS DEL {filtro && filtro.fechaInicio} AL {filtro && filtro.fechaFin} - {razonSocial || ""}
              </Typography>
            </Grid>
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  color="textPrimary"
                  to="/resultados"
                >
                  Lista Resultados
                </Link>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <div>
            <FilterResultadosView
              onFilter={setFilterCallback}
              companiaData={compania}
            />
            <div className={classes.content}>
              {
                resultadosExist && ListResultadosCallback.length > 0
                  ?
                  <ListaResultadosView
                    data={ListResultadosCallback}
                    onSelect={handleSelectResultado}
                  />
                  :
                  isLoading
                    ?
                    <div
                      className={classes.center}
                    >
                      <CircularProgress />
                    </div>
                    :
                    <MessageBoot message={'No se cuenta con atenciones en este intervalo de fecha'} />
              }
            </div>
          </div>
        </div>
        : <LoadingMessage message='Autentificando...' />
      }
    </>
  );
};

const mapStateToProps = state => ({
  resultado: state.resultado,
  userCompany: state.userCompany,
  compania: state.compania,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser,
      ...actionCreatorsCompania,
      ...actionCreatorsAtencion,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resultados)
