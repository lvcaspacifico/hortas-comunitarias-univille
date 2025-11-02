<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificacaoModel extends Model
{
    protected $table = 'notificacoes';
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';

    const CREATED_AT = 'data_de_criacao';
    const UPDATED_AT = 'data_de_ultima_alteracao';

    protected $fillable = [
        'uuid',
        'tipo',
        'titulo',
        'mensagem',
        'carteirista_uuid',
        'horta_uuid',
        'data_evento',
        'data_inicio',
        'data_fim',
        'ativa',
        'prioridade',
        'excluido',
        'usuario_criador_uuid',
        'usuario_alterador_uuid',
    ];

    protected $casts = [
        'data_evento' => 'datetime',
        'data_inicio' => 'datetime',
        'data_fim' => 'datetime',
        'ativa' => 'boolean',
        'excluido' => 'boolean',
        'data_de_criacao' => 'datetime',
        'data_de_ultima_alteracao' => 'datetime',
    ];

    public function carteirista()
    {
        return $this->belongsTo(CarteiristaModel::class, 'carteirista_uuid', 'uuid');
    }

    public function horta()
    {
        return $this->belongsTo(HortaModel::class, 'horta_uuid', 'uuid');
    }
}
