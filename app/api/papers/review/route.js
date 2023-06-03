import PapersRepo from "../papers-repo";
const papersRepo = new PapersRepo();

//adds a review to a paper
export async function POST(request, { params }) {
  try {
    const review = await request.json();
    if (!review) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }
    await papersRepo.addReview(review);

    return Response.json({ message: "Review submitted" }, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

//returns reviews for a paper
export async function GET(request, { params }) {
  try {
    const paperId = new URL(request.url).searchParams.get("paperId");
    const reviewerId = new URL(request.url).searchParams.get("reviewerId");
    if (!paperId) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }
    if (reviewerId){
      return Response.json(await papersRepo.loadReview(paperId, reviewerId), { status: 200 });
    }
    const paperReviews = await papersRepo.loadReviewsForPaper(paperId);
    return Response.json(paperReviews, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
