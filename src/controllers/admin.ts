import User from "../models/user.js";
import bcrypt from "bcryptjs";

const getUsers = async (ctx: any, next: any) => {
    try {
        const users = await User.find({ role: "user" });
        console.log("User Fetched Success!");
        ctx.status = 200;
        ctx.body = {
            message: "Users fetched",
            users: users,
        };
        console.log("Users fetched");
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const changePassword = async (ctx: any, next: any) => {
    try {
        const userId:string= ctx.request.body.userId;
        const newPassword:string = ctx.request.body.newPassword;
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            console.log("Hi!");
            ctx.status = 404;
            ctx.body = {
                message: "User not found",
            };
            return;
        }
        const hashedPw = await bcrypt.hash(newPassword, 12);
        user.password = hashedPw;
        await user.save();
        ctx.status = 200;
        ctx.body = {
            message: "Password changed!",
        };
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err.message);
        }
        next(err);
    }
};

const deleteUser = async (ctx: any, next: any) => {
    try{
        const userId:string = ctx.request.body.userId;
        console.log(userId, typeof userId);
        await User.findByIdAndDelete(userId);
        console.log("User deleted!");
        ctx.status = 200;
        ctx.body = {
            message: "User deleted!"
        };
    } catch(err:any){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

export { getUsers, changePassword,deleteUser };
