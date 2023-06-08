-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fromTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Session_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_date_fkey" FOREIGN KEY ("date") REFERENCES "ScheduleDate" ("date") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("date", "endTime", "fromTime", "id", "locationName", "name") SELECT "date", "endTime", "fromTime", "id", "locationName", "name" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
