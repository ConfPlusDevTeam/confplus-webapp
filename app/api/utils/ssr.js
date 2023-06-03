"use server"
import ssrRepo from "./ssr-repo.js"
const repo = new ssrRepo()

export async function getPapersCount(status){
    return await repo.getPapersCount(status)
}

export async function averageAuthorsinPapers(){
    return await repo.averageAuthorsinPapers()
}

export async function getSessionsCount(){
    return await repo.getSessionsCount()
}

export async function averagePresentationsinSessions(){
    return await repo.averagePresentationsinSessions()
}

