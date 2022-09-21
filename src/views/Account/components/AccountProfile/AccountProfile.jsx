import React, {  useState } from "react";
//import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  Badge,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },

  avatar: {
    margin: "auto",
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  uploadButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    padding: "1px",
  },
  textBody: {
    padding: "1px",
  },
}));

const AccountProfile = (props) => {
  const classes = useStyles()
  //store
  const { userCompany, payment, onChange } = props

  const { logo, razonSocial, usuario, seekcia } = userCompany
  const [NuevoLogo, setLogo] = useState(null)

  const handleChangeLogo = () => {
    onChange(NuevoLogo)
    setLogo(null)
  }

  const handleUpload = (event) => {
    var reader = new FileReader();
    var value = event.target.files[0]
    reader.readAsDataURL(value);
    reader.onload = () => {
      setLogo(reader.result)
    }
  }
  return (
    <Card className={classes.root}>
      <CardActions>
        <div
          className={classes.avatar}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <div className={classes.root}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            }
          >
            <Avatar src={NuevoLogo || logo} className={classes.avatar} />
          </Badge>
        </div>

      </CardActions>

      <Divider />

      <CardContent>
        <div>
          <div>
            <Typography variant="h3" className={classes.title}>
            {seekcia} - {razonSocial}
            </Typography>
            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>CORREO:</b> {payment.dataBilling.email}
            </Typography>
            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>TELÉFONO:</b> {payment.dataBilling.telefono}
            </Typography>
            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>RUC:</b> {usuario}
            </Typography>

            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>FORMA DE PAGO:</b> {payment.dataBilling.formaPagoDesc}
            </Typography>

            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>RAZÓN SOCIAL:</b> {razonSocial}
            </Typography>

            <Typography
              className={classes.textBody}
              color="textSecondary"
              variant="body1"
            >
              <b>DIRECCIÓN:</b> {payment.dataBilling.direccion}
            </Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          disabled={!NuevoLogo}
          fullWidth
          onClick={handleChangeLogo}
        >
          Guardar
        </Button>
      </CardActions>
    </Card>

  );
};
export default AccountProfile
