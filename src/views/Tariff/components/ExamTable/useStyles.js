import{makeStyles}from '@material-ui/styles';

export const useStyles = makeStyles(theme=>({
  root:{          
    padding: theme.spacing(3),
    paddingTop: "3px",
  },
  container:{    
    padding: theme.spacing(2),
    textAlign:'center',
  },
  form:{  
    flexBasis: 700,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    '& *':{
      textAlign:'left'
    }   
  },
  textField: {    
    marginTop: theme.spacing(1),
    '& label':{
      color:theme.palette.text.secondary,
    },

  },
  radioButtons:{
    paddingTop:'13px',
      '& *':{
          color:theme.palette.text.primary,
      },
  },
  radioGroup:{
      flexDirection: 'row',
  },
  groupbutton:{
    marginTop: theme.spacing(2),
    textAlign:"center"
  },
  buttonRegister:{
    marginBottom: theme.spacing(1),
  },
  
  textProteccionDatos:{
    textAlign:'right',
    marginTop:theme.spacing(2),
  },
  inLine:{
    display:'flex',
    alignItems:'center'
  },
  grid: {
    margin: theme.spacing(2),
    marginTop: 0,
    width: "100%",
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  gridButton:{
    textAlign: 'end',
  },
}))
