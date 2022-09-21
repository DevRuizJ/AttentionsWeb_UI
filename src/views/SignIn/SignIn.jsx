import React from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import LogoSuiza from "../../../src/assets/logos/LogoSuizaXS.svg";
import Particles  from "./Particles";

import {
  Container,
  Typography,
  Divider,
  Grid,
  Hidden,
} from "@material-ui/core";
import { SocialButtons, Slider, FormLogin } from "./Components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "90vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    [theme.breakpoints.up(">sm")]: {
      height: "90%",
    },
    [theme.breakpoints.down(">sm")]: {
      height: "auto",
    },
  },
  wrapLogin: {
    maxWidth: "876px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: "10px",
  },
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  boxLogin: {
    maxWidth: "400px",
    left: 0,
    right: 0,
    margin: "auto",
    paddingBottom:theme.spacing(1.5)
  },
  logo: {
    height: "150px",
    margin: theme.spacing(2, 0),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
    },
  },
  logoImg: {
    height: "100%",
  },
  title: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  particle:{
    position: 'fixed',
    top: 0,
    width: "100%",
  }
}));

const SignIn = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.particle}>
      <Particles  />
      </div>
      <div className={classes.wrapLogin}>
        <Grid
          container
          className={classes.container}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Hidden smDown>
            <Slider />
          </Hidden>

          <Grid item sx={12} md={6} className={classes.boxLogin}>
            <div className={classes.logo}>
              <img
                className={classes.logoImg}
                src={LogoSuiza}
                alt="logoEmpresa"
              />
            </div>
            <Typography
              className={classes.title}
              variant="h3"
              component="h2"
              color="primary"
            >
              <b>SUIZA LAB ATENCIONES</b>
            </Typography>

            <div className={classes.contentBody}>
              <FormLogin />
            </div>
            <Divider />
            <SocialButtons />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
}

export default SignIn
