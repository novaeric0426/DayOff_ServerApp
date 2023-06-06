import mongoose from 'mongoose';
import * as env from '../utils/env.js';
const connection = mongoose.createConnection(env.MONGODB_ACCESS_URL);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    availableDayOff: {
        type: Number,
        required: true,
    },
});

const User = connection.model('User', userSchema);

export default User;
