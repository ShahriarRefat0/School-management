-- CreateTable
CREATE TABLE "testUser" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testUser_authUserId_key" ON "testUser"("authUserId");
