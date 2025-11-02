<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DependenteModel extends Model
{
    protected $table = 'dependentes';
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    const CREATED_AT = 'data_de_criacao';
    const UPDATED_AT = 'data_de_ultima_alteracao';

    protected $fillable = [
        'uuid',
        'nome',
        'cpf',
        'idade',
        'ativo',
        'carteirista_uuid',
        'excluido',
        'usuario_criador_uuid',
        'usuario_alterador_uuid',
    ];

    protected $casts = [
        'ativo' => 'boolean',
        'excluido' => 'boolean',
        'idade' => 'integer',
    ];

    // Relacionamentos
    public function carteirista()
    {
        return $this->belongsTo(CarteiristaModel::class, 'carteirista_uuid', 'uuid');
    }

    public function usuarioCriador()
    {
        return $this->belongsTo(UsuarioModel::class, 'usuario_criador_uuid', 'uuid');
    }

    public function usuarioAlterador()
    {
        return $this->belongsTo(UsuarioModel::class, 'usuario_alterador_uuid', 'uuid');
    }
}
