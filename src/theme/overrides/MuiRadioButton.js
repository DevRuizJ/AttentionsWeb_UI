import palette from '../palette';

export default {
  root: {
    '&$checked': {
      color: palette.primary.main
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default
      }
    }
  }
};