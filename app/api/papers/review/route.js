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
    const paperTitle = new URL(request.url).searchParams.get("paperTitle");
    if (!paperTitle) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }

    const paperReviews = await papersRepo.loadReviewsForPaper(paperTitle);
    return Response.json(paperReviews, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
