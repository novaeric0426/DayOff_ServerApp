import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dayOffSubmitFormSchema = new Schema({
    date:{
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dayOffValue:{
        type: String,
        required: true,
    },
    reason:{
        type: String,
        required: true,
    }
});

const dayOff = mongoose.model('dayOff', dayOffSubmitFormSchema);

export default dayOff;