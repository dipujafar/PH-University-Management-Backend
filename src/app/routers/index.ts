import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/students/students.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemesterRoute';

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
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  }
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
