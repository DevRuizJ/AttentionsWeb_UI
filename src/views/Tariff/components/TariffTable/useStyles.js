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
  tabPanel:{
    width:'100%'
  }
}))
