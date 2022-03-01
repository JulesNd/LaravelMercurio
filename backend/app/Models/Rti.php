<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rti extends Model
{
    use HasFactory;


    public $timestamps = false;

    //Pour utiliser par defaut rti_id au lieu de id car laravel prend par defaut ID //
      protected $primaryKey = 'rti_id';
      public $incrementing = false;
  //----------------------------------------------------------------------------------- //

    protected $fillable = ['rti_id','nom', 'description', 'lien','metadata', 'owner_id','date','public'];
}
