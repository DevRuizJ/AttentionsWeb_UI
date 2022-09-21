import Axios from "axios"
import { URLAPI } from '../common/VariableGlobal'
import GetDataServer from '../common/GetDataServer'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_LOGIN: 'RESPONSE_LOGIN',
  RESPONSE_COMPANIA: 'RESPONSE_COMPANIA',
  CLEAR_RESPONSE_COMPANIA: 'CLEAR_RESPONSE_COMPANIA',
  RESPONSE_EMAIL: 'RESPONSE_EMAIL',
  RESET_STATE: 'RESET_STATE'
}

const initialState = {
  isExistUser: false,
  isLoading: false,
  isLogin: false
}


export const actionCreators = {
  xxlogin: data => (dispatch) => {
    dispatch({
      type: actionState.NEW_REQUEST
    })
    Axios.post(URLAPI + 'compania/login', data).then(res => {
      const data = res.data
      localStorage.setItem("token", data.token)
      dispatch({ type: actionState.RESPONSE_LOGIN, data })
      dispatch({ type: actionState.RESPONSE_SUCCESS })
    })
      .catch(err => {
        const message = err.message
        dispatch({ type: actionState.RESPONSE_ERROR, message })
      })
  },

  getListCompania: requestData => async (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', URLAPI + "company/list", true, requestData)
      .then(data => {
        //localStorage.setItem("token",data.token)
        //localStorage.setItem("user",data.usuario)
        // dispatch({ type: actionState.CLEAR_RESPONSE_COMPANIA })
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_COMPANIA, data })

      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )

  },

  // getListCompania1: parametros => (dispatch) => {
  //   dispatch({
  //     type: actionState.NEW_REQUEST
  //   })
  //   Axios.post(URLAPI + 'compania/GetListCompania', parametros).then(res => {
  //     const data = res.data
  //     localStorage.setItem("token", data.token)
  //     dispatch({ type: actionState.RESPONSE_COMPANIA, data })
  //     dispatch({ type: actionState.RESPONSE_SUCCESS })
  //   })
  //     .catch(err => {
  //       const message = err.message
  //       dispatch({ type: actionState.RESPONSE_ERROR, message })
  //     })
  // },

  setInitialState: () => (dispatch) => dispatch({
    type: actionState.RESET_STATE
  })
}

export const reducer = (state, action) => {
  state = state || initialState

  switch (action.type) {
    case actionState.NEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isShowAlert: false
      }
    case actionState.RESPONSE_ERROR:
      return {
        ...state,
        isRequestError: true,
        requestMessage: action.message,
        isLoading: false
      }
    case actionState.RESPONSE_SUCCESS:
      return {
        ...state,
        isRequestError: false,
        requestMessage: action.message || null,
        isLoading: false
      }
    case actionState.RESPONSE_LOGIN:
      return {
        ...state,
        usuario: action.data.usuario,
        razonSocial: action.data.razonSocial,
        compania: action.data.compania,
        isLogin: true
      }
    case actionState.RESPONSE_COMPANIA:
      return {
        ...state,
        data: action.data,
        isCompania: true
      }
    case actionState.CLEAR_RESPONSE_COMPANIA:
      return {
        ...state,
        data: null,
        isCompania: false
      }
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
