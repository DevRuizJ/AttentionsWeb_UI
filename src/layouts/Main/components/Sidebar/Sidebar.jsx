import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  Drawer,
  Hidden,
  ListItemIcon,
  Typography,
  MenuItem,
  Badge
} from '@material-ui/core';

import ArtTrack from '@material-ui/icons/ArtTrack';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LogoSuiza from '../../../../../src/assets/logos/LogoSuizaXS.svg';
import SendIcon from '@material-ui/icons/Send';

import { Profile, SidebarNav } from './components';
import { HowToReg, List } from '@material-ui/icons';

/*************REDUX **********************/
import { connect } from "react-redux";
import { actionCreators as actionCreatorsUser } from "../../../../store/User";
import { bindActionCreators } from "redux";
/*************REDUX **********************/




const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(0, 2),
    paddingTop: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(0.5, 0)
  },
  nav: {
    marginBottom: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(1),
    marginRight: '25px',
    display: 'inline-block',
    maxWidth: 180,
    width: '100%'
  },
  logout: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    justifyContent: "center"
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  //store
  const { userCompany } = props;

  const classes = useStyles();

  const pages = [
    {
      title: (
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          // badgeContent={4}
          color="secondary">
          <p>Atenciones</p>
        </Badge>
      ),
      href: '/atenciones',
      icon: <HowToReg />
    },
    {
      title: 'Registros',
      href: '/registros',
      icon: <List />
    },
    // {
    //   title: 'Resultados',
    //   href: '/resultados',
    //   icon: <AssignmentIcon />
    // },
    //  {
    //   title: 'Seguimiento',
    //   href: '/seguimiento',
    //   icon: <SwapCallsIcon />
    // },
    // {
    //   title: 'Pago',
    //   href: '/pago',
    //   icon: <LocalAtmIcon />
    // },
    // {
    //   title: 'Envío Muestra',
    //   href: '/envio-muestra',
    //   icon: <SendIcon />
    // },
    // {
    //   title: 'Tarifario',
    //   href: '/tarifario',
    //   icon: <MonetizationOnIcon />
    // }
  ]


  // const [data, setData] = useState();

  // useEffect(() => {
  //   setData(userCompany);
  // }, [userCompany])


  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile data={userCompany} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
          onClose={onClose}
        />
        <img
          alt="Logo SuizaLab"
          className={classes.image}
          src={LogoSuiza}
        />
      </div>
      <Divider className={classes.divider} />
      <Hidden lgUp>
        <MenuItem className={classes.logout} onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }}>
          <a href="/login" >
            <ListItemIcon color="inherit" >
              <PowerSettingsNew />
              <Typography variant="inherit">Salir</Typography>
            </ListItemIcon>
          </a>
        </MenuItem>
      </Hidden>
    </Drawer>
  );
};

// Sidebar.propTypes = {
//   className: PropTypes.string,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired,
//   variant: PropTypes.string.isRequired
// };

const mapStateToProps = state => ({
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreatorsUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, /*{},*/ mapDispatchToProps)(Sidebar)
