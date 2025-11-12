import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { createStudentValidateSchema } from '../students/students.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidateSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
