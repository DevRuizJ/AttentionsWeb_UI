import GetDataServer from '../common/GetDataServer'
import { URLAPI, URLAPIREPORTES } from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_SEARCH_PATIENT: 'RESPONSE_SEARCH_PATIENT',
  RESPONSE_SEARCH_PATIENT_IAFAS: 'RESPONSE_SEARCH_PATIENT_IAFAS',
  PATIENT_CLEAR: 'PATIENT_CLEAR',
  PATIENT_CLEAR_IAFAS: 'PATIENT_CLEAR_IAFAS',
  RESPONSE_NOTFOUND_PAT: 'RESPONSE_NOTFOUND_PAT',
  CLEAR_FILTER_SERVICES: 'CLEAR_FILTER_SERVICES',
  CHANGE_SELECT_SERVICES: 'CHANGE_SELECT_SERVICES',
  CHANGE_PREVIEW_TICKET: 'CHANGE_PREVIEW_TICKET',
  RESPONSE_REGISTER_ATENTION: 'RESPONSE_REGISTER_ATENTION',
  RESPONSE_GET_CIE_DIAGNOSIS: 'RESPONSE_GET_CIE_DIAGNOSIS',
  RESPONSE_LISTAR_UNIDAD_TICKET: 'RESPONSE_LISTAR_UNIDAD_TICKET',
  RESPONSE_ACTUALIZAR_TICKET_UNIDAD: 'RESPONSE_ACTUALIZAR_TICKET_UNIDAD',
  RESPONSE_DELETE_ATENTION: 'RESPONSE_DELETE_ATENTION',
  RESPONSE_PRINT_TICKET: 'RESPONSE_PRINT_TICKET',
  CLEAR_REGISTER_ATTENTION: 'CLEAR_REGISTER_ATTENTION',
  REPONSE_LIST_ATENTION_GENERATED: 'REPONSE_LIST_ATENTION_GENERATED',
  CLEAR_LIST_ATENTION: 'CLEAR_LIST_ATENTION',
  RESPONSE_CHANGE_TICKET: 'RESPONSE_CHANGE_TICKET',
  GUARDAR_DATA_IAFAS: 'GUARDAR_DATA_IAFAS',
  CLEAR_CHANGE_TICKET: 'CLEAR_CHANGE_TICKET',
  CLEAR_DATA_ATENCION: 'CLEAR_DATA_ATENCION',

  RESPONSE_ATC_SIN_LOTE: 'RESPONSE_ATC_SIN_LOTE',
  RESPONSE_GENERACION_LOTE: 'RESPONSE_GENERACION_LOTE',
  CLAEAN_STATE_LOTE: 'CLAEAN_STATE_LOTE',

  LIST_LOTES: 'LIST_LOTES',
  REPORTE_LOTE: 'REPORTE_LOTE',

  RESET_STATE: 'RESET_STATE',
}
const initialState = {
  existPatitent: false,
  searchPatient: false,
  existPatitentIafas: false,
  searchPatientIafas: false,
  listServicesSelect: { preview: false, servicesSelect: [] },
  dataListAttention: [],
  patientData: null,
  patientDataIafas: null,
}


const urlAPIPatient = URLAPI + 'patient/'
const urlAPIAtencion = URLAPI + "attention/"
const urlAPUnitTicket = URLAPI + "unit"
const urlAPICompania = URLAPI + "compania/"
const urlAPIReporte = URLAPIREPORTES + "report/"
const urlAPITicket = URLAPI + "ticket/"

