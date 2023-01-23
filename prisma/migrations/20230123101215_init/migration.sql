/*
  Warnings:

  - A unique constraint covering the columns `[clientName]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_clientName_key" ON "Client"("clientName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
