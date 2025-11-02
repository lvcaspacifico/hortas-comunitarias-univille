CREATE TABLE IF NOT EXISTS `pagamentos` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `carteirista_uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `forma_pagamento` enum('dinheiro','pix') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_pagamento` date NOT NULL,
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `excluido` tinyint NOT NULL DEFAULT '0',
  `usuario_criador_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_de_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_alterador_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_de_ultima_alteracao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `idx_carteirista` (`carteirista_uuid`),
  KEY `idx_excluido` (`excluido`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`carteirista_uuid`) REFERENCES `carteiristas` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela de pagamentos dos carteiristas';
