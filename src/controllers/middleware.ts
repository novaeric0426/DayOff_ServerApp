import jwt from "jsonwebtoken";
import * as env from "../utils/env.js";

const verifyToken = async (ctx: any, next: any) => {
    try {
        const token = ctx.request.headers.authorization.split(" ")[1];
        ctx.state.decoded = jwt.verify(token, env.JWT_SECRET_KEY);
        await next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            ctx.status = 419;
            ctx.body = {
                code: 419,
                message: "토큰이 만료되었습니다",
            };
        } else {
            console.log("유효하지 않은 토큰입니다!");
            ctx.status = 401;
            ctx.body = {
                code: 401,
                message: "유효하지 않은 토큰입니다",
            };
        }
    }
};

export { verifyToken };
