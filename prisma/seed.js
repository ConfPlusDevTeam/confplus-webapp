import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersPath = path.join(process.cwd(), "app/seedingData/users.json");
const papersPath = path.join(process.cwd(), "app/seedingData/papers.json");
const reviewsPath = path.join(process.cwd(), "app/seedingData/reviews.json");

const schedulePath = path.join(process.cwd(), "app/seedingData/schedule.json");
const ScheduleDatesPath = path.join(
  process.cwd(),
  "app/seedingData/ScheduleDates.json"
);
const sessionsPath = path.join(process.cwd(), "app/seedingData/sessions.json");
const SessionsPapersPath = path.join(
  process.cwd(),
  "app/seedingData/SessionsPapers.json"
);

const institutionsPath = path.join(
  process.cwd(),
  "app/seedingData/institutions.json"
);
const locationsPath = path.join(
  process.cwd(),
  "app/seedingData/locations.json"
);
const PapersAuthorsPath = path.join(
  process.cwd(),
  "app/seedingData/PaperAuthors.json"
);

async function main() {
  try {
    const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const papers = JSON.parse(fs.readFileSync(papersPath, "utf-8"));
    const reviews = JSON.parse(fs.readFileSync(reviewsPath, "utf-8"));

    const schedule = JSON.parse(fs.readFileSync(schedulePath, "utf-8"));
    const scheduleDates = JSON.parse(
      fs.readFileSync(ScheduleDatesPath, "utf-8")
    );
    const sessions = JSON.parse(fs.readFileSync(sessionsPath, "utf-8"));
    const sessionsPapers = JSON.parse(
      fs.readFileSync(SessionsPapersPath, "utf-8")
    );

    const institutions = JSON.parse(fs.readFileSync(institutionsPath, "utf-8"));
    const locations = JSON.parse(fs.readFileSync(locationsPath, "utf-8"));
    const paperAuthors = JSON.parse(
      fs.readFileSync(PapersAuthorsPath, "utf-8")
    );

    const createdInstitutions = await Promise.all(
      institutions.map(async (institution) => {
        const createdInstitution = await prisma.institution.create({
          data: institution,
        });
        return createdInstitution;
      })
    );

    const createdLocations = await Promise.all(
      locations.map(async (location) => {
        const createdLocation = await prisma.location.create({
          data: location,
        });
        return createdLocation;
      })
    );
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const createdUser = await prisma.user.create({
          data: user,
        });
        return createdUser;
      })
    );

    const createdPapers = await Promise.all(
      papers.map(async (paper) => {
        const createdPaper = await prisma.paper.create({
          data: paper,
        });
        return createdPaper;
      })
    );

    const createdReviews = await Promise.all(
      reviews.map(async (review) => {
        const createdReview = await prisma.review.create({
          data: review,
        });
        return createdReview;
      })
    );

    const createdSchedule = await Promise.all(
      schedule.map(async (schedule) => {
        const createdSchedule = await prisma.schedule.create({
          data: schedule,
        });
        return createdSchedule;
      })
    );

    const createdScheduleDates = await Promise.all(
      scheduleDates.map(async (scheduleDate) => {
        const createdScheduleDate = await prisma.scheduleDate.create({
          data: scheduleDate,
        });
        return createdScheduleDate;
      })
    );

    const createdSessions = await Promise.all(
      sessions.map(async (session) => {
        const createdSession = await prisma.session.create({
          data: session,
        });
        return createdSession;
      })
    );

    const createdSessionsPapers = await Promise.all(
      sessionsPapers.map(async (sessionsPaper) => {
        const createdSessionsPaper = await prisma.SessionPaper.create({
          data: sessionsPaper,
        });
        return createdSessionsPaper;
      })
    );

    const createdPaperAuthors = await Promise.all(
      paperAuthors.map(async (paperAuthor) => {
        const createdPaperAuthor = await prisma.PaperAuthors.create({
          data: paperAuthor,
        });
        return createdPaperAuthor;
      })
    );

    console.log("Seeding completed");
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
