import{makeStyles}from '@material-ui/styles';

export const useStyles = makeStyles(theme=>({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
  title: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1, 3),
    marginBottom: theme.spacing(1),
    '& *': {
      fontSize: '13px'
    }
  },
  contentTable: {
    padding: theme.spacing(1),
  },
  tableHeader: {
    background: theme.palette.secondary.dark,
    color: theme.palette.white,
    fontWeight: 600,
    padding: theme.spacing(1),
  },
  footer: {
    textAlign: "center"
  },
  item1: {
    width: '55px',
    padding: theme.spacing(0.5),
  },
  item2: {
    width: 'calc(100% - 170px)',
    padding: theme.spacing(0.5),
  },
  item3: {
    width: '65px',
    padding: theme.spacing(0.5),
  },
  item4: {
    width: '50px',
    padding: theme.spacing(0.5),
  },
  textCenter:{
    textAlign:'center'
  },
  total:{
    fontWeight:600,
    textAlign:'right',
    color:theme.palette.primary.dark,
    fontSize:'15px',
    margin: theme.spacing(1,2),
  },
}))
