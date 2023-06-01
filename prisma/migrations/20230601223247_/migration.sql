-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paperTitle" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
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
