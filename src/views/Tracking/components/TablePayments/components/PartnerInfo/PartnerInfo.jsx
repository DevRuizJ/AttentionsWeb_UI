import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Avatar
} from "@material-ui/core";


/*************REDUX **********************/
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../../../store/Payment";
import { actionCreators as actionCreatorsUser } from "../../../../../../store/User.js";
import { LoadingMessage } from "components";
/*************REDUX **********************/
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  grid: {
    margin: theme.spacing(2),
    marginTop: 0,
    width: "100%",
  },
  text: {
    color: theme.palette.text.secondary,
    "& *": {
      color: theme.palette.text.secondary,
    },
  },
  avatar: {
    width: 90,
    height: 90,
    border:`1px solid ${theme.palette.personalized.graylight}`
  },

}));

//  TODO OBSERVAR A MARY
const PartnerInfo = ({ getDataBilling,userCompany,payment }) => {
  const classes = useStyles();
  const {isExistUser,compania} = userCompany
  React.useEffect(() => {
    if (!payment.dataBilling && isExistUser) {
      getDataBilling({
        "compania": compania
      })
    }
  }, [getDataBilling,payment.dataBilling,isExistUser,compania])

  return (
    <div className={classes.root}>
    {
      payment.dataBilling
      ?
    
      <Grid
        container
        spacing={3}
        className={classes.grid}
        alignItems="flex-end"
      >

        <Grid item>
          <Avatar
            className={classes.avatar}
            alt="Logo Empresa"
            src={userCompany.logo||'https://www.flaticon.com/svg/static/icons/svg/3135/3135768.svg'}
          />
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>

              <Typography variant="body1">
                <b>RAZÓN SOCIAL:</b> {payment.dataBilling.razonSocial}
              </Typography>

              <Typography variant="body1" >
                <b>RUC:</b>         {payment.dataBilling.ruc}
              </Typography>

              <Typography variant="body1" color="textSecondary">
                <b>DIRECCIÓN:</b>   {payment.dataBilling.direccion}
              </Typography>

              <Typography variant="body1" color="textSecondary">
                <b>MONEDA:</b>       {payment.dataBilling.moneda}
              </Typography>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
      :
      <LoadingMessage message='Cargando datos de la compañia...' />
    }
    </div>


  );
};

const mapStateToProps = state => ({
  payment: state.payment,
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
      ...actionCreatorsUser
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PartnerInfo)
