import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/students/students.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemesterRoute';
import { AcademicFacultyRoutes } from '../../modules/academicFaculty/academicFaculty.route';

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
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
