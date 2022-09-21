import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { makeStyles } from '@material-ui/core/styles';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '700px',
    position: 'relative'
  },
}));

const PdfViewer = React.memo(({ file, type }) => {
  const classes = useStyles();
  const pdfContentType = 'application/pdf';
  const url = type !== 'pdf' ? `data:${pdfContentType};base64,${file}` : file

  return (
    <div className={classes.root}>
      {file &&
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"
        >
          <Viewer
            fileUrl={url}
            plugins={[
              // Register plugins
              defaultLayoutPluginInstance,

            ]}
          //onDocumentLoad={onDocumentLoad} 
          //layout={layout}
          //render={render}
          />
        </Worker>
      }
    </div>
  )
})

export default PdfViewer
