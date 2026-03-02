<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'question_id',
        'user_id',
        'is_accepted',
        'votes',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_accepted' => 'boolean',
        'votes' => 'integer',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    // Scopes
    public function scopeAccepted($query)
    {
        return $query->where('is_accepted', true);
    }

    public function scopePopular($query)
    {
        return $query->orderBy('votes', 'desc');
    }
}
