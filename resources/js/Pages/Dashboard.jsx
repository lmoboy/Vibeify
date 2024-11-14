import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CameraDisplay from "@/Components/CameraDisplay";
import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
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
    const [detectedEmotion, setDetectedEmotion] = useState({});
    const [exectime, setExectime] = useState(0);
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
            .then((data) => setDetectedEmotion(data));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", uploadedFile);
    };

    useEffect(() => {
        fetch(route("spotify.access"))
            .then((response) => response.json())
            .then((data) => setSpotifyAccessToken(data.access_token));
    }, []);

    return (
        <AuthenticatedLayout
            
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Camera Section */}
                        <div className="overflow-hidden rounded-lg bg-dark-lighter p-6 shadow-lg">
                            <h3 className="mb-4 text-lg font-medium text-primary">
                                Capture Your Mood
                            </h3>
                            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-dark-darker">
                                <CameraDisplay onSnapshot={handleImageSnapshot} />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <button
                                    onClick={() => fileInputElement.current?.click()}
                                    className="rounded-lg border border-primary bg-transparent px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-dark"
                                >
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputElement}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => setUploadedFile(e.target.files[0])}
                                />
                                {exectime > 0 && (
                                    <span className="text-sm text-gray-400">
                                        Processing time: {exectime.toFixed(2)}s
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="overflow-hidden rounded-lg bg-dark-lighter p-6 shadow-lg">
                            <h3 className="mb-4 text-lg font-medium text-primary">
                                Your Mood Results
                            </h3>
                            {detectedEmotion && detectedEmotion.result ? (
                                <div className="space-y-4">
                                    <div className="rounded-lg bg-dark-darker p-4">
                                        <div className="flex items-center justify-center">
                                            <span className="text-2xl font-semibold capitalize text-primary">
                                                {detectedEmotion.result}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-dark-darker p-4">
                                        <h4 className="mb-4 text-gray-300">Suggested Playlists:</h4>
                                        <SuggestedPlaylist
                                            emotion={emotionToGenresMap[detectedEmotion['result']]}
                                            accessKey={spotifyAccessToken}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-[300px] items-center justify-center rounded-lg bg-dark-darker">
                                    <p className="text-gray-400">
                                        Take or upload a photo to see your mood analysis
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
