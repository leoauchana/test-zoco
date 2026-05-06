/*
  Warnings:

  - You are about to drop the column `accion` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `duplicados` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `ejecutado_at` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `nuevos` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_obtencion` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `fuente` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `venues` table. All the data in the column will be lost.
  - Added the required column `action` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `venues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logs" DROP COLUMN "accion",
DROP COLUMN "duplicados",
DROP COLUMN "ejecutado_at",
DROP COLUMN "nuevos",
ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "duplicates" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "new_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "venues" DROP COLUMN "activo",
DROP COLUMN "categoria",
DROP COLUMN "descripcion",
DROP COLUMN "fecha_obtencion",
DROP COLUMN "fuente",
DROP COLUMN "nombre",
DROP COLUMN "ubicacion",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "obtained_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'manual';
