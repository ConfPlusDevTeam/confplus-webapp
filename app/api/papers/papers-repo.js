//add a paper - assigns 2 random reviewers to the paper

import fs from "fs-extra";
import path from "path";
import UsersRepo from "../users/users-repo";

export default class PapersRepo {
  constructor() {
    this.path = path.join(process.cwd(), "app/data/papers.json");
    this.usersRepo = new UsersRepo();
  }
  async addPaper(paper) {
    const papers = JSON.parse(await fs.readFile(this.path));
    let paperReviewers;

    await this.usersRepo
      .getUsersByRole("reviewer")
      .then((selectedReviewers) => {
        const shuffledReviewers = selectedReviewers.sort(
          () => Math.random() - 0.5
        );
        paperReviewers = shuffledReviewers.slice(0, 2);

        paper.reviews = [
          {
            paperTitle: paper.paperTitle,
            reviewerEmail: paperReviewers[0].email,
            status: "pending",
            evaluation: "",
            contribution: "",
            strengths: "",
            weaknesses: "",
          },
          {
            paperTitle: paper.paperTitle,
            reviewerEmail: paperReviewers[1].email,
            status: "pending",
            evaluation: "",
            contribution: "",
            strengths: "",
            weaknesses: "",
          },
        ];

        papers.push(paper);
        fs.writeFile(this.path, JSON.stringify(papers));
        return paper;
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Unable to add paper due to an internal error");
      });
  }

  async getPapersForReviewer(email) {
    const allPapers = JSON.parse(await fs.readFile(this.path));
    const papers = allPapers.filter(
      (paper) =>
        paper.reviews[0].reviewerEmail == email ||
        paper.reviews[1].reviewerEmail == email
    );
    console.log(email);
    return papers;
  }

  async getPapersForAuthor(email) {
    const allPapers = JSON.parse(await fs.readFile(this.path));
    const papers = allPapers.filter(
      (paper) =>
        paper.author === email ||
        paper.coAuthors.some((coAuthor) => coAuthor.email === email)
    );
    return papers;
  }

  // async submitReview(review) {
  //   console.log("ok")
  //   const paper = JSON.parse(await fs.readFile(this.path)).filter(paper => paper.paperTitle == review.paperTitle);
  //   console.log(paper)
  //   if (review.reviewerEmail == paper.reviews[0].reviewerEmail) {
  //     paper.reviews[0] = review;
  //     paper.reviews[0].status = "submitted";
  //   } else {
  //     paper.reviews[1] = review;
  //     paper.reviews[1].status = "submitted";
  //   }
  //   await fs.writeFile(this.path, JSON.stringify(paper));
  //   return paper;}

  async addReview(review) {
    const allPapers = JSON.parse(await fs.readFile(this.path));
    const paper = allPapers.filter(
      (paper) => paper.paperTitle == review.paperTitle
    )[0];
    if (review.reviewerEmail == paper.reviews[0].reviewerEmail) {
      paper.reviews[0] = review;
      paper.reviews[0].status = "submitted";
    } else {
      paper.reviews[1] = review;
      paper.reviews[1].status = "submitted";
    }
    await fs.writeFile(this.path, JSON.stringify(allPapers));
  }

  async loadReview(paperTitle, reviewerEmail) {
    const paper = JSON.parse(await fs.readFile(this.path)).filter(
      (paper) => paper.paperTitle == paperTitle
    );
    if (reviewerEmail == paper.reviews[0].reviewerEmail) {
      return paper.reviews[0];
    }
    return paper.reviews[1];
  }

  async getAcceptedPapers() {
    const allPapers = JSON.parse(await fs.readFile(this.path));
    const papers = allPapers.filter(
      (paper) =>
        paper.reviews[0].status == "submitted" &&
        paper.reviews[1].status == "submitted"
    );
    return papers.filter(
      (paper) => paper.reviews[0].evaluation + paper.reviews[1].evaluation >= 2
    );
  }

  async loadReviewsForPaper(paperTitle) {
    const allPapers = JSON.parse(await fs.readFile(this.path));
    const paper = allPapers.find((paper) => paper.paperTitle == paperTitle);

    return paper.reviews;
  }
}
