-- CreateTable
CREATE TABLE `sensores` (
    `sensor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sala_id` INTEGER NOT NULL,
    `sensor_name` VARCHAR(255) NOT NULL,
    `sensor_type` VARCHAR(100) NULL,
    `sensor_model` VARCHAR(100) NULL,
    `current_value` DOUBLE NULL,
    `unit_of_measure` VARCHAR(50) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('ativo', 'inativo') NOT NULL,
    `read_interval` INTEGER NULL,
    `operational_range_min` DOUBLE NULL,
    `operational_range_max` DOUBLE NULL,
    `error_code` INTEGER NULL,
    `error_message` VARCHAR(191) NULL,
    `comments` VARCHAR(191) NULL,

    PRIMARY KEY (`sensor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidades` (
    `cidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`cidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `universidades` (
    `universidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `cidade_id` INTEGER NOT NULL,

    PRIMARY KEY (`universidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salas` (
    `sala_id` INTEGER NOT NULL AUTO_INCREMENT,
    `universidade_id` INTEGER NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `capacidade` INTEGER NULL,
    `tipo` ENUM('sala', 'auditorio', 'laboratorio', 'outro') NOT NULL,

    PRIMARY KEY (`sala_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico_sensores` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sensor_id` INTEGER NOT NULL,
    `temperatura` DOUBLE NULL,
    `umidade` DOUBLE NULL,
    `pressao_atmosferica` DOUBLE NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unidade_temperatura` VARCHAR(50) NOT NULL DEFAULT 'Celsius',
    `unidade_umidade` VARCHAR(50) NOT NULL DEFAULT 'Percentual',
    `unidade_pressao` VARCHAR(50) NOT NULL DEFAULT 'hPa',

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sensores` ADD CONSTRAINT `sensores_sala_id_fkey` FOREIGN KEY (`sala_id`) REFERENCES `salas`(`sala_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `universidades` ADD CONSTRAINT `universidades_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidades`(`cidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salas` ADD CONSTRAINT `salas_universidade_id_fkey` FOREIGN KEY (`universidade_id`) REFERENCES `universidades`(`universidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_sensores` ADD CONSTRAINT `historico_sensores_sensor_id_fkey` FOREIGN KEY (`sensor_id`) REFERENCES `sensores`(`sensor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
