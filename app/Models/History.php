<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class History extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'playlist_id',
        'playlist_name',
        'mood',
        'playlist_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
