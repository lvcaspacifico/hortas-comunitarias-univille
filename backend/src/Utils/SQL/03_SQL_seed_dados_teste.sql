

-- ========================================
-- TRANSAÇÃO SE DER ERRO
-- ========================================
SET autocommit = 0;
START TRANSACTION;

-- ================= Usuário Dummy serve para testar condições na camada de aplicação, terá todas as permissões mas não o cargo =================
-- Precisa atribuir a algum usuário o cargo dummy
-- Adicionar cargo dummy
INSERT INTO cargos (uuid, codigo, slug, nome, descricao, cor, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES (UUID(), 99, 'dummy', 'Dummy Admin', 'Cargo de teste com permissões de admin mas não é admin.', '#00FFFF', 0, NULL, NULL);

-- Permissões para o cargo dummy (já está no seu arquivo, linha após o admin_plataforma)
INSERT INTO permissoes_de_cargo (uuid, cargo_uuid, permissao_uuid, excluido, usuario_criador_uuid, data_de_criacao)
SELECT
    UUID(),
    c.uuid,
    p.uuid,
    0,
    NULL,
    NOW()
FROM cargos c
CROSS JOIN permissoes p
WHERE c.slug = 'dummy'
AND p.slug NOT IN ('sessoes_login', 'sessoes_cadastro');

-- ================= ENDEREÇOS =================
INSERT INTO enderecos (uuid, tipo_logradouro, logradouro, numero, bairro, cidade, estado, cep, excluido)
VALUES 
(UUID(), 'Rua', 'das Palmeiras', '100', 'Centro', 'São Paulo', 'SP', '01001-000', 0),
(UUID(), 'Avenida', 'Brasil', '2000', 'Jardins', 'Rio de Janeiro', 'RJ', '20000-000', 0),
(UUID(), 'Travessa', 'Floriano', '55', 'Boa Vista', 'Curitiba', 'PR', '80000-000', 0);

-- ================= ASSOCIAÇÕES =================
INSERT INTO associacoes (uuid, cnpj, razao_social, nome_fantasia, endereco_uuid,url_estatuto_social_pdf,url_ata_associacao_pdf, status_aprovacao, excluido)
SELECT UUID(), '11.111.111/0001-21', 'Associação Hortas Urbanas 1', 'Hortas SP', e.uuid,"https://www.google.com", "https://www.google.com", 1, 0
FROM enderecos e LIMIT 1;

INSERT INTO associacoes (uuid, cnpj, razao_social, nome_fantasia, endereco_uuid, url_estatuto_social_pdf,url_ata_associacao_pdf, status_aprovacao, excluido)
SELECT UUID(), '22.222.222/0001-23', 'Associação Hortas Urbanas 2', 'Hortas RJ', e.uuid, "https://www.google.com", "https://www.google.com", 1, 0
FROM enderecos e ORDER BY data_de_criacao DESC LIMIT 1;

-- ================= HORTAS =================
INSERT INTO hortas (uuid, nome_da_horta, endereco_uuid, associacao_vinculada_uuid, percentual_taxa_associado, excluido)
SELECT UUID(), 'Horta Comunitária SP', e.uuid, a.uuid, 10.00, 0
FROM enderecos e
JOIN associacoes a ON a.razao_social = 'Associação Hortas Urbanas 1'
LIMIT 1;

INSERT INTO hortas (uuid, nome_da_horta, endereco_uuid, associacao_vinculada_uuid, percentual_taxa_associado, excluido)
SELECT UUID(), 'Horta Comunitária RJ', e.uuid, a.uuid, 12.50, 0
FROM enderecos e
JOIN associacoes a ON a.razao_social = 'Associação Hortas Urbanas 2'
LIMIT 1;

-- ================= USUÁRIOS =================
-- 2 usuários de cada cargo a partir de admin_associacao_geral
-- Cada usuário vinculado a uma associação e horta

-- Admin Associação Geral (2 usuários, 1 em cada associação/horta)
INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Carlos Admin SP', '111.111.111-23', 'admin_assoc_1@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'São Paulo'
JOIN associacoes a ON a.nome_fantasia = 'Hortas SP'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária SP'
WHERE c.slug = 'admin_associacao_geral'
LIMIT 1;

INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Mariana Admin RJ', '222.222.222-23', 'admin_assoc_2@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'Rio de Janeiro'
JOIN associacoes a ON a.nome_fantasia = 'Hortas RJ'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária RJ'
WHERE c.slug = 'admin_associacao_geral'
LIMIT 1;

-- Admin Horta Geral (2 usuários)
INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'João Horta SP', '333.333.333-53', 'admin_horta_1@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'São Paulo'
JOIN associacoes a ON a.nome_fantasia = 'Hortas SP'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária SP'
WHERE c.slug = 'admin_horta_geral'
LIMIT 1;

INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Ana Horta RJ', '444.444.444-94', 'admin_horta_2@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'Rio de Janeiro'
JOIN associacoes a ON a.nome_fantasia = 'Hortas RJ'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária RJ'
WHERE c.slug = 'admin_horta_geral'
LIMIT 1;

-- Canteirista (2 usuários)
INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Pedro Canteiro SP', '555.555.555-15', 'canteirista_1@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'São Paulo'
JOIN associacoes a ON a.nome_fantasia = 'Hortas SP'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária SP'
WHERE c.slug = 'canteirista'
LIMIT 1;

INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Julia Canteiro RJ', '666.666.666-66', 'canteirista_2@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'Rio de Janeiro'
JOIN associacoes a ON a.nome_fantasia = 'Hortas RJ'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária RJ'
WHERE c.slug = 'canteirista'
LIMIT 1;

-- Dependente (2 usuários)
INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Lucas Dependente SP', '717.777.777-17', 'dependente_1@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'São Paulo'
JOIN associacoes a ON a.nome_fantasia = 'Hortas SP'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária SP'
WHERE c.slug = 'dependente'
LIMIT 1;

INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Fernanda Dependente RJ', '888.818.888-88', 'dependente_2@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'Rio de Janeiro'
JOIN associacoes a ON a.nome_fantasia = 'Hortas RJ'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária RJ'
WHERE c.slug = 'dependente'
LIMIT 1;

INSERT INTO usuarios (uuid, nome_completo, cpf, email, senha, cargo_uuid, endereco_uuid, associacao_uuid, horta_uuid, status_de_acesso, excluido)
SELECT UUID(), 'Dummest Dummy', '288.819.888-88', 'dummy@example.com', '$2y$10$TUHWKOcJj85/pMDxEg7eTu3zGDlE2sfOdVn4dfSN5JzMIqssNISYG',
       c.uuid, e.uuid, a.uuid, h.uuid, 'ativo', 0
FROM cargos c
JOIN enderecos e ON e.cidade = 'Rio de Janeiro'
JOIN associacoes a ON a.nome_fantasia = 'Hortas RJ'
JOIN hortas h ON h.nome_da_horta = 'Horta Comunitária RJ'
WHERE c.slug = 'dummy'
LIMIT 1;

-- Chaves
SET @ultimoUserUUID = (SELECT u.uuid FROM usuarios u ORDER BY u.data_de_criacao DESC LIMIT 1);
SET @ultimaHortaUUID = (SELECT h.uuid FROM hortas h ORDER BY h.data_de_criacao DESC LIMIT 1);

INSERT
	INTO
	hortas_dev_db.chaves
(uuid,
	codigo,
	horta_uuid,
	observacoes,
	disponivel,
	excluido,
	usuario_criador_uuid,
	usuario_alterador_uuid,
	data_de_criacao,
	data_de_ultima_alteracao)
VALUES
(UUID(),
'FOO-123',
@ultimaHortaUUID,
'Chave teste',
1,
0,
@ultimoUserUUID,
@ultimoUserUUID,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP);

-- Filas
SET @userAdminUUID = (SELECT u.uuid FROM usuarios u WHERE email = 'hortas_comunitarias@univille.br');

UPDATE usuarios
SET horta_uuid = @ultimaHortaUUID,
    associacao_uuid = (SELECT associacao_vinculada_uuid FROM hortas WHERE uuid = @ultimaHortaUUID),
    endereco_uuid = (SELECT endereco_uuid FROM hortas WHERE uuid = @ultimaHortaUUID)
WHERE uuid = @userAdminUUID;

INSERT INTO hortas_dev_db.fila_de_usuarios
(uuid,
	usuario_uuid,
	horta_uuid,
	data_entrada,
	ordem,
	excluido,
	usuario_criador_uuid,
	data_de_criacao,
	usuario_alterador_uuid,
	data_de_ultima_alteracao)
VALUES(uuid(),
@userAdminUUID,
@ultimaHortaUUID,
CURRENT_TIMESTAMP,
0,
0,
@userAdminUUID,
CURRENT_TIMESTAMP,
@userAdminUUID,
CURRENT_TIMESTAMP);

-- ================= CANTEIROS =================
SET @ultimaHorta1 = (SELECT h.uuid FROM hortas h ORDER BY h.data_de_criacao ASC LIMIT 1);
SET @ultimaHorta2 = (SELECT h.uuid FROM hortas h ORDER BY h.data_de_criacao DESC LIMIT 1);
SET @ultimoUsuario = (SELECT u.uuid FROM usuarios u ORDER BY u.data_de_criacao DESC LIMIT 1);

INSERT INTO canteiros (uuid, numero_identificador, tamanho_m2, horta_uuid, usuario_anterior_uuid, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), 'C-001', 25.50, @ultimaHorta1, NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 'C-002', 30.00, @ultimaHorta2, NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 'C-003', 20.75, @ultimaHorta2, @ultimoUsuario, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= CANTEIROS E USUÁRIOS =================
SET @ultimoCanteiro1 = (SELECT c.uuid FROM canteiros c ORDER BY c.data_de_criacao DESC LIMIT 1 OFFSET 2);
SET @ultimoCanteiro2 = (SELECT c.uuid FROM canteiros c ORDER BY c.data_de_criacao DESC LIMIT 1 OFFSET 1);
SET @ultimoCanteiro3 = (SELECT c.uuid FROM canteiros c ORDER BY c.data_de_criacao DESC LIMIT 1);
SET @usuario1 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'canteirista_1@example.com');
SET @usuario2 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'canteirista_2@example.com');
SET @usuario3 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'admin_horta_1@example.com');

