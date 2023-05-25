//몽고DB 테스트용 파일

import mongoose from "mongoose";
import User from "./practice.js";

mongoose.connect(
    "mongodb+srv://ericnova0426:970426@cluster0.983qn4m.mongodb.net/test?retryWrites=true"
);

const run = async () => {
    try {
        const user = await User.findOne({name:"Kyle"});
        user.sayHi();
    } catch (e) {
        console.error(e.message);
    }
};

run();
