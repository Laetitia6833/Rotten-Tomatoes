import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private commentModel: Model<Comment>) { }

    async addComment(movieId, content) {
        let credentials = content
        credentials.movieId = movieId
        const date = new Date()
        credentials.date = date

        const comment = new this.commentModel(credentials)

        try {
            await comment.save()
        } catch (error) {
            console.log(error);
        }
    }

    async getByMovieId(movieId) {
        const comments = await this.commentModel.find({ movieId: movieId }).sort({ date: 'desc' })
        return comments
    }
}
