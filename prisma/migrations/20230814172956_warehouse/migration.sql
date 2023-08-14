-- CreateTable
CREATE TABLE "Warehouse" (
    "ID" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Item" (
    "ID" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Warehouse_items" (
    "ID" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Warehouse_items_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_name_key" ON "Warehouse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- AddForeignKey
ALTER TABLE "Warehouse_items" ADD CONSTRAINT "Warehouse_items_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse_items" ADD CONSTRAINT "Warehouse_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
