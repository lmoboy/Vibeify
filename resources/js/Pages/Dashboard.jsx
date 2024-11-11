import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CameraDisplay from "@/Components/CameraDisplay";

import {Head} from "@inertiajs/react";
import {useEffect, useRef, useState} from "react";
import SuggestedPlaylist from "@/Components/SuggestedPlaylist";

export default function Dashboard() {
    const [emotion, setEmotion] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);
    const emotionGenre = {
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

    const handleSnapshot = (blob) => {
        const formData = new FormData();
        console.log(blob);
        formData.append("file", blob);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => setEmotion(res.result));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => setEmotion(res.result));
    }

    useEffect(() => {
        fetch(route("spotify.access"))
            .then((res) => res.json())
            .then((res) => setAccessToken(res['access_token']));
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
                <div className=" max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-auto w-fit bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                            <CameraDisplay onSnapshot={handleSnapshot} />

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    ref={fileInputRef}

                                    onChange={(event) => setSelectedFile(event.target.files[0])}
                                    accept=".jpg, .jpeg, .png"
                                />
                                <button type="submit" className="mt-4">
                                    Detect Emotion
                                </button>
                            </form>
                            <h2 className="mt-4">{emotion}</h2>
                            <p>you might enjoy these genres</p>
                            <code>
                                {emotionGenre[emotion]
                                    ? emotionGenre[emotion].join(", ")
                                    : ""}
                            </code>
                        </div>
                        {emotion && accessToken ? (
                            <SuggestedPlaylist
                                emotion={emotionGenre[emotion]}
                                accessKey={accessToken}
                            />
                        ) : (
                            <h2>take a pic and we'll do the rest</h2>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
