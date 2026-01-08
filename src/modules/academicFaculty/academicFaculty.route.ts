import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFacultyController';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);
router.post(
  '/generate-report',
  academicFacultyController.generateReport,
);

router.get('/', academicFacultyController.getAllAcademicFaculties);

router.get(
  '/:facultyId',
  academicFacultyController.getSingleAcademicFacultyFromDB,
);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateAcademicSemester,
);

export const AcademicFacultyRoutes = router;
