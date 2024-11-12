import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CameraDisplay from "@/Components/CameraDisplay";

import {Head} from "@inertiajs/react";
import {useEffect, useRef, useState} from "react";
import SuggestedPlaylist from "@/Components/SuggestedPlaylist";


/**
 * The main dashboard page.
 *
 * This page contains a camera display and a form to detect the emotion in the image.
 * When the form is submitted, it sends a POST request to the server with the image data.
 * The server then calls the model to detect the emotion and returns the result.
 * The result is then displayed on the page.
 *
 * The page also displays a list of suggested playlists based on the detected emotion.
 *
 * @return {JSX.Element}
 */
export default function Dashboard() {
    const [detectedEmotion, setDetectedEmotion] = useState();
    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);

    const fileInputElement = useRef(null);

    const emotionToGenresMap = {
        surprise: ["electronic", "dance", "hip-hop"],
        sad: ["ballad", "blues", "jazz"],
        fear: [
            "black-metal",
            "death-metal",
            "grindcore",
            "hardcore",
            "heavy-metal",
            "industrial",
            "metal",
            "metal-misc",
            "metalcore",
            "power-metal",
        ],
        happy: ["pop", "rock", "funk"],
        neutral: ["classical", "ambient", "lo-fi"],
        angry: ["metal", "punk", "grunge"],
    };

    const handleImageSnapshot = (imageBlob) => {
        const formData = new FormData();
        formData.append("file", imageBlob);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setDetectedEmotion(data.result));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", uploadedFile);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setDetectedEmotion(data.result));
    };

    useEffect(() => {
        fetch(route("spotify.access"))
            .then((response) => response.json())
            .then((data) => setSpotifyAccessToken(data.access_token));
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-auto w-fit bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                            <CameraDisplay onSnapshot={handleImageSnapshot}/>

                            {/*<form onSubmit={handleFormSubmit}>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        ref={fileInputElement}*/}
                            {/*        onChange={(event) => setUploadedFile(event.target.files[0])}*/}
                            {/*        accept=".jpg, .jpeg, .png"*/}
                            {/*    />*/}
                            {/*    <button type="submit" className="mt-4">*/}
                            {/*        Detect Emotion*/}
                            {/*    </button>*/}
                            {/*</form>*/}
                            <h2 className="mt-4">{detectedEmotion}</h2>
                            <p>You might enjoy these genres:</p>
                            <code>
                                {emotionToGenresMap[detectedEmotion]
                                    ? emotionToGenresMap[detectedEmotion].join(", ")
                                    : ""}
                            </code>
                        </div>
                        {detectedEmotion && spotifyAccessToken ? (
                            <SuggestedPlaylist
                                emotion={emotionToGenresMap[detectedEmotion]}
                                accessKey={spotifyAccessToken}
                            />
                        ) : (
                            <h2>Take a picture and we'll do the rest</h2>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
