"use server";

//add a paper - assigns 2 random reviewers to the paper

// import fs from "fs-extra";
// import path from "path";
// import UsersRepo from "../users/users-repo";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// this.path = path.join(process.cwd(), "app/ data/papers.json");
// this.usersRepo = new UsersRepo();

// async addPaper(paper) {
//   const papers = JSON.parse(await fs.readFile(this.path));
//   let paperReviewers;

//   await this.usersRepo
//     .getUsersByRole("reviewer")
//     .then((selectedReviewers) => {
//       const shuffledReviewers = selectedReviewers.sort(
//         () => Math.random() - 0.5
//       );
//       paperReviewers = shuffledReviewers.slice(0, 2);

//       paper.reviews = [
//         {
//           paperTitle: paper.paperTitle,
//           reviewerEmail: paperReviewers[0].email,
//           status: "pending",
//           evaluation: "",
//           contribution: "",
//           strengths: "",
//           weaknesses: "",
//         },
//         {
//           paperTitle: paper.paperTitle,
//           reviewerEmail: paperReviewers[1].email,
//           status: "pending",
//           evaluation: "",
//           contribution: "",
//           strengths: "",
//           weaknesses: "",
//         },
//       ];

//       papers.push(paper);
//       fs.writeFile(this.path, JSON.stringify(papers));
//       return paper;
//     })
//     .catch((error) => {
//       console.error(error);
//       throw new Error("Unable to add paper due to an internal error");
//     });
// }
//expects {paperTitle, Authors, abstract, fileName, presenterID}, and a list of authorIDs

export const addPaper = async (authorIDs, data) => {
  const paper = await prisma.paper.create({ data });
  authorIDs.map(async (authorID) => {
    await prisma.paperAuthors.create({
      data: { paperId: paper.id, userId: authorID },
    });
  });
  const reviewers = await prisma.user.findMany({
    where: { role: "reviewer" },
  });
  const shuffledReviewers = reviewers
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  await prisma.review.create({
    data: { paperId: paper.id, reviewerId: shuffledReviewers[0].id },
  });
  await prisma.review.create({
    data: { paperId: paper.id, reviewerId: shuffledReviewers[1].id },
  });
  return paper;
};

export const getPaperById = async (id) => {
  return await prisma.paper.findUnique({
    where: { id: Number(id) },
    include: { reviews: true },
  });
};

// async getPapersForReviewer(email) {
//   const allPapers = JSON.parse(await fs.readFile(this.path));
//   const papers = allPapers.filter(
//     (paper) =>
//       paper.reviews[0].reviewerEmail == email ||
//       paper.reviews[1].reviewerEmail == email
//   );
//   return papers;
// }

//getPapersforreviewer gets the reviewer id and returns the papers that are assigned to him by looking into the list of reviews and checking if the reviewer id is in the list of reviews
export const getPapersForReviewer = async (id) => {
  // where review --- some reviewer id = id, but review is a whole object and not just the id
  return await prisma.paper.findMany({
    where: { reviews: { some: { reviewerId: Number(id) } } },
    include: { reviews: true },
  });
};

// async getPapersForAuthor(email) {
//   const allPapers = JSON.parse(await fs.readFile(this.path));
//   const papers = allPapers.filter(
//     (paper) =>
//       paper.author === email ||
//       paper.coAuthors.some((coAuthor) => coAuthor.email === email)
//   );
//   return papers;
// }

//getPapersforauthor gets the author id and returns the papers that are assigned to him by looking into the list of papers and checking if the author id is in the list of reviews
export const getPapersForAuthor = async (id) => {
  return await prisma.paper.findMany({
    where: { authors: { some: { userId: Number(id) } } },
  });
};

export const deletePaper = async (id) => {
  const paper = await prisma.paper.delete({
    where: { id: Number(id) },
  });
  return paper;
};

// async addReview(review) {
//   const allPapers = JSON.parse(await fs.readFile(this.path));
//   const paper = allPapers.filter(
//     (paper) => paper.paperTitle == review.paperTitle
//   )[0];
//   if (review.reviewerEmail == paper.reviews[0].reviewerEmail) {
//     paper.reviews[0] = review;
//     paper.reviews[0].status = "submitted";
//   } else {
//     paper.reviews[1] = review;
//     paper.reviews[1].status = "submitted";
//   }
//   await fs.writeFile(this.path, JSON.stringify(allPapers));
// }
export const addReview = async (data) => {
  data.status = "submitted";
  const res = await prisma.review.update({
    where: { id: Number(data.id) },
    data: data,
  });
  await this.refigureStatus(res.paperId);
  return res;
};

export const refigureStatus = async (paperID) => {
  const reviews = await prisma.review.findMany({
    where: { paperId: paperID },
  });
  if (reviews[0].status == "submitted" && reviews[1].status == "submitted") {
    if (reviews[0].evaluation + reviews[1].evaluation >= 2) {
      return await prisma.paper.update({
        where: { id: paperID },
        data: { status: "Accepted" },
      });
    } else {
      return await prisma.paper.update({
        where: { id: paperID },
        data: { status: "Rejected" },
      });
    }
  } else {
    return await prisma.paper.update({
      where: { id: paperID },
      data: { status: "Pending" },
    });
  }
};

// async loadReview(paperTitle, reviewerEmail) {
//   const paper = JSON.parse(await fs.readFile(this.path)).filter(
//     (paper) => paper.paperTitle == paperTitle
//   );
//   if (reviewerEmail == paper.reviews[0].reviewerEmail) {
//     return paper.reviews[0];
//   }
//   return paper.reviews[1];
// }

export const loadReview = async (paperID, reviewerID) => {
  return await prisma.review.findFirst({
    where: { paperId: Number(paperID), reviewerId: Number(reviewerID) },
  });
};

// async getAcceptedPapers() {
//   const allPapers = JSON.parse(await fs.readFile(this.path));
//   const papers = allPapers.filter(
//     (paper) =>
//       paper.reviews[0].status == "submitted" &&
//       paper.reviews[1].status == "submitted"
//   );
//   return papers.filter(
//     (paper) => paper.reviews[0].evaluation + paper.reviews[1].evaluation >= 2
//   );
// }

export const getAcceptedPapers = async () => {
  return await prisma.paper.findMany({ where: { status: "Accepted" } });
};

// async loadReviewsForPaper(paperTitle) {
//   const allPapers = JSON.parse(await fs.readFile(this.path));

//   const paper = allPapers.find((paper) => paper.paperTitle == paperTitle);

//   return paper.reviews;
// }

export const loadReviewsForPaper = async (id) => {
  return await prisma.review.findMany({ where: { paperId: Number(id) } });
};
