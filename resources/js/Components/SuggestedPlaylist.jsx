import {useState} from "react";

/**
 * A component that fetches a list of Spotify playlists based on the provided emotion, and displays them.
 *
 * @param {{emotion: string[], accessKey: string}} props
 * @param {string[]} props.emotion - A list of emotions to search for.
 * @param {string} props.accessKey - The user's Spotify access key.
 * @returns {JSX.Element}
 */
export default function SuggestedPlaylist({ emotion = [], accessKey = "" }) {
    const [items, setItems] = useState(null);

    const requestPlaylists = () => {
        const query = emotion.join("&genre:");
        fetch(
            `https://api.spotify.com/v1/search?q=genre:${query}&type=playlist&limit=6`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessKey}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => setItems(res.playlists.items));
    };

    return (
        <div className="space-y-4">
            {items ? (
                <>
                    <button onClick={requestPlaylists}>Re-request</button>
                    <p className="text-2xl font-bold">Suggested Playlist</p>
                    <div className="grid grid-cols-3 gap-2">
                        {items.map((item) => (
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
                <button onClick={requestPlaylists}>Request</button>
            )}
        </div>
    );
}
