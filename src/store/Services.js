import GetDataServer from '../common/GetDataServer'
import validators from 'common/validators';
import { URLAPI } from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESET_STATE: 'RESET_STATE',
  LIST_GROUPSERVICE: 'LIST_GROUPSERVICE',
  RESPONSE_PREANALITICA: 'RESPONSE_PREANALITICA',
  CLEAR_PREANALITICA: 'CLEAR_PREANALITICA',
  LIST_SERVICE: 'LIST_SERVICE',
  CLEAR_LIST_SERVICE: 'CLEAR_LIST_SERVICE',
  LIST_SERVICES_FILTER: 'LIST_SERVICES_FILTER',
  CLEAR_FILTER_SERVICES: 'CLEAR_FILTER_SERVICES'
}
const initialState = { existTariff: false, existPreAnalitica: false }

const urlAPI = URLAPI + 'service/'

export const actionCreators = {

  //GRUPO DE SERVICIOS
  getGroupService: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPI + "grupos", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.LIST_GROUPSERVICE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  //LISTA DE SERVICIOS
  getListService: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    dispatch({ type: actionState.CLEAR_LIST_SERVICE })
    GetDataServer('post', urlAPI + "all", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.LIST_SERVICE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  getPreAnalitica: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPI + "preanalitica", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_PREANALITICA, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  getFilteredServices: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPI + "filter-data", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.LIST_SERVICES_FILTER, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )

    // const token = localStorage.getItem("token") || null
    // const headerRequest = { headers: { 'Authorization': `Bearer ${token}` } }
    // dispatch({ type: actionState.NEW_REQUEST })
    // dispatch({ type: actionState.CLEAR_FILTER_SERVICES })
    // Axios.post(urlAPI + "filtro", requestData, headerRequest)
    //   .then(res => {
    //     const { data } = res
    //     dispatch({ type: actionState.RESPONSE_SUCCESS })
    //     dispatch({ type: actionState.LIST_SERVICES_FILTER, data })
    //   })
    //   .catch(err => {
    //     let messageError = ErrorServer
    //     try {
    //       messageError = err.response.data.errores.Mensaje
    //     } catch { }
    //     const message = messageError
    //     dispatch({ type: actionState.RESPONSE_ERROR, message })
    //   })
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

    case actionState.LIST_GROUPSERVICE:
      return /*!validators.objectEquals(state.tarifario, action.data) ?*/ {
        ...state,
        tarifario: action.data,
        existTariff: action.data != null ? true : false,
      }
    // : state

    case actionState.LIST_SERVICE:
      return {
        ...state,
        payload: action.data,
        listExist: true,
        resultadoService: null,
        listFilter: null,
        existTariff: action.data != null ? true : false,
      }

    case actionState.CLEAR_LIST_SERVICE:
      return {
        ...state,
        payload: [],
        listExist: false,
        resultadoService: null,
        listFilter: null,
        existTariff: false
      }
    case actionState.RESPONSE_PREANALITICA:
      return {
        ...state,
        preanalitica: action.data,
        existPreAnalitica: true,
      }
    case actionState.CLEAR_PREANALITICA:
      return {
        ...state,
        preanalitica: null,
        existPreAnalitica: false,
      }
    case actionState.LIST_SERVICES_FILTER:
      return {
        ...state,
        listFilter: action.data,
      }
    case actionState.CLEAR_FILTER_SERVICES:
      return {
        ...state,
        listFilter: null,
      }
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
