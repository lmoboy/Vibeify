import { useState, useEffect, useRef } from "react";

export default function CameraDisplay() {
    const [camerasArray, setCamerasArray] = useState([]);
    const [cameraId, setCameraId] = useState("");
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const cameras = devices.filter(
                (device) => device.kind === "videoinput"
            );
            if (cameras.length == 0) {
                setCameraId(cameras[0].deviceId);
            }
            setCamerasArray(cameras);
        });

        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: cameraId } })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.error("Error accessing camera:", error);
            });
    }, [cameraId]);

    const handleCameraChange = (event) => {
        setCameraId(event.target.value);
    };

    return (
        <div className="flex w-fit h-full relative dark:text-gray-700">
            <video ref={videoRef} autoPlay={true} className="w-2/3 h-auto"/>
            <select
                value={cameraId}
                onChange={handleCameraChange}
                className="bg-black  bg-opacity-50 text-white absolute top-0 left-0 w-fit h-fit"
            >
                {camerasArray.map((camera) => {
                    return (
                        <option className="text-white bg-black" key={camera.deviceId} value={camera.deviceId}>
                            {camera.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
