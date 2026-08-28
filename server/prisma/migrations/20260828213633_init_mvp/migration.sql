-- CreateTable
CREATE TABLE `Vendedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pieza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `calibre` VARCHAR(191) NULL,
    `stock` INTEGER NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `vendedorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `piezaNombre` VARCHAR(191) NOT NULL,
    `calibre` VARCHAR(191) NULL,
    `cantidad` INTEGER NOT NULL,
    `nota` VARCHAR(191) NULL,
    `telefonoCliente` VARCHAR(191) NOT NULL,
    `prefiereMensajeria` BOOLEAN NOT NULL DEFAULT false,
    `vendedorId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pieza` ADD CONSTRAINT `Pieza_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Vendedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
