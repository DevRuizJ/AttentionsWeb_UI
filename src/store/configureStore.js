import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducerEnhancer from './monitorReducer'
import loggerMiddleware from './logger'

import * as Resultado from './Resultado';
import * as Compania from './Compania';
import * as User from './User';
import * as Atencion from './Atencion';
import * as Attention from './Attention';
import * as Services from './Services';
import * as Payment from './Payment';
import * as Patient from './Paciente';
import * as BranchOffice from './BranchOffice'



export default function configureStore() {
  const reducers = {
    compania: Compania.reducer,
    resultado: Resultado.reducer,
    atencion: Atencion.reducer,
    userCompany: User.reducer,
    services: Services.reducer,
    payment: Payment.reducer,
    attention: Attention.reducer,
    patient: Patient.reducer,
    branchOffice: BranchOffice.reducer
  };

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const middlewares = [loggerMiddleware, thunkMiddleware]
  // const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer))
  }

  return store
}

