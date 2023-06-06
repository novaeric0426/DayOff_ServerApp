import mongoose from 'mongoose';
import * as env from '../utils/env.js';
const connection = mongoose.createConnection(env.MONGODB_ACCESS_URL);
const Schema = mongoose.Schema;

const dayOffSubmitFormSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dayOffValue: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
});

const dayOff = connection.model('dayOff', dayOffSubmitFormSchema);

export default dayOff;