INSERT INTO canteiros_e_usuarios (uuid, canteiro_uuid, usuario_uuid, tipo_vinculo, data_inicio, data_fim, percentual_responsabilidade, observacoes, ativo, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), @ultimoCanteiro1, @usuario1, 1, CURDATE(), NULL, 100.00, 'Proprietário principal do canteiro', 1, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @ultimoCanteiro2, @usuario2, 1, CURDATE(), NULL, 100.00, 'Proprietário principal', 1, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @ultimoCanteiro3, @usuario3, 2, CURDATE(), NULL, 50.00, 'Coproprietário com 50% responsabilidade', 1, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= PERMISSÕES DE EXCEÇÃO =================
SET @permissaoLer = (SELECT p.uuid FROM permissoes p WHERE p.tipo = 0 AND p.modulo = 0 LIMIT 1);
SET @permissaoCriar = (SELECT p.uuid FROM permissoes p WHERE p.tipo = 1 AND p.modulo = 2 LIMIT 1);
SET @permissaoDeletar = (SELECT p.uuid FROM permissoes p WHERE p.tipo = 3 AND p.modulo = 4 LIMIT 1);
SET @usuarioCanteirista = (SELECT u.uuid FROM usuarios u WHERE u.email = 'canteirista_1@example.com');
SET @usuarioDependente = (SELECT u.uuid FROM usuarios u WHERE u.email = 'dependente_1@example.com');

