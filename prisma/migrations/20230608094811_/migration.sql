-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "institutionName" TEXT,
    CONSTRAINT "User_institutionName_fkey" FOREIGN KEY ("institutionName") REFERENCES "Institution" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "first_name", "gender", "id", "institutionName", "last_name", "password", "role") SELECT "email", "first_name", "gender", "id", "institutionName", "last_name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
