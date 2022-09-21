import React from 'react';

// Material components
import { SvgIcon } from '@material-ui/core';

export default function Success(props) {
  return (
    <SvgIcon {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="167"
      height="167"
      fill="none"
      viewBox="0 0 167 167"
    >
      <path
        fill="#7AD58F"
        d="M83.131 166.262c45.912 0 83.131-37.219 83.131-83.131S129.043 0 83.131 0 0 37.219 0 83.131s37.219 83.131 83.131 83.131z"
      ></path>
      <path
        fill="#EBF0F3"
        d="M132.656 48.58a9.01 9.01 0 00-12.744 0L69.93 98.57 46.352 74.994a9.01 9.01 0 00-12.744 0 9.01 9.01 0 000 12.744l29.95 29.95a9.009 9.009 0 0012.744 0l56.354-56.363a9.01 9.01 0 000-12.744z"
      ></path>
    </SvgIcon>
  );
}
