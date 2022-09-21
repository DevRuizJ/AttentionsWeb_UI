import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const mostrarAnio = () => new Date().getFullYear()

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        {  mostrarAnio() }.{' '}
        <Link
          component="a"
          href="https://www.suizalab.com/"
          target="_blank"
        >
          SUIZA LAB - LABORATORIO CLÍNICO E IMÁGENES 
        </Link>        
      </Typography>
      <Typography variant="caption">
        Todos los derechos reservados.
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
