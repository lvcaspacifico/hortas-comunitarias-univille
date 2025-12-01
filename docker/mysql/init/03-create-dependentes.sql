-- Criação da tabela dependentes
CREATE TABLE IF NOT EXISTS `dependentes` (
    `uuid` CHAR(36) NOT NULL PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `idade` INT NOT NULL,
    `ativo` TINYINT(1) NOT NULL DEFAULT 1,
    `carteirista_uuid` CHAR(36) NULL,
    `excluido` TINYINT(1) NOT NULL DEFAULT 0,
    `usuario_criador_uuid` CHAR(36) NULL,
    `usuario_alterador_uuid` CHAR(36) NULL,
    `data_de_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `data_de_ultima_alteracao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_excluido` (`excluido`),
    INDEX `idx_carteirista` (`carteirista_uuid`),
    INDEX `idx_usuario_criador` (`usuario_criador_uuid`),
    INDEX `idx_usuario_alterador` (`usuario_alterador_uuid`),
    CONSTRAINT `fk_dependente_carteirista` FOREIGN KEY (`carteirista_uuid`) REFERENCES `carteiristas` (`uuid`) ON DELETE SET NULL,
    CONSTRAINT `fk_dependente_criador` FOREIGN KEY (`usuario_criador_uuid`) REFERENCES `usuarios` (`uuid`) ON DELETE SET NULL,
    CONSTRAINT `fk_dependente_alterador` FOREIGN KEY (`usuario_alterador_uuid`) REFERENCES `usuarios` (`uuid`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
