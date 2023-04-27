//get institutions
import fs from "fs";
const institutionsPath = "app/data/users.json";

export default function getInstitutions(){
    try {
        const institutions = JSON.parse(fs.readFileSync(institutionsPath));
        return institutions;
    }
    catch (e) {
        throw e;
    }
}

console.log(getInstitutions());
