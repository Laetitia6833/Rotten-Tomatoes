import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CommentsService } from "./comments.service";
import { CommentCredentialsDto } from "./dto/comment-credentials.dto";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post(':movieId')
    async addComment(@Param('movieId') movieId, @Body(ValidationPipe) commentCredentialsDto: CommentCredentialsDto) {
        return this.commentsService.addComment(movieId, commentCredentialsDto)
    }

    @Get(':movieId')
    async getByMovieId(@Param('movieId') movieId) {
        return this.commentsService.getByMovieId(movieId)
    }
}
