import validators from 'common/validators';
import GetDataServer from '../common/GetDataServer'
import {URLAPI} from '../common/VariableGlobal'
// ACTIONS
export const actionState = {

  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESET_STATE: 'RESET_STATE',
  RESET_STATE_LOCAL: 'RESET_STATE_LOCAL',
  LIST_RESULTADOS: 'LIST_RESULTADOS',
  SELECT_RESULTADO: 'SELECT_RESULTADO',
  FILTER_DATE: 'FILTER_DATE',
  RESULTADO_PACIENTE: 'RESULTADO_PACIENTE',
  RESULTADO_PACIENTE_PDF: 'RESULTADO_PACIENTE_PDF'
}

// STORE
const initialState = { resultadosExist: false,filter:null }

const urlAPI = URLAPI + 'resultados/'

export const actionCreators = {
  // LISTA DE RESULTADOS
  getListaResultados: requestData => (dispatch) => {    
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post',urlAPI + "all",true,requestData)
    .then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.LIST_RESULTADOS, data })
      const filtro = requestData
      dispatch({ type: actionState.FILTER_DATE, filtro })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )   
  },


  getRangos: requestData => (dispatch) => {    
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post',urlAPI + "all",true,requestData)
    .then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.LIST_RESULTADOS, data })
      const filtro = requestData
      dispatch({ type: actionState.FILTER_DATE, filtro })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )   
  },


  selectResultado: data => (dispatch) => {
    dispatch({ type: actionState.SELECT_RESULTADO, data })
  },

  // RESULTADO PACIENTE
  getResultadoPaciente: requestData => (dispatch) => {
        
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post',urlAPI + "atencion",true,requestData)
    .then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.RESULTADO_PACIENTE, data })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )   

    GetDataServer('post',urlAPI + "pdf",true,{ ...requestData, "Tipo": "DEFAULT" })
    .then(data => {
      dispatch({ type: actionState.RESULTADO_PACIENTE_PDF, data })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )   

  },
  // ENVIO DE RESULTADO
  sendResultPac: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post',urlAPI + "send-resultado",true,requestData)
    .then(data => {
      const message = data.mensaje
      dispatch({ type: actionState.RESPONSE_SUCCESS, message })
    })
    .catch(
      message => dispatch({ type: actionState.RESPONSE_ERROR, message })
    )  
  },
  setInitialLocalState: () => (dispatch) => dispatch({ type: actionState.RESET_STATE_LOCAL }),
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
        isLoading: false
      }
    case actionState.RESPONSE_SUCCESS:
      return {
        ...state,
        isRequestError: false,
        requestMessage: action.message || null,
        isShowAlert: action.message ? true : false,
        isLoading: false
      }
    case actionState.LIST_RESULTADOS:
      return !validators.objectEquals(state.atenciones,action.data) 
      ? {
          ...state,
          atenciones: action.data,
          resultadosExist: true
        }
      : state
      
    case actionState.SELECT_RESULTADO:
      return !validators.objectEquals(state.selectResultado,action.data)
      ? {
          ...state,
          selectResultado: action.data,
          isSelectResultado: true
        }
      : state
    case actionState.RESULTADO_PACIENTE:
      return !validators.objectEquals(state.resultadoPaciente,action.data)
      ? {
          ...state,
          resultadoPaciente: action.data,
          isLoadPdfResult: false
        }
      :state
    case actionState.RESULTADO_PACIENTE_PDF:
      return !validators.objectEquals(state.resultadoPacientePdf,action.data.pdf)
      ? {
          ...state,
          resultadoPacientePdf:  action.data.pdf,
          isLoadPdfResult: true
        }
      : state

    case actionState.FILTER_DATE:
      return {
        ...state,
        filter: action.filtro,
      }
    case actionState.RESET_STATE_LOCAL:
      return initialState
    case actionState.RESET_STATE:
      return initialState
    default:
      return state
  }
}
