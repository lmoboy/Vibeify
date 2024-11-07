import { useState, useEffect } from "react";

export default function SuggestedPlaylist({ emotion = [], accessKey = "" }) {
    const [playlist, setPlaylist] = useState(null);



    function onRequest() {
        const data = new FormData();
        const query = emotion.join("&genre:");
        data.append("access_key", accessKey);
        fetch(
            `https://api.spotify.com/v1/search?genre:${query}&type=playlist&limit=3`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + accessKey,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => setPlaylist(res.playlists.items));
    }

    return (
        <div>
            {playlist ? (
                <>
                    <p className="text-2xl font-bold">Suggested Playlist</p>
                    <div className="grid grid-cols-3 gap-2">
                        {playlist.map((item) => (
                            <a
                                href={item.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={item.images[0].url}
                                    alt={item.name}
                                    className="w-full"
                                />
                            </a>
                        ))}
                    </div>
                </>
            ) : (
                <button onClick={onRequest}> Request </button>
            )}
        </div>
    );
}
