import React from "react";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PdfViewer } from "components";
// import LockIcon from '@material-ui/icons/Lock';
import {
  DialogActions,
  DialogContent,
  Dialog,
  // DialogTitle,
  makeStyles,
  useTheme
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button1: {
    margin: theme.spacing(1),
  },
  titleDialog: {
    textAlign: 'center',
    fontWeight: 800
  }
}));

const DialogPDF = ({ onClose, openState, data }) => {
  const [open] = React.useState(openState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent >

        <PdfViewer
          file={data.pdf}
          type="byte"
        />

      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          onClick={() => onClose(false)}
          color="primary"
          className={classes.button1}
        >
          CERRAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPDF;

