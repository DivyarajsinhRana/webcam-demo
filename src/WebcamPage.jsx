import { useEffect } from "react";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { dataURLtoFile } from "./dataURLtoFile";

const WebcamPage = () => {
    const [hasCamera, setHasCamera] = useState()

    useEffect(() => {
        function detectWebcam(callback) {
            let md = navigator.mediaDevices;
            if (!md || !md.enumerateDevices) return callback(false);
            md.enumerateDevices().then(devices => {
                callback(devices.some(device => 'videoinput' === device.kind));
            })

        }

        detectWebcam(function (hasWebcam) {
            setHasCamera(hasWebcam)
        })
    }, [])
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrcs] = useState("");

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log('captured images is', imageSrc);
        setImgSrcs(imageSrc);
    }, [webcamRef, setImgSrcs]);

    const uploadPicture = () => {
        const file = dataURLtoFile(imgSrc);
        console.log('image to upload...', file);
    };

    const handelRetake = () => {
        setImgSrcs("");
    };



    return (
        <>
            <div>
                {hasCamera ?
                    <>
                        {!imgSrc ? (
                            <>
                                {
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat={"image/jpeg"}
                                        screenshotQuality={0.92}
                                    />
                                }
                            </>
                        ) : (
                            <img src={imgSrc} alt='' />
                        )}
                    </>
                    : <div>
                        no camera
                    </div>}
                <div>
                    <button onClick={handelRetake}>Retake</button>
                    <button onClick={capture}>Capture</button>
                    <button onClick={uploadPicture}>Upload</button>
                </div>
            </div>
        </>
    );
};

export default WebcamPage;
