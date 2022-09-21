import React from 'react';
import {useTheme} from '@material-ui/styles'
// Material components
import { SvgIcon } from '@material-ui/core';

export default function Patologica(props) {
    const {active=false, ...rest} =props
    const theme = useTheme();
    const colorIcon = active? theme.palette.primary.main:theme.palette.icon
  
  return (
    <SvgIcon {...rest}
    xmlns="http://www.w3.org/2000/svg"
    width="481"
    height="482"
    fill="none"
    viewBox="0 0 481 482"
  >
    <path
      fill={colorIcon}
      d="M327.2 225H473a7.997 7.997 0 008-8 8 8 0 00-8-8H331.984a166.353 166.353 0 00-32.928-146.304 8.003 8.003 0 00-11.355-1.241 8.002 8.002 0 00-1.021 11.377A150.72 150.72 0 01315.48 209h-16.504a135.991 135.991 0 00-14.85-112.43 135.998 135.998 0 00-238.753 15.724A136.005 136.005 0 0033 169a134.545 134.545 0 0032 87.48v23.064a151.873 151.873 0 0191.493-261.993 151.872 151.872 0 01108.675 33.777 8.003 8.003 0 0011.352-1.05 8.004 8.004 0 00-1.224-11.334A167.895 167.895 0 00151.485 1.78 167.885 167.885 0 002.037 187.79 167.885 167.885 0 0065 300.688v36.8a71.998 71.998 0 00-63.888 75.56A72 72 0 1081 337.488v-25.6a167.1 167.1 0 00181.952-3.688l39.024 39.016a40 40 0 008.912 42.864l79.2 79.2a40.05 40.05 0 0056.568 0l22.624-22.632a40 40 0 000-56.568l-49.368-49.376a8 8 0 10-11.312 11.312l32.4 32.416L384.432 441l-11.32-11.312 40.976-40.976a8.004 8.004 0 002.246-5.628 8.004 8.004 0 00-7.931-7.93 8 8 0 00-5.627 2.246L361.8 418.376l-39.6-39.6a24.05 24.05 0 010-33.936l22.632-22.632a24.597 24.597 0 0133.944 0l7.2 7.2a7.996 7.996 0 005.685 2.442 8.01 8.01 0 005.726-2.343 8.006 8.006 0 00-.099-11.411l-7.2-7.2a39.786 39.786 0 00-42.856-8.912L308.2 262.952a167.34 167.34 0 0019-37.952zM81 464.36V417h47.36A55.997 55.997 0 0181 464.36zM128.36 401H73a7.997 7.997 0 00-8 8v55.36A55.931 55.931 0 0117.023 409 55.93 55.93 0 0165 353.64V369a7.999 7.999 0 0016 0v-15.36A55.997 55.997 0 01128.36 401zm323.952-5.256l5.656 5.656a24.003 24.003 0 017.031 16.972 24.005 24.005 0 01-7.031 16.972l-22.624 22.632a24.048 24.048 0 01-33.944 0l-5.656-5.664 56.568-56.568zM81 292.704v-20.2c1.912 1.6 3.864 3.2 5.872 4.728A8.003 8.003 0 0099.75 269.8a7.99 7.99 0 00-3.197-5.304A123.547 123.547 0 0181 250.152V225a8 8 0 10-16 0v3.488A118.81 118.81 0 0149 169 119.998 119.998 0 01189.303 50.346a120.006 120.006 0 0183.308 57.733A119.998 119.998 0 01282 209h-25a7.998 7.998 0 00-5.657 13.656A7.999 7.999 0 00257 225h18.048a119.997 119.997 0 01-152.592 54.632 7.992 7.992 0 00-8.729 1.679 7.99 7.99 0 00-1.789 8.708 8.005 8.005 0 004.302 4.357A135.902 135.902 0 00292.792 225h17.384a151.55 151.55 0 01-166.171 93.894A151.544 151.544 0 0181 292.704zm252.52 18.192l-22.624 22.624-35.008-35.008a169.347 169.347 0 0022.624-22.624l35.008 35.008z"
    ></path>
    <path
      fill={colorIcon}
      d="M115.304 225.264a56.606 56.606 0 007.888 8.928 23.571 23.571 0 00-6.4 17.728l.256 3.944a8 8 0 008 7.488h.52A8.002 8.002 0 00133 254.84l-.256-3.952a7.666 7.666 0 014.256-7.376 55.604 55.604 0 0019.584 5.264 7.656 7.656 0 010 8.496l-2.192 3.288a8.004 8.004 0 008.223 12.286 8.002 8.002 0 005.089-3.406l2.192-3.296a23.54 23.54 0 003.312-18.528A55.237 55.237 0 00185 243.52a7.67 7.67 0 014.24 7.376l-.256 3.944a8.006 8.006 0 004.456 7.692 7.985 7.985 0 003.016.804h.52a8.001 8.001 0 008-7.488l.256-3.936a23.586 23.586 0 00-6.4-17.704 55.981 55.981 0 003.368-3.384 23.577 23.577 0 0016.16 6.448c.512 0 1.032 0 1.552-.048l3.944-.256a8.017 8.017 0 00-1.024-16l-3.952.256a7.603 7.603 0 01-4.317-.99 7.602 7.602 0 01-3.035-3.226 55.627 55.627 0 005.296-19.664 7.682 7.682 0 018.44.072l3.288 2.192a8.002 8.002 0 008.88-13.312l-3.296-2.192a23.646 23.646 0 00-26.288 0l-3.296 2.192A8.004 8.004 0 00201 193a40 40 0 11-5.352-20 8.007 8.007 0 007.185 3.992 7.995 7.995 0 006.911-4.448l1.752-3.544a7.644 7.644 0 013.046-3.269 7.638 7.638 0 014.354-1.003l3.944.256a8.016 8.016 0 101.024-16l-3.936-.256a23.863 23.863 0 00-9.51 1.342 23.862 23.862 0 00-8.21 4.986 55.965 55.965 0 00-8.944-7.808l.112-1.936a7.7 7.7 0 015.696-6.976 8 8 0 10-4.144-15.448 23.613 23.613 0 00-16.72 16.8 56.045 56.045 0 00-12.76-2.496 7.66 7.66 0 010-8.504l2.192-3.288a7.996 7.996 0 00-2.216-11.096 7.994 7.994 0 00-6.007-1.19 7.995 7.995 0 00-5.089 3.406l-2.192 3.296a23.575 23.575 0 00-3.312 18.512 55.688 55.688 0 00-11.824 4.16 7.673 7.673 0 01-4.248-7.384l.256-3.944a8.016 8.016 0 10-16-1.024l-.256 3.936a23.581 23.581 0 006.4 17.736 48.662 48.662 0 00-3.384 3.384 23.72 23.72 0 00-17.728-6.4l-3.944.256a8.015 8.015 0 00-4.782 14.019 8.023 8.023 0 005.806 1.981l3.952-.256a7.682 7.682 0 017.376 4.248 56.046 56.046 0 00-4.232 12.296 23.608 23.608 0 00-22.912 6.072 8 8 0 0011.312 11.312 7.691 7.691 0 018.888-1.44l1.712.856a55.424 55.424 0 002.48 12.136 23.6 23.6 0 00-16.8 16.72 8 8 0 1015.448 4.144 7.7 7.7 0 016.976-5.696l1.984-.176z"
    ></path>
    <path
      fill={colorIcon}
      d="M153 185a8 8 0 10-16 0 31.996 31.996 0 009.373 22.627A31.996 31.996 0 00169 217a8 8 0 100-16 16.004 16.004 0 01-11.314-4.686A16.004 16.004 0 01153 185zM177 193a8 8 0 100-16 8 8 0 000 16zM252.88 191.855a8.004 8.004 0 008.879-.432 7.986 7.986 0 002.097-2.312 54.623 54.623 0 002.656-51.2 7.99 7.99 0 00-4.502-4.287 7.998 7.998 0 00-10.817 7.984 7.992 7.992 0 00.823 3.063 38.656 38.656 0 01-1.872 36.256 8.001 8.001 0 002.736 10.928zM89 129a8 8 0 100-16 8 8 0 000 16zM241 121a8 8 0 100-16 8 8 0 000 16zM161 98.655a23.2 23.2 0 0016.472-6.816 7.289 7.289 0 0111.2 1.12 8.003 8.003 0 0013.305.01 7.995 7.995 0 00.007-8.89 23.283 23.283 0 00-17.079-10.255 23.289 23.289 0 00-18.761 6.703 7.303 7.303 0 01-10.32 0 8.002 8.002 0 00-13.158 2.529 7.991 7.991 0 00.053 6.187 8.013 8.013 0 001.793 2.596A23.205 23.205 0 00161 98.655zM473 41h-88V25h88a8 8 0 100-16h-96a8 8 0 00-8 8v32a8.001 8.001 0 008 8h96a8 8 0 100-16zM473 73h-48a8 8 0 00-8 8v32a8 8 0 008 8h48a8 8 0 008-8V81a8.001 8.001 0 00-8-8zm-8 32h-32V89h32v16zM473 137h-32a8 8 0 100 16h32a8 8 0 100-16zM473 169h-80a8 8 0 100 16h80a8 8 0 100-16zM225 369h-56a8 8 0 100 16h56a8 8 0 100-16zM209 401h-40a8 8 0 100 16h40a8 8 0 100-16zM193 433h-24a8 8 0 100 16h24a8 8 0 100-16z"
    ></path>
    </SvgIcon>
  );
}