INSERT INTO permissoes_de_excecao (uuid, usuario_uuid, permissao_uuid, liberado, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), @usuarioCanteirista, @permissaoCriar, 1, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @usuarioDependente, @permissaoLer, 1, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @usuarioDependente, @permissaoDeletar, 0, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= CATEGORIAS FINANCEIRAS =================
SET @hortaAdmin = (SELECT horta_uuid FROM usuarios WHERE uuid = @userAdminUUID);
SET @associacaoAdmin = (SELECT associacao_uuid FROM usuarios WHERE uuid = @userAdminUUID);

INSERT INTO categorias_financeiras (uuid, nome, descricao, tipo, cor, icone, associacao_uuid, horta_uuid, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), 'Manutenção', 'Despesas com manutenção de infraestrutura e equipamentos', 2, '#FF6B6B', 'wrench', @associacaoAdmin, @hortaAdmin, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 'Insumos Agrícolas', 'Compra de sementes, fertilizantes e insumos para cultivo', 2, '#4ECDC4', 'nature', @associacaoAdmin, @hortaAdmin, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 'Mensalidade Associado', 'Entrada de mensalidades pagas pelos associados', 1, '#95E1D3', 'dollar-sign', @associacaoAdmin, @hortaAdmin, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= FINANCEIRO DA HORTA =================
SET @categoriaFinanceira = (SELECT cf.uuid FROM categorias_financeiras cf ORDER BY cf.data_de_criacao DESC LIMIT 1);

