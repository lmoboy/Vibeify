import { useState, useEffect, useRef } from "react";

export default function CameraDisplay({ onSnapshot }) {
    const [camerasArray, setCamerasArray] = useState([]);
    const [cameraId, setCameraId] = useState("");
    const [continuous, setContinuous] = useState(false);
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

    const takeSnapshot = () => {
        const video = videoRef.current;
        if (video) {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (onSnapshot) {
                    const file = new File([blob], "snapshot.png", {
                        type: "image/png",
                    });
                    onSnapshot(file);
                }
            }, "image/png");
        }
    };

    const handleCameraChange = (event) => {
        setCameraId(event.target.value);
    };
    useEffect(() => {
        if (continuous) {
            const interval = setInterval(() => {
                takeSnapshot();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [continuous]);
    return (
        <div className="flex w-fit h-full relative items-center align-middle justify-center dark:text-gray-700">
            <video
                ref={videoRef}
                autoPlay={true}
                className="md:block w-[600px] h-auto md:w-[600px] md:h-auto lg:w-[600px] lg:h-auto xl:w-[600px] xl:h-auto sm:block sm:w-[350px] sm:h-auto"
            />
            <select
                value={cameraId}
                onChange={handleCameraChange}
                className="bg-black  bg-opacity-50 text-white absolute top-0 right-0 w-fit h-fit"
            >
                {camerasArray.map((camera) => {
                    return (
                        <option
                            className="text-white bg-black"
                            key={camera.deviceId}
                            value={camera.deviceId}
                        >
                            {camera.label}
                        </option>
                    );
                })}
            </select>
            <button
                onClick={takeSnapshot}
                className="bg-black bg-opacity-50 text-white absolute bottom-0 left-1/2 -translate-x-[25px] transform  w-fit h-fit"
            >
                <svg
                    fill="#ffffff"
                    height="50px"
                    width="50px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 266.83 266.83"
                    xml:space="preserve"
                    stroke="#ffffff"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M133.415,0C59.85,0,0,59.85,0,133.415S59.85,266.83,133.415,266.83S266.83,206.98,266.83,133.415S206.98,0,133.415,0z M249.81,155.219l-72.767-72.767h63.246c7.394,15.444,11.541,32.728,11.541,50.963C251.83,140.863,251.132,148.149,249.81,155.219z M183.073,153.575l-30.803,30.803H111l-29.854-29.854v-39.649c0.14-0.121,0.281-0.241,0.414-0.374l32.05-32.05h42.22l27.243,27.243 V153.575z M231.709,67.452h-72.773H128.61l45.313-45.313C197.635,30.798,217.827,46.832,231.709,67.452z M157.405,17.444 l-52.204,52.205L83.757,91.092V25.931C98.868,18.921,115.691,15,133.415,15C141.632,15,149.655,15.843,157.405,17.444z M66.146,36.019v103.506L21.458,94.836C29.764,70.799,45.606,50.25,66.146,36.019z M17.02,111.611l51.323,51.323l21.444,21.444 H26.541C19.147,168.934,15,151.65,15,133.415C15,125.968,15.698,118.681,17.02,111.611z M35.121,199.378h72.773h29.376 l-45.054,45.054C68.803,235.716,48.868,219.797,35.121,199.378z M109.425,249.386l52.204-52.205 c0.768-0.768,1.334-1.677,1.703-2.652l19.741-19.741v66.111c-15.111,7.009-31.934,10.931-49.658,10.931 C125.198,251.83,117.175,250.987,109.425,249.386z M198.073,232.569v-75.888v-29.376l46.618,46.618 C235.851,198.132,219.32,218.667,198.073,232.569z"></path>{" "}
                    </g>
                </svg>{" "}
            </button>
            <button
                onClick={() => setContinuous((prev) => !prev)}
                className="bg-black bg-opacity-50 text-white absolute bottom-0 right-1/2 -translate-x-[25px] transform w-fit h-fit"
            >
                {continuous ? "Stop Continuous" : "Start Continuous"}
            </button>
        </div>
    );
}

