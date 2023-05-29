import Router from 'koa-router';
import * as adminController from '../controllers/admin.js';
import { verifyToken } from '../controllers/middleware.js';


const router = new Router({
    prefix: '/admin'
});

router.get('/users',adminController.getUsers); //fetch all guests
router.patch('/changepw',verifyToken,adminController.changePassword); //change password

export default router;


