-- CreateTable
CREATE TABLE "Driver" (
    "ID" SERIAL NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Phone" VARCHAR(15),

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_Email_key" ON "Driver"("Email");
