-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaperAuthors" (
    "paperId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("paperId", "userId"),
    CONSTRAINT "PaperAuthors_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaperAuthors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaperAuthors" ("paperId", "userId") SELECT "paperId", "userId" FROM "PaperAuthors";
DROP TABLE "PaperAuthors";
ALTER TABLE "new_PaperAuthors" RENAME TO "PaperAuthors";
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fromTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "locationName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Session_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_date_fkey" FOREIGN KEY ("date") REFERENCES "ScheduleDate" ("date") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("date", "endTime", "fromTime", "id", "locationName", "name") SELECT "date", "endTime", "fromTime", "id", "locationName", "name" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new_SessionPaper" (
    "sessionId" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,

    PRIMARY KEY ("sessionId", "paperId"),
    CONSTRAINT "SessionPaper_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SessionPaper_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SessionPaper" ("paperId", "sessionId") SELECT "paperId", "sessionId" FROM "SessionPaper";
DROP TABLE "SessionPaper";
ALTER TABLE "new_SessionPaper" RENAME TO "SessionPaper";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL DEFAULT 0,
    "contribution" INTEGER NOT NULL DEFAULT 0,
    "strengths" TEXT NOT NULL DEFAULT '',
    "weaknesses" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("contribution", "evaluation", "id", "paperId", "reviewerId", "status", "strengths", "weaknesses") SELECT "contribution", "evaluation", "id", "paperId", "reviewerId", "status", "strengths", "weaknesses" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperTitle" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "fileLink" TEXT,
    "file" BLOB,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "presenterID" INTEGER NOT NULL,
    CONSTRAINT "Paper_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status") SELECT "abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE TABLE "new_ScheduleDate" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "scheduleId" INTEGER NOT NULL,
    CONSTRAINT "ScheduleDate_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleDate" ("date", "scheduleId") SELECT "date", "scheduleId" FROM "ScheduleDate";
DROP TABLE "ScheduleDate";
ALTER TABLE "new_ScheduleDate" RENAME TO "ScheduleDate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
