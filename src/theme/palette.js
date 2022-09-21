import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';


export default {
  black,
  white,
  primary: { 
    contrastText: white,
    dark:'#01386F',
    main: '#1976d2',
    light: '#5995D0'
  },
  secondary: {
    contrastText: white,
    dark: '#0f3245',
    main: '#2E5B73',
    light: '#727272'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  danger: {
    contrastText: white,
    dark: colors.deepOrange[900],
    main: colors.deepOrange[600],
    light: colors.deepOrange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: '#333333',
    secondary: '#616060',
    link: '#019998'
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  personalized:{
    garylight:'#F3F3F3',
    graylight:'#616060',
    tableHeader:'#616060',
  },
  icon: '#333333',
  divider: colors.grey[200]
};
