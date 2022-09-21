import React from 'react';
import { useTheme } from '@material-ui/styles';
// Material components
import { SvgIcon } from '@material-ui/core';

export default function Genetica(props) {
  const {active=false, ...rest} =props
  const theme = useTheme();
  const colorIcon = active? theme.palette.primary.main:theme.palette.icon

  return (
    <SvgIcon {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="496"
    height="496"
    fill="none"
    viewBox="0 0 496 496"
  >
    <path
      fill={colorIcon}
      d="M128 344c0-13.232-10.768-24-24-24s-24 10.768-24 24c0 10.416 6.712 19.216 16 22.528v50.952c-9.288 3.312-16 12.112-16 22.528 0 13.232 10.768 24 24 24s24-10.768 24-24c0-10.416-6.712-19.216-16-22.528v-50.952c9.288-3.312 16-12.112 16-22.528zm-24-8c4.408 0 8 3.584 8 8s-3.592 8-8 8c-4.408 0-8-3.584-8-8s3.592-8 8-8zm0 112c-4.408 0-8-3.584-8-8s3.592-8 8-8c4.408 0 8 3.584 8 8s-3.592 8-8 8zM184 417.136v-50.272c13.76-3.576 24-15.992 24-30.864 0-17.648-14.352-32-32-32s-32 14.352-32 32c0 14.872 10.24 27.288 24 30.864v50.272c-13.76 3.576-24 15.992-24 30.864 0 17.648 14.352 32 32 32s32-14.352 32-32c0-14.872-10.24-27.288-24-30.864zM160 336c0-8.824 7.176-16 16-16s16 7.176 16 16-7.176 16-16 16-16-7.176-16-16zm16 128c-8.824 0-16-7.176-16-16s7.176-16 16-16 16 7.176 16 16-7.176 16-16 16zM416 344c0-13.232-10.768-24-24-24s-24 10.768-24 24c0 10.416 6.712 19.216 16 22.528v50.952c-9.288 3.312-16 12.112-16 22.528 0 13.232 10.768 24 24 24s24-10.768 24-24c0-10.416-6.712-19.216-16-22.528v-50.952c9.288-3.312 16-12.112 16-22.528zm-24-8c4.408 0 8 3.584 8 8s-3.592 8-8 8c-4.408 0-8-3.584-8-8s3.592-8 8-8zm0 112c-4.408 0-8-3.584-8-8s3.592-8 8-8c4.408 0 8 3.584 8 8s-3.592 8-8 8zM352 336c0-17.648-14.352-32-32-32s-32 14.352-32 32c0 14.872 10.24 27.288 24 30.864v50.272c-13.76 3.576-24 15.992-24 30.864 0 17.648 14.352 32 32 32s32-14.352 32-32c0-14.872-10.24-27.288-24-30.864v-50.272c13.76-3.576 24-15.992 24-30.864zm-48 0c0-8.824 7.176-16 16-16s16 7.176 16 16-7.176 16-16 16-16-7.176-16-16zm32 112c0 8.824-7.176 16-16 16s-16-7.176-16-16 7.176-16 16-16 16 7.176 16 16z"
    ></path>
    <path
      fill={colorIcon}
      d="M472 433.136v-82.272c13.76-3.576 24-15.992 24-30.864 0-11.816-6.512-22.048-16.064-27.584V281.52c0-18.584-7.24-36.064-20.384-49.216-10.312-10.312-23.376-17.032-37.768-19.44l-23.456-3.912-4.976-18.432c13.944-8.56 24.344-22.288 28.544-38.52H424c17.648 0 32-14.352 32-32 0-6.936-2.272-13.32-6.04-18.568 3.888-9.048 6.04-18.864 6.04-28.712C456 32.624 423.376 0 383.28 0H368c-6.072 0-11.696 1.792-16.536 4.744C347.168 1.696 342.088 0 336.72 0 296.624 0 264 32.624 264 72.72c0 9.848 2.152 19.656 6.04 28.712C266.272 106.68 264 113.064 264 120c0 17.648 14.352 32 32 32h2.104c4.2 16.216 14.568 29.92 28.488 38.488l-4.984 18.464-23.456 3.912c-14.392 2.4-27.456 9.128-37.768 19.44A69.633 69.633 0 00248 249.088a70.003 70.003 0 00-12.384-16.784c-10.312-10.312-23.376-17.032-37.768-19.44l-23.456-3.912-4.984-18.464c13.92-8.568 24.296-22.272 28.488-38.488H200c17.648 0 32-14.352 32-32 0-6.936-2.272-13.32-6.04-18.568 3.888-9.048 6.04-18.864 6.04-28.712C232 32.624 199.376 0 159.28 0H144c-6.072 0-11.696 1.792-16.536 4.744C123.168 1.696 118.088 0 112.72 0 72.624 0 40 32.624 40 72.72c0 9.848 2.152 19.656 6.04 28.712C42.272 106.68 40 113.064 40 120c0 17.648 14.352 32 32 32h2.104c4.2 16.232 14.6 29.96 28.544 38.52l-4.976 18.432-23.456 3.912c-14.392 2.4-27.456 9.128-37.768 19.44-13.152 13.152-20.384 30.632-20.384 49.216v10.896C6.512 297.952 0 308.184 0 320c0 14.872 10.24 27.288 24 30.864v82.272C10.24 436.712 0 449.128 0 464c0 17.648 14.352 32 32 32s32-14.352 32-32c0-14.872-10.24-27.288-24-30.864v-82.272c13.76-3.576 24-15.992 24-30.864 0-17.624-14.32-31.96-31.936-31.992v-6.488c0-14.312 5.576-27.776 15.696-37.904 7.944-7.944 18-13.12 29.088-14.968l33.6-5.6 6.96-25.816A64.062 64.062 0 00136 200c6.488 0 12.744-.984 18.648-2.792l6.968 25.832 33.6 5.6c11.088 1.848 21.152 7.024 29.088 14.968C234.424 253.736 240 267.192 240 281.512v7.96c-9.288 3.312-16 12.112-16 22.528 0 10.416 6.712 19.216 16 22.528v18.28c-18.232 3.72-32 19.872-32 39.192s13.768 35.472 32 39.192v18.28c-9.288 3.312-16 12.112-16 22.528 0 13.232 10.768 24 24 24s24-10.768 24-24c0-10.416-6.712-19.216-16-22.528v-18.28c18.232-3.72 32-19.872 32-39.192s-13.768-35.472-32-39.192v-18.28c9.288-3.312 16-12.112 16-22.528 0-10.416-6.712-19.216-16-22.528v-7.96c0-14.32 5.576-27.776 15.696-37.904 7.944-7.944 18-13.12 29.088-14.968l33.6-5.6 6.968-25.832A63.565 63.565 0 00360 200a63.7 63.7 0 0018.584-2.776l6.96 25.816 33.6 5.6c11.088 1.848 21.152 7.024 29.088 14.968 10.128 10.128 15.696 23.592 15.696 37.904V288C446.32 288.04 432 302.376 432 320c0 14.872 10.24 27.288 24 30.864v82.272c-13.76 3.576-24 15.992-24 30.864 0 17.648 14.352 32 32 32s32-14.352 32-32c0-14.872-10.24-27.288-24-30.864zM48 464c0 8.824-7.176 16-16 16s-16-7.176-16-16 7.176-16 16-16 16 7.176 16 16zm0-144c0 8.824-7.176 16-16 16s-16-7.176-16-16 7.176-16 16-16 16 7.176 16 16zm152-184v-32c8.824 0 16 7.176 16 16s-7.176 16-16 16zM144 16h15.28C190.552 16 216 41.448 216 72.72c0 6.136-1.072 12.264-3.032 18.08C209 89.032 204.624 88 200 88v-2.136c1.056-1.288 2.096-2.584 3.032-3.992l3.624-5.44-13.312-8.872L189.72 73a33.62 33.62 0 01-28.032 15C143.112 88 128 72.888 128 54.312V32c0-8.824 7.176-16 16-16zM56 120c0-8.824 7.176-16 16-16v32c-8.824 0-16-7.176-16-16zm17.496-32H72c-4.624 0-9 1.032-12.968 2.808C57.072 84.984 56 78.856 56 72.72 56 41.448 81.448 16 112.72 16c1.176 0 2.296.264 3.368.664C113.568 21.24 112 26.416 112 32v22.312c0 1.048.096 2.072.16 3.096l-8.008 1.6c-15.16 3.04-26.8 14.576-30.656 28.992zM88 136V98.232c0-11.4 8.112-21.296 19.288-23.536l8.4-1.68c7.408 18.152 25.224 30.984 46 30.984 7.896 0 15.488-1.912 22.312-5.344V136c0 26.472-21.528 48-48 48s-48-21.528-48-48zm160 344c-4.408 0-8-3.584-8-8s3.592-8 8-8c4.408 0 8 3.584 8 8s-3.592 8-8 8zm24-88c0 13.232-10.768 24-24 24s-24-10.768-24-24 10.768-24 24-24 24 10.768 24 24zm-24-72c-4.408 0-8-3.584-8-8s3.592-8 8-8c4.408 0 8 3.584 8 8s-3.592 8-8 8zm176-184v-32c8.824 0 16 7.176 16 16s-7.176 16-16 16zM368 16h15.28C414.552 16 440 41.448 440 72.72c0 6.136-1.072 12.264-3.032 18.08C433 89.032 428.624 88 424 88v-2.136c1.056-1.288 2.096-2.584 3.032-3.992l3.624-5.44-13.312-8.872L413.72 73a33.62 33.62 0 01-28.032 15C367.112 88 352 72.888 352 54.312V32c0-8.824 7.176-16 16-16zm-88 104c0-8.824 7.176-16 16-16v32c-8.824 0-16-7.176-16-16zm17.496-32H296c-4.624 0-9 1.032-12.968 2.808C281.072 84.984 280 78.856 280 72.72 280 41.448 305.448 16 336.72 16c1.176 0 2.296.264 3.368.664C337.568 21.24 336 26.416 336 32v22.312c0 1.048.096 2.072.16 3.096l-8.008 1.6c-15.16 3.04-26.8 14.576-30.656 28.992zM312 136V98.232c0-11.4 8.112-21.296 19.288-23.536l8.4-1.68c7.408 18.152 25.224 30.984 46 30.984 7.896 0 15.488-1.912 22.312-5.344V136c0 26.472-21.528 48-48 48s-48-21.528-48-48zm136 184c0-8.824 7.176-16 16-16s16 7.176 16 16-7.176 16-16 16-16-7.176-16-16zm16 160c-8.824 0-16-7.176-16-16s7.176-16 16-16 16 7.176 16 16-7.176 16-16 16z"
    ></path>
    </SvgIcon>
  );
}
