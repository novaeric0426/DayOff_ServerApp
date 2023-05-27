import Router from 'koa-router';
import * as adminController from '../controllers/admin.js';


const router = new Router({
    prefix: '/admin'
});

router.get('/users',adminController.getUsers); //fetch all guests

export default router;


