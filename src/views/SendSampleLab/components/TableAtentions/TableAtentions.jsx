import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MessageBoot from '../../../../components/MessageBoot'
import { TableContent } from './components'
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
// import { BotSuiza } from "assets/icons";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/Atencion";
/*************REDUX *********************/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  DialogIcon: {
    fontSize: '3.5rem'
  }
}));

const TableAtentions = ({ userCompany, atencion, LoteGenerate }) => {
  const classes = useStyles();
  // const {compania } = userCompany
  const [openDialog, setOpenDialog] = React.useState(false);
  const [SelectAtention, setSelectAtention] = React.useState([]);

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleGenerateLote = data => {
    setOpenDialog(true)
    setSelectAtention(data)
  }

  const handleGenerarLote = () => {
    LoteGenerate({
      "atenciones": SelectAtention.map(a => a.ticket + a.numsuc + a.numemp)
    })
  }
  return (
    <div className={classes.root}>
      {
        atencion.atencionesSinLote.length > 0
          ? <TableContent data={atencion.atencionesSinLote} onConfirm={handleGenerateLote} />
          : <MessageBoot message={'Lista de atenciones no encontrado'} />
      }

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <InfoOutlinedIcon fontSize='large' color='error' className={classes.DialogIcon} />
          </div>
          <Typography variant='h4' className={classes.mensajeAlerta} component='h4'>
            ¿Está seguro de generar un lote de envio de {SelectAtention.length} tickets?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleGenerarLote()} startIcon={<LockIcon />} color="primary" autoFocus>
            Confirmar
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancelar
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}


const mapStateToProps = state => ({
  userCompany: state.userCompany,
  atencion: state.atencion,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableAtentions)
