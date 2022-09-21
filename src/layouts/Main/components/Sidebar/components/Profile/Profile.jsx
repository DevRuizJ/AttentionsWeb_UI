import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 120,
    height: 120,
    border: '1px solid gray'
  },
  name: {
    marginTop: theme.spacing(1)
  },
  compania: {
    textAlign: 'center',
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const { data } = rest
  const classes = useStyles();

  const user = {
    type: 'USER',
    user: data.user,
    userName: data.name,
    lastName: data.lastName,
    motherLastName: data.motherLastname,
    compania: data.razonSocial,
    // logo: data.logo || 'https://i.ibb.co/mRKQyt5/logov1.png',
    // logo: data.logo || 'https://i.ibb.co/nsqXDhd/logov.png',
    logo: data.logo || 'https://i.ibb.co/M53gPhc/logo-Suizasoft.png',
    // seekcia: data.seekcia
  }


  // const [user, setUser] = useState({})


  // useEffect(() => {
  //   setUser({
  //     type: 'USER',
  //     user: data.user,
  //     userName: data.name,
  //     lastName: data.lastName,
  //     motherLastName: data.motherLastName,
  //     compania: data.razonSocial,
  //     logo: data.logo || 'https://i.ibb.co/mRKQyt5/logov1.png',
  //   })
  // }, [data])


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        //component={RouterLink}
        src={user.logo}
        to="/account"
      />

      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.user}
      </Typography>
      <Typography variant="overline" className={classes.compania}>{user.userName} {user.lastName} </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
}
export default Profile;