export const actionCreators = {
  searchPatient: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient, true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SEARCH_PATIENT, data })
      })
      .catch(
        message => {
          dispatch({ type: actionState.RESPONSE_ERROR, message })
          const data = requestData
          dispatch({ type: actionState.RESPONSE_NOTFOUND_PAT, data })
        }
      )
  },
  searchPatientIafasCip: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient + "consulta-iafas-cip", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SEARCH_PATIENT_IAFAS, data })
      })
      .catch(
        message => {
          dispatch({ type: actionState.RESPONSE_ERROR, message })
          const data = requestData
          dispatch({ type: actionState.RESPONSE_NOTFOUND_PAT, data })
        }
      )
  },
  searchPatientIafasDni: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient + "consulta-iafas-dni", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SEARCH_PATIENT_IAFAS, data })
      })
      .catch(
        message => {
          dispatch({ type: actionState.RESPONSE_ERROR, message })
          const data = requestData
          dispatch({ type: actionState.RESPONSE_NOTFOUND_PAT, data })
        }
      )
  },
  attentionRegister: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIAtencion, true, requestData)
      .then(data => {
        const message = data.message;
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_REGISTER_ATENTION })
        dispatch({ type: actionState.PATIENT_CLEAR })
        dispatch({ type: actionState.PATIENT_CLEAR_IAFAS })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  // Eliminar el ticket o Registro
  deleteRegister: requestData => (dispatch) => {
    // dispatch({ type: actionState.CLEAR_REGISTER_ATTENTION })
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('delete', urlAPIAtencion, true, requestData)
      .then(data => {
        const message = data;
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_DELETE_ATENTION })
        dispatch({ type: actionState.PATIENT_CLEAR })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  // IMPRIMIR el TICKET
  printTicket: requestData => (dispatch) => {
    // dispatch({ type: actionState.CLEAR_REGISTER_ATTENTION })
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPITicket + "naval", true, requestData)
      .then(data => {
        const message = data;
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_PRINT_TICKET, data })
        dispatch({ type: actionState.PATIENT_CLEAR })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },


  getLitsAtentionGenerated: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIAtencion + "list", true, requestData)
      .then(data => {
        console.log('DATAAAAAAAAA', data)
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.REPONSE_LIST_ATENTION_GENERATED, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  changeTicket: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    dispatch({ type: actionState.CLEAR_REGISTER_ATTENTION })
    dispatch({ type: actionState.CLEAR_CHANGE_TICKET })
    GetDataServer('put', urlAPIAtencion, true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_CHANGE_TICKET })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  clearPatient: () => (dispatch) => dispatch({ type: actionState.PATIENT_CLEAR }),
  clearPatientIafas: () => (dispatch) => dispatch({ type: actionState.PATIENT_CLEAR_IAFAS }),
  clearDataAtencion: () => (dispatch) => dispatch({ type: actionState.CLEAR_DATA_ATENCION }),
  setSelectServices: (data) => (dispatch) => dispatch({ type: actionState.CHANGE_SELECT_SERVICES, data }),
  setPreviewTicket: (state) => (dispatch) => dispatch({ type: actionState.CHANGE_PREVIEW_TICKET, state }),

  // Modulo envio Lote
  setAtencionesSinLote: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIAtencion + "pendiente-envio", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_ATC_SIN_LOTE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  LoteGenerate: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIAtencion + "generar-lote", true, requestData)
      .then(data => {
        data.totalTickets = requestData.atenciones.length
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_GENERACION_LOTE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  // obtener la lista del lote
  getListLote: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', `${urlAPICompania}list-lotes`, true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.LIST_LOTES, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },


  guardarDataIafas: requestData => async (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient + "nuevo-naval", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        const dataIafasAfiliados = {
          "anioPaciente": data.anioPaciente,
          "edad": data.edad,
          "fechaNacimiento": data.fechaNacimiento,
          "idpaciente": data.idpaciente,
          "numeroDocumento": data.numeroDocumento,
          "paciente": data.paciente,
          "sexo": data.sexo,
          "telefono": data.telefono,
          "tipoDocumento": data.tipoDocumento,
          "tarifaIpress": data.tarifaIpress,
          "tarifaDisamar": data.tarifaDisamar
        };
        data = dataIafasAfiliados;
        dispatch({ type: actionState.GUARDAR_DATA_IAFAS, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  // obtener el pdf
  getLoteReport: NumeroLote => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('get', `${urlAPIReporte}laboratorio/lote/${NumeroLote}`, false)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.REPORTE_LOTE, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )

  },

  getCieDiagnosisList: (param) => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPITicket + "get-cie-diagnosis", true, param)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_GET_CIE_DIAGNOSIS, data })
      })
      .catch(
        message => {
          dispatch({ type: actionState.RESPONSE_ERROR, message })
          //const data = data

          // dispatch({ type: actionState.RESPONSE_NOTFOUND_PAT })
        }
      )
  },

  //
  listarUnidadTicket: (param) => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    //GetDataServer('get', urlAPUnitTicket, true, param)
    GetDataServer('post', urlAPUnitTicket, true, param)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_LISTAR_UNIDAD_TICKET, data })
      })
      .catch(
        message => {
          dispatch({ type: actionState.RESPONSE_ERROR, message })
          //const data = data

          // dispatch({ type: actionState.RESPONSE_NOTFOUND_PAT })
        }
      )
  },

  actualizarUnidadTicket: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPUnitTicket + "/unit-saveticket", true, requestData)
      .then(data => {
        //data.totalTickets = requestData.atenciones.length
        const message = data.message;
        dispatch({ type: actionState.RESPONSE_SUCCESS, message })
        dispatch({ type: actionState.RESPONSE_ACTUALIZAR_TICKET_UNIDAD, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  clearStateLote: () => (dispatch) => dispatch({ type: actionState.CLAEAN_STATE_LOTE }),
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
    case actionState.RESPONSE_SEARCH_PATIENT:
      return {
        ...state,
        patientData: action.data,
        existPatitent: true,
        searchPatient: true,
        isRegisterAtention: false
      }
    case actionState.RESPONSE_SEARCH_PATIENT_IAFAS:
      return {
        ...state,
        patientDataIafas: action.data,
        existPatitentIafas: true,
        searchPatientIafas: true,
        isRegisterAtention: false
      }
    case actionState.RESPONSE_NOTFOUND_PAT:
      return {
        ...state,
        searchPatient: true,
        foundPatient: false,
        searchPatientData: action.data
      }
    case actionState.PATIENT_CLEAR:
      return {
        ...state,
        data: null,
        searchPatient: false,
        existPatitent: false
      }
    case actionState.PATIENT_CLEAR_IAFAS:
      return {
        ...state,
        patientDataIafasMostrar: null,
        existPatientDataIafasMostrar: false,
        patientDataIafas: null,
        existPatitentIafas: false,
        searchPatientIafas: false,
      }
    case actionState.CLEAR_DATA_ATENCION:
      return {
        ...state,
        data: null,
        patientData: null,
        searchPatient: false,
        existPatitent: false,
        isPrintTicket: false,
        ticketArray: null,
        //listServicesSelect: null,
        //isRegisterAtention: false,
        //loteGenerate: null,
        //listAtentionGenerated: null,
        requestMessage: null
      }
    case actionState.CLEAR_FILTER_SERVICES:
      return {
        ...state,
        listFilter: null,
      }
    case actionState.CHANGE_SELECT_SERVICES:
      return {
        ...state,
        listServicesSelect:
        {
          ...state.listServicesSelect,
          servicesSelect: action.data,
        }
      }
    case actionState.CHANGE_PREVIEW_TICKET:
      return {
        ...state,
        listServicesSelect:
        {
          ...state.listServicesSelect,
          preview: action.state,
        }
      }
    case actionState.RESPONSE_REGISTER_ATENTION:
      return {
        ...state,
        listServicesSelect:
        {
          servicesSelect: [],
          preview: false,
        },
        isRegisterAtention: true,
        isDeleteAtention: false,
        // isShowAlert: action.data.message ? true : false,
        // requestMessage: action.data.message
      }

    case actionState.RESPONSE_DELETE_ATENTION:
      return {
        ...state,
        isDeleteAtention: true
      }

    case actionState.RESPONSE_PRINT_TICKET:
      return {
        ...state,
        isPrintTicket: true,
        ticketArray: action.data
      }

    case actionState.CLEAR_REGISTER_ATTENTION:
      return {
        ...state,
        listServicesSelect: null,
        isRegisterAtention: false
      }
    case actionState.REPONSE_LIST_ATENTION_GENERATED:
      return {
        ...state,
        dataListAttention: action.data,
        isListAtentionGenerated: true
      }
    case actionState.CLEAR_LIST_ATENTION:
      return {
        ...state,
        dataListAttention: [],
        isListAtentionGenerated: false
      }
    case actionState.RESPONSE_CHANGE_TICKET:
      return {
        ...state,
        isChangeService: true
      }
    case actionState.CLEAR_CHANGE_TICKET:
      return {
        ...state,
        isChangeService: false
      }
    case actionState.RESPONSE_ATC_SIN_LOTE:
      return {
        ...state,
        atencionesSinLote: action.data
      }

    case actionState.RESPONSE_GENERACION_LOTE:
      return {
        ...state,
        loteGenerate: action.data,
        atencionesSinLote: null
      }

    case actionState.LIST_LOTES:
      return {
        ...state,
        listLotes: action.data
      }

    case actionState.REPORTE_LOTE:
      return {
        ...state,
        loteGenerate: {
          ...state.loteGenerate,
          pdf: action.data.pdf
        },

      }

    case actionState.GUARDAR_DATA_IAFAS:
      return {
        ...state,
        patientDataIafasMostrar: action.data,
        existPatientDataIafasMostrar: true
      }

    case actionState.RESPONSE_GET_CIE_DIAGNOSIS:
      return {
        ...state,
        dataCie: action.data,
        existDataCie: true,
      }

    case actionState.RESPONSE_LISTAR_UNIDAD_TICKET:
      return {
        ...state,
        dataUnidad: action.data,
        existDataUnidad: true,
        // searchPatientIafas: true,
        // isRegisterAtention: false
      }
    case actionState.RESPONSE_ACTUALIZAR_TICKET_UNIDAD:
      return {
        ...state,
        dataUnidadGuardar: action.data,
        dataUnidad: null,
        existDataUnidad: false,
        // searchPatientIafas: true,
        // isRegisterAtention: false
      }

    case actionState.CLAEAN_STATE_LOTE:
      return {
        ...state,
        loteGenerate: null
      }
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
