//get locations
import fs from "fs-extra";
import path from "path";

export default class LocationsRepo {
    constructor() {
        this.path = path.join(process.cwd(), "app/data/locations.json");
    }
    async getLocations() {
        return JSON.parse(await fs.readFile(this.path));
    }
}