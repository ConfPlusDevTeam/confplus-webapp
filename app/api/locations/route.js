//Get -returns all locations

import LocationsRepo from "./locations-repo";
const locationsRepo = new LocationsRepo();

export async function GET(request, { params }) {
    try {
        const locations = await locationsRepo.getLocations();
        return Response.json(locations, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
