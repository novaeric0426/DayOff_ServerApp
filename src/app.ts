import Koa from "koa";
import * as env from "./utils/env.js";
import Router from "koa-router";
import koaBody from "koa-bodyparser";
import cors from "@koa/cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/user.js";

import authRoutes from "./routes/auth.js";
import dayoffRoutes from "./routes/dayoff.js";

// 시작
(async () => {
    try {
        // 코아 앱 설정
        const app = new Koa({ proxy: true });
        const router = new Router();

        app.use(cors());
        app.use(koaBody());

        app.use(authRoutes.routes());
        app.use(dayoffRoutes.routes());

        await mongoose.connect(env.MONGODB_ACCESS_URL);

        const user = await User.findOne();
        if (!user) {
            const hashedPw = await bcrypt.hash("0000", 12);
            const newUser = new User({
                name: "Admin",
                email: "novaeric@naver.com",
                password: hashedPw,
                role: "admin",
            });
            await newUser.save();
        }

        app.listen(env.APP_PORT, () => {
            console.log(`The server is listening on port ${env.APP_PORT}.`);
        });
    } catch (err) {
        console.log(err);
    }
})();
