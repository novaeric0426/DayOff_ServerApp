/** MainDB 호스트 */
export const MAIN_DB_HOST: string = process.env.MAIN_DB_HOST || '127.0.0.1:27017';
/** MainDB 이름 */
export const MAIN_DB_NAME = process.env.MAIN_DB_NAME || 'dayoff';

/** 서버 앱 포트 */
export const APP_PORT = Number(process.env.APP_PORT || 10000);

/** JWT 비밀키 */
export const JWT_SECRET_KEY :string = process.env.JWT_SECRET_KEY || "someSecretKey";

/** mongoDB 접속 URL */
export const MONGODB_ACCESS_URL: string = process.env.MONGODB_ACCESS_URL || "mongodb+srv://ericnova0426:970426@cluster0.983qn4m.mongodb.net/DayOff?retryWrites=true";
