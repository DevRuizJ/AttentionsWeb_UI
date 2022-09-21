import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link  } from '@material-ui/core';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    //position:'fixed',
    //bottom:0,    
    width:'100%',
    textAlign:'center',
    //zIndex:'99999'
  },
  footer:{
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color:theme.palette.secondary.light,
    // [theme.breakpoints.up('sm')]: {
    //   backgroundColor:theme.palette.primary.main,
    //   '& *':{
    //     color:theme.palette.secondary.light,
    //   }
    // }
  },
  fab: {
    margin: theme.spacing(3),
    position: 'fixed',
    bottom: 35,
    right: 0,
  },
  icon:{
    transform: 'rotate(90deg)'
  },
  text:{
    fontSize:'small',
    color:theme.palette.secondary.light,
    [theme.breakpoints.up('sm')]: {
      color:theme.palette.secondary.light,
    }
  }
}));

const Footer = props => {
  const { paciente,className, ...rest } = props;
  const classes = useStyles();
/*
  const [floatingVisible , setFloatingVisible ] = useState(false);

  useEffect(() => {
    const updateWidth = () => window.scrollY>0? setFloatingVisible(true): setFloatingVisible(false)

    updateWidth()

    window.addEventListener('scroll', updateWidth)

    return () => {
      window.removeEventListener("scroll", updateWidth)
    }
  })
  
  useEffect(()=>{
    const floating = document.getElementById('btnUp')
    if(floatingVisible) {
      floating.style.visibility='visible'
    }else{
      floating.style.visibility='hidden'  
    }
  },[floatingVisible])
  

  const handleScroll = ()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    } ) 
  }*/
  return (
    
    <div
      {...rest}
      className={clsx(classes.root, className)}
      id='footer'
    >
    
      <div className={classes.footer}>
        <Typography variant="body1" color='secondary'>
          &copy;{' '}
          {new Date().getFullYear()}.{' '}
          <Link
            component="a"
            href="https://www.suizalab.com/"
            target="_blank"
            color='secondary'
          >
            SUIZA LAB - LABORATORIO CLÍNICO E IMÁGENES
          </Link>        
        </Typography>
        <Typography variant="h6" className={classes.text}>
          Todos los derechos reservados Suizalab S.A.C.
        </Typography>
{/*}
        <Fab 
          id='btnUp'
          className={classes.fab}
          color="primary" 
          aria-label="Subir"
          onClick={handleScroll}
        >
          <ArrowBackIosIcon className={classes.icon} />
  </Fab>*/}
      </div> 
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};
const mapStateToProps = state =>({
  paciente:state.paciente
})
export default connect(mapStateToProps,[])(Footer)
