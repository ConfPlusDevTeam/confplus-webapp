import PapersRepo from "../papers-repo";
import UsersRepo from "../../users/users-repo";

const papersRepo = new PapersRepo();

//adds a review to a paper
export async function POST(request, { params }){
    try{
        if (!request.body) {
            return Response.json({ message: "Bad request" }, { status: 400 });
        }
            PapersRepo.submitReview(request.body);
            return Response.json({ message: "Review submitted" }, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

//returns reviews for a paper
export async function GET(request, { params }){
    try{
        const paperTitle = new URL(request.url).searchParams.get("paper");
        if (!paperTitle) {
            return Response.json({ message: "Bad request" }, { status: 400 });
        }
        const paperReviews = await papersRepo.loadReviewsForPaper(paperTitle);
        return Response.json(paperReviews, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });

    }
}