INSERT INTO financeiro_da_horta (uuid, valor_em_centavos, descricao_do_lancamento, categoria_uuid, url_anexo, data_do_lancamento, horta_uuid, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), 15000, 'Compra de ferramentas para manutenção', @categoriaFinanceira, 'https://example.com/recibo1.pdf', CURDATE(), @ultimaHorta1, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 25000, 'Aquisição de insumos agrícolas', @categoriaFinanceira, 'https://example.com/recibo2.pdf', CURDATE(), @ultimaHorta2, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 8000, 'Manutenção do sistema de irrigação', @categoriaFinanceira, NULL, CURDATE(), @ultimaHorta2, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= FINANCEIRO DA ASSOCIAÇÃO =================
INSERT INTO financeiro_da_associacao (uuid, valor_em_centavos, descricao_do_lancamento, categoria_uuid, url_anexo, data_do_lancamento, associacao_uuid, mensalidade_uuid, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), 50000, 'Pagamento de mensalidade associado', @categoriaFinanceira, 'https://example.com/comprovante1.pdf', CURDATE(), @associacao1, NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 30000, 'Doação de apoiador', @categoriaFinanceira, NULL, CURDATE(), @associacao2, NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), 20000, 'Taxa administrativa', @categoriaFinanceira, 'https://example.com/comprovante2.pdf', CURDATE(), @associacao2, NULL, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= MENSALIDADES DA ASSOCIAÇÃO =================
SET @usuarioMensalidade1 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'canteirista_1@example.com');
SET @usuarioMensalidade2 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'canteirista_2@example.com');
SET @usuarioMensalidade3 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'admin_horta_1@example.com');

INSERT INTO mensalidades_da_associacao (uuid, usuario_uuid, associacao_uuid, valor_em_centavos, data_vencimento, data_pagamento, status, dias_atraso, url_anexo, url_recibo, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), @usuarioMensalidade1, @associacao1, 5000, DATE_ADD(CURDATE(), INTERVAL 10 DAY), NULL, 0, 0, 'https://example.com/boleto1.pdf', NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @usuarioMensalidade2, @associacao2, 5000, DATE_SUB(CURDATE(), INTERVAL 5 DAY), CURDATE(), 2, 0, 'https://example.com/boleto2.pdf', 'https://example.com/recibo_mensalidade.pdf', 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @usuarioMensalidade3, @associacao1, 5000, DATE_SUB(CURDATE(), INTERVAL 15 DAY), NULL, 4, 15, 'https://example.com/boleto3.pdf', NULL, 0, @ultimoUsuario, @ultimoUsuario);

-- ================= RECURSOS DO PLANO =================
SET @planoBronze = (SELECT p.uuid FROM planos p WHERE p.codigo = 0 LIMIT 1);
SET @planoPrata = (SELECT p.uuid FROM planos p WHERE p.codigo = 1 LIMIT 1);
SET @planoOuro = (SELECT p.uuid FROM planos p WHERE p.codigo = 2 LIMIT 1);

INSERT INTO recursos_do_plano (uuid, plano_uuid, nome_do_recurso, quantidade, descricao, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), @planoBronze, 'Usuários Administrativos', 1, 'Quantidade de usuários de cargo administrativo', 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @planoPrata, 'Usuários Administrativos', 2, 'Quantidade de usuários de cargo administrativo', 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @planoOuro, 'Usuários Administrativos', 3, 'Quantidade de usuários de cargo administrativo', 0, @ultimoUsuario, @ultimoUsuario);

-- ================= MENSALIDADES DA PLATAFORMA =================
SET @usuarioResponsavel1 = (SELECT u.uuid FROM usuarios u WHERE u.responsavel_da_conta = 0 ORDER BY u.data_de_criacao DESC LIMIT 1);
SET @usuarioResponsavel2 = (SELECT u.uuid FROM usuarios u WHERE u.email = 'admin_assoc_1@example.com');

INSERT INTO mensalidades_da_plataforma (uuid, usuario_uuid, valor_em_centavos, plano_uuid, data_vencimento, data_pagamento, status, dias_atraso, url_anexo, url_recibo, excluido, usuario_criador_uuid, usuario_alterador_uuid)
VALUES
(UUID(), @usuarioResponsavel2, 15000, @planoPrata, DATE_ADD(CURDATE(), INTERVAL 5 DAY), NULL, 0, 0, 'https://example.com/fatura_plataforma1.pdf', NULL, 0, @ultimoUsuario, @ultimoUsuario),
(UUID(), @usuarioResponsavel1, 20000, @planoOuro, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 'https://example.com/fatura_plataforma2.pdf', 'https://example.com/recibo_plataforma.pdf', 0, @ultimoUsuario, @ultimoUsuario);

COMMIT;