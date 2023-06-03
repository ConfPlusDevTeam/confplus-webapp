import * as repo from "./ssr.js"

export async function GET (request, {params}){
    const status = new URL(request.url).searchParams.get("status");
    console.log
    return Response.json({
        papersCount: await repo.getPapersCount(status)}, { status: 200 })
}