<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'user_id',
        'views',
        'votes',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'views' => 'integer',
        'votes' => 'integer',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'question_tags');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    // Scopes
    public function scopeWithRelations($query)
    {
        return $query->with(['user', 'answers', 'tags', 'comments']);
    }

    public function scopePopular($query)
    {
        return $query->orderBy('votes', 'desc');
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
