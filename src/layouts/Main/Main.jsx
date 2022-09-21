import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Divider, Fab, Grid, IconButton, LinearProgress, Popover, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { connect } from "react-redux";
import { Sidebar, Topbar, Footer } from './components';
import { AlertaNotificacion } from '../../components';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles(theme => ({

  root: {
    overflow: 'auto',
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  contentToo: {
    maxWidth: '350px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.dark,
    opacity: '0.9',
    color: theme.palette.personalized.garylight,
  },
  title: {
    margin: theme.spacing(1, 0),
    color: theme.palette.personalized.garylight,
    fontWeight: "450"
  },
  container: {
    margin: theme.spacing(1, 0),
  },
  text: {
    margin: theme.spacing(0.5, 0),
  },
  contenedor: {
    alignItems: "center"
  }
}));

const Main = props => {
  const { children, userCompany } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >

      <Topbar onSidebarOpen={handleSidebarOpen} />
      {userCompany && userCompany.isLoading && <LinearProgress color="secondary" />}
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}

      />
      <main className={classes.content}>
        {children}
        <AlertaNotificacion />
        <Footer />
      </main>

      <Tooltip title="¿Necesita Ayuda?" placement="left">
        <Fab size="medium" color="primary" aria-label="add" className={classes.fab} onClick={handleClick}>
          <HelpOutlineIcon />
        </Fab>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className={classes.contentToo}>
          <Typography className={classes.title} item xs={12}>Preguntas Frecuentes:</Typography>
          <Divider />
          <Grid container className={classes.container} item xs={12}>

            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿Cómo Cambiar/Recuperar Mi Contraseña?</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}


            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿Cómo ver Resultados?</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}

            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿Cómo Realizar Pagos?</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}

            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿Cómo Enviar Mis Muestras?</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}

            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿¿Cómo Realizar Pagos</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}

            {/* -------------------------------- */}
            <Grid container item xs={12} className={classes.contenedor}>
              <Grid item xs={10}><b>¿Cómo Realizar Seguimientos?</b>  </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" href="https://youtu.be/LXtHNHdYSBA" target="_blank" aria-label="add an alarm">
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* -------------------------------- */}



          </Grid>

        </div>
      </Popover>


    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  userCompany: state.userCompany,
})

export default connect(mapStateToProps, {})(Main)
