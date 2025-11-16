# 🥑 API REST + Regras de Negócio | Documentação

## 📑 Sumário

- [📗 Introdução](#introducao)
- [⏩ Início Rápido](#inicio-rapido)
- [🔒 Permissões por Cargo](#permissoes)
- [🧑🏻‍🚀 Templates do Postman](#templates-postman)
- [🧭 Rotas](#rotas)

<ul>
  <li>
    <details>
      <summary><a href="#autenticacao">🔐 Autenticação</a></summary>
        <ul>
          <li><a href="#login-post">📗 Login (POST)</a></li>
          <li><a href="#cadastro-post">📗 Cadastro (POST)</a></li>
        </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#associacoes">📘 Associações</a></summary>
      <ul>
        <li><a href="#associacoes-get-list">📗 GET List</a></li>
        <li><a href="#associacoes-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#associacoes-post">📗 POST</a></li>
        <li><a href="#associacoes-put">📗 PUT</a></li>
        <li><a href="#associacoes-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#canteiros-e-usuarios">📘 Canteiros e Usuários (vínculo)</a></summary>
      <ul>
        <li><a href="#canteiros-e-usuarios-get-list">📗 GET List</a></li>
        <li><a href="#canteiros-e-usuarios-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#canteiros-e-usuarios-post">📗 POST</a></li>
        <li><a href="#canteiros-e-usuarios-put">📗 PUT</a></li>
        <li><a href="#canteiros-e-usuarios-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#canteiros">📘 Canteiros</a></summary>
      <ul>
        <li><a href="#canteiros-get-list">📗 GET List</a></li>
        <li><a href="#canteiros-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#canteiros-post">📗 POST</a></li>
        <li><a href="#canteiros-put">📗 PUT</a></li>
        <li><a href="#canteiros-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#cargos">📘 Cargos</a></summary>
      <ul>
        <li><a href="#cargos-get-list">📗 GET List</a></li>
        <li><a href="#cargos-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#cargos-post">📗 POST</a></li>
        <li><a href="#cargos-put">📗 PUT</a></li>
        <li><a href="#cargos-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#categorias-financeiras">📘 Categorias-financeiras</a></summary>
      <ul>
        <li><a href="#categorias-financeiras-get-list">📗 GET List</a></li>
        <li><a href="#categorias-financeiras-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#categorias-financeiras-get-associacao">📗 GET por Associação</a></li>
        <li><a href="#categorias-financeiras-get-horta">📗 GET por Horta</a></li>
        <li><a href="#categorias-financeiras-post">📗 POST</a></li>
        <li><a href="#categorias-financeiras-put">📗 PUT</a></li>
        <li><a href="#categorias-financeiras-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#chaves">📘 Chaves</a></summary>
      <ul>
        <li><a href="#chaves-get-list">📗 GET List</a></li>
        <li><a href="#chaves-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#chaves-post">📗 POST</a></li>
        <li><a href="#chaves-put">📗 PUT</a></li>
        <li><a href="#chaves-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#enderecos">📘 Endereços</a></summary>
      <ul>
        <li><a href="#enderecos-get-list">📗 GET List</a></li>
        <li><a href="#enderecos-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#enderecos-post">📗 POST</a></li>
        <li><a href="#enderecos-put">📗 PUT</a></li>
        <li><a href="#enderecos-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#fila-de-usuarios">📘 Fila-de-usuarios</a></summary>
      <ul>
        <li><a href="#fila-de-usuarios-get-list">📗 GET List</a></li>
        <li><a href="#fila-de-usuarios-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#fila-de-usuarios-get-horta">📗 GET por Horta</a></li>
        <li><a href="#fila-de-usuarios-get-usuario">📗 GET por Usuário</a></li>
        <li><a href="#fila-de-usuarios-post">📗 POST</a></li>
        <li><a href="#fila-de-usuarios-put">📗 PUT</a></li>
        <li><a href="#fila-de-usuarios-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#hortas">📘 Hortas</a></summary>
      <ul>
        <li><a href="#hortas-get-list">📗 GET List</a></li>
        <li><a href="#hortas-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#hortas-post">📗 POST</a></li>
        <li><a href="#hortas-put">📗 PUT</a></li>
        <li><a href="#hortas-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#planos">📘 Planos</a></summary>
      <ul>
        <li><a href="#planos-get-list">📗 GET List</a></li>
        <li><a href="#planos-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#planos-get-usuario">📗 GET por Usuário</a></li>
        <li><a href="#planos-post">📗 POST</a></li>
        <li><a href="#planos-put">📗 PUT</a></li>
        <li><a href="#planos-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#recursos-do-plano">📘 Recursos do plano</a></summary>
      <ul>
        <li><a href="#recursos-do-plano-get-list">📗 GET List</a></li>
        <li><a href="#recursos-do-plano-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#recursos-do-plano-get-plano">📗 GET por Plano</a></li>
        <li><a href="#recursos-do-plano-post">📗 POST</a></li>
        <li><a href="#recursos-do-plano-put">📗 PUT</a></li>
        <li><a href="#recursos-do-plano-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#usuarios">📘 Usuários</a></summary>
      <ul>
        <li><a href="#usuarios-get-list">📗 GET List</a></li>
        <li><a href="#usuarios-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#usuarios-post">📗 POST</a></li>
        <li><a href="#usuarios-put">📗 PUT</a></li>
        <li><a href="#usuarios-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>
    <li>
    <details>
      <summary><a href="#permissoes-de-cargo">📘 Permissões de Cargo</a></summary>
      <ul>
        <li><a href="#permissoes-de-cargo-get-list">📗 GET List</a></li>
        <li><a href="#permissoes-de-cargo-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#permissoes-de-cargo-get-cargo">📗 GET por Cargo</a></li>
        <li><a href="#permissoes-de-cargo-post">📗 POST</a></li>
        <li><a href="#permissoes-de-cargo-put">📗 PUT</a></li>
        <li><a href="#permissoes-de-cargo-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#permissoes-de-excecao">📘 Permissões de Exceção</a></summary>
      <ul>
        <li><a href="#permissoes-de-excecao-get-list">📗 GET List</a></li>
        <li><a href="#permissoes-de-excecao-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#permissoes-de-excecao-post">📗 POST</a></li>
        <li><a href="#permissoes-de-excecao-put">📗 PUT</a></li>
        <li><a href="#permissoes-de-excecao-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#permissoes">📘 Permissões</a></summary>
      <ul>
        <li><a href="#permissoes-get-list">📗 GET List</a></li>
        <li><a href="#permissoes-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#permissoes-post">📗 POST</a></li>
        <li><a href="#permissoes-put">📗 PUT</a></li>
        <li><a href="#permissoes-delete">📗 DELETE</a></li>
        <li><a href="#permissoes-do-usuario-get">📗 GET por Usuário UUID</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary><a href="#financeiro-da-associacao">📘 Financeiro da Associação (lançamentos)</a></summary>
      <ul>
        <li><a href="#financeiro-da-associacao-get-list">📗 GET List</a></li>
        <li><a href="#financeiro-da-associacao-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#financeiro-da-associacao-get-associacao">📗 GET por Associação</a></li>
        <li><a href="#financeiro-da-associacao-post">📗 POST</a></li>
        <li><a href="#financeiro-da-associacao-put">📗 PUT</a></li>
        <li><a href="#financeiro-da-associacao-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#financeiro-da-horta">📘 Financeiro da Horta (lançamentos)</a></summary>
      <ul>
        <li><a href="#financeiro-da-horta-get-list">📗 GET List</a></li>
        <li><a href="#financeiro-da-horta-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#financeiro-da-horta-get-horta">📗 GET por Horta</a></li>
        <li><a href="#financeiro-da-horta-post">📗 POST</a></li>
        <li><a href="#financeiro-da-horta-put">📗 PUT</a></li>
        <li><a href="#financeiro-da-horta-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#mensalidades-da-associacao">📘 Mensalidades da Associação (lançamentos)</a></summary>
      <ul>
        <li><a href="#mensalidades-da-associacao-get-list">📗 GET List</a></li>
        <li><a href="#mensalidades-da-associacao-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#mensalidades-da-associacao-get-associacao">📗 GET por Associação</a></li>
        <li><a href="#mensalidades-da-associacao-get-usuario">📗 GET por Usuário</a></li>
        <li><a href="#mensalidades-da-associacao-post">📗 POST</a></li>
        <li><a href="#mensalidades-da-associacao-put">📗 PUT</a></li>
        <li><a href="#mensalidades-da-associacao-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>

  <li>
    <details>
      <summary><a href="#mensalidades-da-plataforma">📘 Mensalidades da Plataforma (lançamentos)</a></summary>
      <ul>
        <li><a href="#mensalidades-da-plataforma-get-list">📗 GET List</a></li>
        <li><a href="#mensalidades-da-plataforma-get-uuid">📗 GET por UUID</a></li>
        <li><a href="#mensalidades-da-plataforma-get-usuario">📗 GET por Usuário</a></li>
        <li><a href="#mensalidades-da-plataforma-post">📗 POST</a></li>
        <li><a href="#mensalidades-da-plataforma-put">📗 PUT</a></li>
        <li><a href="#mensalidades-da-plataforma-delete">📗 DELETE</a></li>
      </ul>
    </details>
  </li>
</ul>

- [🎲 Seeds do Banco ](#seeds)

<h1 id="introducao">📗 Introdução</h1>

⚠️ **Importante:** Usamos o Claude Sonnet 4 para revisão e formatação dessa documentação. Qualquer erro aparente é decorrente desse robo maldito que tanto nos auxilia.

Essa documentação compreende as rotas da API REST do projeto. O objetivo é listar todas as rotas, quais inputs e outputs elas tem, e quais as regras de negócio aplicadas nelas que devem ser respeitadas no(s) front-end(s).

<h2 id="inicio-rapido">⏩ Inicio rápido</h2>

Primeiro, siga o setup local descrito [aqui 🔗](../../README.md) no README.md do Backend, nele você fará o setup local da aplicação, incluindo banco de dados com INSERTs iniciais necessários.

Exceto pela rota Login (POST) e Cadastro (POST), todas as rotas exigem uso do JWT e analisarão as permissões do usuário via validação do JWT informado.

O JWT gerado para com os dados abaixo terá todas as permissões e níveis de acesso.

Para gera-lo, na rota Login (POST) informe o body:

```json
{
  "email": "admin_hortas_comunitarias@univille.br",
  "senha": "senha12345"
}
```

Aqui consideramos o uso do Postman como client de uso, portanto os templates disponíveis são para uso com ele informando o JWT na aba Authorization com tipo Bearer Token.

Em geral, o cabeçalho da requisição deve conter o token JWT no formato Bearer, ou seja: Authorization: Bearer {token}.

<h2 id="templates-postman">🧑🏻‍🚀 Templates do Postman</h2>

[Templates do Postman 🔗](../../postman/hortas-comunitarias.postman_collection.json)

<h1 id="permissoes">🔒 Permissões por Cargo</h1>

| Permissão                         | Administração da Plataforma | Administração da Associação | Administração da Horta | Canteirista | Dependente |
| --------------------------------- | --------------------------- | --------------------------- | ---------------------- | ----------- | ---------- |
| `usuarios_ler`                    | ✅                          | ✅                          | ✅                     |             |            |
| `usuarios_criar`                  | ✅                          | ✅                          | ✅                     |             |            |
| `usuarios_editar`                 | ✅                          | ✅                          | ✅                     |             |            |
| `usuarios_deletar`                | ✅                          | ✅                          | ✅                     |             |            |
| `associacoes_ler`                 | ✅                          |                             |                        |             |            |
| `associacoes_criar`               | ✅                          |                             |                        |             |            |
| `associacoes_editar`              | ✅                          |                             |                        |             |            |
| `associacoes_deletar`             | ✅                          |                             |                        |             |            |
| `hortas_ler`                      | ✅                          | ✅                          | ✅                     |             |            |
| `hortas_criar`                    | ✅                          | ✅                          |                        |             |            |
| `hortas_editar`                   | ✅                          | ✅                          |                        |             |            |
| `hortas_deletar`                  | ✅                          | ✅                          |                        |             |            |
| `enderecos_ler`                   | ✅                          | ✅                          | ✅                     |             |            |
| `enderecos_criar`                 | ✅                          | ✅                          | ✅                     |             |            |
| `enderecos_editar`                | ✅                          | ✅                          | ✅                     |             |            |
| `enderecos_deletar`               | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_ler`                   | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `canteiros_criar`                 | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_editar`                | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_deletar`               | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_usuarios_ler`          | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `canteiros_usuarios_criar`        | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_usuarios_editar`       | ✅                          | ✅                          | ✅                     |             |            |
| `canteiros_usuarios_deletar`      | ✅                          | ✅                          | ✅                     |             |            |
| `cargos_ler`                      | ✅                          | ✅                          | ✅                     |             |            |
| `cargos_criar`                    | ✅                          |                             |                        |             |            |
| `cargos_editar`                   | ✅                          |                             |                        |             |            |
| `cargos_deletar`                  | ✅                          |                             |                        |             |            |
| `permissoes_ler`                  | ✅                          |                             |                        |             |            |
| `permissoes_criar`                | ✅                          |                             |                        |             |            |
| `permissoes_editar`               | ✅                          |                             |                        |             |            |
| `permissoes_deletar`              | ✅                          |                             |                        |             |            |
| `permissoes_cargo_ler`            | ✅                          | ✅                          |                        |             |            |
| `permissoes_cargo_criar`          | ✅                          |                             |                        |             |            |
| `permissoes_cargo_editar`         | ✅                          |                             |                        |             |            |
| `permissoes_cargo_deletar`        | ✅                          |                             |                        |             |            |
| `permissoes_excecao_ler`          | ✅                          | ✅                          |                        |             |            |
| `permissoes_excecao_criar`        | ✅                          | ✅                          |                        |             |            |
| `permissoes_excecao_editar`       | ✅                          | ✅                          |                        |             |            |
| `permissoes_excecao_deletar`      | ✅                          | ✅                          |                        |             |            |
| `permissoes_usuario_ler`          | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `categorias_financeiras_ler`      | ✅                          | ✅                          | ✅                     |             |            |
| `categorias_financeiras_criar`    | ✅                          | ✅                          | ✅                     |             |            |
| `categorias_financeiras_editar`   | ✅                          | ✅                          | ✅                     |             |            |
| `categorias_financeiras_deletar`  | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_horta_ler`            | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `financeiro_horta_criar`          | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_horta_editar`         | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_horta_deletar`        | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_associacao_ler`       | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `financeiro_associacao_criar`     | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_associacao_editar`    | ✅                          | ✅                          | ✅                     |             |            |
| `financeiro_associacao_deletar`   | ✅                          | ✅                          | ✅                     |             |            |
| `mensalidades_associacao_ler`     | ✅                          | ✅                          |                        |             |            |
| `mensalidades_associacao_criar`   | ✅                          |                             |                        |             |            |
| `mensalidades_associacao_editar`  | ✅                          |                             |                        |             |            |
| `mensalidades_associacao_deletar` | ✅                          |                             |                        |             |            |
| `mensalidades_plataforma_ler`     | ✅                          | ✅                          |                        |             |            |
| `mensalidades_plataforma_criar`   | ✅                          |                             |                        |             |            |
| `mensalidades_plataforma_editar`  | ✅                          |                             |                        |             |            |
| `mensalidades_plataforma_deletar` | ✅                          |                             |                        |             |            |
| `planos_ler`                      | ✅                          | ✅                          |                        |             |            |
| `planos_criar`                    | ✅                          |                             |                        |             |            |
| `planos_editar`                   | ✅                          |                             |                        |             |            |
| `planos_deletar`                  | ✅                          |                             |                        |             |            |
| `recursos_plano_ler`              | ✅                          |                             |                        |             |            |
| `recursos_plano_criar`            | ✅                          |                             |                        |             |            |
| `recursos_plano_editar`           | ✅                          |                             |                        |             |            |
| `recursos_plano_deletar`          | ✅                          |                             |                        |             |            |
| `chaves_ler`                      | ✅                          | ✅                          | ✅                     |             |            |
| `chaves_criar`                    | ✅                          | ✅                          | ✅                     |             |            |
| `chaves_editar`                   | ✅                          | ✅                          | ✅                     |             |            |
| `chaves_deletar`                  | ✅                          | ✅                          | ✅                     |             |            |
| `fila_usuarios_ler`               | ✅                          | ✅                          | ✅                     | ✅          | ✅         |
| `fila_usuarios_criar`             | ✅                          | ✅                          | ✅                     |             |            |
| `fila_usuarios_editar`            | ✅                          | ✅                          | ✅                     |             |            |
| `fila_usuarios_deletar`           | ✅                          | ✅                          | ✅                     |             |            |

<h1 id="rotas">🧭 Rotas</h1>

À seguir, disponibilizamos a lista de rotas da aplicação e a regra de negócio para cada cargo usuário. As permissões apenas limitam quem tem acesso a quais rotas. Consulte qual rota por permissão [aqui 🔗](../../backend/src/Utils/Permissions/RoutePermissionMap.php).

<h2 id="autenticacao">🔐 Autenticação</h2>

Rotas que não precisam de JWT para acessar.

<h3 id="login-post">📗 Login (POST)</h3>

Gera um JWT token e "loga" na aplicação. Sem ele 99% das rotas são bloqueadas.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

| Campo                              | Tipo                | Obrigatório |
| ---------------------------------- | ------------------- | ----------- |
| email                         | string              | Sim         |
| senha                    | string              | Sim         |

**🟢 Body da resposta**

| Campo                                | Tipo                | Observações                                              |
| ------------------------------------ | ------------------- | -------------------------------------------------------- |
| token                           | string              | 

**🟢 Escopo por cargo**

Rota pública.

<h3 id="cadastro-post">📗 Cadastro (POST)</h3>

Cria uma nova associação e um usuário administrador associado à mesma, configurando também a primeira mensalidade para 30 dias.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

| Campo                              | Tipo                | Obrigatório |
| ---------------------------------- | ------------------- | ----------- |
| associacao                         | object              | Sim         |
| associacao.cnpj                    | string              | Sim         |
| associacao.razao_social            | string              | Sim         |
| associacao.nome_fantasia           | string              | Sim         |
| associacao.url_estatuto_social_pdf | string (URL)        | Opcional    |
| associacao.url_ata_associacao_pdf  | string (URL)        | Sim         |
| usuario                            | object              | Sim         |
| usuario.nome_completo              | string              | Sim         |
| usuario.cpf                        | string              | Sim         |
| usuario.email                      | string              | Sim         |
| usuario.senha                      | string              | Sim         |
| usuario.apelido                    | string              | Sim         |
| usuario.data_de_nascimento         | string (YYYY-MM-DD) | Sim         |

**🟢 Body da resposta**

| Campo                                | Tipo                | Observações                                              |
| ------------------------------------ | ------------------- | -------------------------------------------------------- |
| associacao                           | object              | Objeto da associação criada                              |
| associacao.uuid                      | string (UUID)       | UUID da associação                                       |
| associacao.cnpj                      | string              | CNPJ informado                                           |
| associacao.razao_social              | string              | Razão social informada                                   |
| associacao.nome_fantasia             | string              | Nome fantasia informado                                  |
| associacao.url_estatuto_social_pdf   | string (URL)        | URL do estatuto                                          |
| associacao.url_ata_associacao_pdf    | string (URL)        | URL da ata                                               |
| associacao.status_aprovacao          | int                 | 1 = aprovado                                             |
| associacao.data_de_criacao           | string (timestamp)  | Timestamp de criação                                     |
| associacao.data_de_ultima_alteracao  | string (timestamp)  | Timestamp da última alteração                            |
| usuario                              | object              | Objeto do usuário criado                                 |
| usuario.uuid                         | string (UUID)       | UUID do usuário                                          |
| usuario.nome_completo                | string              | Nome completo informado                                  |
| usuario.cpf                          | string              | CPF informado                                            |
| usuario.email                        | string              | Email informado                                          |
| usuario.apelido                      | string              | Apelido informado                                        |
| usuario.data_de_nascimento           | string (YYYY-MM-DD) | Data de nascimento                                       |
| usuario.cargo_uuid                   | string (UUID)       | Cargo atribuído automaticamente (admin_associacao_geral) |
| usuario.associacao_uuid              | string (UUID)       | UUID da associação criada                                |
| usuario.status_de_acesso             | int                 | 1 = acesso ativo                                         |
| usuario.responsavel_da_conta         | int                 | 0 = não responsável                                      |
| usuario.data_bloqueio_acesso         | string              | null se não bloqueado                                    |
| usuario.usuario_associado_uuid       | string              | null                                                     |
| usuario.motivo_bloqueio_acesso       | string              | null                                                     |
| usuario.usuario_criador_uuid         | string              | NEW_ACCOUNT                                              |
| usuario.usuario_alterador_uuid       | string              | NEW_ACCOUNT                                              |
| usuario.data_de_criacao              | string (timestamp)  | Timestamp de criação                                     |
| usuario.data_de_ultima_alteracao     | string (timestamp)  | Timestamp da última alteração                            |
| mensalidade                          | object              | Objeto da primeira mensalidade criada                    |
| mensalidade.uuid                     | string (UUID)       | UUID da mensalidade                                      |
| mensalidade.valor_em_centavos        | int                 | Valor do plano em centavos                               |
| mensalidade.usuario_uuid             | string (UUID)       | UUID do usuário associado                                |
| mensalidade.plano_uuid               | string (UUID)       | UUID do plano Bronze                                     |
| mensalidade.data_vencimento          | string (YYYY-MM-DD) | Data de vencimento                                       |
| mensalidade.data_pagamento           | string              | null se não pago                                         |
| mensalidade.status                   | int                 | 1 = ativa                                                |
| mensalidade.dias_atraso              | int                 | 0                                                        |
| mensalidade.usuario_criador_uuid     | string (UUID)       | UUID do usuário criado                                   |
| mensalidade.usuario_alterador_uuid   | string (UUID)       | UUID do usuário criado                                   |
| mensalidade.url_anexo                | string              | null                                                     |
| mensalidade.url_recibo               | string              | null                                                     |
| mensalidade.data_de_criacao          | string (timestamp)  | Timestamp de criação                                     |
| mensalidade.data_de_ultima_alteracao | string (timestamp)  | Timestamp da última alteração                            |
| token                                | string              | JWT de autenticação do usuário criado                    |

**🟢 Escopo por cargo**

Rota pública.

<h2 id="associacoes">📘 Associações</h2>

Gerencia entidade Associações que representa uma associação de moradores.

---

<h3 id="associacoes-get-list">📗 Associações (GET)</h3>

Lista todas as associações não excluídas do sistema.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo                  | Descrição                                       |
| ------------------------ | --------------------- | ----------------------------------------------- |
| uuid                     | string (UUID)         | Identificador único da associação               |
| cnpj                     | string                | CNPJ da associação                              |
| razao_social             | string                | Razão social da associação                      |
| nome_fantasia            | string                | Nome fantasia da associação                     |
| endereco_uuid            | string (UUID)         | UUID do endereço vinculado                      |
| url_estatuto_social_pdf  | string (URL)          | URL do estatuto social em PDF                   |
| url_ata_associacao_pdf   | string (URL)          | URL da ata de associação em PDF                 |
| status_aprovacao         | integer               | Status de aprovação (1 = aprovado)              |
| excluido                 | integer               | Indicador de exclusão (0 = ativo, 1 = excluído) |
| usuario_responsavel_uuid | string (UUID) \| null | UUID do usuário responsável                     |
| usuario_criador_uuid     | string (UUID) \| null | UUID do usuário criador                         |
| data_de_criacao          | string (datetime)     | Data e hora de criação                          |
| usuario_alterador_uuid   | string (UUID) \| null | UUID do último usuário que alterou              |
| data_de_ultima_alteracao | string (datetime)     | Data e hora da última alteração                 |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                    |
| --------------------------- | ----------------------------------------------------------- |
| Administração da Plataforma | Acesso completo. Visualiza todas as associações do sistema. |
| Administração da Associação | Sem permissão. Lança exceção.                               |
| Administração da Horta      | Sem permissão. Lança exceção.                               |
| Canteirista                 | Sem permissão. Lança exceção.                               |
| Dependente                  | Sem permissão. Lança exceção.                               |

---

<h3 id="associacoes-get-uuid">📗 Associações (GET por UUID)</h3>

Busca uma associação específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da associação

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna um objeto único com os mesmos campos da listagem (ver tabela acima).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Acesso completo. Visualiza qualquer associação.              |
| NEW_ACCOUNT                 | Acesso permitido (caso especial para criação de nova conta). |
| Administração da Associação | Sem permissão. Lança exceção.                                |
| Administração da Horta      | Sem permissão. Lança exceção.                                |
| Canteirista                 | Sem permissão. Lança exceção.                                |
| Dependente                  | Sem permissão. Lança exceção.                                |

---

<h3 id="associacoes-post">📗 Associações (POST)</h3>

Cria uma nova associação no sistema.

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório                                |
| ----------------------- | ------------- | ------------------------------------------ |
| cnpj                    | string        | Sim                                        |
| razao_social            | string        | Sim                                        |
| nome_fantasia           | string        | Sim                                        |
| endereco_uuid           | string (UUID) | Sim (Admin Plataforma) / Não (NEW_ACCOUNT) |
| url_estatuto_social_pdf | string (URL)  | Não (Admin Plataforma) / Sim (NEW_ACCOUNT) |
| url_ata_associacao_pdf  | string (URL)  | Sim                                        |

**🟢 Body da resposta**

Retorna o objeto da associação criada com todos os campos (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Administração da Plataforma | Pode criar associações. Todos os campos são obrigatórios exceto URLs. `status_aprovacao` é definido automaticamente como 1.              |
| NEW_ACCOUNT                 | Pode criar associações (caso especial). `endereco_uuid` e `url_estatuto_social_pdf` são opcionais. `status_aprovacao` é definido como 1. |
| Administração da Associação | Sem permissão. Lança exceção.                                                                                                            |
| Administração da Horta      | Sem permissão. Lança exceção.                                                                                                            |
| Canteirista                 | Sem permissão. Lança exceção.                                                                                                            |
| Dependente                  | Sem permissão. Lança exceção.                                                                                                            |

---

<h3 id="associacoes-put">📗 Associações (PUT)</h3>

Atualiza uma associação existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da associação a ser atualizada

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório |
| ----------------------- | ------------- | ----------- |
| cnpj                    | string        | Não         |
| razao_social            | string        | Não         |
| nome_fantasia           | string        | Não         |
| endereco_uuid           | string (UUID) | Sim         |
| url_estatuto_social_pdf | string (URL)  | Não         |
| url_ata_associacao_pdf  | string (URL)  | Não         |
| status_aprovacao        | string        | Não         |

**🟢 Body da resposta**

Retorna o objeto da associação atualizada com todos os campos (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Administração da Plataforma | Acesso completo. Pode atualizar qualquer associação. Todos os campos são opcionais exceto `endereco_uuid`. |
| Administração da Associação | Sem permissão. Lança exceção.                                                                              |
| Administração da Horta      | Sem permissão. Lança exceção.                                                                              |
| Canteirista                 | Sem permissão. Lança exceção.                                                                              |
| Dependente                  | Sem permissão. Lança exceção.                                                                              |

---

<h3 id="associacoes-delete">📗 Associações (DELETE)</h3>

Realiza exclusão lógica de uma associação (marca como excluída).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da associação a ser excluída

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                         |
| --------------------------- | ---------------------------------------------------------------- |
| Administração da Plataforma | Acesso completo. Pode excluir (logicamente) qualquer associação. |
| Administração da Associação | Sem permissão. Lança exceção.                                    |
| Administração da Horta      | Sem permissão. Lança exceção.                                    |
| Canteirista                 | Sem permissão. Lança exceção.                                    |
| Dependente                  | Sem permissão. Lança exceção.                                    |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="canteiros-e-usuarios">📗 Canteiros & Usuários</h2>

Gerencia os vínculos entre canteiros e usuários, permitindo criar, atualizar, consultar e excluir relações.  
Cada vínculo pode representar diferentes tipos de relação (ex: responsável, colaborador, dependente).

---

<h3 id="canteiros-e-usuarios-get-list">📗 Canteiros & Usuários (GET)</h3>

Lista os vínculos de usuários com canteiros, aplicando filtro de acordo com o cargo do usuário logado.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                       | Tipo      | Obrigatório |
| --------------------------- | --------- | ----------- |
| uuid                        | string    | Sim         |
| canteiro_uuid               | string    | Sim         |
| usuario_uuid                | string    | Sim         |
| tipo_vinculo                | int       | Sim (1 a 3) |
| data_inicio                 | date      | Sim         |
| data_fim                    | date      | Não         |
| percentual_responsabilidade | decimal   | Sim         |
| observacoes                 | text      | Não         |
| ativo                       | tinyint   | Sim         |
| excluido                    | tinyint   | Sim         |
| usuario_criador_uuid        | string    | Não         |
| data_de_criacao             | timestamp | Sim         |
| usuario_alterador_uuid      | string    | Não         |
| data_de_ultima_alteracao    | timestamp | Sim         |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                         |
| --------------------------- | ---------------------------------------------------------------- |
| Administração da Plataforma | Lista todos os vínculos existentes.                              |
| Administração da Associação | Lista apenas vínculos de usuários pertencentes à sua associação. |
| Administração da Horta      | Lista apenas vínculos em canteiros da horta administrada.        |
| Canteirista                 | Lista apenas seus próprios vínculos.                             |
| Dependente                  | Lista apenas seus próprios vínculos.                             |

---

<h3 id="canteiros-e-usuarios-get-uuid">📗 Canteiros & Usuários (GET por UUID)</h3>

Busca um vínculo específico entre usuário e canteiro pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do vínculo.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna um objeto único com os mesmos campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Pode acessar qualquer vínculo.                               |
| Administração da Associação | Pode acessar vínculos apenas de usuários da sua associação.  |
| Administração da Horta      | Pode acessar vínculos apenas de canteiros da sua horta.      |
| Canteirista                 | Pode acessar apenas vínculos onde ele é o usuário vinculado. |
| Dependente                  | Pode acessar apenas vínculos onde ele é o usuário vinculado. |

---

<h3 id="canteiros-e-usuarios-post">📗 Canteiros & Usuários (POST)</h3>

Cria um novo vínculo entre um usuário e um canteiro.

**🟢 Body da requisição**

| Campo                       | Tipo   | Obrigatório   |
| --------------------------- | ------ | ------------- |
| usuario_uuid                | string | Sim           |
| canteiro_uuid               | string | Sim           |
| tipo_vinculo                | int    | Sim (1 a 3)   |
| data_inicio                 | date   | Sim           |
| data_fim                    | date   | Não           |
| percentual_responsabilidade | float  | Sim (0 a 100) |
| observacoes                 | string | Não           |

**🟢 Body da resposta**

Retorna o objeto criado, com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                        |
| --------------------------- | --------------------------------------------------------------- |
| Administração da Plataforma | Pode criar vínculos entre qualquer usuário e qualquer canteiro. |
| Administração da Associação | Pode criar vínculos apenas para usuários da sua associação.     |
| Administração da Horta      | Pode criar vínculos apenas em canteiros da sua horta.           |
| Canteirista                 | Sem permissão.                                                  |
| Dependente                  | Sem permissão.                                                  |

---

<h3 id="canteiros-e-usuarios-put">📗 Canteiros & Usuários (PUT)</h3>

Atualiza os dados de um vínculo já existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do vínculo a ser atualizado.

**🟢 Body da requisição**

| Campo                       | Tipo    | Obrigatório |
| --------------------------- | ------- | ----------- |
| usuario_uuid                | string  | Não         |
| canteiro_uuid               | string  | Não         |
| tipo_vinculo                | int     | Não         |
| data_inicio                 | date    | Não         |
| data_fim                    | date    | Não         |
| percentual_responsabilidade | float   | Não         |
| observacoes                 | string  | Não         |
| ativo                       | boolean | Não         |

**🟢 Body da resposta**

Retorna o objeto atualizado com os campos completos.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                      |
| --------------------------- | ------------------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer vínculo.                              |
| Administração da Associação | Pode atualizar vínculos apenas de usuários da sua associação. |
| Administração da Horta      | Pode atualizar vínculos apenas em canteiros da sua horta.     |
| Canteirista                 | Sem permissão.                                                |
| Dependente                  | Sem permissão.                                                |

---

<h3 id="canteiros-e-usuarios-delete">📗 Canteiros & Usuários (DELETE)</h3>

Realiza exclusão lógica de um vínculo (marca como excluído).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do vínculo a ser excluído.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou lança exceção em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                    |
| --------------------------- | ----------------------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer vínculo.                              |
| Administração da Associação | Pode excluir vínculos apenas de usuários da sua associação. |
| Administração da Horta      | Pode excluir vínculos apenas de canteiros da sua horta.     |
| Canteirista                 | Sem permissão.                                              |
| Dependente                  | Sem permissão.                                              |

<h2 id="canteiros">📗 Canteiros</h2>

Gerencia os canteiros de uma horta, permitindo criar, consultar, atualizar e excluir registros de forma lógica.

---

<h3 id="canteiros-get-list">📗 Canteiros (GET)</h3>

Lista todos os canteiros de acordo com o escopo do usuário logado.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo      | Obrigatório |
| ------------------------ | --------- | ----------- |
| uuid                     | string    | Sim         |
| numero_identificador     | string    | Sim         |
| tamanho_m2               | decimal   | Sim         |
| horta_uuid               | string    | Sim         |
| excluido                 | tinyint   | Sim         |
| usuario_criador_uuid     | string    | Não         |
| data_de_criacao          | timestamp | Sim         |
| usuario_alterador_uuid   | string    | Não         |
| data_de_ultima_alteracao | timestamp | Sim         |
| usuario_anterior_uuid    | string    | Não         |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Lista todos os canteiros.                                    |
| Administração da Associação | Lista apenas canteiros de hortas da sua associação.          |
| Administração da Horta      | Lista apenas canteiros da sua horta.                         |
| Canteirista                 | Lista apenas canteiros da horta da sua associação vinculada. |
| Dependente                  | Lista apenas canteiros da horta da sua associação vinculada. |

---

<h3 id="canteiros-get-uuid">📗 Canteiros (GET por UUID)</h3>

Busca um canteiro específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do canteiro

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna um objeto único com os mesmos campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                      |
| --------------------------- | ------------------------------------------------------------- |
| Administração da Plataforma | Pode visualizar qualquer canteiro.                            |
| Administração da Associação | Pode visualizar apenas canteiros de hortas da sua associação. |
| Administração da Horta      | Pode visualizar apenas canteiros da sua horta.                |
| Canteirista                 | Sem permissão.                                                |
| Dependente                  | Sem permissão.                                                |

---

<h3 id="canteiros-post">📗 Canteiros (POST)</h3>

Cria um novo canteiro.

**🟢 Body da requisição**

| Campo                 | Tipo    | Obrigatório |
| --------------------- | ------- | ----------- |
| numero_identificador  | string  | Sim         |
| tamanho_m2            | decimal | Sim         |
| horta_uuid            | string  | Sim         |
| usuario_anterior_uuid | string  | Não         |

**🟢 Body da resposta**

Retorna o objeto criado com todos os campos (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                       |
| --------------------------- | ---------------------------------------------- |
| Administração da Plataforma | Pode criar canteiros em qualquer horta.        |
| Administração da Associação | Pode criar apenas em hortas da sua associação. |
| Administração da Horta      | Pode criar apenas em sua própria horta.        |
| Canteirista                 | Sem permissão.                                 |
| Dependente                  | Sem permissão.                                 |

---

<h3 id="canteiros-put">📗 Canteiros (PUT)</h3>

Atualiza os dados de um canteiro.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do canteiro a ser atualizado

**🟢 Body da requisição**

| Campo                 | Tipo    | Obrigatório |
| --------------------- | ------- | ----------- |
| numero_identificador  | string  | Não         |
| tamanho_m2            | decimal | Não         |
| horta_uuid            | string  | Não         |
| usuario_anterior_uuid | string  | Não         |

**🟢 Body da resposta**

Retorna o objeto atualizado com todos os campos (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Pode atualizar qualquer canteiro.                            |
| Administração da Associação | Pode atualizar apenas canteiros de hortas da sua associação. |
| Administração da Horta      | Pode atualizar apenas canteiros da sua horta.                |
| Canteirista                 | Sem permissão.                                               |
| Dependente                  | Sem permissão.                                               |

---

<h3 id="canteiros-delete">📗 Canteiros (DELETE)</h3>

Exclui logicamente um canteiro (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do canteiro a ser excluído

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                   |
| --------------------------- | ---------------------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer canteiro.                            |
| Administração da Associação | Pode excluir apenas canteiros de hortas da sua associação. |
| Administração da Horta      | Pode excluir apenas canteiros da sua horta.                |
| Canteirista                 | Sem permissão.                                             |
| Dependente                  | Sem permissão.                                             |

<h2 id="cargos">📗 Cargos</h2>

Gerencia os cargos do sistema, permitindo criar, consultar, atualizar e excluir logicamente.

---

<h3 id="cargos-get-list">📗 Cargos (GET)</h3>

Lista todos os cargos não excluídos.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo      |
| ------------------------ | --------- |
| uuid                     | string    |
| codigo                   | int       |
| slug                     | string    |
| nome                     | string    |
| descricao                | string    |
| cor                      | string    |
| excluido                 | tinyint   |
| usuario_criador_uuid     | string    |
| data_de_criacao          | timestamp |
| usuario_alterador_uuid   | string    |
| data_de_ultima_alteracao | timestamp |

**🟢 Escopo por cargo**

| Cargo                       | Contexto               |
| --------------------------- | ---------------------- |
| Administração da Plataforma | Lista todos os cargos. |
| Administração da Associação | Lista todos os cargos. |
| Administração da Horta      | Lista todos os cargos. |
| Canteirista                 | Sem permissão.         |
| Dependente                  | Sem permissão.         |

---

<h3 id="cargos-get-uuid">📗 Cargos (GET por UUID)</h3>

Busca um cargo específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do cargo

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna um objeto único com os mesmos campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                        |
| --------------------------- | ------------------------------- |
| Administração da Plataforma | Pode visualizar qualquer cargo. |
| Administração da Associação | Pode visualizar qualquer cargo. |
| Administração da Horta      | Pode visualizar qualquer cargo. |
| Canteirista                 | Sem permissão.                  |
| Dependente                  | Sem permissão.                  |

---

<h3 id="cargos-post">📗 Cargos (POST)</h3>

Cria um novo cargo.

**🟢 Body da requisição**

| Campo     | Tipo   | Obrigatório |
| --------- | ------ | ----------- |
| codigo    | int    | Sim (0 a 5) |
| slug      | string | Sim         |
| nome      | string | Sim         |
| descricao | string | Sim         |
| cor       | string | Sim         |

**🟢 Body da resposta**

Retorna o objeto criado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto           |
| --------------------------- | ------------------ |
| Administração da Plataforma | Pode criar cargos. |
| Administração da Associação | Sem permissão.     |
| Administração da Horta      | Sem permissão.     |
| Canteirista                 | Sem permissão.     |
| Dependente                  | Sem permissão.     |

---

<h3 id="cargos-put">📗 Cargos (PUT)</h3>

Atualiza um cargo existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do cargo a ser atualizado

**🟢 Body da requisição**

| Campo     | Tipo   | Obrigatório |
| --------- | ------ | ----------- |
| codigo    | int    | Não         |
| slug      | string | Não         |
| nome      | string | Não         |
| descricao | string | Não         |
| cor       | string | Não         |

**🟢 Body da resposta**

Retorna o objeto atualizado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                       |
| --------------------------- | ------------------------------ |
| Administração da Plataforma | Pode atualizar qualquer cargo. |
| Administração da Associação | Sem permissão.                 |
| Administração da Horta      | Sem permissão.                 |
| Canteirista                 | Sem permissão.                 |
| Dependente                  | Sem permissão.                 |

---

<h3 id="cargos-delete">📗 Cargos (DELETE)</h3>

Exclui logicamente um cargo (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do cargo a ser excluído

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                     |
| --------------------------- | ---------------------------- |
| Administração da Plataforma | Pode excluir qualquer cargo. |
| Administração da Associação | Sem permissão.               |
| Administração da Horta      | Sem permissão.               |
| Canteirista                 | Sem permissão.               |
| Dependente                  | Sem permissão.               |

<h2 id="categorias-financeiras">📗 Categorias financeiras</h2>

Gerencia categorias financeiras vinculadas a Associações ou Hortas.  
As categorias podem ser de tipos: **1 (Receita), 2 (Despesa), 3 (Investimento)**.  
Todos os retornos incluem apenas registros com `excluido = 0`.

---

<h3 id="categorias-financeiras-get-list">📗 Categorias financeiras (GET)</h3>

Lista todas as categorias financeiras conforme escopo do cargo.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo            |
| ------------------------ | --------------- |
| uuid                     | string (UUID)   |
| nome                     | string          |
| descricao                | string          |
| tipo                     | tinyint (1/2/3) |
| cor                      | string (#HEX)   |
| icone                    | string          |
| associacao_uuid          | string (UUID)   |
| horta_uuid               | string (UUID)   |
| usuario_criador_uuid     | string (UUID)   |
| data_de_criacao          | timestamp       |
| usuario_alterador_uuid   | string (UUID)   |
| data_de_ultima_alteracao | timestamp       |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                       |
| --------------------------- | ---------------------------------------------- |
| Administração da Plataforma | Lista todas categorias do sistema.             |
| Administração da Associação | Lista apenas categorias da própria associação. |
| Administração da Horta      | Lista apenas categorias da própria horta.      |
| Canteirista                 | Sem permissão.                                 |
| Dependente                  | Sem permissão.                                 |

---

<h3 id="categorias-financeiras-get-uuid">📗 Categorias-financeiras (GET por UUID)</h3>

Busca categoria financeira pelo `uuid`.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da categoria

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesma estrutura do GET List, mas retorna um único objeto.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                             |
| --------------------------- | ------------------------------------ |
| Administração da Plataforma | Pode consultar qualquer categoria.   |
| Administração da Associação | Apenas categorias da sua associação. |
| Administração da Horta      | Apenas categorias da sua horta.      |
| Canteirista                 | Sem permissão.                       |
| Dependente                  | Sem permissão.                       |

---

<h3 id="categorias-financeiras-get-associacao">📗 Categorias-financeiras (GET) - Por Associacao</h3>

Lista categorias financeiras de uma associação específica.

**🟢 Parâmetro na URL**

- `associacao_uuid` (obrigatório): UUID da associação

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesma estrutura do GET List.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                 |
| --------------------------- | ---------------------------------------- |
| Administração da Plataforma | Lista categorias de qualquer associação. |
| Administração da Associação | Apenas da própria associação.            |
| Administração da Horta      | Sem permissão.                           |
| Canteirista                 | Sem permissão.                           |
| Dependente                  | Sem permissão.                           |

---

<h3 id="categorias-financeiras-get-horta">📗 Categorias-financeiras (GET) - Por Horta</h3>

Lista categorias financeiras de uma horta específica.

**🟢 Parâmetro na URL**

- `horta_uuid` (obrigatório): UUID da horta

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesma estrutura do GET List.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                      |
| --------------------------- | --------------------------------------------- |
| Administração da Plataforma | Lista categorias de qualquer horta.           |
| Administração da Associação | Apenas de hortas vinculadas à sua associação. |
| Administração da Horta      | Apenas da sua horta.                          |
| Canteirista                 | Sem permissão.                                |
| Dependente                  | Sem permissão.                                |

---

<h3 id="categorias-financeiras-post">📗 Categorias financeiras (POST)</h3>

Cria uma nova categoria financeira.

**🟢 Body da requisição**

| Campo           | Tipo          | Obrigatório                      |
| --------------- | ------------- | -------------------------------- |
| nome            | string        | Sim                              |
| descricao       | string        | Não                              |
| tipo            | int (1,2,3)   | Sim                              |
| cor             | string (#HEX) | Não                              |
| icone           | string        | Não                              |
| associacao_uuid | string (UUID) | Sim (quando admin de associação) |
| horta_uuid      | string (UUID) | Sim (quando admin de horta)      |

**🟢 Body da resposta**

Retorna objeto criado com todos os campos listados no GET.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                |
| --------------------------- | ----------------------------------------------------------------------- |
| Administração da Plataforma | Pode criar para qualquer associação ou horta.                           |
| Administração da Associação | Pode criar somente para sua associação. Não pode informar `horta_uuid`. |
| Administração da Horta      | Pode criar somente para sua horta. Não pode informar `associacao_uuid`. |
| Canteirista                 | Sem permissão.                                                          |
| Dependente                  | Sem permissão.                                                          |

---

<h3 id="categorias-financeiras-put">📗 Categorias financeiras (PUT)</h3>

Atualiza categoria financeira existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da categoria

**🟢 Body da requisição**

| Campo           | Tipo          | Obrigatório |
| --------------- | ------------- | ----------- |
| nome            | string        | Não         |
| descricao       | string        | Não         |
| tipo            | int (1,2,3)   | Não         |
| cor             | string (#HEX) | Não         |
| icone           | string        | Não         |
| associacao_uuid | string (UUID) | Não         |
| horta_uuid      | string (UUID) | Não         |

**🟢 Body da resposta**

Objeto atualizado da categoria.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                 |
| --------------------------- | ---------------------------------------- |
| Administração da Plataforma | Pode editar qualquer categoria.          |
| Administração da Associação | Apenas categorias da própria associação. |
| Administração da Horta      | Apenas categorias da própria horta.      |
| Canteirista                 | Sem permissão.                           |
| Dependente                  | Sem permissão.                           |

---

<h3 id="categorias-financeiras-delete">📗 Categorias financeiras (DELETE)</h3>

Exclusão lógica de categoria financeira (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da categoria

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                 |
| --------------------------- | ---------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer categoria.         |
| Administração da Associação | Apenas categorias da própria associação. |
| Administração da Horta      | Apenas categorias da própria horta.      |
| Canteirista                 | Sem permissão.                           |
| Dependente                  | Sem permissão.                           |

<h2 id="chaves">📗 Chaves</h2>

Gerencia as chaves vinculadas às hortas, permitindo criar, consultar, atualizar e excluir logicamente.

---

<h3 id="chaves-get-list">📗 Chaves (GET)</h3>

Lista todas as chaves não excluídas, respeitando os filtros por cargo.

**🟢 Parâmetro na URL**  
Não se aplica.

**🟢 Body da requisição**  
Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string (UUID) |
| codigo                   | string        |
| horta_uuid               | string (UUID) |
| observacoes              | string (text) |
| disponivel               | tinyint       |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| usuario_alterador_uuid   | string (UUID) |
| data_de_criacao          | datetime      |
| data_de_ultima_alteracao | datetime      |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                 |
| --------------------------- | -------------------------------------------------------- |
| Administração da Plataforma | Lista todas as chaves de todas as hortas.                |
| Administração da Associação | Lista somente chaves das hortas da associação vinculada. |
| Administração da Horta      | Lista somente chaves da horta vinculada.                 |
| Canteirista                 | Sem permissão. Lança exceção.                            |
| Dependente                  | Sem permissão. Lança exceção.                            |

---

<h3 id="chaves-get-uuid">📗 Chaves (GET por UUID)</h3>

Busca uma chave específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da chave

**🟢 Body da requisição**  
Não se aplica.

**🟢 Body da resposta**  
Retorna um objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                         |
| --------------------------- | -------------------------------------------------------------------------------- |
| Administração da Plataforma | Pode visualizar qualquer chave.                                                  |
| Administração da Associação | Pode visualizar apenas se a chave pertencer a uma horta da associação vinculada. |
| Administração da Horta      | Pode visualizar apenas se a chave for da sua horta.                              |
| Canteirista                 | Sem permissão. Lança exceção.                                                    |
| Dependente                  | Sem permissão. Lança exceção.                                                    |

---

<h3 id="chaves-post">📗 Chaves (POST)</h3>

Cria uma nova chave vinculada a uma horta.

**🟢 Body da requisição**

| Campo       | Tipo          | Obrigatório |
| ----------- | ------------- | ----------- |
| codigo      | string        | Sim         |
| horta_uuid  | string (UUID) | Sim         |
| observacoes | string        | Não         |
| disponivel  | bool          | Não         |

**🟢 Body da resposta**  
Retorna o objeto criado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Pode criar chave para qualquer horta.                        |
| Administração da Associação | Pode criar chave apenas para hortas da associação vinculada. |
| Administração da Horta      | Pode criar chave apenas para a horta vinculada.              |
| Canteirista                 | Sem permissão. Lança exceção.                                |
| Dependente                  | Sem permissão. Lança exceção.                                |

---

<h3 id="chaves-put">📗 Chaves (PUT)</h3>

Atualiza os dados de uma chave existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da chave a ser atualizada

**🟢 Body da requisição**

| Campo       | Tipo          | Obrigatório |
| ----------- | ------------- | ----------- |
| codigo      | string        | Não         |
| horta_uuid  | string (UUID) | Não         |
| observacoes | string        | Não         |
| disponivel  | bool          | Não         |

**🟢 Body da resposta**  
Retorna o objeto atualizado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                        |
| --------------------------- | --------------------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer chave.                                  |
| Administração da Associação | Pode atualizar apenas chaves de hortas da associação vinculada. |
| Administração da Horta      | Pode atualizar apenas chaves da horta vinculada.                |
| Canteirista                 | Sem permissão. Lança exceção.                                   |
| Dependente                  | Sem permissão. Lança exceção.                                   |

---

<h3 id="chaves-delete">📗 Chaves (DELETE)</h3>

Exclui logicamente uma chave (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da chave a ser excluída

**🟢 Body da requisição**  
Não se aplica.

**🟢 Body da resposta**  
Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                      |
| --------------------------- | ------------------------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer chave.                                  |
| Administração da Associação | Pode excluir apenas chaves de hortas da associação vinculada. |
| Administração da Horta      | Pode excluir apenas chaves da horta vinculada.                |
| Canteirista                 | Sem permissão. Lança exceção.                                 |
| Dependente                  | Sem permissão. Lança exceção.                                 |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="enderecos">📗 Endereços</h2>

Gerenciamento de endereços vinculados a entidades do sistema.

---

<h3 id="enderecos-get-list">📗 Endereços (GET)</h3>

Lista todos os endereços não excluídos.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          | Descrição                 |
| ------------------------ | ------------- | ------------------------- |
| uuid                     | string (UUID) | Identificador único       |
| tipo_logradouro          | string        | Tipo (Rua, Avenida, etc.) |
| logradouro               | string        | Nome do logradouro        |
| numero                   | string        | Número                    |
| complemento              | string/null   | Complemento               |
| bairro                   | string        | Bairro                    |
| cidade                   | string        | Cidade                    |
| estado                   | string        | Estado (UF)               |
| cep                      | string        | CEP                       |
| latitude                 | float/null    | Latitude                  |
| longitude                | float/null    | Longitude                 |
| excluido                 | int           | 0 = ativo, 1 = excluído   |
| usuario_criador_uuid     | string/null   | Usuário criador           |
| data_de_criacao          | datetime      | Data de criação           |
| usuario_alterador_uuid   | string/null   | Último usuário alterador  |
| data_de_ultima_alteracao | datetime      | Data da última alteração  |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                               |
| --------------------------- | -------------------------------------- |
| Administração da Plataforma | Lista todos os endereços não excluídos |
| Administração da Associação | Lista todos os endereços não excluídos |
| Administração da Horta      | Lista todos os endereços não excluídos |
| Canteirista                 | Lista todos os endereços não excluídos |
| Dependente                  | Lista todos os endereços não excluídos |

---

<h3 id="enderecos-get-uuid">📗 Endereços (GET por UUID)</h3>

Busca um endereço específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do endereço

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesmo objeto da listagem (tabela acima).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                          |
| --------------------------- | --------------------------------- |
| Administração da Plataforma | Pode visualizar qualquer endereço |
| Administração da Associação | Pode visualizar qualquer endereço |
| Administração da Horta      | Pode visualizar qualquer endereço |
| Canteirista                 | Pode visualizar qualquer endereço |
| Dependente                  | Pode visualizar qualquer endereço |

---

<h3 id="enderecos-post">📗 Endereços (POST)</h3>

Cria um novo endereço.

**🟢 Body da requisição**

| Campo           | Tipo       | Obrigatório |
| --------------- | ---------- | ----------- |
| tipo_logradouro | string     | Sim         |
| logradouro      | string     | Sim         |
| numero          | string     | Sim         |
| complemento     | string     | Não         |
| bairro          | string     | Sim         |
| cidade          | string     | Sim         |
| estado          | string (2) | Sim         |
| cep             | string     | Sim         |
| latitude        | float      | Não         |
| longitude       | float      | Não         |

**🟢 Body da resposta**

Objeto do endereço criado (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto             |
| --------------------------- | -------------------- |
| Administração da Plataforma | Pode criar endereços |
| Administração da Associação | Pode criar endereços |
| Administração da Horta      | Pode criar endereços |
| Canteirista                 | Sem permissão        |
| Dependente                  | Sem permissão        |

---

<h3 id="enderecos-put">📗 Endereços (PUT)</h3>

Atualiza um endereço existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do endereço

**🟢 Body da requisição**

| Campo           | Tipo       | Obrigatório |
| --------------- | ---------- | ----------- |
| tipo_logradouro | string     | Não         |
| logradouro      | string     | Não         |
| numero          | string     | Não         |
| complemento     | string     | Não         |
| bairro          | string     | Não         |
| cidade          | string     | Não         |
| estado          | string (2) | Não         |
| cep             | string     | Não         |
| latitude        | float      | Não         |
| longitude       | float      | Não         |

**🟢 Body da resposta**

Objeto atualizado (ver tabela da listagem).

**🟢 Escopo por cargo**

| Cargo                       | Contexto                         |
| --------------------------- | -------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer endereço |
| Administração da Associação | Pode atualizar qualquer endereço |
| Administração da Horta      | Pode atualizar qualquer endereço |
| Canteirista                 | Sem permissão                    |
| Dependente                  | Sem permissão                    |

---

<h3 id="enderecos-delete">📗 Endereços (DELETE)</h3>

Realiza exclusão lógica de um endereço (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do endereço

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou lança exceção se não encontrado.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                       |
| --------------------------- | ------------------------------ |
| Administração da Plataforma | Pode excluir qualquer endereço |
| Administração da Associação | Pode excluir qualquer endereço |
| Administração da Horta      | Pode excluir qualquer endereço |
| Canteirista                 | Sem permissão                  |
| Dependente                  | Sem permissão                  |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="fila-de-usuarios">📗 Fila de Usuários</h2>

Gerencia a fila de usuários vinculados às hortas, permitindo criar, consultar, atualizar e excluir logicamente.

---

<h3 id="fila-de-usuarios-get-list">📗 Fila de Usuários (GET)</h3>

Lista todas as filas de usuários não excluídas, com filtros conforme cargo.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo      |
| ------------------------ | --------- |
| uuid                     | string    |
| usuario_uuid             | string    |
| horta_uuid               | string    |
| data_entrada             | timestamp |
| ordem                    | int       |
| excluido                 | tinyint   |
| usuario_criador_uuid     | string    |
| data_de_criacao          | timestamp |
| usuario_alterador_uuid   | string    |
| data_de_ultima_alteracao | timestamp |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                    |
| --------------------------- | ------------------------------------------- |
| Administração da Plataforma | Lista todas as filas.                       |
| Administração da Associação | Lista apenas filas de hortas da associação. |
| Administração da Horta      | Lista apenas filas da horta administrada.   |
| Canteirista                 | Lista apenas filas da sua horta.            |
| Dependente                  | Lista apenas filas da sua horta.            |

---

<h3 id="fila-de-usuarios-get-uuid">📗 Fila de Usuários (GET por UUID)</h3>

Busca uma fila específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da fila

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna um objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                              |
| --------------------------- | ------------------------------------- |
| Administração da Plataforma | Acesso a qualquer fila.               |
| Administração da Associação | Apenas filas de hortas da associação. |
| Administração da Horta      | Apenas filas da horta administrada.   |
| Canteirista                 | Apenas filas da sua horta.            |
| Dependente                  | Apenas filas da sua horta.            |

---

<h3 id="fila-de-usuarios-get-horta">📗 Fila de Usuários (GET por Horta UUID)</h3>

Lista as filas de usuários de uma horta específica.

**🟢 Parâmetro na URL**

- `horta_uuid` (obrigatório): UUID da horta

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos de filas com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                         |
| --------------------------- | -------------------------------- |
| Administração da Plataforma | Acesso a qualquer horta.         |
| Administração da Associação | Apenas hortas da sua associação. |
| Administração da Horta      | Apenas sua horta.                |
| Canteirista                 | Apenas sua horta.                |
| Dependente                  | Apenas sua horta.                |

---

<h3 id="fila-de-usuarios-get-usuario">📗 Fila de Usuários (GET) - Por Usuario</h3>

Busca todas as filas de um usuário específico.

**🟢 Parâmetro na URL**

- `usuario_uuid` (obrigatório): UUID do usuário

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                             |
| --------------------------- | ---------------------------------------------------- |
| Administração da Plataforma | Acesso total, desde que a horta esteja correta.      |
| Administração da Associação | Apenas se o usuário estiver em hortas da associação. |
| Administração da Horta      | Apenas se o usuário estiver na horta administrada.   |
| Canteirista                 | Apenas se o usuário estiver na sua horta.            |
| Dependente                  | Apenas se o usuário estiver na sua horta.            |

---

<h3 id="fila-de-usuarios-post">📗 Fila de Usuários (POST)</h3>

Cria uma nova fila de usuário.

**🟢 Body da requisição**

| Campo        | Tipo          | Obrigatório |
| ------------ | ------------- | ----------- |
| usuario_uuid | string (UUID) | Sim         |
| horta_uuid   | string (UUID) | Sim         |

**🟢 Body da resposta**

Retorna o objeto criado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode criar em qualquer horta.              |
| Administração da Associação | Pode criar apenas em hortas da associação. |
| Administração da Horta      | Pode criar apenas na horta administrada.   |
| Canteirista                 | Sem permissão.                             |
| Dependente                  | Sem permissão.                             |

---

<h3 id="fila-de-usuarios-put">📗 Fila de Usuários (PUT)</h3>

Atualiza uma fila de usuário existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da fila

**🟢 Body da requisição**

| Campo        | Tipo          | Obrigatório |
| ------------ | ------------- | ----------- |
| usuario_uuid | string (UUID) | Não         |
| horta_uuid   | string (UUID) | Não         |
| ordem        | int           | Não         |

**🟢 Body da resposta**

Retorna o objeto atualizado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                           |
| --------------------------- | -------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer fila.                      |
| Administração da Associação | Pode atualizar apenas filas da associação.         |
| Administração da Horta      | Pode atualizar apenas filas da horta administrada. |
| Canteirista                 | Sem permissão.                                     |
| Dependente                  | Sem permissão.                                     |

---

<h3 id="fila-de-usuarios-delete">📗 Fila de Usuários (DELETE)</h3>

Exclui logicamente uma fila de usuário (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da fila

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Pode excluir qualquer fila.                      |
| Administração da Associação | Pode excluir apenas filas da associação.         |
| Administração da Horta      | Pode excluir apenas filas da horta administrada. |
| Canteirista                 | Sem permissão.                                   |
| Dependente                  | Sem permissão.                                   |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="financeiro-da-associacao">📗 Financeiro da Associação (lançamentos)</h2>

Gerencia os lançamentos financeiros vinculados às associações, permitindo criação, consulta, atualização e exclusão lógica.

---

<h3 id="financeiro-da-associacao-get-list">📗 Financeiro da Associação (lançamentos) (GET)</h3>

Lista todos os lançamentos financeiros da associação.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| valor_em_centavos        | bigint        |
| descricao_do_lancamento  | text          |
| categoria_uuid           | string (UUID) |
| url_anexo                | text          |
| data_do_lancamento       | date          |
| associacao_uuid          | string (UUID) |
| mensalidade_uuid         | string (UUID) |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                |
| --------------------------- | ------------------------------------------------------- |
| Administração da Plataforma | Visualiza todos os lançamentos de todas as associações. |
| Administração da Associação | Visualiza apenas lançamentos da sua associação.         |
| Administração da Horta      | Visualiza apenas lançamentos da sua associação.         |
| Canteirista                 | Visualiza apenas lançamentos da sua associação.         |
| Dependente                  | Visualiza apenas lançamentos da sua associação.         |

---

<h3 id="financeiro-da-associacao-get-uuid">📗 Financeiro da Associação (lançamentos) (GET por UUID)</h3>

Busca um lançamento financeiro específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                              |
| --------------------------- | ------------------------------------- |
| Administração da Plataforma | Pode acessar qualquer lançamento.     |
| Administração da Associação | Apenas lançamentos da sua associação. |
| Administração da Horta      | Apenas lançamentos da sua associação. |
| Canteirista                 | Apenas lançamentos da sua associação. |
| Dependente                  | Apenas lançamentos da sua associação. |

---

<h3 id="financeiro-da-associacao-get-associacao">📗 Financeiro da Associação (lançamentos) (GET) - Por Associacao</h3>

Lista os lançamentos financeiros de uma associação específica.

**🟢 Parâmetro na URL**

- `associacao_uuid` (obrigatório): UUID da associação

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                        |
| --------------------------- | ----------------------------------------------- |
| Administração da Plataforma | Pode listar lançamentos de qualquer associação. |
| Administração da Associação | Apenas lançamentos da sua associação.           |
| Administração da Horta      | Apenas lançamentos da sua associação.           |
| Canteirista                 | Apenas lançamentos da sua associação.           |
| Dependente                  | Apenas lançamentos da sua associação.           |

---

<h3 id="financeiro-da-associacao-post">📗 Financeiro da Associação (lançamentos) (POST)</h3>

Cria um novo lançamento financeiro.

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório |
| ----------------------- | ------------- | ----------- |
| valor_em_centavos       | bigint        | Sim         |
| descricao_do_lancamento | string        | Sim         |
| categoria_uuid          | string (UUID) | Não         |
| url_anexo               | string (URL)  | Não         |
| data_do_lancamento      | date (Y-m-d)  | Sim         |
| associacao_uuid         | string (UUID) | Sim         |
| mensalidade_uuid        | string (UUID) | Não         |

**🟢 Body da resposta**

Retorna o objeto criado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                               |
| --------------------------- | -------------------------------------- |
| Administração da Plataforma | Pode criar para qualquer associação.   |
| Administração da Associação | Pode criar apenas para sua associação. |
| Administração da Horta      | Sem permissão.                         |
| Canteirista                 | Sem permissão.                         |
| Dependente                  | Sem permissão.                         |

---

<h3 id="financeiro-da-associacao-put">📗 Financeiro da Associação (lançamentos) (PUT)</h3>

Atualiza um lançamento financeiro existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório |
| ----------------------- | ------------- | ----------- |
| valor_em_centavos       | bigint        | Não         |
| descricao_do_lancamento | string        | Não         |
| categoria_uuid          | string (UUID) | Não         |
| url_anexo               | string (URL)  | Não         |
| data_do_lancamento      | date (Y-m-d)  | Não         |
| associacao_uuid         | string (UUID) | Não         |
| mensalidade_uuid        | string (UUID) | Não         |

**🟢 Body da resposta**

Retorna o objeto atualizado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                             |
| --------------------------- | ---------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer lançamento.                  |
| Administração da Associação | Pode atualizar apenas lançamentos da sua associação. |
| Administração da Horta      | Sem permissão.                                       |
| Canteirista                 | Sem permissão.                                       |
| Dependente                  | Sem permissão.                                       |

---

<h3 id="financeiro-da-associacao-delete">📗 Financeiro da Associação (lançamentos) (DELETE)</h3>

Realiza exclusão lógica de um lançamento financeiro (marca `excluido = 1`).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                           |
| --------------------------- | -------------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer lançamento.                  |
| Administração da Associação | Pode excluir apenas lançamentos da sua associação. |
| Administração da Horta      | Sem permissão.                                     |
| Canteirista                 | Sem permissão.                                     |
| Dependente                  | Sem permissão.                                     |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="financeiro-da-horta">📗 Financeiro da horta (lançamentos)</h2>

Gerencia lançamentos financeiros relacionados a uma horta específica.

---

<h3 id="financeiro-da-horta-get-list">📗 Financeiro da horta (lançamentos) (GET)</h3>

Lista todos os lançamentos financeiros de hortas, respeitando o escopo do cargo.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| valor_em_centavos        | bigint        |
| descricao_do_lancamento  | string        |
| categoria_uuid           | string (UUID) |
| url_anexo                | string (URL)  |
| data_do_lancamento       | date          |
| horta_uuid               | string (UUID) |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                              |
| --------------------------- | ----------------------------------------------------- |
| Administração da Plataforma | Visualiza lançamentos de todas as hortas.             |
| Administração da Associação | Visualiza lançamentos apenas de hortas da associação. |
| Administração da Horta      | Visualiza lançamentos apenas da horta que administra. |
| Canteirista                 | Visualiza lançamentos apenas da sua horta.            |
| Dependente                  | Visualiza lançamentos apenas da sua horta.            |

---

<h3 id="financeiro-da-horta-get-uuid">📗 Financeiro da horta (lançamentos) (GET por UUID)</h3>

Busca um lançamento financeiro específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                        |
| --------------------------- | ----------------------------------------------- |
| Administração da Plataforma | Pode acessar qualquer lançamento.               |
| Administração da Associação | Apenas lançamentos de hortas da sua associação. |
| Administração da Horta      | Apenas lançamentos da sua horta.                |
| Canteirista                 | Apenas lançamentos da sua horta.                |
| Dependente                  | Apenas lançamentos da sua horta.                |

---

<h3 id="financeiro-da-horta-get-horta">📗 Financeiro da horta (lançamentos) (GET) - Por Horta</h3>

Lista os lançamentos financeiros de uma horta específica.

**🟢 Parâmetro na URL**

- `horta_uuid` (obrigatório): UUID da horta.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                     |
| --------------------------- | -------------------------------------------- |
| Administração da Plataforma | Pode listar lançamentos de qualquer horta.   |
| Administração da Associação | Apenas lançamentos das hortas da associação. |
| Administração da Horta      | Apenas lançamentos da horta administrada.    |
| Canteirista                 | Apenas lançamentos da sua horta.             |
| Dependente                  | Apenas lançamentos da sua horta.             |

---

<h3 id="financeiro-da-horta-post">📗 Financeiro da horta (lançamentos) (POST)</h3>

Cria um novo lançamento financeiro para uma horta.

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório |
| ----------------------- | ------------- | ----------- |
| valor_em_centavos       | bigint        | Sim         |
| descricao_do_lancamento | string        | Sim         |
| categoria_uuid          | string (UUID) | Não         |
| url_anexo               | string (URL)  | Não         |
| data_do_lancamento      | date (Y-m-d)  | Sim         |
| horta_uuid              | string (UUID) | Sim         |

**🟢 Body da resposta**

Objeto criado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Pode criar para qualquer horta.                  |
| Administração da Associação | Pode criar apenas para hortas da sua associação. |
| Administração da Horta      | Pode criar apenas para sua horta.                |
| Canteirista                 | Sem permissão.                                   |
| Dependente                  | Sem permissão.                                   |

---

<h3 id="financeiro-da-horta-put">📗 Financeiro da horta (lançamentos) (PUT)</h3>

Atualiza um lançamento financeiro existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro.

**🟢 Body da requisição**

| Campo                   | Tipo          | Obrigatório |
| ----------------------- | ------------- | ----------- |
| valor_em_centavos       | bigint        | Não         |
| descricao_do_lancamento | string        | Não         |
| categoria_uuid          | string (UUID) | Não         |
| url_anexo               | string (URL)  | Não         |
| data_do_lancamento      | date (Y-m-d)  | Não         |
| horta_uuid              | string (UUID) | Não         |

**🟢 Body da resposta**

Objeto atualizado com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                       |
| --------------------------- | -------------------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer lançamento.                            |
| Administração da Associação | Pode atualizar apenas lançamentos de hortas da sua associação. |
| Administração da Horta      | Pode atualizar apenas lançamentos da sua horta.                |
| Canteirista                 | Sem permissão.                                                 |
| Dependente                  | Sem permissão.                                                 |

---

<h3 id="financeiro-da-horta-delete">📗 Financeiro da horta (lançamentos) (DELETE)</h3>

Realiza exclusão lógica de um lançamento financeiro.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do lançamento financeiro.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Pode excluir qualquer lançamento.                            |
| Administração da Associação | Pode excluir apenas lançamentos de hortas da sua associação. |
| Administração da Horta      | Pode excluir apenas lançamentos da sua horta.                |
| Canteirista                 | Sem permissão.                                               |
| Dependente                  | Sem permissão.                                               |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="hortas">📗 Hortas</h2>

Gerencia informações das hortas vinculadas às associações e usuários.

---

<h3 id="hortas-get-list">📗 Hortas (GET)</h3>

Lista todas as hortas disponíveis de acordo com o cargo do usuário.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                     | Tipo          |
| ------------------------- | ------------- |
| uuid                      | string        |
| nome_da_horta             | string        |
| endereco_uuid             | string (UUID) |
| associacao_vinculada_uuid | string (UUID) |
| percentual_taxa_associado | decimal       |
| excluido                  | tinyint       |
| usuario_criador_uuid      | string (UUID) |
| data_de_criacao           | timestamp     |
| usuario_alterador_uuid    | string (UUID) |
| data_de_ultima_alteracao  | timestamp     |
| tipo_de_liberacao         | string        |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                         |
| --------------------------- | -------------------------------- |
| Administração da Plataforma | Pode visualizar todas as hortas. |
| Administração da Associação | Apenas hortas da sua associação. |
| Administração da Horta      | Apenas sua própria horta.        |
| Canteirista                 | Apenas sua própria horta.        |
| Dependente                  | Apenas sua própria horta.        |

---

<h3 id="hortas-get-uuid">📗 Hortas (GET por UUID)</h3>

Busca uma horta específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da horta.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                |
| --------------------------- | --------------------------------------- |
| Administração da Plataforma | Pode acessar qualquer horta.            |
| Administração da Associação | Apenas hortas da associação do usuário. |
| Administração da Horta      | Apenas sua própria horta.               |
| Canteirista                 | Apenas sua própria horta.               |
| Dependente                  | Apenas sua própria horta.               |

---

<h3 id="hortas-post">📗 Hortas (POST)</h3>

Cria uma nova horta no sistema.

**🟢 Body da requisição**

| Campo                     | Tipo          | Obrigatório                                                       |
| ------------------------- | ------------- | ----------------------------------------------------------------- |
| nome_da_horta             | string        | Sim                                                               |
| percentual_taxa_associado | decimal       | Sim                                                               |
| associacao_vinculada_uuid | string (UUID) | Sim (Admin Plataforma) / Associacao do usuário (Admin Associação) |
| tipo_de_liberacao         | string        | Sim                                                               |
| endereco_uuid             | string (UUID) | Sim                                                               |

**🟢 Body da resposta**

Objeto criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                        |
| --------------------------- | ----------------------------------------------- |
| Administração da Plataforma | Pode criar hortas para qualquer associação.     |
| Administração da Associação | Só pode criar hortas para a própria associação. |
| Administração da Horta      | Sem permissão.                                  |
| Canteirista                 | Sem permissão.                                  |
| Dependente                  | Sem permissão.                                  |

---

<h3 id="hortas-put">📗 Hortas (PUT)</h3>

Atualiza informações de uma horta existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da horta.

**🟢 Body da requisição**

| Campo                     | Tipo          | Obrigatório |
| ------------------------- | ------------- | ----------- |
| nome_da_horta             | string        | Não         |
| percentual_taxa_associado | decimal       | Não         |
| associacao_vinculada_uuid | string (UUID) | Não         |
| tipo_de_liberacao         | string        | Não         |
| endereco_uuid             | string (UUID) | Não         |

**🟢 Body da resposta**

Objeto atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                        |
| --------------------------- | ----------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer horta.                  |
| Administração da Associação | Pode atualizar apenas hortas da sua associação. |
| Administração da Horta      | Pode atualizar apenas sua própria horta.        |
| Canteirista                 | Sem permissão.                                  |
| Dependente                  | Sem permissão.                                  |

---

<h3 id="hortas-delete">📗 Hortas (DELETE)</h3>

Realiza exclusão lógica de uma horta.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da horta.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                      |
| --------------------------- | --------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer horta.                  |
| Administração da Associação | Pode excluir apenas hortas da sua associação. |
| Administração da Horta      | Pode excluir apenas sua própria horta.        |
| Canteirista                 | Sem permissão.                                |
| Dependente                  | Sem permissão.                                |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="mensalidades-da-associacao">📗 Mensalidades da Associação</h2>

Gerencia mensalidades vinculadas a usuários e associações, com controle de acesso baseado no cargo do usuário.

---

<h3 id="mensalidades-da-associacao-get-list">📗 Mensalidades da Associação (GET)</h3>

Lista todas as mensalidades disponíveis de acordo com o cargo do usuário.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| usuario_uuid             | string (UUID) |
| associacao_uuid          | string (UUID) |
| valor_em_centavos        | bigint        |
| data_vencimento          | date          |
| data_pagamento           | date          |
| status                   | tinyint       |
| dias_atraso              | int           |
| url_anexo                | text          |
| url_recibo               | string        |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                             |
| --------------------------- | ---------------------------------------------------- |
| Administração da Plataforma | Visualiza todas as mensalidades.                     |
| Administração da Associação | Visualiza apenas mensalidades da própria associação. |
| Administração da Horta      | Visualiza mensalidades de usuários da própria horta. |
| Canteirista                 | Visualiza apenas suas próprias mensalidades.         |
| Dependente                  | Visualiza apenas suas próprias mensalidades.         |

---

<h3 id="mensalidades-da-associacao-get-uuid">📗 Mensalidades da Associação (GET por UUID)</h3>

Busca uma mensalidade específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                          |
| --------------------------- | ------------------------------------------------- |
| Administração da Plataforma | Pode acessar qualquer mensalidade.                |
| Administração da Associação | Apenas mensalidades da própria associação.        |
| Administração da Horta      | Apenas mensalidades de usuários da própria horta. |
| Canteirista                 | Apenas suas próprias mensalidades.                |
| Dependente                  | Apenas suas próprias mensalidades.                |

---

<h3 id="mensalidades-da-associacao-get-associacao">📗 Mensalidades da Associação (GET por Associação UUID)</h3>

Lista mensalidades filtradas por associação.

**🟢 Parâmetro na URL**

- `associacao_uuid` (obrigatório): UUID da associação.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                               |
| --------------------------- | ---------------------------------------------------------------------- |
| Administração da Plataforma | Pode acessar mensalidades de qualquer associação.                      |
| Administração da Associação | Apenas mensalidades da própria associação.                             |
| Administração da Horta      | Apenas mensalidades de usuários da própria horta dentro da associação. |
| Canteirista                 | Apenas suas próprias mensalidades dentro da associação.                |
| Dependente                  | Apenas suas próprias mensalidades dentro da associação.                |

---

<h3 id="mensalidades-da-associacao-get-usuario">📗 Mensalidades da Associação (GET por Usuário UUID)</h3>

Lista mensalidades filtradas por usuário.

**🟢 Parâmetro na URL**

- `usuario_uuid` (obrigatório): UUID do usuário.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                               |
| --------------------------- | ------------------------------------------------------ |
| Administração da Plataforma | Pode acessar mensalidades de qualquer usuário.         |
| Administração da Associação | Apenas mensalidades de usuários da própria associação. |
| Administração da Horta      | Apenas mensalidades de usuários da própria horta.      |
| Canteirista                 | Apenas suas próprias mensalidades.                     |
| Dependente                  | Apenas suas próprias mensalidades.                     |

---

<h3 id="mensalidades-da-associacao-post">📗 Mensalidades da Associação (POST)</h3>

Cria uma nova mensalidade.

**🟢 Body da requisição**

| Campo             | Tipo          | Obrigatório                                                    |
| ----------------- | ------------- | -------------------------------------------------------------- |
| valor_em_centavos | int           | Sim                                                            |
| usuario_uuid      | string (UUID) | Sim                                                            |
| associacao_uuid   | string (UUID) | Sim (Admin Plataforma) / própria associação (Admin Associação) |
| data_vencimento   | date          | Sim                                                            |
| data_pagamento    | date          | Não                                                            |
| status            | int           | Sim                                                            |
| dias_atraso       | int           | Não                                                            |
| url_anexo         | string (URL)  | Não                                                            |
| url_recibo        | string (URL)  | Não                                                            |

**🟢 Body da resposta**

Objeto criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                             |
| --------------------------- | ------------------------------------ |
| Administração da Plataforma | Pode criar para qualquer associação. |
| Administração da Associação | Apenas para própria associação.      |
| Administração da Horta      | Sem permissão.                       |
| Canteirista                 | Sem permissão.                       |
| Dependente                  | Sem permissão.                       |

---

<h3 id="mensalidades-da-associacao-put">📗 Mensalidades da Associação (PUT)</h3>

Atualiza uma mensalidade existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

| Campo             | Tipo          | Obrigatório |
| ----------------- | ------------- | ----------- |
| valor_em_centavos | int           | Não         |
| usuario_uuid      | string (UUID) | Não         |
| associacao_uuid   | string (UUID) | Não         |
| data_vencimento   | date          | Não         |
| data_pagamento    | date          | Não         |
| status            | int           | Não         |
| dias_atraso       | int           | Não         |
| url_anexo         | string (URL)  | Não         |
| url_recibo        | string (URL)  | Não         |

**🟢 Body da resposta**

Objeto atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode atualizar qualquer mensalidade.       |
| Administração da Associação | Apenas mensalidades da própria associação. |
| Administração da Horta      | Sem permissão.                             |
| Canteirista                 | Sem permissão.                             |
| Dependente                  | Sem permissão.                             |

---

<h3 id="mensalidades-da-associacao-delete">📗 Mensalidades da Associação (DELETE)</h3>

Exclusão lógica de uma mensalidade.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode excluir qualquer mensalidade.         |
| Administração da Associação | Apenas mensalidades da própria associação. |
| Administração da Horta      | Sem permissão.                             |
| Canteirista                 | Sem permissão.                             |
| Dependente                  | Sem permissão.                             |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="mensalidades-da-plataforma">📗 Mensalidades da Plataforma</h2>

Gerencia mensalidades da plataforma, vinculadas a usuários e planos, com controle de acesso baseado no cargo.

---

<h3 id="mensalidades-da-plataforma-get-list">📗 Mensalidades da Plataforma (GET)</h3>

Lista todas as mensalidades disponíveis (apenas para Admin Plataforma e Admin Associação).

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| usuario_uuid             | string (UUID) |
| valor_em_centavos        | bigint        |
| plano_uuid               | string (UUID) |
| data_vencimento          | date          |
| data_pagamento           | date          |
| status                   | tinyint       |
| dias_atraso              | int           |
| url_anexo                | text          |
| url_recibo               | string        |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                         |
| --------------------------- | -------------------------------- |
| Administração da Plataforma | Visualiza todas as mensalidades. |
| Administração da Associação | Visualiza todas as mensalidades. |
| Administração da Horta      | Sem permissão.                   |
| Canteirista                 | Sem permissão.                   |
| Dependente                  | Sem permissão.                   |

---

<h3 id="mensalidades-da-plataforma-get-uuid">📗 Mensalidades da Plataforma (GET por UUID)</h3>

Busca uma mensalidade específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                           |
| --------------------------- | ---------------------------------- |
| Administração da Plataforma | Pode acessar qualquer mensalidade. |
| Administração da Associação | Pode acessar qualquer mensalidade. |
| Administração da Horta      | Sem permissão.                     |
| Canteirista                 | Sem permissão.                     |
| Dependente                  | Sem permissão.                     |

---

<h3 id="mensalidades-da-plataforma-get-usuario">📗 Mensalidades da Plataforma (GET por Usuário UUID)</h3>

Lista mensalidades filtradas por usuário (apenas Admin Plataforma).

**🟢 Parâmetro na URL**

- `usuario_uuid` (obrigatório): UUID do usuário.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                       |
| --------------------------- | ---------------------------------------------- |
| Administração da Plataforma | Pode acessar mensalidades de qualquer usuário. |
| Administração da Associação | Sem permissão.                                 |
| Administração da Horta      | Sem permissão.                                 |
| Canteirista                 | Sem permissão.                                 |
| Dependente                  | Sem permissão.                                 |

---

<h3 id="mensalidades-da-plataforma-post">📗 Mensalidades da Plataforma (POST)</h3>

Cria uma nova mensalidade.

**🟢 Body da requisição**

| Campo             | Tipo          | Obrigatório                                |
| ----------------- | ------------- | ------------------------------------------ |
| valor_em_centavos | int           | Sim                                        |
| usuario_uuid      | string (UUID) | Sim                                        |
| plano_uuid        | string (UUID) | Não                                        |
| data_vencimento   | date          | Sim (Admin Plataforma) / Não (NEW_ACCOUNT) |
| data_pagamento    | date          | Sim (Admin Plataforma) / Não (NEW_ACCOUNT) |
| status            | int           | Sim (Admin Plataforma) / Não (NEW_ACCOUNT) |
| dias_atraso       | int           | Não                                        |
| url_anexo         | string (URL)  | Não                                        |
| url_recibo        | string (URL)  | Não                                        |

**🟢 Body da resposta**

Objeto criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Administração da Plataforma | Pode criar mensalidades para qualquer usuário. Todos os campos podem ser informados.                                   |
| NEW_ACCOUNT                 | Pode criar mensalidade com `valor_em_centavos`, `usuario_uuid` e `plano_uuid`. Campos de datas e status são opcionais. |
| Administração da Associação | Sem permissão.                                                                                                         |
| Administração da Horta      | Sem permissão.                                                                                                         |
| Canteirista                 | Sem permissão.                                                                                                         |
| Dependente                  | Sem permissão.                                                                                                         |

---

<h3 id="mensalidades-da-plataforma-put">📗 Mensalidades da Plataforma (PUT)</h3>

Atualiza uma mensalidade existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

| Campo             | Tipo          | Obrigatório |
| ----------------- | ------------- | ----------- |
| valor_em_centavos | int           | Não         |
| usuario_uuid      | string (UUID) | Não         |
| plano_uuid        | string (UUID) | Não         |
| data_vencimento   | date          | Não         |
| data_pagamento    | date          | Não         |
| status            | int           | Não         |
| dias_atraso       | int           | Não         |
| url_anexo         | string (URL)  | Não         |
| url_recibo        | string (URL)  | Não         |

**🟢 Body da resposta**

Objeto atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                             |
| --------------------------- | ------------------------------------ |
| Administração da Plataforma | Pode atualizar qualquer mensalidade. |
| Administração da Associação | Sem permissão.                       |
| Administração da Horta      | Sem permissão.                       |
| Canteirista                 | Sem permissão.                       |
| Dependente                  | Sem permissão.                       |

---

<h3 id="mensalidades-da-plataforma-delete">📗 Mensalidades da Plataforma (DELETE)</h3>

Exclusão lógica de uma mensalidade.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da mensalidade.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                           |
| --------------------------- | ---------------------------------- |
| Administração da Plataforma | Pode excluir qualquer mensalidade. |
| Administração da Associação | Sem permissão.                     |
| Administração da Horta      | Sem permissão.                     |
| Canteirista                 | Sem permissão.                     |
| Dependente                  | Sem permissão.                     |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="permissoes">📗 Permissões de cargo</h2>

Gerencia as permissões atribuídas a cada cargo, com controle de acesso baseado no cargo do usuário logado.

---

<h3 id="permissoes-de-cargo-get-uuid">📗 Permissões de cargo (GET por UUID)</h3>

Busca uma permissão específica de cargo pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de cargo

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| cargo_uuid               | string (UUID) |
| permissao_uuid           | string (UUID) |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                |
| --------------------------- | ------------------------------------------------------- |
| Administração da Plataforma | Acesso completo. Visualiza qualquer permissão de cargo. |
| Administração da Associação | Sem permissão. Lança exceção.                           |
| Administração da Horta      | Sem permissão. Lança exceção.                           |
| Canteirista                 | Sem permissão. Lança exceção.                           |
| Dependente                  | Sem permissão. Lança exceção.                           |

---

<h3 id="permissoes-de-cargo-get-cargo">📗 Permissões de cargo (GET) - Por Cargo</h3>

Lista todas as permissões atribuídas a um cargo específico.

**🟢 Parâmetro na URL**

- `cargo_uuid` (obrigatório): UUID do cargo

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode acessar permissões de qualquer cargo. |
| Administração da Associação | Sem permissão. Lança exceção.              |
| Administração da Horta      | Sem permissão. Lança exceção.              |
| Canteirista                 | Sem permissão. Lança exceção.              |
| Dependente                  | Sem permissão. Lança exceção.              |

---

<h3 id="permissoes-de-cargo-post">📗 Permissões de cargo (POST)</h3>

Cria uma nova permissão para um cargo.

**🟢 Body da requisição**

| Campo          | Tipo          | Obrigatório |
| -------------- | ------------- | ----------- |
| cargo_uuid     | string (UUID) | Sim         |
| permissao_uuid | string (UUID) | Sim         |

**🟢 Body da resposta**

Objeto criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                  |
| --------------------------- | ----------------------------------------- |
| Administração da Plataforma | Pode criar permissão para qualquer cargo. |
| Administração da Associação | Sem permissão. Lança exceção.             |
| Administração da Horta      | Sem permissão. Lança exceção.             |
| Canteirista                 | Sem permissão. Lança exceção.             |
| Dependente                  | Sem permissão. Lança exceção.             |

---

<h3 id="permissoes-de-cargo-put">📗 Permissões de cargo (PUT)</h3>

Atualiza uma permissão existente de cargo.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de cargo

**🟢 Body da requisição**

| Campo          | Tipo          | Obrigatório |
| -------------- | ------------- | ----------- |
| cargo_uuid     | string (UUID) | Não         |
| permissao_uuid | string (UUID) | Não         |

**🟢 Body da resposta**

Objeto atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                    |
| --------------------------- | ------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer permissão de cargo. |
| Administração da Associação | Sem permissão. Lança exceção.               |
| Administração da Horta      | Sem permissão. Lança exceção.               |
| Canteirista                 | Sem permissão. Lança exceção.               |
| Dependente                  | Sem permissão. Lança exceção.               |

---

<h3 id="permissoes-de-cargo-delete">📗 Permissões de cargo (DELETE)</h3>

Exclusão lógica de uma permissão de cargo.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de cargo

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                  |
| --------------------------- | ----------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer permissão de cargo. |
| Administração da Associação | Sem permissão. Lança exceção.             |
| Administração da Horta      | Sem permissão. Lança exceção.             |
| Canteirista                 | Sem permissão. Lança exceção.             |
| Dependente                  | Sem permissão. Lança exceção.             |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="permissoes-de-excecao">📗 Permissões de exceção</h2>

Gerencia permissões de exceção atribuídas a usuários específicos.

---

<h3 id="permissoes-de-excecao-get-list">📗 Permissões de exceção (GET)</h3>

Lista todas as permissões de exceção.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de objetos com os campos da listagem.

| Campo                    | Tipo          |
| ------------------------ | ------------- |
| uuid                     | string        |
| usuario_uuid             | string (UUID) |
| permissao_uuid           | string (UUID) |
| liberado                 | tinyint       |
| excluido                 | tinyint       |
| usuario_criador_uuid     | string (UUID) |
| data_de_criacao          | timestamp     |
| usuario_alterador_uuid   | string (UUID) |
| data_de_ultima_alteracao | timestamp     |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                  |
| --------------------------- | ----------------------------------------- |
| Administração da Plataforma | Visualiza todas as permissões de exceção. |
| Administração da Associação | Sem permissão. Lança exceção.             |
| Administração da Horta      | Sem permissão. Lança exceção.             |
| Canteirista                 | Sem permissão. Lança exceção.             |
| Dependente                  | Sem permissão. Lança exceção.             |

---

<h3 id="permissoes-de-excecao-get-uuid">📗 Permissões de exceção (GET por UUID)</h3>

Busca uma permissão de exceção pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de exceção

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Objeto único com os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Acesso completo a qualquer permissão de exceção. |
| Administração da Associação | Sem permissão. Lança exceção.                    |
| Administração da Horta      | Sem permissão. Lança exceção.                    |
| Canteirista                 | Sem permissão. Lança exceção.                    |
| Dependente                  | Sem permissão. Lança exceção.                    |

---

<h3 id="permissoes-de-excecao-post">📗 Permissões de exceção (POST)</h3>

Cria uma nova permissão de exceção para um usuário.

**🟢 Body da requisição**

| Campo          | Tipo          | Obrigatório |
| -------------- | ------------- | ----------- |
| usuario_uuid   | string (UUID) | Sim         |
| permissao_uuid | string (UUID) | Sim         |
| liberado       | int (0 ou 1)  | Sim         |

**🟢 Body da resposta**

Objeto criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                               |
| --------------------------- | ------------------------------------------------------ |
| Administração da Plataforma | Pode criar permissão de exceção para qualquer usuário. |
| Administração da Associação | Sem permissão. Lança exceção.                          |
| Administração da Horta      | Sem permissão. Lança exceção.                          |
| Canteirista                 | Sem permissão. Lança exceção.                          |
| Dependente                  | Sem permissão. Lança exceção.                          |

---

<h3 id="permissoes-de-excecao-put">📗 Permissões de exceção (PUT)</h3>

Atualiza uma permissão de exceção existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de exceção

**🟢 Body da requisição**

| Campo          | Tipo          | Obrigatório |
| -------------- | ------------- | ----------- |
| usuario_uuid   | string (UUID) | Não         |
| permissao_uuid | string (UUID) | Não         |
| liberado       | int (0 ou 1)  | Não         |

**🟢 Body da resposta**

Objeto atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                      |
| --------------------------- | --------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer permissão de exceção. |
| Administração da Associação | Sem permissão. Lança exceção.                 |
| Administração da Horta      | Sem permissão. Lança exceção.                 |
| Canteirista                 | Sem permissão. Lança exceção.                 |
| Dependente                  | Sem permissão. Lança exceção.                 |

---

<h3 id="permissoes-de-excecao-delete">📗 Permissões de exceção (DELETE)</h3>

Exclusão lógica de uma permissão de exceção.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão de exceção

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                    |
| --------------------------- | ------------------------------------------- |
| Administração da Plataforma | Pode excluir qualquer permissão de exceção. |
| Administração da Associação | Sem permissão. Lança exceção.               |
| Administração da Horta      | Sem permissão. Lança exceção.               |
| Canteirista                 | Sem permissão. Lança exceção.               |
| Dependente                  | Sem permissão. Lança exceção.               |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="permissoes-do-usuario">📗 Permissões do Usuário</h2>

Gerencia e retorna todas as permissões de um usuário, combinando permissões do cargo e exceções individuais.

---

<h3 id="permissoes-do-usuario-get">📗 Permissões do Usuário (GET por Usuário UUID)</h3>

Retorna todas as permissões associadas a um usuário específico.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do usuário

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Lista de uma ou mais permissões do usuário, cada uma com os campos:

| Campo                    | Tipo          | Descrição                                             |
| ------------------------ | ------------- | ----------------------------------------------------- |
| uuid                     | string (UUID) | Identificador único da permissão                      |
| slug                     | string        | Código único da permissão                             |
| tipo                     | int           | Tipo da permissão (0/1/2)                             |
| descricao                | string        | Descrição detalhada da permissão                      |
| modulo                   | int           | Módulo ao qual a permissão pertence                   |
| excluido                 | int           | Indica se a permissão foi excluída (0 = não, 1 = sim) |
| usuario_criador_uuid     | string (UUID) | UUID do usuário que criou a permissão                 |
| data_de_criacao          | timestamp     | Data de criação da permissão                          |
| usuario_alterador_uuid   | string (UUID) | UUID do último usuário que alterou                    |
| data_de_ultima_alteracao | timestamp     | Data da última alteração                              |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Administração da Plataforma | Acesso completo a qualquer usuário. Pode visualizar todas as permissões.                |
| Administração da Associação | Sem permissão. Lança exceção.                                                           |
| Administração da Horta      | Sem permissão. Lança exceção.                                                           |
| Canteirista                 | Visualiza apenas suas próprias permissões. UUID deve coincidir com o do usuário logado. |
| Dependente                  | Visualiza apenas suas próprias permissões. UUID deve coincidir com o do usuário logado. |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="permissoes">📗 Permissões</h2>

Gerencia as permissões do sistema, permitindo listagem, consulta, criação, atualização e exclusão de permissões.

---

<h3 id="permissoes-get-list">📗 Permissões (GET)</h3>

Retorna todas as permissões do sistema que não foram excluídas.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          | Descrição                                             |
| ------------------------ | ------------- | ----------------------------------------------------- |
| uuid                     | string (UUID) | Identificador único da permissão                      |
| slug                     | string        | Código único da permissão                             |
| tipo                     | int           | Tipo da permissão (0 a 255)                           |
| descricao                | string        | Descrição detalhada da permissão                      |
| modulo                   | int           | Módulo ao qual a permissão pertence                   |
| excluido                 | int           | Indica se a permissão foi excluída (0 = não, 1 = sim) |
| usuario_criador_uuid     | string (UUID) | UUID do usuário criador                               |
| data_de_criacao          | timestamp     | Data de criação                                       |
| usuario_alterador_uuid   | string (UUID) | UUID do último usuário que alterou                    |
| data_de_ultima_alteracao | timestamp     | Data da última alteração                              |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                        |
| --------------------------- | ----------------------------------------------- |
| Administração da Plataforma | Acesso completo. Visualiza todas as permissões. |
| Administração da Associação | Sem permissão. Lança exceção.                   |
| Administração da Horta      | Sem permissão. Lança exceção.                   |
| Canteirista                 | Sem permissão. Lança exceção.                   |
| Dependente                  | Sem permissão. Lança exceção.                   |

---

<h3 id="permissoes-get-uuid">📗 Permissões (GET por UUID)</h3>

Busca uma permissão específica pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          | Descrição                                             |
| ------------------------ | ------------- | ----------------------------------------------------- |
| uuid                     | string (UUID) | Identificador único da permissão                      |
| slug                     | string        | Código único da permissão                             |
| tipo                     | int           | Tipo da permissão (0 a 255)                           |
| descricao                | string        | Descrição detalhada da permissão                      |
| modulo                   | int           | Módulo ao qual a permissão pertence                   |
| excluido                 | int           | Indica se a permissão foi excluída (0 = não, 1 = sim) |
| usuario_criador_uuid     | string (UUID) | UUID do usuário criador                               |
| data_de_criacao          | timestamp     | Data de criação                                       |
| usuario_alterador_uuid   | string (UUID) | UUID do último usuário que alterou                    |
| data_de_ultima_alteracao | timestamp     | Data da última alteração                              |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                             |
| --------------------------- | ---------------------------------------------------- |
| Administração da Plataforma | Acesso completo. Pode visualizar qualquer permissão. |
| Administração da Associação | Sem permissão. Lança exceção.                        |
| Administração da Horta      | Sem permissão. Lança exceção.                        |
| Canteirista                 | Sem permissão. Lança exceção.                        |
| Dependente                  | Sem permissão. Lança exceção.                        |

---

<h3 id="permissoes-post">📗 Permissões (POST)</h3>

Cria uma nova permissão no sistema.

**🟢 Body da requisição**

| Campo     | Tipo   | Obrigatório   |
| --------- | ------ | ------------- |
| slug      | string | Sim           |
| tipo      | int    | Sim (0 a 255) |
| descricao | string | Não           |
| modulo    | int    | Sim (0 a 255) |

**🟢 Body da resposta**

Retorna o objeto da permissão criada com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                         |
| --------------------------- | ---------------------------------------------------------------- |
| Administração da Plataforma | Pode criar permissões. Todos os campos obrigatórios respeitados. |
| Administração da Associação | Sem permissão. Lança exceção.                                    |
| Administração da Horta      | Sem permissão. Lança exceção.                                    |
| Canteirista                 | Sem permissão. Lança exceção.                                    |
| Dependente                  | Sem permissão. Lança exceção.                                    |

---

<h3 id="permissoes-put">📗 Permissões (PUT)</h3>

Atualiza uma permissão existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão a ser atualizada

**🟢 Body da requisição**

| Campo     | Tipo   | Obrigatório   |
| --------- | ------ | ------------- |
| slug      | string | Não           |
| tipo      | int    | Não (0 a 255) |
| descricao | string | Não           |
| modulo    | int    | Não (0 a 255) |

**🟢 Body da resposta**

Retorna o objeto da permissão atualizada com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                             |
| --------------------------- | ---------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer permissão. Campos opcionais. |
| Administração da Associação | Sem permissão. Lança exceção.                        |
| Administração da Horta      | Sem permissão. Lança exceção.                        |
| Canteirista                 | Sem permissão. Lança exceção.                        |
| Dependente                  | Sem permissão. Lança exceção.                        |

---

<h3 id="permissoes-delete">📗 Permissões (DELETE)</h3>

Realiza exclusão lógica de uma permissão (marca como excluída).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID da permissão a ser excluída

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                       |
| --------------------------- | ---------------------------------------------- |
| Administração da Plataforma | Pode excluir (logicamente) qualquer permissão. |
| Administração da Associação | Sem permissão. Lança exceção.                  |
| Administração da Horta      | Sem permissão. Lança exceção.                  |
| Canteirista                 | Sem permissão. Lança exceção.                  |
| Dependente                  | Sem permissão. Lança exceção.                  |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="planos">📗 Planos</h2>

Gerencia os planos disponíveis na plataforma, incluindo criação, atualização, exclusão e consulta de planos individuais ou por usuário.

---

<h3 id="planos-get-list">📗 Planos (GET)</h3>

Retorna todos os planos ativos da plataforma.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          | Descrição                                 |
| ------------------------ | ------------- | ----------------------------------------- |
| uuid                     | string (UUID) | Identificador único do plano              |
| codigo                   | int           | Código do plano                           |
| slug                     | string        | Código único textual do plano             |
| valor_em_centavos        | int           | Valor do plano em centavos                |
| nome                     | string        | Nome do plano                             |
| descricao                | string        | Descrição do plano                        |
| excluido                 | int           | Indica exclusão (0 = ativo, 1 = excluído) |
| usuario_criador_uuid     | string (UUID) | UUID do usuário que criou                 |
| data_de_criacao          | timestamp     | Data de criação                           |
| usuario_alterador_uuid   | string (UUID) | UUID do último usuário que alterou        |
| data_de_ultima_alteracao | timestamp     | Data da última alteração                  |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                    |
| --------------------------- | ------------------------------------------- |
| Administração da Plataforma | Acesso completo. Visualiza todos os planos. |
| Administração da Associação | Sem permissão. Lança exceção.               |
| Administração da Horta      | Sem permissão. Lança exceção.               |
| Canteirista                 | Sem permissão. Lança exceção.               |
| Dependente                  | Sem permissão. Lança exceção.               |

---

<h3 id="planos-get-uuid">📗 Planos (GET por UUID)</h3>

Busca um plano específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do plano

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesmos campos retornados no GET geral.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Acesso completo. Pode visualizar qualquer plano. |
| Administração da Associação | Sem permissão. Lança exceção.                    |
| Administração da Horta      | Sem permissão. Lança exceção.                    |
| Canteirista                 | Sem permissão. Lança exceção.                    |
| Dependente                  | Sem permissão. Lança exceção.                    |

---

<h3 id="planos-get-usuario">📗 Planos (GET) - Por Usuario</h3>

Consulta o plano associado a um usuário específico.

**🟢 Parâmetro na URL**

- `usuario_uuid` (obrigatório): UUID do usuário

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo      | Tipo          | Descrição                          |
| ---------- | ------------- | ---------------------------------- |
| plano_uuid | string (UUID) | UUID do plano associado ao usuário |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Pode consultar qualquer usuário e ver seu plano. |
| Administração da Associação | Sem permissão. Lança exceção.                    |
| Administração da Horta      | Sem permissão. Lança exceção.                    |
| Canteirista                 | Sem permissão. Lança exceção.                    |
| Dependente                  | Sem permissão. Lança exceção.                    |

---

<h3 id="planos-post">📗 Planos (POST)</h3>

Cria um novo plano na plataforma.

**🟢 Body da requisição**

| Campo             | Tipo   | Obrigatório |
| ----------------- | ------ | ----------- |
| codigo            | int    | Sim         |
| slug              | string | Sim         |
| valor_em_centavos | int    | Sim         |
| nome              | string | Sim         |
| descricao         | string | Sim         |

**🟢 Body da resposta**

Retorna o objeto do plano criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Administração da Plataforma | Pode criar planos. Todos os campos obrigatórios respeitados. |
| Administração da Associação | Sem permissão. Lança exceção.                                |
| Administração da Horta      | Sem permissão. Lança exceção.                                |
| Canteirista                 | Sem permissão. Lança exceção.                                |
| Dependente                  | Sem permissão. Lança exceção.                                |

---

<h3 id="planos-put">📗 Planos (PUT)</h3>

Atualiza um plano existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do plano a ser atualizado

**🟢 Body da requisição**

| Campo             | Tipo   | Obrigatório |
| ----------------- | ------ | ----------- |
| codigo            | int    | Não         |
| slug              | string | Não         |
| valor_em_centavos | int    | Não         |
| nome              | string | Não         |
| descricao         | string | Não         |

**🟢 Body da resposta**

Retorna o objeto do plano atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Pode atualizar qualquer plano. Campos opcionais. |
| Administração da Associação | Sem permissão. Lança exceção.                    |
| Administração da Horta      | Sem permissão. Lança exceção.                    |
| Canteirista                 | Sem permissão. Lança exceção.                    |
| Dependente                  | Sem permissão. Lança exceção.                    |

---

<h3 id="planos-delete">📗 Planos (DELETE)</h3>

Realiza exclusão lógica de um plano (marca como excluído).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do plano a ser excluído

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode excluir (logicamente) qualquer plano. |
| Administração da Associação | Sem permissão. Lança exceção.              |
| Administração da Horta      | Sem permissão. Lança exceção.              |
| Canteirista                 | Sem permissão. Lança exceção.              |
| Dependente                  | Sem permissão. Lança exceção.              |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="recursos-do-plano">📗 Recursos do plano</h2>

Gerencia os recursos associados aos planos da plataforma, incluindo criação, atualização, exclusão e consulta de recursos individuais ou por plano.

---

<h3 id="recursos-do-plano-get-list">📗 Recursos do plano (GET)</h3>

Retorna todos os recursos ativos cadastrados na plataforma.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                    | Tipo          | Descrição                                 |
| ------------------------ | ------------- | ----------------------------------------- |
| uuid                     | string (UUID) | Identificador único do recurso do plano   |
| plano_uuid               | string (UUID) | UUID do plano associado                   |
| nome_do_recurso          | string        | Nome do recurso                           |
| quantidade               | int           | Quantidade do recurso                     |
| descricao                | string        | Descrição detalhada do recurso            |
| excluido                 | int           | Indica exclusão (0 = ativo, 1 = excluído) |
| usuario_criador_uuid     | string (UUID) | UUID do usuário que criou                 |
| data_de_criacao          | timestamp     | Data de criação                           |
| usuario_alterador_uuid   | string (UUID) | UUID do último usuário que alterou        |
| data_de_ultima_alteracao | timestamp     | Data da última alteração                  |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                               |
| --------------------------- | ------------------------------------------------------ |
| Administração da Plataforma | Acesso completo. Visualiza todos os recursos do plano. |
| Administração da Associação | Sem permissão. Lança exceção.                          |
| Administração da Horta      | Sem permissão. Lança exceção.                          |
| Canteirista                 | Sem permissão. Lança exceção.                          |
| Dependente                  | Sem permissão. Lança exceção.                          |

---

<h3 id="recursos-do-plano-get-uuid">📗 Recursos do plano (GET por UUID)</h3>

Busca um recurso específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do recurso do plano

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesmos campos retornados no GET geral.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                   |
| --------------------------- | ------------------------------------------ |
| Administração da Plataforma | Pode visualizar qualquer recurso do plano. |
| Administração da Associação | Sem permissão. Lança exceção.              |
| Administração da Horta      | Sem permissão. Lança exceção.              |
| Canteirista                 | Sem permissão. Lança exceção.              |
| Dependente                  | Sem permissão. Lança exceção.              |

---

<h3 id="recursos-do-plano-get-plano">📗 Recursos do plano (GET) - Por Plano</h3>

Consulta todos os recursos associados a um plano específico.

**🟢 Parâmetro na URL**

- `plano_uuid` (obrigatório): UUID do plano

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Mesmos campos do GET geral, retornando múltiplos recursos.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                       |
| --------------------------- | ---------------------------------------------- |
| Administração da Plataforma | Pode consultar qualquer plano e seus recursos. |
| Administração da Associação | Sem permissão. Lança exceção.                  |
| Administração da Horta      | Sem permissão. Lança exceção.                  |
| Canteirista                 | Sem permissão. Lança exceção.                  |
| Dependente                  | Sem permissão. Lança exceção.                  |

---

<h3 id="recursos-do-plano-post">📗 Recursos do plano (POST)</h3>

Cria um novo recurso para um plano existente.

**🟢 Body da requisição**

| Campo           | Tipo          | Obrigatório |
| --------------- | ------------- | ----------- |
| nome_do_recurso | string        | Sim         |
| quantidade      | int           | Sim         |
| descricao       | string        | Sim         |
| plano_uuid      | string (UUID) | Sim         |

**🟢 Body da resposta**

Retorna o objeto do recurso criado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                           |
| --------------------------- | -------------------------------------------------- |
| Administração da Plataforma | Pode criar recursos para qualquer plano existente. |
| Administração da Associação | Sem permissão. Lança exceção.                      |
| Administração da Horta      | Sem permissão. Lança exceção.                      |
| Canteirista                 | Sem permissão. Lança exceção.                      |
| Dependente                  | Sem permissão. Lança exceção.                      |

---

<h3 id="recursos-do-plano-put">📗 Recursos do plano (PUT)</h3>

Atualiza um recurso existente de um plano.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do recurso a ser atualizado

**🟢 Body da requisição**

| Campo           | Tipo          | Obrigatório |
| --------------- | ------------- | ----------- |
| nome_do_recurso | string        | Não         |
| quantidade      | int           | Não         |
| descricao       | string        | Não         |
| plano_uuid      | string (UUID) | Não         |

**🟢 Body da resposta**

Retorna o objeto do recurso atualizado com todos os campos da listagem.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                    |
| --------------------------- | ----------------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer recurso do plano. Campos opcionais. |
| Administração da Associação | Sem permissão. Lança exceção.                               |
| Administração da Horta      | Sem permissão. Lança exceção.                               |
| Canteirista                 | Sem permissão. Lança exceção.                               |
| Dependente                  | Sem permissão. Lança exceção.                               |

---

<h3 id="recursos-do-plano-delete">📗 Recursos do plano (DELETE)</h3>

Realiza exclusão lógica de um recurso do plano (marca como excluído).

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do recurso a ser excluído

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                              |
| --------------------------- | ----------------------------------------------------- |
| Administração da Plataforma | Pode excluir (logicamente) qualquer recurso do plano. |
| Administração da Associação | Sem permissão. Lança exceção.                         |
| Administração da Horta      | Sem permissão. Lança exceção.                         |
| Canteirista                 | Sem permissão. Lança exceção.                         |
| Dependente                  | Sem permissão. Lança exceção.                         |

<!-- --------------------------------------------------------------------------------------------  -->
<h2 id="usuarios">📗 Usuarios (GET) </h2>

Gerenciamento de usuários do sistema.

---

<h3 id="usuarios-get-list">📗 Usuarios (GET)</h3>

Lista todos os usuários conforme permissão do cargo.

**🟢 Parâmetro na URL**

Não se aplica.

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

| Campo                      | Tipo          |
| -------------------------- | ------------- |
| uuid                       | string (UUID) |
| nome_completo              | string        |
| cpf                        | string        |
| email                      | string        |
| data_de_nascimento         | date          |
| cargo_uuid                 | string (UUID) |
| taxa_associado_em_centavos | int           |
| endereco_uuid              | string (UUID) |
| associacao_uuid            | string (UUID) |
| horta_uuid                 | string (UUID) |
| usuario_associado_uuid     | string (UUID) |
| status_de_acesso           | int           |
| responsavel_da_conta       | int           |
| data_bloqueio_acesso       | timestamp     |
| motivo_bloqueio_acesso     | string        |
| excluido                   | int           |
| usuario_criador_uuid       | string (UUID) |
| data_de_criacao            | timestamp     |
| usuario_alterador_uuid     | string (UUID) |
| data_de_ultima_alteracao   | timestamp     |
| apelido                    | string        |
| dias_ausente               | int           |
| chave_uuid                 | string (UUID) |

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                         |
| --------------------------- | ------------------------------------------------ |
| Administração da Plataforma | Acesso completo. Visualiza todos os usuários.    |
| Administração da Associação | Visualiza apenas usuários da própria associação. |
| Administração da Horta      | Visualiza apenas usuários da própria horta.      |
| Canteirista                 | Sem permissão. Lança exceção.                    |
| Dependente                  | Sem permissão. Lança exceção.                    |

---

<h3 id="usuarios-get-uuid">📗 Usuarios (GET por UUID)</h3>

Busca um usuário específico pelo UUID.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do usuário

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna objeto único com os mesmos campos do GET geral.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                           |
| --------------------------- | ---------------------------------- |
| Administração da Plataforma | Pode acessar qualquer usuário.     |
| Administração da Associação | Só usuários da própria associação. |
| Administração da Horta      | Só usuários da própria horta.      |
| Canteirista                 | Sem permissão. Lança exceção.      |
| Dependente                  | Sem permissão. Lança exceção.      |

---

<h3 id="usuarios-post">📗 Usuarios (POST)</h3>

Cria um novo usuário.

**🟢 Body da requisição**

| Campo                      | Tipo          | Obrigatório |
| -------------------------- | ------------- | ----------- |
| nome_completo              | string        | Sim         |
| cpf                        | string        | Sim         |
| email                      | string        | Sim         |
| senha                      | string        | Sim         |
| data_de_nascimento         | date          | Sim         |
| apelido                    | string        | Sim         |
| dias_ausente               | int           | Não         |
| taxa_associado_em_centavos | int           | Não         |
| associacao_uuid            | string (UUID) | Condicional |
| horta_uuid                 | string (UUID) | Condicional |
| cargo_uuid                 | string (UUID) | Não         |
| chave_uuid                 | string (UUID) | Não         |
| endereco_uuid              | string (UUID) | Não         |

**🟢 Body da resposta**

Retorna o usuário criado com todos os campos do GET geral.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Administração da Plataforma | Pode criar usuários com qualquer associação, horta ou cargo.                              |
| Administração da Associação | Só pode criar usuários da própria associação; horta e chave devem pertencer à associação. |
| Administração da Horta      | Só pode criar usuários da própria horta; horta e chave fixas na horta do admin.           |
| Canteirista                 | Sem permissão. Lança exceção.                                                             |
| Dependente                  | Sem permissão. Lança exceção.                                                             |

---

<h3 id="usuarios-put">📗 Usuarios (PUT)</h3>

Atualiza um usuário existente.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do usuário a ser atualizado

**🟢 Body da requisição**

| Campo                      | Tipo          | Obrigatório |
| -------------------------- | ------------- | ----------- |
| nome_completo              | string        | Não         |
| cpf                        | string        | Não         |
| email                      | string        | Não         |
| senha                      | string        | Não         |
| data_de_nascimento         | date          | Não         |
| apelido                    | string        | Não         |
| dias_ausente               | int           | Não         |
| taxa_associado_em_centavos | int           | Não         |
| associacao_uuid            | string (UUID) | Condicional |
| horta_uuid                 | string (UUID) | Condicional |
| cargo_uuid                 | string (UUID) | Não         |
| chave_uuid                 | string (UUID) | Não         |
| endereco_uuid              | string (UUID) | Não         |

**🟢 Body da resposta**

Retorna o usuário atualizado com todos os campos do GET geral.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| Administração da Plataforma | Pode atualizar qualquer usuário.                                                |
| Administração da Associação | Só usuários da própria associação; associação não pode ser alterada para outra. |
| Administração da Horta      | Só usuários da própria horta; horta e chave não podem ser alteradas para outra. |
| Canteirista                 | Sem permissão. Lança exceção.                                                   |
| Dependente                  | Sem permissão. Lança exceção.                                                   |

---

<h3 id="usuarios-delete">📗 Usuarios (DELETE)</h3>

Realiza exclusão lógica de um usuário.

**🟢 Parâmetro na URL**

- `uuid` (obrigatório): UUID do usuário a ser excluído

**🟢 Body da requisição**

Não se aplica.

**🟢 Body da resposta**

Retorna `true` em caso de sucesso ou `false` em caso de falha.

**🟢 Escopo por cargo**

| Cargo                       | Contexto                           |
| --------------------------- | ---------------------------------- |
| Administração da Plataforma | Pode excluir qualquer usuário.     |
| Administração da Associação | Só usuários da própria associação. |
| Administração da Horta      | Só usuários da própria horta.      |
| Canteirista                 | Sem permissão. Lança exceção.      |
| Dependente                  | Sem permissão. Lança exceção.      |

<!-- --------------------------------------------------------------------------------------------  -->

<h2 id="seeds">🎲 Seeds do Banco </h2>  

## 🌱 Associações

- **Hortas SP**

  - Razão Social: Associação Hortas Urbanas 1
  - CNPJ: 11.111.111/0001-11
  - Endereço: São Paulo - SP

- **Hortas RJ**

  - Razão Social: Associação Hortas Urbanas 2
  - CNPJ: 22.222.222/0001-22
  - Endereço: Rio de Janeiro - RJ

---

## 🥕 Hortas

- **Horta Comunitária SP**

  - Associação vinculada: Hortas SP
  - Percentual taxa associado: 10%

- **Horta Comunitária RJ**

  - Associação vinculada: Hortas RJ
  - Percentual taxa associado: 12.5%

---

## 👥 Usuários de Teste

| Usuário                | Cargo                  | Email                                                         | Senha      |
| ---------------------- | ---------------------- | ------------------------------------------------------------- | ---------- |
| Carlos Admin SP        | admin_associacao_geral | [admin_assoc_1@example.com](mailto:admin_assoc_1@example.com) | senha12345 |
| Mariana Admin RJ       | admin_associacao_geral | [admin_assoc_2@example.com](mailto:admin_assoc_2@example.com) | senha12345 |
| João Horta SP          | admin_horta_geral      | [admin_horta_1@example.com](mailto:admin_horta_1@example.com) | senha12345 |
| Ana Horta RJ           | admin_horta_geral      | [admin_horta_2@example.com](mailto:admin_horta_2@example.com) | senha12345 |
| Pedro Canteiro SP      | canteirista            | [canteirista_1@example.com](mailto:canteirista_1@example.com) | senha12345 |
| Julia Canteiro RJ      | canteirista            | [canteirista_2@example.com](mailto:canteirista_2@example.com) | senha12345 |
| Lucas Dependente SP    | dependente             | [dependente_1@example.com](mailto:dependente_1@example.com)   | senha12345 |
| Fernanda Dependente RJ | dependente             | [dependente_2@example.com](mailto:dependente_2@example.com)   | senha12345 |
| Dummest Dummy          | dummy                  | [dummy@example.com](mailto:dependente_2@example.com)          | senha12345 |
