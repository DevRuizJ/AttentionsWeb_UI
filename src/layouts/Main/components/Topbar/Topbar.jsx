import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
//import LogoSuiza from '../../../../../src/assets/logos/logopartners.svg';
import LogoSuiza from '../../../../../src/assets/logos/LogoSuizaNaval.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  image:{
    maxHeight: '47px',
    width: 'auto',

    [theme.breakpoints.up("sm")]: {
      height: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      maxHeight: '47px',
      width:'90%',
    },

  }
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        
      {/* Logo Cambiar para Móviles */}
      
        {/* <RouterLink to="/">
          <img
          alt="Logo SuizaLab"
          className={classes.image}
          src={ LogoSuiza }
        />  
        </RouterLink> */}

        <div className={classes.flexGrow} />

        <Hidden mdDown>
          <IconButton  className={classes.signOutButton} color="inherit" href="/login" onClick={()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }}>
            <PowerSettingsNew fontSize="large" />
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen} fontSize="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
