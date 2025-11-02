<?php

namespace App\Services;

use App\Models\CanteiroModel;
use App\Repositories\CanteiroRepository;
use Respect\Validation\Validator as v;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Ramsey\Uuid\Uuid;

class CanteiroService
{
    protected CanteiroRepository $canteiroRepository;
    protected HortaService $hortaService; 
    protected UsuarioService $usuarioService; 
    protected CargoService $cargoService;

    public function __construct(
        CanteiroRepository $canteiroRepository, 
        HortaService $hortaService, 
        UsuarioService $usuarioService,
        CargoService $cargoService
    ) {
        $this->canteiroRepository = $canteiroRepository; 
        $this->hortaService = $hortaService;
        $this->usuarioService = $usuarioService;
        $this->cargoService = $cargoService;
    }

    public function findAllWhere(array $payloadUsuarioLogado): Collection
    {
        // TODO: Reativar verificação de permissões em produção
        return $this->canteiroRepository->findAllWhere(['excluido' => 0]);

        /*
        $cargo = $this->getCargoSlug($payloadUsuarioLogado);
        echo "CARGO ===========> " . $cargo;
        switch ($cargo) {
            case 'admin_plataforma':
                return $this->canteiroRepository->findAllWhere(['excluido' => 0]);

            case 'admin_associacao_geral':
                // hortas da associação do usuário
                $hortas = $this->hortaService->findAllWhere([], $payloadUsuarioLogado);
                $hortasUuids = $hortas->pluck('uuid')->toArray();

                return $this->canteiroRepository->findAllWhere(['excluido' => 0])
                    ->filter(fn($canteiro) => in_array($canteiro->horta_uuid, $hortasUuids));

            case 'admin_horta_geral':
                return $this->canteiroRepository->findAllWhere([
                    'excluido' => 0,
                    'horta_uuid' => $payloadUsuarioLogado['horta_uuid']
                ]);

            default:
                // demais cargos só leitura, mas filtrando pela associação/horta
                return $this->canteiroRepository->findAllWhere(['excluido' => 0])
                    ->filter(function($canteiro) use ($payloadUsuarioLogado) {
                        $horta = $this->hortaService->findByUuid($canteiro->horta_uuid, $payloadUsuarioLogado);
                        return $horta->associacao_vinculada_uuid === $payloadUsuarioLogado['associacao_uuid'];
                    });
        }
        */
    }
    
    public function findByUuid(string $uuid, array $payloadUsuarioLogado): ?CanteiroModel
    {
        // TODO: Reativar verificações de permissão em produção
        
        $canteiro = $this->canteiroRepository->findByUuid($uuid);
        if (!$canteiro || $canteiro->excluido) {
            throw new Exception('Canteiro não encontrado');
        }
        
        return $canteiro;
    }

    public function create(array $data, array $payloadUsuarioLogado): CanteiroModel
    {
        // TODO: Reativar verificações de permissão em produção
        
        $guarded = ['uuid','usuario_criador_uuid','data_de_criacao','data_de_ultima_alteracao'];
        foreach ($guarded as $g) unset($data[$g]);
        
        // Mapear campo 'nome' para 'numero_identificador' se necessário
        if (isset($data['nome']) && !isset($data['numero_identificador'])) {
            $data['numero_identificador'] = $data['nome'];
            unset($data['nome']);
        }
        
        // Mapear campo 'area' para 'tamanho_m2' se necessário
        if (isset($data['area']) && !isset($data['tamanho_m2'])) {
            $data['tamanho_m2'] = $data['area'];
            unset($data['area']);
        }
        
        // Validação mínima
        if (empty($data['numero_identificador'])) {
            throw new Exception("Número identificador é obrigatório");
        }
        if (empty($data['tamanho_m2']) || $data['tamanho_m2'] <= 0) {
            throw new Exception("Tamanho deve ser maior que zero");
        }
        if (empty($data['horta_uuid'])) {
            throw new Exception("Horta é obrigatória");
        }

        $data['uuid'] = Uuid::uuid1()->toString();
        $data['usuario_criador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        $data['usuario_alterador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];

        return $this->canteiroRepository->create($data);
    }

    public function update(string $uuid, array $data, array $payloadUsuarioLogado): CanteiroModel
    {
        // TODO: Reativar verificações de permissão em produção
        
        $canteiro = $this->canteiroRepository->findByUuid($uuid);
        if (!$canteiro || $canteiro->excluido) {
            throw new Exception('Canteiro não encontrado');
        }
        
        // Mapear campo 'nome' para 'numero_identificador' se necessário
        if (isset($data['nome']) && !isset($data['numero_identificador'])) {
            $data['numero_identificador'] = $data['nome'];
            unset($data['nome']);
        }
        
        // Mapear campo 'area' para 'tamanho_m2' se necessário
        if (isset($data['area']) && !isset($data['tamanho_m2'])) {
            $data['tamanho_m2'] = $data['area'];
            unset($data['area']);
        }

        $data['usuario_alterador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        return $this->canteiroRepository->update($canteiro, $data);
    }
    
    public function delete(string $uuid, array $payloadUsuarioLogado): bool
    {
        // TODO: Reativar verificações de permissão em produção
        
        $canteiro = $this->canteiroRepository->findByUuid($uuid);
        if (!$canteiro || $canteiro->excluido) {
            throw new Exception('Canteiro não encontrado');
        }

        $data = [
            'excluido' => 1,
            'usuario_alterador_uuid' => $payloadUsuarioLogado['usuario_uuid'],
        ];

        return $this->canteiroRepository->delete($canteiro, $data);
    }

    /** Helpers **/
    private function getCargoSlug(array $payloadUsuarioLogado): string
    {
        return $this->cargoService->findByUuidInternal($payloadUsuarioLogado['cargo_uuid'])->slug;
    }

    private function assertCargoPodeAlterar(string $cargo): void
    {
        if (!in_array($cargo, ['admin_plataforma','admin_associacao_geral','admin_horta_geral'])) {
            throw new Exception("Você não tem permissão para criar/alterar/deletar canteiros");
        }
    }

    private function assertPertencimento(string $cargo, $horta, array $payloadUsuarioLogado): void
    {
        switch ($cargo) {
            case 'admin_associacao_geral':
                if ($horta->associacao_vinculada_uuid !== $payloadUsuarioLogado['associacao_uuid']) {
                    throw new Exception("Horta não pertence à sua associação");
                }
                break;

            case 'admin_horta_geral':
                if ($horta->uuid !== $payloadUsuarioLogado['horta_uuid']) {
                    throw new Exception("Horta não pertence a você");
                }
                break;
        }
    }
}
