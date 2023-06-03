-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL DEFAULT 0,
    "contribution" INTEGER NOT NULL DEFAULT 0,
    "strengths" TEXT NOT NULL DEFAULT '',
    "weaknesses" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "Paper_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status") SELECT "abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
