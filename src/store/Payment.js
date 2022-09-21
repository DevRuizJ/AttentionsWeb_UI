import GetDataServer from '../common/GetDataServer'
import validators from 'common/validators';
import { URLAPI } from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_LIST_ATENC_SIN_FACT: 'RESPONSE_LIST_ATENC_SIN_FACT',
  RESET_STATE: 'RESET_STATE',
  DATA_BILLING: 'DATA_BILLING',
  DATOS_COMPROBANTE: 'DATOS_COMPROBANTE',
  RESPONSE_CANCEL_ATTENTIONS: 'RESPONSE_CANCEL_ATTENTIONS',
  REPONSE_FORM_PAGO: 'REPONSE_FORM_PAGO',
  ADD_CUENTAS_ABONO: 'ADD_CUENTAS_ABONO',
  RESPONSE_COMPROBANTE_PAGO: 'RESPONSE_COMPROBANTE_PAGO',
  RESPONSE_LIST_PAGOS: 'RESPONSE_LIST_PAGOS',
  CLEAR_STATE_FACTURACION: 'CLEAR_STATE_FACTURACION',
  CLEAR_FORM_PAGO: 'CLEAR_FORM_PAGO',
  CLEAR_DATOS_COMPROBANTE:'CLEAR_DATOS_COMPROBANTE'
}

const urlAPI = URLAPI + "compania/"
const urlAPIFacturacion = URLAPI + "facturacion/"
const initialState = {}
export const actionCreators = {

  //Datos de Facturación de la empresa
  getDataBilling: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })

    GetDataServer('post', urlAPI + "datos-facturacion", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.DATA_BILLING, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  //Datos de Facturación de la empresa
  datosComprobante: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })

    GetDataServer('post', urlAPIFacturacion + "datos-comprobante", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.DATOS_COMPROBANTE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  //Datos de Facturación de la empresa
  getPendientBillingAtention: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIFacturacion + "sin-facturar", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_LIST_ATENC_SIN_FACT, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  // Cancelar una lista de atenciones
  cancelAttentions: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIFacturacion + "cancelar-tickets", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_CANCEL_ATTENTIONS, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  // Obtener Formulario de Pago
  getFormPago: requestData => (dispatch) => {
    dispatch({ type: actionState.CLEAR_FORM_PAGO })
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIFacturacion + "form-pago", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.REPONSE_FORM_PAGO, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  // Cuentas de Abono
  getPaymentAccount: () => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('get', urlAPI + "cuentas-abono", true).then(data => {
      dispatch({ type: actionState.RESPONSE_SUCCESS })
      dispatch({ type: actionState.ADD_CUENTAS_ABONO, data })
    })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  //RegistroComprobante de venta
  registroComprobantePago: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIFacturacion + "registro-voucher", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_CANCEL_ATTENTIONS, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  //RegistroComprobante de venta
  getPaymentReport: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIFacturacion + "comprobante-pago", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_COMPROBANTE_PAGO, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  //RegistroComprobante de venta
  getPayList: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPI + "listcomprobantes", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_LIST_PAGOS, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  clearStateFacturacion: () => (dispatch) => dispatch({ type: actionState.CLEAR_STATE_FACTURACION }),
  setInitialState: () => (dispatch) => dispatch({ type: actionState.RESET_STATE }),
  clearDatosComprobantes: () => (dispatch) => dispatch({ type: actionState.CLEAR_DATOS_COMPROBANTE })
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

    case actionState.DATA_BILLING:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        dataBilling: action.data,
        existDataBilling: true,
      }

    case actionState.DATOS_COMPROBANTE:
      //DATOS COMPROBANTE 
      return {
        ...state,
        datosComprobante: action.data,
        paymentData: action.data,
      }

    case actionState.CLEAR_DATOS_COMPROBANTE:
      //DATOS COMPROBANTE 
      return {
        ...state,
        datosComprobante: null,
        PayForm: null,
        existFormPago: false,
        paymentData:null
      }

    case actionState.RESPONSE_LIST_ATENC_SIN_FACT:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        listAtenciones: action.data,
        existAtcSNFacturar: action.data.length > 0,
      }
    case actionState.RESPONSE_CANCEL_ATTENTIONS:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        paymentData: action.data,
      }

    case actionState.CLEAR_FORM_PAGO:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        PayForm: null,
        existFormPago: false
      }

    case actionState.REPONSE_FORM_PAGO:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        PayForm: action.data,
        existFormPago: action.data.formToken.length > 0,
      }
    case actionState.ADD_CUENTAS_ABONO:
      //INFORMACIÓN DE FACTURACIÓN
      return {
        ...state,
        paymentAccount: action.data
      }


    case actionState.RESPONSE_COMPROBANTE_PAGO:
      //COMPROBANTE DE PAGO EN PDF
      return {
        ...state,
        paymentData: action.data
      }
    case actionState.CLEAR_STATE_FACTURACION:
      //COMPROBANTE DE PAGO EN PDF
      return {
        ...state,
        paymentData: null,
        listAtenciones: null,
        PayForm: null
      }
    case actionState.RESPONSE_LIST_PAGOS:
      //COMPROBANTE DE PAGO EN PDF
      return !validators.objectEquals(state.listPays, action.data)
        ? {
          ...state,
          listPays: action.data
        }
        : state
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
