import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorite({ auth }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(route('favorite.index'));
            setFavorites(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load favorites\n' + err);
            setLoading(false);
        }
    };

    const deleteFavorite = async (id) => {
        try {
            await axios.delete(route('favorite.destroy', id));
            fetchFavorites(); // Refresh the list
        } catch (err) {
            setError('Failed to delete favorite item');
        }
    };

    const openSpotifyPlaylist = (url) => {
        window.open(url, '_blank');
    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-primary leading-tight">Your Favorite Albums</h2>}
        >
            <Head title="Favorites" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-center">
                            {error}
                        </div>
                    ) : favorites.length === 0 ? (
                        <div className="bg-dark-lighter rounded-lg p-8 text-center">
                            <div className="text-gray-400 text-lg mb-2">No playlists saved yet</div>
                            <p className="text-gray-500">Your saved playlists will appear here</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                            {favorites.map((favorite) => (
                                <div
                                    key={favorite.id}
                                    className="bg-dark-lighter rounded-lg overflow-hidden shadow-lg border border-dark-darker hover:border-primary/50 transition-colors flex flex-col lg:block"
                                >
                                    <div className="flex gap-4 lg:block">
                                        <div className="w-24 h-24 lg:w-full lg:h-48 shrink-0">
                                            <img
                                                src={`${favorite.cover_url}`}
                                                alt={favorite.playlist_name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 p-4 lg:p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-1">
                                                        {favorite.playlist_name}
                                                    </h3>
                                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                        {favorite.mood}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openSpotifyPlaylist(favorite.playlist_url)}
                                                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                                        title="Open in Spotify"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteFavorite(favorite.id)}
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Saved {new Date(favorite.created_at).toLocaleDateString()} at {new Date(favorite.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
