import React from 'react';
import {useTheme} from '@material-ui/styles'
// Material components
import { SvgIcon } from '@material-ui/core';

export default function Inmunoquimica(props) {
  const {active=false, ...rest} =props
  const theme = useTheme();
  const colorIcon = active? theme.palette.primary.main:theme.palette.icon

  return (
    <SvgIcon {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="472"
    height="500"
    fill="none"
    viewBox="0 0 472 500"
  >
    <path
      fill={colorIcon }
      d="M170.291 320.954l11.313-11.314 15.998 15.998-11.314 11.314-15.997-15.998zM266.282 325.653l15.998-15.997 11.314 11.313-15.998 15.998-11.314-11.314z"
    ></path>
    <path
      fill={colorIcon }
      d="M256 401.84c9.288-3.312 16-12.112 16-22.528 0-10.416-6.712-19.216-16-22.528v-46.16l13.656-13.656-11.312-11.312L240 304v19.312h-16V304l-18.344-18.344-11.312 11.312L208 310.624v46.16c-9.288 3.312-16 12.112-16 22.528 0 10.416 6.712 19.216 16 22.528V448l-13.656 13.656 11.312 11.312L224 454.624v-19.312h16v19.312l18.344 18.344 11.312-11.312L256 448v-46.16zm-16-62.528v16h-16v-16h16zm-24 32h32c4.408 0 8 3.584 8 8s-3.592 8-8 8h-32c-4.408 0-8-3.584-8-8s3.592-8 8-8zm8 48v-16h16v16h-16z"
    ></path>
    <path
      fill={colorIcon }
      d="M266.267 432.954l11.313-11.314 15.998 15.998-11.314 11.314-15.997-15.998zM170.274 437.63l15.998-15.998 11.314 11.314-15.998 15.998-11.314-11.314zM272 171.312v-8h-80v8c0 22.056 17.944 40 40 40s40-17.944 40-40zm-62.632 8h45.256c-3.304 9.312-12.2 16-22.632 16-10.432 0-19.32-6.688-22.624-16zM242.309 80.997l11.313-11.314 32.001 32.001-11.314 11.314-32-32zM202.309 80.99l11.313-11.314 32.001 32-11.314 11.314-32-32z"
    ></path>
    <path
      fill={colorIcon }
      d="M270.592 252.944l-3.456-13.072c19.048-6.96 33.256-23.944 36.224-44.56h.64c17.648 0 32-14.352 32-32a31.84 31.84 0 00-5.512-17.928l7.392-12.328A99.04 99.04 0 00352 82.088c0-10.664-1.712-21.2-5.08-31.32l-7.424-22.264-9.152 9.16c-3.232 3.232-6.712 6.152-10.368 8.824-.072-8.688-2.128-17.36-6.016-25.136l-7.768-15.528-13.96 13.952a99.325 99.325 0 01-8.568 7.624c-3.12-8.088-7.776-15.504-14.008-21.728L264 0l-5.656 5.656c-8.808 8.808-20.52 13.656-32.976 13.656h-10.664c-47.808 0-86.704 38.896-86.704 86.704 0 13.544 1.76 27.008 5.08 40.136-3.176 4.968-5.08 10.832-5.08 17.16 0 17.648 14.352 32 32 32h.64c2.968 20.616 17.176 37.6 36.224 44.56l-3.456 13.072C126.4 274.16 80 337.184 80 407.8v91.512h304V407.8c0-70.616-46.4-133.64-113.408-154.856zM304 179.312v-32c8.824 0 16 7.176 16 16s-7.176 16-16 16zm-160-16c0-8.824 7.176-16 16-16v32c-8.824 0-16-7.176-16-16zm32 24v-62.704a27.083 27.083 0 0118.528-25.712l-5.064-15.168A43.034 43.034 0 00160 124.608v6.704c-4.728 0-9.184 1.096-13.232 2.944-1.808-9.304-2.768-18.76-2.768-28.24 0-38.984 31.72-70.704 70.704-70.704h10.664c13.832 0 26.976-4.456 37.8-12.68a46.343 46.343 0 016.784 13.68c-5.288 2.92-10.76 5.504-16.48 7.416l5.056 15.168c16-5.328 30.832-14.256 43.04-25.896A41.362 41.362 0 01304 46.928c0 10.848-4.4 21.472-12.072 29.144l-1.584 1.584 11.312 11.312 1.584-1.584c5.64-5.632 9.96-12.44 12.816-19.816 5.688-2.952 11.136-6.304 16.16-10.24A82.732 82.732 0 01336 82.088a83.134 83.134 0 01-11.832 42.736l-5.976 9.96c-4.296-2.152-9.072-3.472-14.192-3.472v-16h-16v72c0 22.056-17.944 40-40 40h-32c-22.056 0-40-17.944-40-40zm192 296h-32v-112h-16v112H144v-112h-16v112H96V407.8c0-65.032 43.672-122.928 106.2-140.792l4.368-1.248 5.976-22.624c1.152.072 2.288.176 3.456.176h32c1.168 0 2.304-.104 3.448-.176l5.976 22.624 4.368 1.248C324.328 284.864 368 342.768 368 407.8v75.512z"
    ></path>
    <path
      fill={colorIcon }
      d="M432 243.312c-17.648 0-32-14.352-32-32h-16c0 17.648-14.352 32-32 32v16c17.648 0 32 14.352 32 32h16c0-17.648 14.352-32 32-32v-16zm-40 21.52a48.349 48.349 0 00-13.52-13.52c5.36-3.56 9.96-8.16 13.52-13.52 3.56 5.36 8.16 9.96 13.52 13.52a48.349 48.349 0 00-13.52 13.52zM64 211.312h16c0-17.648 14.352-32 32-32v-16c-17.648 0-32-14.352-32-32H64c0 17.648-14.352 32-32 32v16c17.648 0 32 14.352 32 32zm8-53.52c3.56 5.36 8.16 9.96 13.52 13.52A48.349 48.349 0 0072 184.832a48.349 48.349 0 00-13.52-13.52c5.36-3.56 9.96-8.16 13.52-13.52zM80 331.312c-17.648 0-32-14.351-32-32H32c0 17.649-14.352 32-32 32v16c17.648 0 32 14.352 32 32h16c0-17.648 14.352-32 32-32v-16zm-40 21.52a48.349 48.349 0 00-13.52-13.52A48.332 48.332 0 0040 325.793c3.56 5.36 8.16 9.96 13.52 13.519A48.349 48.349 0 0040 352.832zM368 179.312h16v16h-16v-16zM432 291.312h16v16h-16v-16zM432 163.312h16v16h-16v-16zM48 227.312h16v16H48v-16zM112 251.312h16v16h-16v-16zM0 179.312h16v16H0v-16zM0 267.312h16v16H0v-16zM456 211.312h16v16h-16v-16zM264 139.312a8 8 0 100-16 8 8 0 000 16zM200 139.312a8 8 0 100-16 8 8 0 000 16z"
    ></path>
    </SvgIcon>
  );
}