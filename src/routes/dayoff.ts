import Router from 'koa-router';
import * as dayoffController from '../controllers/dayoff.js';

const router = new Router({
    prefix: '/dayoff'
});

router.post('/submit',dayoffController.dayOffSubmitPost); //휴가 신청 제출

export default router;