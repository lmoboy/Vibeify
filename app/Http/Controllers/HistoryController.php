<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class HistoryController extends Controller
{
    /**
     * Store a new history record.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'playlist_id' => 'required|string',
            'playlist_name' => 'required|string',
            'playlist_url' => 'required|string',
            'cover_url' => 'required|string',
            'mood' => 'required|string',
        ]);

        $history = History::create([
            'user_id' => Auth::id(),
            'playlist_id' => $validated['playlist_id'],
            'playlist_name' => $validated['playlist_name'],
            'playlist_url' => $validated['playlist_url'],
            'cover_url' => $validated['cover_url'],
            'mood' => $validated['mood'],
        ]);

        return response()->json([
            'message' => 'History saved successfully',
            'history' => $history
        ], 201);
    }

    /**
     * Get user's playlist history.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $histories = History::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($histories);
    }

    /**
     * Get user's playlist history filtered by mood.
     *
     * @param Request $request
     * @param string $mood
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByMood(Request $request, string $mood)
    {
        $histories = History::where('user_id', Auth::id())
            ->where('mood', $mood)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($histories);
    }

    /**
     * Delete a history record.
     *
     * @param History $history
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(History $history)
    {
        if ($history->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $history->delete();

        return response()->json(['message' => 'History deleted successfully']);
    }
}
