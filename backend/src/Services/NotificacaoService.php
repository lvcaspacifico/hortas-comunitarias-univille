<?php

namespace App\Services;

use App\Repositories\NotificacaoRepository;
use App\Repositories\CarteiristaRepository;
use App\Repositories\HortaRepository;
use InvalidArgumentException;

class NotificacaoService
{
    private NotificacaoRepository $repository;
    private CarteiristaRepository $carteiristaRepository;
    private HortaRepository $hortaRepository;

    public function __construct(
        NotificacaoRepository $repository,
        CarteiristaRepository $carteiristaRepository,
        HortaRepository $hortaRepository
    ) {
        $this->repository = $repository;
        $this->carteiristaRepository = $carteiristaRepository;
        $this->hortaRepository = $hortaRepository;
    }

    public function findAll()
    {
        return $this->repository->findAll();
    }

    public function findAtivas()
    {
        return $this->repository->findAtivas();
    }

    public function findByUuid(string $uuid)
    {
        $notificacao = $this->repository->findByUuid($uuid);
        if (!$notificacao) {
            throw new InvalidArgumentException('Notificação não encontrada');
        }
        return $notificacao;
    }

    public function create(array $data)
    {
        // Validações
        if (empty($data['tipo'])) {
            throw new InvalidArgumentException('Tipo é obrigatório');
        }

        if (!in_array($data['tipo'], ['aviso_geral', 'aviso_canteirista', 'evento_horta'])) {
            throw new InvalidArgumentException('Tipo inválido');
        }

        if (empty($data['titulo'])) {
            throw new InvalidArgumentException('Título é obrigatório');
        }

        if (empty($data['mensagem'])) {
            throw new InvalidArgumentException('Mensagem é obrigatória');
        }

        // Validações específicas por tipo
        if ($data['tipo'] === 'aviso_canteirista') {
            if (empty($data['carteirista_uuid'])) {
                throw new InvalidArgumentException('Carteirista é obrigatório para aviso específico');
            }
            
            $carteirista = $this->carteiristaRepository->findByUuid($data['carteirista_uuid']);
            if (!$carteirista) {
                throw new InvalidArgumentException('Carteirista não encontrado');
            }
        }

        if ($data['tipo'] === 'evento_horta') {
            if (empty($data['horta_uuid'])) {
                throw new InvalidArgumentException('Horta é obrigatória para evento');
            }

            $horta = $this->hortaRepository->findByUuid($data['horta_uuid']);
            if (!$horta) {
                throw new InvalidArgumentException('Horta não encontrada');
            }
        }

        // Define data_inicio como agora se não informada
        if (empty($data['data_inicio'])) {
            $data['data_inicio'] = date('Y-m-d H:i:s');
        }

        // Define prioridade como média se não informada
        if (empty($data['prioridade'])) {
            $data['prioridade'] = 'media';
        }

        // Define ativa como true se não informada
        if (!isset($data['ativa'])) {
            $data['ativa'] = 1;
        }

        return $this->repository->create($data);
    }

    public function update(string $uuid, array $data)
    {
        // Validações específicas se tipo for alterado
        if (isset($data['tipo'])) {
            if (!in_array($data['tipo'], ['aviso_geral', 'aviso_canteirista', 'evento_horta'])) {
                throw new InvalidArgumentException('Tipo inválido');
            }
        }

        if (isset($data['carteirista_uuid']) && !empty($data['carteirista_uuid'])) {
            $carteirista = $this->carteiristaRepository->findByUuid($data['carteirista_uuid']);
            if (!$carteirista) {
                throw new InvalidArgumentException('Carteirista não encontrado');
            }
        }

        if (isset($data['horta_uuid']) && !empty($data['horta_uuid'])) {
            $horta = $this->hortaRepository->findByUuid($data['horta_uuid']);
            if (!$horta) {
                throw new InvalidArgumentException('Horta não encontrada');
            }
        }

        $notificacao = $this->repository->update($uuid, $data);
        if (!$notificacao) {
            throw new InvalidArgumentException('Notificação não encontrada');
        }

        return $notificacao;
    }

    public function delete(string $uuid)
    {
        $deleted = $this->repository->delete($uuid);
        if (!$deleted) {
            throw new InvalidArgumentException('Notificação não encontrada');
        }
        return true;
    }
}
