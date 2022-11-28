-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `email` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiresAt` DATETIME(3) NULL,
    `roles` VARCHAR(191) NOT NULL DEFAULT 'kassir',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fName` VARCHAR(191) NOT NULL,
    `mi` CHAR(1) NULL,
    `lName` VARCHAR(191) NOT NULL,
    `cName` VARCHAR(20) NULL,
    `dob` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `isManager` BOOLEAN NULL,
    `bio` VARCHAR(191) NULL,
    `worksSince` DATETIME(3) NULL,
    `officeId` INTEGER NULL,
    `comment` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `Employee_cName_key`(`cName`),
    UNIQUE INDEX `Employee_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Office` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(20) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cName` VARCHAR(20) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `managerId` INTEGER NULL,
    `staffNum` INTEGER NULL,
    `comment` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `Office_cName_key`(`cName`),
    UNIQUE INDEX `Office_managerId_key`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AirCarrier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `codeName` CHAR(2) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `docNumber` CHAR(3) NOT NULL,
    `info` VARCHAR(191) NULL,

    UNIQUE INDEX `AirCarrier_name_key`(`name`),
    UNIQUE INDEX `AirCarrier_codeName_key`(`codeName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consolidator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cName` VARCHAR(20) NULL,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `info` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `Consolidator_cName_key`(`cName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleRec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `officeId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `consId` INTEGER NOT NULL,
    `carrierId` INTEGER NOT NULL,
    `ticketNo` VARCHAR(10) NULL,
    `from` CHAR(3) NOT NULL,
    `to` CHAR(3) NOT NULL,
    `fare` DOUBLE NOT NULL,
    `tax1` DOUBLE NULL,
    `tax2` DOUBLE NULL,
    `tax3` DOUBLE NULL,
    `curAgent` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AirCarrierToConsolidator` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AirCarrierToConsolidator_AB_unique`(`A`, `B`),
    INDEX `_AirCarrierToConsolidator_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `Office`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Office` ADD CONSTRAINT `Office_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleRec` ADD CONSTRAINT `SaleRec_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `Office`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SaleRec` ADD CONSTRAINT `SaleRec_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SaleRec` ADD CONSTRAINT `SaleRec_consId_fkey` FOREIGN KEY (`consId`) REFERENCES `Consolidator`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SaleRec` ADD CONSTRAINT `SaleRec_carrierId_fkey` FOREIGN KEY (`carrierId`) REFERENCES `AirCarrier`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `_AirCarrierToConsolidator` ADD CONSTRAINT `_AirCarrierToConsolidator_A_fkey` FOREIGN KEY (`A`) REFERENCES `AirCarrier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AirCarrierToConsolidator` ADD CONSTRAINT `_AirCarrierToConsolidator_B_fkey` FOREIGN KEY (`B`) REFERENCES `Consolidator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
