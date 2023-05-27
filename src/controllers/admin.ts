import User from "../models/user.js";

const getUsers = async (ctx: any, next: any) => {
    try {
        const users = await User.find({ role: "user" });
        console.log("User Fetched Success!");
        ctx.status = 200;
        ctx.body = {
            message: "Users fetched",
            users: users,
        };
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export {getUsers};
