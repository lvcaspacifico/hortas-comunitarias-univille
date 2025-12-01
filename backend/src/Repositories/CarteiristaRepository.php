<?php

namespace App\Repositories;

use App\Models\CarteiristaModel;
use Ramsey\Uuid\Uuid;

class CarteiristaRepository
{
    public function findAll()
    {
        return CarteiristaModel::where('excluido', false)->get();
    }

    public function findByUuid(string $uuid)
    {
        return CarteiristaModel::where('uuid', $uuid)
            ->where('excluido', false)
            ->first();
    }

    public function create(array $data)
    {
        $data['uuid'] = Uuid::uuid4()->toString();
        $data['excluido'] = false;
        
        return CarteiristaModel::create($data);
    }

    public function update(string $uuid, array $data)
    {
        $carteirista = $this->findByUuid($uuid);
        
        if (!$carteirista) {
            return null;
        }

        $carteirista->update($data);
        return $carteirista->fresh();
    }

    public function delete(string $uuid)
    {
        $carteirista = $this->findByUuid($uuid);
        
        if (!$carteirista) {
            return false;
        }

        // Soft delete
        $carteirista->excluido = true;
        $carteirista->save();
        
        return true;
    }
}
