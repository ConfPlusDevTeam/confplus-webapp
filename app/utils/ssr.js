"use server"
import ssrRepo from "/ssr-repo.js"
const ssrRepo = new ssrRepo()

export async function getPapersCount(status){
    return await ssrRepo.getPapersCount(status)
}

export async function averageAuthorsinPapers(){
    return await ssrRepo.averageAuthorsinPapers()
}

export async function getSessionsCount(){
    return await ssrRepo.getSessionsCount()
}

export async function averagePresentationsinSessions(){
    return await ssrRepo.averagePresentationsinSessions()
}

