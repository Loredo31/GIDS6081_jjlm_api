/*
  Warnings:

  - You are about to drop the column `hashToken` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `hashToken`,
    ADD COLUMN `hash` LONGTEXT NULL;
