import { useState } from "react";

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
    const [offset, setOffset] = useState(Math.floor(Math.random() * 50));
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const requestPlaylists = () => {
        setIsLoading(true);
        const query = emotion.join("&genre:");
        fetch(
            `https://api.spotify.com/v1/search?q=genre:${query}&type=playlist&limit=50&offset=${offset}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessKey}`,
                },
            }   
        )
            .then((res) => res.json())
            .then((res) => {
                setItems(
                    res.playlists.items.sort(() => 0.5 - Math.random()).slice(0, 3)
                );
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
        setOffset(Math.floor(Math.random() * 50));
    };

    const handleSave = async (playlist) => {
        setIsSaving(true);
        setSaveError(null);
        
        try {
            await axios.post(route('favorite.store'), {
                playlist_id: playlist.id,
                playlist_name: playlist.name,
                playlist_url: playlist.external_urls.spotify,
                cover_url: playlist.images[0]?.url || null,
                mood: emotion[0]
            });
            setIsSaving(false);
        } catch (err) {
            setSaveError('Failed to save playlist');
            console.error(err);
            setIsSaving(false);
        }
    };

    const handleVisited = async (playlist) => {
        setIsSaving(true);
        setSaveError(null);
        
        try {
            await axios.post(route('history.store'), {
                playlist_id: playlist.id,
                playlist_name: playlist.name,
                playlist_url: playlist.external_urls.spotify,
                cover_url: playlist.images[0]?.url || null,
                mood: emotion[0]
            });
            setIsSaving(false);
        } catch (err) {
            setSaveError('Failed to save playlist');
            setIsSaving(false);
        }
        window.open(playlist.external_urls.spotify, '_blank');
        
    };

    return (
        <div className="space-y-6">
            {items ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-300">Based on your mood</p>
                        <button
                            onClick={requestPlaylists}
                            disabled={isLoading}
                            className="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-dark disabled:opacity-50"
                        >
                            {isLoading ? "Loading..." : "Refresh"}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col overflow-hidden rounded-lg bg-dark"
                            >
                                <img
                                    src={item.images[0].url}
                                    alt={item.name}
                                    className="aspect-square w-full object-cover"
                                />
                                <div className="flex flex-1 flex-col justify-between p-4">
                                    <div className="flex-1">
                                        <p className="text-lg font-medium text-gray-300">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {item.tracks.total} tracks
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleVisited(item)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-dark hover:bg-primary/90"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleSave(item)}
                                            disabled={isSaving}
                                            className="flex-1 rounded-lg border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-dark disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                    {saveError && (
                                        <p className="mt-2 text-sm text-red-500">{saveError}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <button
                    onClick={requestPlaylists}
                    disabled={isLoading}
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-dark hover:bg-primary/90 disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : "Get Suggestions"}
                </button>
            )}
        </div>
    );
}
