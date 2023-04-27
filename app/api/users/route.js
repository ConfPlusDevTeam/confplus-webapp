//get users - returns all users if no query string parameters are passed else return users matching query of role type

import * as repo from "./UsersRepo.js";
export async function GET (request , {params}) {
    const role = new URL (request.url).searchParams.get("role").toLowerCase;
    if (role) {
        return repo.getUsersByRole(role);
    }
    return repo.getUsers();
}

