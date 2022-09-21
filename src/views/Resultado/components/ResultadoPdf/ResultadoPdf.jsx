import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import {PdfViewer} from '../../../../components'
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  viewer:{
    overflow:'hidden'
  }
}));

const ResultadoPdf = ({ className,pdfResult, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <CardHeader
          //subheader="Laboratorio"
          title="Resultado de Exámenes"
        />
        
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >            
            {
              
              pdfResult.length>0
              ?
                <div className={classes.viewer}>
                  <PdfViewer file={pdfResult} type="base64" />
                </div>
              :
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Problemas con el resultado...
                </Typography>
            }
              
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
};

ResultadoPdf.propTypes = {
  className: PropTypes.string
};

export default React.memo(ResultadoPdf)
