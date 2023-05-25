import dayoffSubmit from "../models/dayoffSubmit.js";
import jwt from "jsonwebtoken";
import * as env from "../utils/env.js";

const dayOffSubmitPost = async (ctx: any, next: any) => {
    try {
        const token = ctx.request.headers.authorization.split(" ")[1];
        const decodedToken: any = jwt.verify(token, env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        const requestDate = ctx.request.body.date;
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
            message: "Dayoff created!",
            //dayoffId: result._id,
        };
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export { dayOffSubmitPost };
