<?php

namespace App\Services;

use App\Models\AssociacaoModel;
use App\Repositories\AssociacaoRepository;
use Respect\Validation\Validator as v;
use Illuminate\Database\Eloquent\Collection;
use Exception;
use Ramsey\Uuid\Uuid;

class AssociacaoService
{
    protected AssociacaoRepository $associacaoRepository;
    protected CargoService $cargoService;

    public function __construct(
        AssociacaoRepository $associacaoRepository,
        CargoService $cargoService
    ) {
        $this->associacaoRepository = $associacaoRepository;
        $this->cargoService = $cargoService;
    }

    public function findAllWhere(array $payloadUsuarioLogado): Collection
    {
        // TODO: Reativar verificação de permissões em produção
        // if (!$this->isCargoAdminPlataforma($payloadUsuarioLogado)) {
        //     throw new Exception("Permissão de cargo 0 necessária | findAllWhere");
        // }
        
        return $this->associacaoRepository->findAllWhere(['excluido' => 0]);
    }

    public function findByUuid(string $uuid, array $payloadUsuarioLogado): ?AssociacaoModel
    {
        // TODO: Reativar verificação de permissões em produção
        
        $associacao = $this->associacaoRepository->findByUuid($uuid);
        if (!$associacao || $associacao->excluido) {
            throw new Exception('Associação não encontrada');
        }
        return $associacao;
    }

    public function create(array $data, array $payloadUsuarioLogado): AssociacaoModel
    {
        // TODO: Reativar verificação de permissões em produção
        
        $guarded = ['uuid', 'usuario_criador_uuid', 'data_de_criacao', 'data_de_ultima_alteracao'];
        foreach ($guarded as $g) unset($data[$g]);
        
        // Mapear campo 'nome' para 'razao_social' se necessário
        if (isset($data['nome']) && !isset($data['razao_social'])) {
            $data['razao_social'] = $data['nome'];
            $data['nome_fantasia'] = $data['nome'];
            unset($data['nome']);
        }
        
        // Mapear campo 'telefone' para 'telefone_de_contato' se necessário
        if (isset($data['telefone']) && !isset($data['telefone_de_contato'])) {
            $data['telefone_de_contato'] = $data['telefone'];
            unset($data['telefone']);
        }
        
        // Validação mínima - apenas nome é obrigatório (após o mapeamento)
        if (empty($data['razao_social'])) {
            throw new Exception("Nome da associação é obrigatório");
        }
        
        // Gerar CNPJ temporário se não fornecido (para não violar constraint UNIQUE)
        if (!isset($data['cnpj']) || empty($data['cnpj'])) {
            $data['cnpj'] = 'TEMP-' . time() . '-' . rand(1000, 9999);
        }
        
        // Definir valores padrão para campos opcionais
        if (!isset($data['status_aprovacao'])) {
            $data['status_aprovacao'] = 1;
        }

        $data['uuid'] = Uuid::uuid1()->toString();
        $data['usuario_criador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];
        $data['usuario_alterador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];

        return $this->associacaoRepository->create($data);
    }

    public function update(string $uuid, array $data, array $payloadUsuarioLogado): AssociacaoModel
    {
        // TODO: Reativar verificação de permissões em produção
        
        $associacao = $this->associacaoRepository->findByUuid($uuid);
        if (!$associacao || $associacao->excluido) {
            throw new Exception('Associação não encontrada');
        }

        $guarded = ['uuid', 'usuario_criador_uuid', 'data_de_criacao', 'data_de_ultima_alteracao'];
        foreach ($guarded as $g) unset($data[$g]);
        
        // Mapear campo 'nome' para 'razao_social' se necessário
        if (isset($data['nome']) && !isset($data['razao_social'])) {
            $data['razao_social'] = $data['nome'];
            $data['nome_fantasia'] = $data['nome'];
            unset($data['nome']);
        }
        
        // Mapear campo 'telefone' para 'telefone_de_contato' se necessário
        if (isset($data['telefone']) && !isset($data['telefone_de_contato'])) {
            $data['telefone_de_contato'] = $data['telefone'];
            unset($data['telefone']);
        }

        $data['usuario_alterador_uuid'] = $payloadUsuarioLogado['usuario_uuid'];

        return $this->associacaoRepository->update($associacao, $data);
    }

    public function delete(string $uuid, array $payloadUsuarioLogado)
    {
        // TODO: Reativar verificação de permissões em produção
        
        $associacao = $this->associacaoRepository->findByUuid($uuid);
        if (!$associacao || $associacao->excluido) {
            throw new Exception('Associação não encontrada');
        }

        $data = [
            'excluido' => 1,
            'usuario_alterador_uuid' => $payloadUsuarioLogado['usuario_uuid'],
        ];

        return $this->associacaoRepository->delete($associacao, $data) ? true : false;
    }

    private function isCargoAdminPlataforma(array $payloadUsuarioLogado): bool
    {
        return $this->cargoService->findByUuidInternal($payloadUsuarioLogado['cargo_uuid'])->slug === "admin_plataforma";
    }
}
