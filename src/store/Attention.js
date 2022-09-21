import GetDataServer from '../common/GetDataServer'
import validators from 'common/validators';
import {URLAPI} from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_LOTE_ATENCIONES: 'RESPONSE_LOTE_ATENCIONES',
  NEW_ESCANEO:'NEW_ESCANEO',
  ESCANEO_MUESTRA: 'ESCANEO_MUESTRA',
  MOTIVOS_RECHAZO: 'MOTIVOS_RECHAZO',
  CLEAR_LOTE:'CLEAR_LOTE',
  RESET_STATE: 'RESET_STATE',
}
const initialState = { 
  loteAtenciones:[]
}

const urlAPI = URLAPI + "atencion/"

export const actionCreators = {
  getReporteLote: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post',urlAPI + "reporte-lote",true,requestData)
    .then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.RESPONSE_LOTE_ATENCIONES, data })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )
  },

  getEscaneoMuestra: requestData => (dispatch) => {
    const {lote,...rest} = requestData
    let mensaje=""
    dispatch({ type: actionState.NEW_REQUEST })
    dispatch({ type: actionState.NEW_ESCANEO })
    GetDataServer('post',urlAPI + "escaneo-muestra",true,rest)
    .then(data => {
      mensaje =  `${data.mensaje} ${rest.orden}-${rest.muestra}` 
      return GetDataServer('post',urlAPI + "reporte-lote",true,{lote})
    })
    .then(data => {
      dispatch({ type: actionState.RESPONSE_LOTE_ATENCIONES, data })
      const message =mensaje
      dispatch({ type: actionState.RESPONSE_SUCCESS,message})
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )
  },
  clearLote: () => (dispatch) => dispatch({ type: actionState.CLEAR_LOTE }),
  clearEscaneo: () => (dispatch) => dispatch({ type: actionState.CLEAR_ESCANEO }),
  
  getMotivosRechazo: () => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('get',urlAPI + "motivos-rechazo",true)
    .then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.MOTIVOS_RECHAZO, data })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )
  },
  setInitialState: () => (dispatch) => dispatch({ type: actionState.RESET_STATE })  
}

export const reducer = (state, action) => {
  state = state || initialState

  switch (action.type) {
    case actionState.NEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isShowAlert: false,
        requestMessage: ""
      }
    case actionState.RESPONSE_ERROR:
      return {
        ...state,
        isRequestError: true,
        isShowAlert: action.message ? true : false,
        requestMessage: action.message,
        isLoading: false,
        isLoadingEscaneo:false
      }
    case actionState.RESPONSE_SUCCESS:
      return {
        ...state,
        isRequestError: false,
        requestMessage: action.message || null,
        isShowAlert: action.message ? true : false,
        isLoading: false,
        isLoadingEscaneo:false
      }
    case actionState.RESPONSE_LOTE_ATENCIONES:
      return {
        ...state,
        loteAtenciones: action.data
      }
    case actionState.NEW_ESCANEO:
      return {
        ...state,
        isLoadingEscaneo: true,
      }
    case actionState.MOTIVOS_RECHAZO:
      return !validators.objectEquals(state.listaMotivos,action.data) 
      ? {
        ...state,
        listaMotivos: action.data
        }
      : state
    case actionState.CLEAR_LOTE:
      return initialState
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
