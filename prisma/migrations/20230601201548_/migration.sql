-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    CONSTRAINT "User_institutionName_fkey" FOREIGN KEY ("institutionName") REFERENCES "Institution" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Institution" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PaperAuthors" (
    "paperId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("paperId", "userId"),
    CONSTRAINT "PaperAuthors_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PaperAuthors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fromTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "locationName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Session_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_date_fkey" FOREIGN KEY ("date") REFERENCES "ScheduleDate" ("date") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScheduleDate" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "scheduleId" INTEGER NOT NULL,
    CONSTRAINT "ScheduleDate_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "SessionPaper" (
    "sessionId" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,

    PRIMARY KEY ("sessionId", "paperId"),
    CONSTRAINT "SessionPaper_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SessionPaper_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperTitle" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "file" BLOB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "presenterID" INTEGER NOT NULL,
    CONSTRAINT "Paper_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "paperId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    PRIMARY KEY ("paperId", "reviewerId"),
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
