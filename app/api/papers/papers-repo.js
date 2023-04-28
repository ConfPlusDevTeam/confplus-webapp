//add a paper - assigns 2 random reviewers to the paper

import fs from "fs-extra";
import path from "path";
import UsersRepo from "../users/users-repo";

export default class PapersRepo {
    constructor() {
        this.path = path.join(process.cwd(), "app/data/papers.json");
    }
    async addPaper (paper) {
        const papers = JSON.parse(await fs.readFile(this.path));
        papers.push(paper);
        const paperReviewers = UsersRepo.getUsersByRole("reviewer");
        paperReviewers.sort(() => Math.random() - 0.5).slice(0, 2);
        paper.reviewers =  paperReviewers.map(reviewer => reviewer.email);

        paper.reviews = [
            {
              "paperTitle": paper.paperTitle,
              "reviewerEmail": paper.reviewers[0] ,
              "status": "pending",
              "evaluation": "",
              "contribution": "",
              "strengths": "",
              "weaknesses": ""
            },
            {
              "paperTitle": paper.paperTitle,
              "reviewerEmail": paper.reviewers[1],   
              "status": "pending",
              "evaluation": "",
              "contribution": "",
              "strengths": "",
              "weaknesses": ""
            }
        ];

        paper.status = "pending";
        
        fs.writeFile(this.path, JSON.stringify(papers));
        return paper;
    }

    async getPapersForReviewer(email) {
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const papers = allPapers.filter(paper => paper.reviewers.includes(email));
        return papers;
    }

    async getPapersForAuthor(email) {
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const papers = allPapers.filter(paper => (paper.author == email || paper.coAuthors.includes(email)));
        return papers;
    }

    async submitReview(review) {
        const paper = JSON.parse(await fs.readFile(this.path)).filter(paper => paper.paperTitle == review.paperTitle);
    
        if (review.reviewerEmail == paper.reviewers[0]) {
            paper.reviews[0] = review;
        } else {
            paper.reviews[1] = review;
        }

        if (paper.reviews[0].status == "accepted" && paper.reviews[1].status == "accepted") {
            paper.status = "accepted";
        } else if (paper.reviews[0].status == "rejected" || paper.reviews[1].status == "rejected") {
            paper.status = "rejected";
        } else {
            paper.status = "pending";
        }

        fs.writeFile(this.path, JSON.stringify(paper));
    }

    async loadReview(paperTitle, reviewerEmail) {
        const paper = JSON.parse(await fs.readFile(this.path)).filter(paper => paper.paperTitle == paperTitle);
        if (reviewerEmail == paper.reviewers[0]) {
            return paper.reviews[0];
        }
        return paper.reviews[1];
    }
}

