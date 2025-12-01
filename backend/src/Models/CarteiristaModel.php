<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarteiristaModel extends Model
{
    protected $table = 'carteiristas';
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    const CREATED_AT = 'data_de_criacao';
    const UPDATED_AT = 'data_de_ultima_alteracao';

    protected $fillable = [
        'uuid',
        'nome',
        'telefone',
        'excluido',
        'usuario_criador_uuid',
        'usuario_alterador_uuid',
    ];

    protected $casts = [
        'excluido' => 'boolean',
    ];

    // Relacionamentos
    public function usuarioCriador()
    {
        return $this->belongsTo(UsuarioModel::class, 'usuario_criador_uuid', 'uuid');
    }

    public function usuarioAlterador()
    {
        return $this->belongsTo(UsuarioModel::class, 'usuario_alterador_uuid', 'uuid');
    }
}
