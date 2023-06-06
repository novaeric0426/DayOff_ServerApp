import Koa from 'koa';
import * as env from './utils/env.js';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';

import User from './models/user.js';

import authRoutes from './routes/auth.js';
import dayoffRoutes from './routes/dayoff.js';
import adminRoutes from './routes/admin.js';

import { makeHashPwd } from './controllers/middleware.js';

const createFirstAdmin = async function() { //DB에 관리자 계정이 없을 경우 관리자 계정 생성
    const hashedPw = await makeHashPwd('1234');
    const newUser = new User({
        name: 'Admin',
        email: 'novaeric@naver.com',
        password: hashedPw,
        role: 'admin',
        availableDayOff: 15,
    });
    await newUser.save();
};

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
        app.use(adminRoutes.routes());

        const dbConnectionTest = mongoose.createConnection(env.MONGODB_ACCESS_URL);
        dbConnectionTest.on('connected', () => {
            console.log('Connected to database');
        });
        dbConnectionTest.on('error', (error) => {
            console.error('Error connecting to database:', error);
        });

        const user = await User.findOne();
        if (!user) {
            createFirstAdmin();
        }

        app.listen(env.APP_PORT, () => {
            console.log(`The server is listening on port ${env.APP_PORT}.`);
        });
    } catch (err) {
        console.log(err);
    }
})();


