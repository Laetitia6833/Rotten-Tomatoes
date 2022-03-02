import { Document } from "mongoose";

export interface User extends Document {
    name: string
    email: string
    password: string
    readonly admin: boolean
    sessionId: string
    favourites: Array<any>
}
