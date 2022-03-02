import { Document } from "mongoose";

export interface Comment extends Document {
    readonly userId: string
    readonly userName: string
    readonly content: string
    readonly movieId: string
}
