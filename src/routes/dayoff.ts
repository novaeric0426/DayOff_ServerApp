import Router from 'koa-router';
import * as dayoffController from '../controllers/dayoff.js';
import { verifyToken } from '../controllers/middleware.js';

const router = new Router({
    prefix: '/dayoff',
});

router.post('/submit', verifyToken, dayoffController.dayOffSubmitPost); //휴가 신청 제출

export default router;
