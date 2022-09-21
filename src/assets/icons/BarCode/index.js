import React from 'react';
import {useTheme} from '@material-ui/styles'
// Material components
import { SvgIcon } from '@material-ui/core';

export default function BioMolecular(props) {

  const {active=false, ...rest} =props
  // const theme = useTheme();
  // const colorIcon = active? theme.palette.primary.main:theme.palette.icon

  return (
    <SvgIcon {...rest}
    
    xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path
        fill="#E53924"
        d="M256 512c141.385 0 256-114.615 256-256S397.385 0 256 0 0 114.615 0 256s114.615 256 256 256z"
      ></path>
      <path
        fill="#B52F1F"
        d="M185.509 502.167C207.903 508.568 231.55 512 256 512c141.385 0 256-114.615 256-256 0-24.45-3.432-48.097-9.833-70.491L453.258 136.6 63.49 380.148l122.019 122.019z"
      ></path>
      <path
        fill="#fff"
        d="M430.083 386.588H81.917c-16.356 0-29.616-13.259-29.616-29.616V155.027c0-16.356 13.259-29.616 29.616-29.616h348.165c16.356 0 29.616 13.259 29.616 29.616v201.945c0 16.357-13.259 29.616-29.615 29.616z"
      ></path>
      <path
        fill="#C0FFFA"
        d="M459.7 155.03v201.94c0 16.36-13.26 29.62-29.62 29.62H256V125.41h174.08c16.36 0 29.62 13.26 29.62 29.62z"
      ></path>
      <path
        fill="#474D54"
        d="M87.55 164.839h30v110.85h-30v-110.85zM148.93 164.839h30v133.725h-30V164.839zM210.31 164.839h30v110.85h-30v-110.85z"
      ></path>
      <path
        fill="#282E33"
        d="M271.69 164.839h30v110.85h-30v-110.85zM333.07 164.839h30v133.725h-30V164.839zM394.45 164.839h30v110.85h-30v-110.85z"
      ></path>
      <path
        fill="#474D54"
        d="M87.55 314.049h30v33.112h-30v-33.112zM210.31 314.049h30v33.112h-30v-33.112z"
      ></path>
      <path fill="#282E33" d="M394.45 314.049h30v33.112h-30v-33.112z"></path>
    </SvgIcon>
  );
}
