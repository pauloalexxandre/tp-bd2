/*
  Warnings:

  - You are about to drop the `cidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historico_sensores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `universidades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `historico_sensores` DROP FOREIGN KEY `historico_sensores_sensor_id_fkey`;

-- DropForeignKey
ALTER TABLE `salas` DROP FOREIGN KEY `salas_universidade_id_fkey`;

-- DropForeignKey
ALTER TABLE `sensores` DROP FOREIGN KEY `sensores_sala_id_fkey`;

-- DropForeignKey
ALTER TABLE `universidades` DROP FOREIGN KEY `universidades_cidade_id_fkey`;

-- DropTable
DROP TABLE `cidades`;

-- DropTable
DROP TABLE `historico_sensores`;

-- DropTable
DROP TABLE `salas`;

-- DropTable
DROP TABLE `sensores`;

-- DropTable
DROP TABLE `universidades`;

-- CreateTable
CREATE TABLE `Sensor` (
    `sensor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sala_id` INTEGER NOT NULL,
    `sensor_name` VARCHAR(191) NOT NULL,
    `sensor_type` VARCHAR(191) NULL,
    `sensor_model` VARCHAR(191) NULL,
    `current_value` DOUBLE NULL,
    `unit_of_measure` VARCHAR(191) NULL,
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
CREATE TABLE `Cidade` (
    `cidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `codigo_ibge` INTEGER NULL,
    `populacao` INTEGER NULL,
    `area_km2` DOUBLE NULL,
    `densidade_demografica` DOUBLE NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `status` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `Cidade_codigo_ibge_key`(`codigo_ibge`),
    PRIMARY KEY (`cidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Localidade` (
    `localidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_localidade` VARCHAR(191) NOT NULL,
    `cidade_id` INTEGER NOT NULL,

    PRIMARY KEY (`localidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `sala_id` INTEGER NOT NULL AUTO_INCREMENT,
    `localidade_id` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tamanho` VARCHAR(191) NULL,
    `tipo_sala` VARCHAR(191) NULL,

    PRIMARY KEY (`sala_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoricoSensor` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sensor_id` INTEGER NOT NULL,
    `temperatura` DOUBLE NULL,
    `umidade` DOUBLE NULL,
    `pressao_atmosferica` DOUBLE NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unidade_temperatura` VARCHAR(191) NOT NULL DEFAULT 'Celsius',
    `unidade_umidade` VARCHAR(191) NOT NULL DEFAULT 'Percentual',
    `unidade_pressao` VARCHAR(191) NOT NULL DEFAULT 'hPa',

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LocalidadeCidade` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LocalidadeCidade_AB_unique`(`A`, `B`),
    INDEX `_LocalidadeCidade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sensor` ADD CONSTRAINT `Sensor_sala_id_fkey` FOREIGN KEY (`sala_id`) REFERENCES `Sala`(`sala_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Localidade` ADD CONSTRAINT `Localidade_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `Cidade`(`cidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala` ADD CONSTRAINT `Sala_localidade_id_fkey` FOREIGN KEY (`localidade_id`) REFERENCES `Localidade`(`localidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoSensor` ADD CONSTRAINT `HistoricoSensor_sensor_id_fkey` FOREIGN KEY (`sensor_id`) REFERENCES `Sensor`(`sensor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocalidadeCidade` ADD CONSTRAINT `_LocalidadeCidade_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cidade`(`cidade_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocalidadeCidade` ADD CONSTRAINT `_LocalidadeCidade_B_fkey` FOREIGN KEY (`B`) REFERENCES `Localidade`(`localidade_id`) ON DELETE CASCADE ON UPDATE CASCADE;
