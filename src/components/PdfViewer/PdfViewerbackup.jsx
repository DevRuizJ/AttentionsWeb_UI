import React from 'react';

import Viewer,{ 
  Worker
} from '@phuocng/react-pdf-viewer';

import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height:'700px',
    position:'relative'
  },
}));

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
  
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);
  
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], { type: 'application/pdf' });
}

const PdfViewer = React.memo(({file,type}) => {
  const classes = useStyles();
  const blob = base64toBlob(file);
  
  const url = type!=='pdf' ? URL.createObjectURL(blob) : file

  return (
    <div className={classes.root}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
          <Viewer 
            fileUrl={url} 
            //onDocumentLoad={onDocumentLoad} 
            //layout={layout}
            //render={render}
          />
        </Worker>  
    </div>
  )
})

export default PdfViewer
