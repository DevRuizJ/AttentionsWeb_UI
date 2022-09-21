import styled from 'styled-components'

export const BoxUpload = styled.div`
    display: grid;
    margin-top: 20px;
    place-items: center;
    border: 3px dashed #089190;
    padding: 36px 48px;
    position: relative;

    height: 100%;
    width: 100%;

    background: #FBFBFF;
    border-radius: 25px 25px 0 0;

    .image-upload {
        display: flex;
        flex-wrap:wrap;

        label {
            cursor: pointer;
        
            :hover {
                opacity: .8;
            }
        }

        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */

    #uploaded-image{
        height: 95%;
        width: 100%;
        object-fit: cover;
        border-radius: 20px;
        padding: 20px 10px 20px 10px ;
    }

    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;

        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;

        :hover {
            opacity: 1;
        }   
    }
`