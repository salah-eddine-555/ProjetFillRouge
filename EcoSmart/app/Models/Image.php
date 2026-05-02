<?php

namespace App\Models;
use App\Models\Document;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['path', 'document_id'];

    public function document(){
        return $this->belongsTo(Document::class);
    }
}
