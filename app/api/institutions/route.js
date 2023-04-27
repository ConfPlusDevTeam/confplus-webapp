//Get -returns all institutions

import * as institutionsRepo from "./institutions-repo";

export async function GET(request, { params }) {
    try {
        const institutions = await institutionsRepo.getInstitutions();
        return Response.json(institutions, { status: 200 });
    }
    catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

