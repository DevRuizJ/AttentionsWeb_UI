import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {AttachPayment} from '../../components'
import { DialogContent } from '@material-ui/core';
const TiposPago = ['SUBIR COMPROBANTE'];
const useStyles = makeStyles(theme=>({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.background.default,
  },
}));

export default function DialogOptionCancel({itemCancel,onClose,onSaveVoucher}) {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClose =()=>{
    onClose(null)
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true} fullScreen={fullScreen}>
        {
          !selectedValue&&<DialogTitle id="simple-dialog-title">MÉTODOS DE PAGO</DialogTitle>
        }
        {
          !selectedValue
          ? <List>
              {TiposPago.map((opt) => (
                <ListItem button onClick={() => setSelectedValue(opt)} key={opt}>
                  <ListItemAvatar>
                    <Avatar >
                      <AccountBalanceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={opt} />
                </ListItem>
              ))}
            </List>
        :<DialogContent > 
          <AttachPayment data={itemCancel} onConfirm={onSaveVoucher}/>
        </DialogContent>
        }
      </Dialog>
    </div>
  );
}
