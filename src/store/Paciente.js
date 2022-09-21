import GetDataServer from '../common/GetDataServer'
import { URLAPI } from '../common/VariableGlobal'

export const actionState = {
  NEW_REQUEST: 'NEW_REQUEST',
  RESPONSE_ERROR: 'RESPONSE_ERROR',
  RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
  RESPONSE_NOTFOUND_PAT: 'RESPONSE_NOTFOUND_PAT',
  RESPONSE_SEARCH_PATIENT: 'RESPONSE_SEARCH_PATIENT',
  RESPONSE_SEARCH_PATIENT_NAVAL: 'RESPONSE_SEARCH_PATIENT_NAVAL',
  RESET_STATE: 'RESET_STATE',
}
const initialState = {
  existPatitent: false,
  searchPatient: false,
  searchPatientData: null
}

const urlAPIPatient = URLAPI + 'patient/'

export const actionCreators = {
  newPatientDefault: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient + "new-record", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SEARCH_PATIENT, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },
  newPatientAnonimous: requestData => (dispatch) => {
    dispatch({ type: actionState.NEW_REQUEST })
    GetDataServer('post', urlAPIPatient + "nuevo-anonimo", true, requestData)
      .then(data => {
        dispatch({ type: actionState.RESPONSE_SUCCESS })
        dispatch({ type: actionState.RESPONSE_SEARCH_PATIENT, data })
      })
      .catch(
        message => dispatch({ type: actionState.RESPONSE_ERROR, message })
      )
  },

  setSeachPatient: data => (dispatch) => dispatch({ type: actionState.SEACH_PATIENT_ATENTION, data }),
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
        foundPatient: true,
        isRegisterAtention: false
      }
    case actionState.RESPONSE_SEARCH_PATIENT_NAVAL:
      return {
        ...state,
        patientDataNaval: action.data,
        existPatitentNaval: true,
        searchPatientNaval: true,
        foundPatientNaval: true,
        isRegisterAtention: false
      }
    case actionState.RESPONSE_NOTFOUND_PAT:
      return {
        ...state,
        searchPatientData: action.data
      }
    case actionState.RESET_STATE:
      return initialState

    default:
      return state
  }
}
