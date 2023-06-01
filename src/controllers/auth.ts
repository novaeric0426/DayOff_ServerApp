import { Context,Next } from 'koa';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import * as env from '../utils/env.js';
import { makeHashPwd } from './middleware.js';

interface UserInterface {
    email: string;
    password: string;
    name: string;
    role: string;
}


const signup = async (ctx: Context , next: Next) => {
    try {
        const data = <UserInterface>ctx.request.body;
        const hashedPw = await makeHashPwd(data.password);

        const user = new User({
            email: data.email,
            password: hashedPw,
            name: data.name,
            role: data.role,
        });
        console.log(user.password);
        const result = await user.save();

        ctx.status = 201;
        ctx.body = {
            message: 'User created!',
            userId: result._id,
        };
        await next();
    } catch (error: unknown) {
        const err = <Context>error;
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
};

const login = async (ctx: any, next: any) => {
    const email: string = ctx.request.body.email;
    const password: string = ctx.request.body.password;
    let loadedUser;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log('user not found');
            ctx.throw(401, 'User not found');
            return;
        }

        loadedUser = user;
        const hashedPw = loadedUser.password;
        const isEqual = (await makeHashPwd(password) === hashedPw) ? true : false;

        if (!isEqual) {
            console.log('password is incorrect');
            ctx.throw(401, 'Password is incorrect');
            return;
        } else {
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString(),
                },
                env.JWT_SECRET_KEY,
                { expiresIn: '1h' },
            );
            ctx.status = 200;
            ctx.body = {
                token: token,
                userId: loadedUser._id.toString(),
                role: loadedUser.role,
            };
            console.log(`User ${loadedUser.name} logged in!`);
        }
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {
            error: 'Internal Server Error',
        };
    }
};

export { signup, login };
