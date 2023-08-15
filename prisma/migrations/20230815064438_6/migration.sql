-- CreateTable
CREATE TABLE "Transport" (
    "ID" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Transport_steps" (
    "ID" TEXT NOT NULL,
    "transport_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "current_latitude" TEXT NOT NULL,
    "current_longitude" TEXT NOT NULL,
    "Start_location" TEXT NOT NULL,
    "End_location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transport_steps_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport_steps" ADD CONSTRAINT "Transport_steps_transport_id_fkey" FOREIGN KEY ("transport_id") REFERENCES "Transport"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport_steps" ADD CONSTRAINT "Transport_steps_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
