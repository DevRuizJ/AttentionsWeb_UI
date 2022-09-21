import{makeStyles}from '@material-ui/styles';

export const useStyles = makeStyles(theme=>({
  root:{          
    padding:theme.spacing(2),
    flexGrow: '1',
  },
  title:{    
    textAlign:'center',
    paddingBottom: theme.spacing(2),
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
          color:theme.palette.text.secondary,
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
  fecha:{
    width:'100%'
  },
  textProteccionDatos:{
    marginTop:theme.spacing(2),
    justifyContent:'flex-end',
    display:'flex',
  },
  inLine:{
    display:'flex',
    alignItems:'center',
  }
}))
