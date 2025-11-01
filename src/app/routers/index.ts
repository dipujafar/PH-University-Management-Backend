import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/students/students.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});
router.use();

export default router;
