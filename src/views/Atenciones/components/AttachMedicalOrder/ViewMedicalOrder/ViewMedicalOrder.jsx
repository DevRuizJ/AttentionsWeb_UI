import React, { useState, useEffect } from 'react';
import { BoxUpload, ImagePreview } from "./style";


export const ViewMedicalOrder = ({ attach, onFront, inBack }) => {

    //Estados de control para VISUALIZAR IMAGENES ADJUNTAS
    const [frontImg, setFrontImg] = useState('');
    const [backImg, setBackImg] = useState('');



    useEffect(() => {
        if (onFront != '') {
            var frontImg = new Image();
            frontImg.src = 'data:image/png;base64,' + onFront;
            setFrontImg(frontImg.src);
        }

        if (inBack != '') {
            var backImg = new Image();
            backImg.src = 'data:image/png;base64,' + inBack;
            setBackImg(backImg.src);
        }
    }, [onFront, inBack])



    return (
        <div>
            <BoxUpload>
                <div className="image-upload">
                    {
                        attach == 0 ? (
                            <ImagePreview>
                                <img
                                    id="uploaded-image"
                                    src={frontImg}
                                    draggable={false}
                                    alt="uploaded-img"
                                />

                            </ImagePreview>
                        ) : (
                            <ImagePreview>
                                <img
                                    id="uploaded-image"
                                    src={backImg}
                                    draggable={false}
                                    alt="uploaded-img"
                                />
                            </ImagePreview>
                        )
                    }
                </div>
            </BoxUpload>
        </div>
    )
}
