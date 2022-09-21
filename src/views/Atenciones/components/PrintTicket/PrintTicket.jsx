import { Button, Dialog, DialogActions, DialogContent, Slide } from '@material-ui/core';
import { PdfViewer } from 'components';
import React, { useState } from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PrintTicket = (props) => {

    const { printTicket, ticketArray, onClosePrintTicket } = props;

    const [openViewer, setOpenViewer] = useState(printTicket);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    // const [fileArray, setFileArray] = useState(file);



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
                    <PdfViewer file={ticketArray}></PdfViewer>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClosePrintTicket}>CANCELAR</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default PrintTicket;
