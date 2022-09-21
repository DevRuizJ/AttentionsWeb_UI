import { URLAPI } from '../common/VariableGlobal'
import GetDataServer from '../common/GetDataServer'

export const actionState = {
    NEW_REQUEST: 'NEW_REQUEST',
    RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
    RESPONSE_BRANCHOFFICE_LIST: 'RESPONSE_BRANCHOFFICE_LIST',
    RESET_STATE: 'RESET_STATE',
    RESPONSE_ERROR: 'RESPONSE_ERROR',
}

const initialState = {
    data: null,
    isLoading: false,
}

export const actionCreators = {
    getBranchOfficeList: requestData => async (dispatch) => {
        dispatch({ type: actionState.NEW_REQUEST })
        GetDataServer('post', URLAPI + "branchoffice/list", true, requestData)
            .then(data => {
                dispatch({ type: actionState.RESPONSE_SUCCESS })
                dispatch({ type: actionState.RESPONSE_BRANCHOFFICE_LIST, data })
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
                isShowAlert: false
            }
        case actionState.RESPONSE_SUCCESS:
            return {
                ...state,
                isRequestError: false,
                requestMessage: action.message || null,
                isLoading: false
            }
        case actionState.RESPONSE_BRANCHOFFICE_LIST:
            return {
                ...state,
                data: action.data,
                isBranchOfficeList: true
            }
        case actionState.RESPONSE_ERROR:
            return {
                ...state,
                isRequestError: true,
                isShowAlert: action.message ? true : false,
                requestMessage: action.message,
                isLoading: false
            }
        case actionState.RESET_STATE:
            return initialState

        default:
            return state
    }
}