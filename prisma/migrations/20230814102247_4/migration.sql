-- CreateTable
CREATE TABLE "Admin" (
    "ID" TEXT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Password_Hash" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Email_key" ON "Admin"("Email");
