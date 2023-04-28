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
        const paperReviewers = UsersRepo.getUsersByRole("reviewer");
        const selectedReviewers = paperReviewers.sort(() => Math.random() - 0.5).slice(0, 2);

        paper.reviews = [
            {
              "paperTitle": paper.paperTitle,
              "reviewerEmail": selectedReviewers[0] ,
              "status": "pending",
              "evaluation": "",
              "contribution": "",
              "strengths": "",
              "weaknesses": ""
            },
            {
              "paperTitle": paper.paperTitle,
              "reviewerEmail": selectedReviewers[1],   
              "status": "pending",
              "evaluation": "",
              "contribution": "",
              "strengths": "",
              "weaknesses": ""
            }
        ];
        
        papers.push(paper);
        await fs.writeFile(this.path, JSON.stringify(papers));
        return paper;
    }

    async getPapersForReviewer(email) {
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const papers = allPapers.filter(paper => paper.reviews[0].reviewerEmail == email || paper.reviews[1].reviewerEmail == email);
        return papers;
    }

    async getPapersForAuthor(email) {
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const papers = allPapers.filter(paper => (paper.author == email || paper.coAuthors.includes(email)));
        return papers;
    }

    async submitReview(review) {
        const paper = JSON.parse(await fs.readFile(this.path)).filter(paper => paper.paperTitle == review.paperTitle);
    
        if (review.reviewerEmail == paper.reviews[0].reviewerEmail) {
            paper.reviews[0] = review;
            paper.reviews[0].status = "submitted";
        } else {
            paper.reviews[1] = review;
            paper.reviews[1].status = "submitted";
        }

        await fs.writeFile(this.path, JSON.stringify(paper));
    }

    async loadReview(paperTitle, reviewerEmail) {
        const paper = JSON.parse(await fs.readFile(this.path)).filter(paper => paper.paperTitle == paperTitle);
        if (reviewerEmail == paper.reviews[0].reviewerEmail) {
            return paper.reviews[0];
        }
        return paper.reviews[1];
    }

    async getAcceptedPapers(){
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const papers = allPapers.filter(paper => (paper.reviews[0].status == "submitted" && paper.reviews[1].status == "submitted"))
        return papers.filter(paper => (paper.reviews[0].evaluation + paper.reviews[1].evaluation >= 2));;
    }

    async loadReviewsForPaper(paperTitle) {
        const allPapers = JSON.parse(await fs.readFile(this.path));
        const paper = allPapers.find(paper => paper.paperTitle === paperTitle);
      
        return paper.reviews;
      }
}

