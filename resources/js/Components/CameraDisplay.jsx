import { useState, useEffect, useRef } from "react";

export default function CameraDisplay({ onSnapshot }) {
    const [availableCameras, setAvailableCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState(null);
    const [isContinuous, setIsContinuous] = useState(false);
    const videoElementRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const cameras = devices.filter((device) => device.kind === "videoinput");
            if(!selectedCameraId)
                setSelectedCameraId(cameras[0].deviceId);
            
            setAvailableCameras(cameras);
        });

        if (selectedCameraId) {
            navigator.mediaDevices
                .getUserMedia({video: {deviceId: selectedCameraId}})
                .then((stream) => {
                    videoElementRef.current.srcObject = stream;
                })
                .catch((error) => {
                    console.error("Error accessing camera:", error);
                });
        }
    }, [selectedCameraId]);

    const takeSnapshot = () => {
        const video = videoElementRef.current;
        if (video) {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (onSnapshot) {
                    const snapshotFile = new File([blob], "snapshot.png", {
                        type: "image/png",
                    });
                    onSnapshot(snapshotFile);
                }
            }, "image/png");
        }
    };

    const handleCameraSelection = (event) => {
        setSelectedCameraId(event.target.value);
    };

    useEffect(() => {
        if (isContinuous) {
            const intervalId = setInterval(takeSnapshot, 500);
            return () => clearInterval(intervalId);
        }
    }, [isContinuous]);

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Camera Container */}
            <div className="relative aspect-video rounded-md overflow-hidden bg-neutral-900">
                <video
                    ref={videoElementRef}
                    autoPlay
                    className="w-full h-full object-cover"
                />
                
                {/* Camera Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-neutral-900/90 to-transparent">
                    <div className="flex items-center justify-between gap-3">
                        {/* Camera Selector */}
                        <select
                            value={selectedCameraId}
                            onChange={handleCameraSelection}
                            className="px-3 py-1.5 text-sm bg-neutral-800/80 text-neutral-200 rounded-md border border-neutral-700 hover:bg-neutral-700/80 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-500"
                        >
                            {availableCameras.map((camera) => (
                                <option key={camera.deviceId} value={camera.deviceId}>
                                    {camera.label || `Camera ${camera.deviceId.slice(0, 5)}...`}
                                </option>
                            ))}
                        </select>

                        {/* Camera Controls */}
                        <div className="flex items-center gap-3">
                            {/* Snapshot Button */}
                            <button
                                onClick={takeSnapshot}
                                className="group relative flex items-center justify-center w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                            >
                                <div className="w-6 h-6 rounded-full bg-neutral-200 border-2 border-neutral-800 group-hover:border-neutral-700 transition-colors"></div>
                            </button>

                            {/* Continuous Mode Button */}
                            <button
                                onClick={() => setIsContinuous((prev) => !prev)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-neutral-500 ${
                                    isContinuous 
                                    ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200' 
                                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                                }`}
                            >
                                {isContinuous ? (
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Stop
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Start
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
