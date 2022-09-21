import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

/*************REDUX **********************/

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/User";

/*************REDUX *********************/
import { useHistory } from 'react-router-dom'

import {
  Typography
} from "@material-ui/core";

import { TariffBox } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "3px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }

  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));


const Tariff = props => {
  const classes = useStyles()
  const history = useHistory()

  //actionCreators del store
  const { getUser, isTableTarifa = true } = props

  //store
  const { userCompany: usercompany } = props

  useEffect(() => {

    if (!usercompany.isExistUser) {
      //Se guarda a nivel local el compania      
      const token = localStorage.getItem('token');
      if (!token)
        history.push('/login')
      else {
        const userLocal = localStorage.getItem('user');
        getUser({ usuario: userLocal })
      }
    }

  }, [usercompany.isExistUser, history, getUser])

  return (
    <div className={classes.root}>
      {
        isTableTarifa &&
        <Typography variant="h4" component="h4" className={classes.title}>
          TARIFARIO DE LA COMPAÑIA
        </Typography>
      }

      {
        usercompany.isExistUser ? (
          <TariffBox tableSelect={false} />
        ) : (
          <div>
            Cargando...
          </div>
        )
      }
    </div>
  );
};


const mapStateToProps = state => ({
  userCompany: state.userCompany,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...actionCreators,
    }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tariff)
