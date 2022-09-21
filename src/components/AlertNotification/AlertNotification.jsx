import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
}));

const AlertNotification = ({ type, userCompany, resultado }) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [typeAlert, setTypeAlert] = React.useState(type);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }



  useEffect(() => {
    userCompany.isRequestError || resultado.isRequestError ? setTypeAlert('error') : setTypeAlert('success')
    setOpen(userCompany.isShowAlert || resultado.isShowAlert)
  }, [userCompany.isRequestError, resultado.isRequestError, userCompany.isShowAlert, resultado.isShowAlert])



  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open} autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeAlert}>
          {userCompany.requestMessage || resultado.requestMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
const mapStateToProps = state => ({
  userCompany: state.userCompany,
  resultado: state.resultado
})

export default connect(mapStateToProps, {})(AlertNotification);
