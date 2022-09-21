import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { AttachFile, AttachFileOutlined, AttachFileTwoTone } from "@material-ui/icons";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ViewMedicalOrder } from '../ViewMedicalOrder/ViewMedicalOrder';
import { UploadMedicalOrder } from '../UploadMedicalOrder/UploadMedicalOrder';


export const AttachmentNavigation = ({ onSetAttachments, onMedicalOrderAttached }) => {

    const [value, setValue] = useState(0);

    //Lleno ambas rutas del adjunto
    const [frontOM, setFrontOM] = useState('');
    const [backOM, setBackOM] = useState('');

    const ref = useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSetFrontOM = (medicalOrderImg) => {
        setFrontOM(medicalOrderImg);
    }

    const handleSetBackOM = (medicalOrderImg) => {
        setBackOM(medicalOrderImg);
    }



    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);

    useEffect(() => {
        onSetAttachments({ frontOM, backOM });
    }, [frontOM, backOM])

    useEffect(() => {
        if (onMedicalOrderAttached == null) {
            setFrontOM('');
            setBackOM('');
        }
        else {
            onMedicalOrderAttached.frontOM != null || '' ? setFrontOM(onMedicalOrderAttached.frontOM) : setFrontOM('');
            onMedicalOrderAttached.backOM != null || '' ? setBackOM(onMedicalOrderAttached.backOM) : setBackOM('');
        }
    }, [onMedicalOrderAttached])



    return (
        <>
            <Box>
                <CssBaseline />
                <h3>ORDEN MÉDICA</h3>
            </Box>
            <Box sx={{ pb: 7 }} ref={ref}>
                <CssBaseline />
                {
                    onMedicalOrderAttached == null || '' ? (
                        <UploadMedicalOrder
                            attach={value}
                            onFront={frontOM}
                            onSetFront={handleSetFrontOM}
                            inBack={backOM}
                            onSetBack={handleSetBackOM}>
                        </UploadMedicalOrder>
                    ) : (
                        <ViewMedicalOrder
                            attach={value}
                            onFront={frontOM}
                            inBack={backOM}
                        >

                        </ViewMedicalOrder>
                    )
                }
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
                    <BottomNavigation
                        sx={{ width: 1000 }}
                        value={value}
                        onChange={handleChange}>
                        <BottomNavigationAction
                            label="Hoja Anterior"
                            icon={<AttachFile />}>
                        </BottomNavigationAction>

                        <BottomNavigationAction
                            label="Hoja Posterior"
                            icon={<AttachFile />}>
                        </BottomNavigationAction>
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    )
}
