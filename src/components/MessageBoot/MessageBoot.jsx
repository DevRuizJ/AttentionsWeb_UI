import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import BotSuiza from '../../assets/img/SuizaBootXS.svg'
const useStyles = makeStyles({
  root: {
    with: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
});

const MessageBoot = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={BotSuiza} />
        <h4>{message}</h4>
      </div>
    </div>
  );
}

export default MessageBoot
