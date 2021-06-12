<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    // untuk memberitahu bahwa tabel yang tidak boleh di isi adalah id, karena id itu incerment
    protected $guarded = ['id', 'created_at', 'updated_at']; 
}