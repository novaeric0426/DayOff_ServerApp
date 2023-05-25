import Router from 'koa-router';
import * as authController from '../controllers/auth.js';


const router = new Router({
    prefix: '/auth'
});

router.put('/signup',authController.signup); //회원가입

router.post('/login',authController.login); //로그인


export default router;