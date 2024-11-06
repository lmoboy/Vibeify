import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CameraDisplay from "@/Components/CameraDisplay";

import { Head } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {
    const [emotion, setEmotion] = useState("undefined");
    const [accessToken, setAccessToken] = useState("");
    const emotionGenre = {
        happy: ["pop", "rock", "funk"],
        sad: ["ballad", "blues", "jazz"],
        angry: ["metal", "punk", "grunge"],
        calm: ["classical", "ambient", "lo-fi"],
        excited: ["electronic", "dance", "hip-hop"],
    };

    // useEffect(() => {
    //     fetch(route("spotify.access"))
    //         .then((res) => res.json())
    //         .then((res) => setAccessToken(res.access_token));
    // },[])
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-auto w-fit bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 flex flex-col justify-center items-center text-gray-900 dark:text-gray-100">
                            <CameraDisplay></CameraDisplay>
                        </div>
                        {accessToken}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
