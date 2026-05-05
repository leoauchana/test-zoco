-- CreateTable
CREATE TABLE "venues" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT,
    "categoria" TEXT,
    "descripcion" TEXT,
    "fuente" TEXT NOT NULL DEFAULT 'mock',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_obtencion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "nuevos" INTEGER NOT NULL DEFAULT 0,
    "duplicados" INTEGER NOT NULL DEFAULT 0,
    "ejecutado_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
