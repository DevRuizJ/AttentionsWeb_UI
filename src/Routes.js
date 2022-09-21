import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  PatientCreate as PatientCreateView,
} from './views/Atenciones/components';
import { PaymentResponse } from 'views/Payment/components';

import {
  SignIn as SignInView,
  Resultados as ResultadosView,
  Resultado as ResultadoView,
  Account as AccountView,
  Timeout as TimeoutView,
  ForgotPassword as ForgotPasswordView,
  Atenciones as AtencionesView,
  Payment as PaymentView,
  Tracking as TrackingView,
  SendSampleLab as SendSampleLabView,
  Tariff as TariffView,
  NotFound as NotFoundView,
  RegisterList as RegisterListView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/atenciones"
      />

      <RouteWithLayout
        component={RegisterListView}
        exact
        layout={MainLayout}
        path="/registros"
      />

      <RouteWithLayout
        component={ResultadosView}
        exact
        layout={MainLayout}
        path="/resultados"
      />

      <RouteWithLayout
        component={ResultadoView}
        exact
        layout={MainLayout}
        path="/resultado/view"
      />

      <RouteWithLayout
        component={AtencionesView}
        exact
        layout={MainLayout}
        path="/atenciones"
      />

      <RouteWithLayout
        component={PatientCreateView}
        layout={MainLayout}
        path="/atenciones/newpacient/:id"
      />

      <RouteWithLayout
        component={PaymentView}
        exact
        layout={MainLayout}
        path="/pago"
      />

      {/* Ruta de respuesta de pago */}
      <RouteWithLayout
        component={PaymentResponse}
        layout={MainLayout}
        exact
        path="/pago/cancelacion/:comprobante/:status"
      />

      <RouteWithLayout
        component={SendSampleLabView}
        exact
        layout={MainLayout}
        path="/envio-muestra"
      />

      <RouteWithLayout
        component={TrackingView}
        layout={MainLayout}
        path="/seguimiento"
      />

      <RouteWithLayout
        component={TariffView}
        exact
        layout={MainLayout}
        path="/tarifario"
      />

      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={ForgotPasswordView}
        exact
        layout={MinimalLayout}
        path="/forgot-password"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <RouteWithLayout
        component={TimeoutView}
        exact
        layout={MinimalLayout}
        path="/timeout"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
