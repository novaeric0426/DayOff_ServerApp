import Router from 'koa-router';
import * as adminController from '../controllers/admin.js';
import { verifyToken } from '../controllers/middleware.js';


const router = new Router({
    prefix: '/admin',
});

router.get('/users',adminController.getUsers); //fetch all guests
router.patch('/changew',verifyToken,adminController.changePassword); //change password
router.delete('/deleteuser',adminController.deleteUser); //delete user

export default router;


