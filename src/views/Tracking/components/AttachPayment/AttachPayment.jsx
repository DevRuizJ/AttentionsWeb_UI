import React from "react";
import { makeStyles } from "@material-ui/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {
  Grid,
  Divider,
  Typography,
  Button
} from "@material-ui/core";
import validators from '../../../../common/validators'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    textAlign: "-webkit-center"
  },
  content: {
    paddingTop: theme.spacing(1)
  },
  image: {
    borderRadius: "7px",
    textAlign: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '600px',
    justifyContent: "center",
    border: "1px solid #d6d6d6",
  },
  divImg: {
    textAlign: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '400px',
    justifyContent: "center",
  },
  input: {
    display: 'none',
  },
  boxSelect: {
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));


const AttachPayment = ({ data, onConfirm }) => {
  const classes = useStyles();
  const [fileBase64, setFileBase64] = React.useState(null);
  const [file, setFile] = React.useState("");
  const ImageThumb = ({ image }) => {
    return <img className={classes.image} src={URL.createObjectURL(image)} alt={image.name} />;
  };

  const handleUpload = (event) => {
    setFile(event.target.files[0]);

    var reader = new FileReader();
    var value = event.target.files[0]
    reader.readAsDataURL(value);
    reader.onload = () => {
      //     let fileInfo = {
      //         name: value.name,
      //         type: value.type,
      //         size: Math.round(value.size / 1000) + ' kB',
      //         base64: reader.result,
      //         file: value,
      // }
      setFileBase64(reader.result)
    }
  }
  return (
    <div className={classes.root}>
      <Typography
        color="textSecondary"
        variant="h5"
        gutterBottom
      >
        ADJUNTAR  PAGO
      </Typography>
      <Divider />
      <Grid container className={classes.content}>

        <Grid item xs={12}>
          <Typography color="textSecondary" variant="body1" component='div' className={classes.boxSelect}>El monto del voucher a subir debe de ser de {validators.MontoPENDecimal(data.total)}. Una vez subido, se notificará inmediatamente al área de tesorería para la cancelación del comprobante. </Typography>
        </Grid>
        <Grid item xs={12} className={classes.boxSelect}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
          />

          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.button}
              startIcon={<AttachFileIcon />}
            >
              Adjuntar voucher
            </Button>
          </label>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            <small>(JPG, JPNG O PNG)</small>
          </Typography>

        </Grid>
        <Grid item xs={12} className={classes.gridCenter}>
          <div className={classes.divImg}>
            {file && <ImageThumb image={file} />}
          </div>
        </Grid>
        {file && (
          <Grid item xs={12} sm={12} className={classes.button} >
            <Button
              variant="contained"
              color="primary"
              type='submit'
              endIcon={<CloudUploadIcon />}
              onClick={() => onConfirm({
                tipo: data.numtdven,
                serie: data.serfac,
                numero: data.numfac,
                comprobanteImg: fileBase64

              })}
            >
              SUBIR COMPROBANTE
              </Button>
          </Grid>
        )
        }
      </Grid>
    </div>


  );
};



export default AttachPayment;

