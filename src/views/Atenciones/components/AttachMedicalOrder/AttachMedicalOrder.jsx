import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Slide } from '@material-ui/core';

import { AttachmentNavigation } from "./AttachmentNavigation/AttachmentNavigation";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AttachMedicalOrder = (props) => {

    const { attachMedOrder, onCloseAttachMedOrder, onSaveAttachMedOrder, onMedicalOrderAttached } = props;

    const [openViewer, setOpenViewer] = useState(attachMedOrder);
    const [attachments, setAttachments] = useState({});
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');



    const handleSetAttachments = (attachments) => {
        setAttachments(attachments);
    }

    const handleSaveAttachments = () => {
        onSaveAttachMedOrder(attachments);
    }



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
                    <AttachmentNavigation
                        onSetAttachments={handleSetAttachments}
                        onMedicalOrderAttached={onMedicalOrderAttached}
                    >

                    </AttachmentNavigation>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSaveAttachments}>GUARDAR</Button>
                    <Button onClick={onCloseAttachMedOrder}>CANCELAR</Button>
                </DialogActions>

            </Dialog>
        </div >
    )
}

export default AttachMedicalOrder;