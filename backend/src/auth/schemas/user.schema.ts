import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name: String,

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    favourites: {
        type: Array,
        required: false
    },

    sessionId: {
        type: String,
        required: false
    },

    admin: {
        type: Boolean
    }
}, { strict: false })
