<?php
namespace App\Services;

use App\Models\MensalidadeDaPlataformaModel;
use App\Repositories\MensalidadeDaPlataformaRepository;
use Respect\Validation\Validator as v;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Ramsey\Uuid\Uuid;

class MensalidadeDaPlataformaService
{
    protected MensalidadeDaPlataformaRepository $mensalidadeDaPlataformaRepository;
    protected PlanoService $planoService;
    protected UsuarioService $usuarioService;

    public function __construct(
        MensalidadeDaPlataformaRepository $mensalidadeDaPlataformaRepository,
        PlanoService $planoService,
        UsuarioService $usuarioService
        
    ){
        $this->mensalidadeDaPlataformaRepository = $mensalidadeDaPlataformaRepository;
        $this->planoService = $planoService;
        $this->usuarioService = $usuarioService;
    }

    public function findAllWhere(): Collection {
        return $this->mensalidadeDaPlataformaRepository->findAllWhere(['excluido' => 0]);
    }

    public function findByUuid(string $uuid): ?MensalidadeDaPlataformaModel {
        $mensalidadeDaPlataforma = $this->mensalidadeDaPlataformaRepository->findByUuid($uuid);
        if(!$mensalidadeDaPlataforma || $mensalidadeDaPlataforma->excluido){
            throw new Exception('Mensalidade da Plataforma não encontrado');
        }
        return $mensalidadeDaPlataforma;
    }

    public function findByUsuarioUuid(string $usuarioUuid): Collection
    {
        $usuario = $this->usuarioService->findByUuid($usuarioUuid);
        if (!$usuario || $usuario->excluido) {
            throw new Exception('Usuário não encontrado');
        }

        $mensalidades = $this->mensalidadeDaPlataformaRepository->findByUsuarioUuid($usuarioUuid);
        if ($mensalidades->isEmpty()) {
            throw new Exception('Mensalidades de plataforma do usuário não encontradas');
        }
        return $mensalidades;
    }

    public function create(array $data, string $uuidUsuarioLogado): MensalidadeDaPlataformaModel {
        if($uuidUsuarioLogado == "NEW_ACCOUNT"){
        v::key('valor_em_centavos', v::intType()->positive())
        ->key('usuario_uuid', v::uuid())
        ->key('plano_uuid', v::uuid()) 
          ->check($data);

        $data['url_anexo'] = null;
        $data['url_recibo'] = null; 

        if (!empty($data['plano_uuid'])){
            $this->planoService->findByUuid($data['plano_uuid']);
        }

        if (!empty($data['usuario_uuid'])){
            $this->usuarioService->findByUuid($data['usuario_uuid']);
        }


        $guarded = ['uuid', 'data_de_criacao', 'data_de_ultima_alteracao'];
        foreach ($guarded as $g) unset($data[$g]);

        $data['uuid'] = Uuid::uuid1()->toString(); 

        return $this->mensalidadeDaPlataformaRepository->create($data);
        } else {
            v::key('valor_em_centavos', v::intType()->positive())
            ->key('usuario_uuid', v::uuid())
            ->key('plano_uuid', v::uuid(), false)
            ->key('data_vencimento',  v::date('Y-m-d'))
            ->key('data_pagamento', v::date('Y-m-d'))
            ->key('status', v::intType()->positive())
            ->key('dias_atraso', v::intType()->positive())
            ->key('url_recibo', v::optional(v::url()), false)
            ->key('url_anexo', v::optional(v::url()))
            ->check($data);

            if (!empty($data['plano_uuid'])){
                $this->planoService->findByUuid($data['plano_uuid']);
            }

            if (!empty($data['usuario_uuid'])){
                $this->usuarioService->findByUuid($data['usuario_uuid']);
            }


            $guarded = ['uuid', 'usuario_criador_uuid', 'data_de_criacao', 'data_de_ultima_alteracao'];
            foreach ($guarded as $g) unset($data[$g]);

            $data['uuid'] = Uuid::uuid1()->toString();
            $data['usuario_criador_uuid'] = $uuidUsuarioLogado;
            $data['usuario_alterador_uuid'] = $uuidUsuarioLogado;

            return $this->mensalidadeDaPlataformaRepository->create($data);
        }
    }

    public function update(string $uuid, array $data, string $uuidUsuarioLogado): MensalidadeDaPlataformaModel {
        $mensalidadeDaPlataforma = $this->mensalidadeDaPlataformaRepository->findByUuid($uuid);
        if(!$mensalidadeDaPlataforma || $mensalidadeDaPlataforma->excluido){
            throw new Exception('Mensalidade da Plataforma não encontrado');
        }

        v::key('valor_em_centavos', v::intType()->positive(), false)
        ->key('usuario_uuid', v::uuid(), false)
        ->key('plano_uuid', v::uuid(), false)
        ->key('data_vencimento',  v::date('Y-m-d'), false)
        ->key('data_pagamento', v::date('Y-m-d'), false)
        ->key('status', v::intType()->positive(), false)
        ->key('dias_atraso', v::intType()->positive(), false)
        ->key('url_anexo', v::optional(v::url()), false)
        ->key('url_recibo', v::optional(v::url()), false)
          ->check($data);

        if (!empty($data['plano_uuid'])){
            $this->planoService->findByUuid($data['plano_uuid']);
        }

        if (!empty($data['usuario_uuid'])){
            $this->usuarioService->findByUuid($data['usuario_uuid']);
        }
        $guarded = ['uuid', 'usuario_criador_uuid', 'data_de_criacao', 'data_de_ultima_alteracao'];
        foreach ($guarded as $g) unset($data[$g]);

        $data['usuario_alterador_uuid'] = $uuidUsuarioLogado;

        return $this->mensalidadeDaPlataformaRepository->update($mensalidadeDaPlataforma, $data);
    }

    public function delete(string $uuid, string $uuidUsuarioLogado): bool {
        $mensalidadeDaPlataforma = $this->mensalidadeDaPlataformaRepository->findByUuid($uuid);
        if (!$mensalidadeDaPlataforma || $mensalidadeDaPlataforma->excluido) {
            throw new Exception('Mensalidade da Plataforma não encontrado');
        }

        $data = [
            'excluido' => 1,
            'usuario_alterador_uuid' => $uuidUsuarioLogado,
        ];

        return $this->mensalidadeDaPlataformaRepository->delete($mensalidadeDaPlataforma, $data);
    }
}
