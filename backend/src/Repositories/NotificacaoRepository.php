<?php

namespace App\Repositories;

use App\Models\NotificacaoModel;
use Ramsey\Uuid\Uuid;

class NotificacaoRepository
{
    public function findAll()
    {
        return NotificacaoModel::with(['carteirista', 'horta'])
            ->where('excluido', 0)
            ->orderBy('data_inicio', 'desc')
            ->get();
    }

    public function findByUuid(string $uuid)
    {
        return NotificacaoModel::with(['carteirista', 'horta'])
            ->where('uuid', $uuid)
            ->where('excluido', 0)
            ->first();
    }

    public function findAtivas()
    {
        $now = date('Y-m-d H:i:s');
        
        return NotificacaoModel::with(['carteirista', 'horta'])
            ->where('excluido', 0)
            ->where('ativa', 1)
            ->where('data_inicio', '<=', $now)
            ->where(function($query) use ($now) {
                $query->whereNull('data_fim')
                      ->orWhere('data_fim', '>=', $now);
            })
            ->orderBy('prioridade', 'desc')
            ->orderBy('data_inicio', 'desc')
            ->get();
    }

    public function create(array $data)
    {
        $data['uuid'] = Uuid::uuid4()->toString();
        return NotificacaoModel::create($data);
    }

    public function update(string $uuid, array $data)
    {
        $notificacao = $this->findByUuid($uuid);
        if (!$notificacao) {
            return null;
        }
        $notificacao->update($data);
        return $notificacao;
    }

    public function delete(string $uuid)
    {
        $notificacao = $this->findByUuid($uuid);
        if (!$notificacao) {
            return false;
        }
        $notificacao->excluido = 1;
        $notificacao->save();
        return true;
    }
}
