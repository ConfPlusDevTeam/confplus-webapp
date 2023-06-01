/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperTitle" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "file" BLOB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "presenterID" INTEGER NOT NULL,
    CONSTRAINT "Paper_presenterID_fkey" FOREIGN KEY ("presenterID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status") SELECT "abstract", "file", "fileLink", "id", "paperTitle", "presenterID", "status" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("contribution", "evaluation", "paperId", "reviewerId", "status", "strengths", "weaknesses") SELECT "contribution", "evaluation", "paperId", "reviewerId", "status", "strengths", "weaknesses" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
