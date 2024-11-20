<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        
        foreach ($users as $user) {
            \App\Models\History::create([
                'user_id' => $user->id,
                'playlist_id' => '37i9dQZF1DX76t638V6CA8',
                'playlist_name' => 'Example Playlist',
                'mood' => 'happy',
                'playlist_url' => 'https://open.spotify.com/playlist/37i9dQZF1DX76t638V6CA8'
            ]);
        }
    }
}
