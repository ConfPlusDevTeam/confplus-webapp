"use server";

import * as paperRepo from "app/api/papers/papers-repo";
import * as userRepo from "app/api/users/users-repo";
import ssrRepo from "../api/utils/ssr-repo";
const repo = new ssrRepo();

export async function getPapersCount(status) {
  return await repo.getPapersCount(status);
}

export async function getAverageAuthorsinPapers() {
  return await repo.averageAuthorsinPapers();
}

export async function getSessionsCount() {
  return await repo.getSessionsCount();
}

export async function getAveragePresentationsinSessions() {
  return await repo.averagePresentationsinSessions();
}
