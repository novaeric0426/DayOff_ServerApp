import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (ctx: any, next: any) => {
    try {
        const email:string = ctx.request.body.email;
        const password:string = ctx.request.body.password;
        const name:string = ctx.request.body.name;
        const role:string = ctx.request.body.role;

        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
            name: name,
            role: role,
        });

        const result = await user.save();

        ctx.status = 201;
        ctx.body = {
            message: "User created!",
            userId: result._id,
        };
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const login = async (ctx: any, next: any) => {
    const email:string = ctx.request.body.email;
    const password:string = ctx.request.body.password;
    let loadedUser;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("user not found");
            ctx.throw(401, "User not found");
            return;
        }

        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            console.log("password is incorrect");
            ctx.throw(401, "Password is incorrect");
            return;
        } else {
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                },
                "someSecretKey",
                { expiresIn: "1h" }
            );
            ctx.status = 200;
            ctx.body = {
                token: token,
                userId: loadedUser._id.toString(),
            };
            console.log("token!");
        }
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {
            error: "Internal Server Error",
        };
    }
};

export { signup, login };
