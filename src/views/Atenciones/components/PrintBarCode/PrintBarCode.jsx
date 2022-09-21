import { Button, Dialog, DialogActions, DialogContent, Slide } from '@material-ui/core';
import { PdfViewer } from 'components';
import React, { useState } from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PrintBarCode = (props) => {

    const { printBarCode, barCodeArray, onClosePrintBarCode } = props;

    const [openViewer, setOpenViewer] = useState(printBarCode);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    // const [barCodeArray, setBarCodeArray] = useState(barCode);



    return (
        <div>
            <Dialog
                open={openViewer}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >

                <DialogContent>
                    <PdfViewer file={barCodeArray}></PdfViewer>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClosePrintBarCode}>CANCELAR</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default PrintBarCode;