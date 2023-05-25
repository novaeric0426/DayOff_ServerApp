//Schema 작성 연습용 파일

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: [18, "Too young"],
        max: 100,
        validate: {
            validator: (v) => v % 2 === 0,
            message: (props) => `${props.value} is not an even number`,
        },
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: Date,
    bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    hobbies: [String],
    address: addressSchema,
});

userSchema.methods.sayHi = function(){
    console.log(`Hi. My name is ${this.name}`);
}

userSchema.statics.findByName=function(name){
    return this.where({name: new RegExp(name, "i")});
}

const User = mongoose.model("User", userSchema);

export default User;
