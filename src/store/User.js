import GetDataServer from '../common/GetDataServer'
import { URLAPI } from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_LOGIN: 'RESPONSE_LOGIN',
  RESPONSE_LOGIN_USUARIO: 'RESPONSE_LOGIN_USUARIO',
  RESPONSE_GET_USER: 'RESPONSE_GET_USER',
  RESPONSE_SENDTOKENRECOVERY: 'RESPONSE_SENDTOKENRECOVERY',
  RESPONSE_CHANGEPASSWORD: 'RESPONSE_CHANGEPASSWORD',
  RESPONSE_CHANGE_PROFILE: 'RESPONSE_CHANGE_PROFILE',
  RESET_STATE: 'RESET_STATE'
}

const initialState = {
  isExistUser: false,
  isLoading: false,
  isLogin: false,
  data: null
}

const urlAPI = URLAPI + 'compania/'
// const urlAPILogin = URLAPI + 'Sistema/'
const urlAPILogin = URLAPI + 'authentication/'
const urlAPIUser = URLAPI + 'user/'

export const actionCreators = {
  // loginCompany: requestData => async (dispatch) => {
  //   dispatch({ type: actionState.NEW_REQUEST })
  //   GetDataServer('post',urlAPI + "login",false,requestData)
  //   .then(data => {
  //     localStorage.setItem("token",data.token)
  //     localStorage.setItem("user",data.usuario)
  //     dispatch({type: actionState.RESPONSE_SUCCESS})
  //     dispatch({type: actionState.RESPONSE_LOGIN,data})
  //   })
  //   .catch(
  //     message => dispatch({ type: actionState.RESPONSE_ERROR, message })
  //   )      

  // },
  //LOGIN DE USUARIO
  loginUsuario: requestData => async (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPILogin + "login-user", false, requestData)
      .then(data => {
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("user", data.user)
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_LOGIN_USUARIO, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )

  },

  // getUser : requestData => (dispatch) => {
  //   dispatch({ type: actionState.NEW_REQUEST })
  //   GetDataServer('post',urlAPI + "info-user",true,requestData)
  //   .then(data => {
  //     dispatch({type: actionState.RESPONSE_SUCCESS})
  //     dispatch({type: actionState.RESPONSE_LOGIN,data})
  //   })
  //   .catch(
  //     message => dispatch({ type: actionState.RESPONSE_ERROR, message })
  //   )      
  // },

  //OBTIENE LOS DATOS DEL USUARIO LOGUEADO
  getUser: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('get', urlAPIUser + "@me", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_GET_USER, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  sendTokenRecovery: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPI + "token-security", true, requestData)
      .then(_data => {
        const data = { ..._data, ...requestData }
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SENDTOKENRECOVERY, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  changePassword: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('put', urlAPI + "change-password", true, requestData)
      .then(data => {
        const message = data.mensaje
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_CHANGEPASSWORD })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  changeProfile: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('put', urlAPI + "registro-parametros", true, requestData)
      .then(_data => {
        const message = _data.mensaje
        const data = requestData.logo
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_CHANGE_PROFILE, data })
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
        isLoading: false
      }
    case actionState.RESPONSE_SUCCESS:
      return {
        ...state,
        isRequestError: false,
        requestMessage: action.message || null,
        isShowAlert: action.message ? true : false,
        isLoading: false,
      }
    // case actionState.RESPONSE_LOGIN:
    //   return {
    //     ...state,
    //     usuario: action.data.usuario,
    //     razonSocial: action.data.razonSocial,
    //     compania: action.data.compania,
    //     seekcia: action.data.seekcia,
    //     logo: action.data.logo||null,
    //     isLogin: true,
    //     isExistUser:true
    //   }
    case actionState.RESPONSE_LOGIN_USUARIO:
      return {
        ...state,
        user: action.data.user,
        name: action.data.name,
        lastName: action.data.lastName,
        motherLastname: action.data.motherLastName,
        logo: action.data.logo || null,
        // data: action.data,
        isLogin: true,
        isExistUser: true
      }
    case actionState.RESPONSE_GET_USER:
      return {
        // data: action.data,
        user: action.data.user,
        name: action.data.name,
        lastName: action.data.lastName,
        motherLastname: action.data.motherLastName,
        logo: action.data.logo || null,
        isLogin: true,
        isExistUser: true
      }
    case actionState.RESPONSE_SENDTOKENRECOVERY:
      return {
        ...state,
        dataRecovery: action.data
      }
    case actionState.RESPONSE_CHANGEPASSWORD:
      return {
        ...state,
        isChangePassword: true,
      }
    case actionState.RESPONSE_CHANGE_PROFILE:
      return {
        ...state,
        logo: action.data,
      }

    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
