import { Context,Next } from 'koa';
import dayoffSubmit from '../models/dayoffSubmit.js';
import jwt from 'jsonwebtoken';
import * as env from '../utils/env.js';

const dayOffSubmitPost = async (ctx: any,next: any) => {
    try {
        const token = ctx.request.headers.authorization.split(' ')[1];
        const decodedToken: any = jwt.verify(token, env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        const requestDate: string = TimeChange_KOR(ctx.request.body.date);
        const reason = ctx.request.body.reason;
        const dayOffType = ctx.request.body.dayOffValue;
        console.log(token, userId, requestDate, reason, dayOffType);

        const dayoff = new dayoffSubmit({
            userId: userId,
            reason: reason,
            dayOffValue: dayOffType,
            date: requestDate,
        });

        const result = await dayoff.save();

        ctx.status = 201;
        ctx.body = {
            message: 'Dayoff created!',
            //dayoffId: result._id,
        };
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

function TimeChange_KOR(date: string) {
    const utcDate = new Date(date);
    // Convert to Korean time
    const koreanDateString = utcDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
    });
    return koreanDateString;
}

export { dayOffSubmitPost };
