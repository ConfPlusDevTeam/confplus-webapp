//add a paper

import fs from "fs-extra";
import path from "path";

export default class PapersRepo {
    constructor() {
        this.path = path.join(process.cwd(), "app/data/papers.json");
    }
    async addPaper (paper) {
        const papers = JSON.parse(await fs.readFile(this.path));
        papers.push(paper);
        fs.writeFile(this.path, JSON.stringify(papers));
        return paper;
    }

}

