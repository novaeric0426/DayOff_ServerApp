import Router from 'koa-router';
import * as dayoffController from '../controllers/dayoff.js';

const router = new Router({
    prefix: '/dayoff'
});

router.post('/submit',dayoffController.dayOffSubmitPost);

export default router;