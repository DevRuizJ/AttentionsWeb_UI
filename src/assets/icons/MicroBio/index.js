import React from 'react';
import {useTheme} from '@material-ui/styles'
// Material components
import { SvgIcon } from '@material-ui/core';

export default function MicroBio(props) {

  const {active=false, ...rest} =props
  const theme = useTheme();
  const colorIcon = active? theme.palette.primary.main:theme.palette.icon


  return (
    <SvgIcon {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="512"
    height="512"
    fill="none"
    viewBox="0 0 512 512"
  >
    <path
      fill={colorIcon}
      d="M179.424 153.072l-14.488-8.36C166.888 139.496 168 133.88 168 128c0-5.88-1.112-11.496-3.056-16.704l14.488-8.36 4 6.928 13.856-8-16-27.72-13.856 8 4 6.928-14.456 8.344a47.972 47.972 0 00-28.968-16.696V64h8V48h-32v16h8v16.72A47.972 47.972 0 0083.04 97.416l-14.456-8.344 4-6.928-13.856-8-16 27.72 13.856 8 4-6.928 14.488 8.36C73.112 116.504 72 122.12 72 128c0 5.88 1.112 11.496 3.056 16.704l-14.488 8.36-4-6.928-13.856 8 16 27.72 13.856-8-4-6.928 14.456-8.344a47.972 47.972 0 0028.968 16.696V192h-8v16h32v-16h-8v-16.72a47.972 47.972 0 0028.968-16.696l14.456 8.344-4 6.928 13.856 8 16-27.72-13.856-8-3.992 6.936zM120 160c-17.648 0-32-14.352-32-32s14.352-32 32-32 32 14.352 32 32-14.352 32-32 32z"
    ></path>
    <path
      fill={colorIcon}
      d="M120 16C58.24 16 8 66.24 8 128s50.24 112 112 112 112-50.24 112-112S181.76 16 120 16zm0 208c-52.936 0-96-43.064-96-96s43.064-96 96-96 96 43.064 96 96-43.064 96-96 96zM504 296c0-13.016-6.344-24.488-16-31.792V224c0-2.128-.84-4.16-2.344-5.656L411.312 144l34.344-34.344a7.991 7.991 0 000-11.312L443.312 96 464 75.312l10.344 10.344 11.312-11.312-64-64-11.312 11.312L420.688 32 400 52.688l-2.344-2.344a7.99 7.99 0 00-11.312 0l-104 104A7.965 7.965 0 00280 160v64h-8c-4.416 0-8 3.576-8 8v80c0 4.424 3.584 8 8 8h40v24c0 4.424 3.584 8 8 8h32c4.416 0 8-3.576 8-8v-24h40c4.416 0 8-3.576 8-8v-80c0-4.424-3.584-8-8-8h-8v-28.688l40 40v36.936c-4.96 6.664-8 14.832-8 23.752 0 8.92 3.04 17.088 8 23.752V368H256v16h176v56h-40v-24c0-4.424-3.584-8-8-8h-96c-4.416 0-8 3.576-8 8v24h-56c-13.232 0-24 10.768-24 24v24c0 4.424 3.584 8 8 8h240c22.056 0 40-17.944 40-40V327.792c9.656-7.304 16-18.776 16-31.792zM432 43.312L452.688 64 432 84.688 411.312 64 432 43.312zM344 336h-16v-16h16v16zm48-32H280v-64h112v64zm-96-80v-60.688l96-96L428.688 104l-50.344 50.344A7.965 7.965 0 00376 160v64h-80zm96-51.312v-9.376l8-8 72 72v29.496a39.963 39.963 0 00-8-.808c-5.696 0-11.088 1.232-16 3.392V232c0-2.128-.84-4.16-2.344-5.656L392 172.688zM296 424h80v16h-80v-16zm176 32c0 13.232-10.768 24-24 24H216v-16c0-4.416 3.592-8 8-8h216c4.416 0 8-3.576 8-8V332.608c4.912 2.16 10.304 3.392 16 3.392 2.736 0 5.416-.28 8-.808V456zm-8-136c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24zM104 256h16v16h-16v-16zM104 288h16v16h-16v-16zM104 320h16v16h-16v-16zM104 352h16v16h-16v-16zM104 384h16v16h-16v-16zM104 416h16v16h-16v-16zM104 448h16v16h-16v-16zM136 448h16v16h-16v-16zM168 448h16v16h-16v-16zM240 80h16v16h-16V80zM272 80h16v16h-16V80zM304 80h16v16h-16V80z"
    ></path>
    </SvgIcon>
  );
}
