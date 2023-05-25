import Router from 'koa-router';
import * as authController from '../controllers/auth.js';


const router = new Router({
    prefix: '/auth'
});

router.put('/signup',authController.signup);

router.post('/login',authController.login);


export default router;