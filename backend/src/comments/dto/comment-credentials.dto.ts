import { IsDate, IsNotEmpty } from "class-validator";
import { Date } from "mongoose";

export class CommentCredentialsDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    userName: string

    movieId: string

    @IsNotEmpty()
    content: string

    // @IsDate()
    date: Date

}

