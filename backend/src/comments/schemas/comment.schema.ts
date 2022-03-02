import * as mongoose from 'mongoose'

export const CommentSchema = new mongoose.Schema({
    userName: String,

    movieId: String,

    userId: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date
    }

}, { strict: false })
