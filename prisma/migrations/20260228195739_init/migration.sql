-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "schoolEmail" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'basic',
    "duration" TEXT NOT NULL DEFAULT '12',
    "schoolCategory" TEXT NOT NULL,
    "expectedStudents" INTEGER,
    "registrationId" TEXT NOT NULL,
    "facebookUrl" TEXT,
    "websiteUrl" TEXT,
    "language" TEXT NOT NULL DEFAULT 'english',
    "adminName" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "adminPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_slug_key" ON "School"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolEmail_key" ON "School"("schoolEmail");

-- CreateIndex
CREATE UNIQUE INDEX "School_registrationId_key" ON "School"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "School_adminEmail_key" ON "School"("adminEmail");
