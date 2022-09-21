import React, { useState, useEffect } from 'react';
import { BoxUpload, ImagePreview } from "./style";
import FolderIcon from "../../../../../assets/icons/UploadMedicalOrder/folder_icon_transparent.png";
import CloseIcon from "../../../../../assets/icons/UploadMedicalOrder/CloseIcon.svg";


export const UploadMedicalOrder = ({ attach, onFront, onSetFront, inBack, onSetBack }) => {

    //Estados de control para ADJUNTAR NUEVA IMAGEN
    const [isUploaded, setIsUploaded] = useState(false);
    const [typeFile, setTypeFile] = useState('');



    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setTypeFile(e.target.files[0].type);

            let reader = new FileReader();
            reader.onload = function (e) {
                attach == 0 ? onSetFront(e.target.result) : onSetBack(e.target.result);
                setIsUploaded(true);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }



    useEffect(() => {
        attach == 0 ? (
            onFront == '' ? setIsUploaded(false) : setIsUploaded(true)
        ) : (
            inBack == '' ? setIsUploaded(false) : setIsUploaded(true)
        );
    }, [attach])



    return (
        <div>
            <BoxUpload>
                <div className="image-upload">
                    {
                        !isUploaded ? (
                            <>
                                <label htmlFor="upload-input">
                                    <img
                                        src={FolderIcon}
                                        draggable={"false"}
                                        alt="placeholder"
                                        style={{ width: 100, height: 100 }}
                                    />
                                    <p style={{ color: "#444" }}>Orden Naval</p>
                                </label>

                                <input
                                    id="upload-input"
                                    type="file"
                                    accept=".png"
                                    onChange={handleImageChange}
                                />
                            </>
                        ) : (
                            attach == 0 ? (
                                <ImagePreview>
                                    <img
                                        className="close-icon"
                                        src={CloseIcon}
                                        alt="CloseIcon"
                                        onClick={() => {
                                            setIsUploaded(false);
                                            onSetFront('');
                                        }}
                                    />

                                    <img
                                        id="uploaded-image"
                                        src={onFront}
                                        draggable={false}
                                        alt="uploaded-img"
                                    />

                                </ImagePreview>
                            ) : (
                                <ImagePreview>
                                    <img
                                        className="close-icon"
                                        src={CloseIcon}
                                        alt="CloseIcon"
                                        onClick={() => {
                                            setIsUploaded(false);
                                            onSetBack('');
                                        }}
                                    />
                                    {
                                        <img
                                            id="uploaded-image"
                                            src={inBack}
                                            draggable={false}
                                            alt="uploaded-img"
                                        />
                                    }
                                </ImagePreview>
                            )
                        )
                    }
                </div>
            </BoxUpload>
        </div>
    )
}
