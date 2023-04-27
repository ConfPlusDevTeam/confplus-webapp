//get users - returns all users if no query string parameters are passed else return users matching query of role type

import * as repo from "./UsersRepo.js";
export async function GET (request , {params}) {
    try{
        const role = new URL (request.url).searchParams.get("role").toLowerCase;
        if (role) {
            return Response.Json(repo.getUsersByRole(role),{status: 200})
        }
        return (repo.getUsers(),{status: 200});
    }
    catch (e) {
        return ({message: "internal server error"}, {status: 500});
    }
}

