import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
      [theme.breakpoints.up(">sm")]: {
        height: "100%",
      },
      [theme.breakpoints.down(">sm")]: {
        height: "auto",
      },
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#D82527",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#D82527",
    },
  },

  form: {
    marginBottom: "0.5rem",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    "& *": {
      textAlign: "left",
    },
  },
  textField: {
    marginTop: theme.spacing(2),
    "& *": {
      borderRadius: "0.5rem",
    },
    "& label": {
      color: theme.palette.text.secondary,
    },
  },
  signInButton: {
    margin: theme.spacing(1, 0),
    borderRadius: "0.5rem",
  },
  mensajeLogin: {
    ...theme.typography.caption,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    textAlign: "center",
    color: theme.palette.danger.main,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  checkBox: {
    display: "flex",
    direction: "col",
    alignItems: "center",
    justifyContent: "center",
  },
  error:{
    color:theme.palette.error.main
  },
  subItem:{
    textAlign: "center",
  }
}));

export default useStyles
