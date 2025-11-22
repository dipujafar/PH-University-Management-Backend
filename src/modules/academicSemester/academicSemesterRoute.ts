import express from 'express';
import { AcademicSemesterController } from './acadmicSemesterController';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
