/*
  Warnings:

  - You are about to drop the column `nome` on the `sala` table. All the data in the column will be lost.
  - You are about to drop the `_localidadecidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensor` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status` on table `cidade` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `bairro` to the `localidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `localidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `localidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `localidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_sala` to the `sala` table without a default value. This is not possible if the table is not empty.
  - Made the column `tipo_sala` on table `sala` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_localidadecidade` DROP FOREIGN KEY `_LocalidadeCidade_A_fkey`;

-- DropForeignKey
ALTER TABLE `_localidadecidade` DROP FOREIGN KEY `_LocalidadeCidade_B_fkey`;

-- DropForeignKey
ALTER TABLE `historicosensor` DROP FOREIGN KEY `HistoricoSensor_sensor_id_fkey`;

-- DropForeignKey
ALTER TABLE `localidade` DROP FOREIGN KEY `Localidade_cidade_id_fkey`;

-- DropForeignKey
ALTER TABLE `sala` DROP FOREIGN KEY `Sala_localidade_id_fkey`;

-- DropForeignKey
ALTER TABLE `sensor` DROP FOREIGN KEY `Sensor_sala_id_fkey`;

-- AlterTable
ALTER TABLE `cidade` MODIFY `status` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `historicosensor` MODIFY `timestamp` TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP);

-- AlterTable
ALTER TABLE `localidade` ADD COLUMN `bairro` VARCHAR(255) NOT NULL,
    ADD COLUMN `cep` VARCHAR(10) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(255) NULL,
    ADD COLUMN `logradouro` VARCHAR(255) NOT NULL,
    ADD COLUMN `numero` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `sala` DROP COLUMN `nome`,
    ADD COLUMN `area` ENUM('Norte', 'Sul', 'Leste', 'Oeste') NULL,
    ADD COLUMN `capacidade` INTEGER NULL,
    ADD COLUMN `categoria` ENUM('ComplexoEsportivo', 'Edificacao', 'Hidrografia', 'Praca', 'ViaExterna', 'ViaInterna', 'Caminho', 'Estacionamento') NULL,
    ADD COLUMN `equipamentos` VARCHAR(255) NULL,
    ADD COLUMN `nome_sala` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` INTEGER NULL DEFAULT 1,
    MODIFY `tipo_sala` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `_localidadecidade`;

-- DropTable
DROP TABLE `sensor`;

-- CreateTable
CREATE TABLE `sensores` (
    `sensor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sala_id` INTEGER NOT NULL,
    `sensor_name` VARCHAR(255) NOT NULL,
    `sensor_type` VARCHAR(100) NULL,
    `sensor_model` VARCHAR(100) NULL,
    `current_value` DOUBLE NULL,
    `unit_of_measure` VARCHAR(50) NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
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
CREATE TABLE `_CidadeToHistoricoSensor` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CidadeToHistoricoSensor_AB_unique`(`A`, `B`),
    INDEX `_CidadeToHistoricoSensor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historicosensor` ADD CONSTRAINT `historicosensor_sensor_id_fkey` FOREIGN KEY (`sensor_id`) REFERENCES `sensores`(`sensor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `localidade` ADD CONSTRAINT `localidade_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`cidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sala` ADD CONSTRAINT `sala_localidade_id_fkey` FOREIGN KEY (`localidade_id`) REFERENCES `localidade`(`localidade_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sensores` ADD CONSTRAINT `sensores_sala_id_fkey` FOREIGN KEY (`sala_id`) REFERENCES `sala`(`sala_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CidadeToHistoricoSensor` ADD CONSTRAINT `_CidadeToHistoricoSensor_A_fkey` FOREIGN KEY (`A`) REFERENCES `cidade`(`cidade_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CidadeToHistoricoSensor` ADD CONSTRAINT `_CidadeToHistoricoSensor_B_fkey` FOREIGN KEY (`B`) REFERENCES `historicosensor`(`log_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `cidade` RENAME INDEX `Cidade_codigo_ibge_key` TO `cidade_codigo_ibge_key`;
