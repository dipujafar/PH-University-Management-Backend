import express from 'express';
import { StudentController } from './students.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { updateStudentValidateSchema } from './students.validation';

const router = express.Router();



router.get('/', StudentController.getAllStudents);

router.get('/:StudentId', StudentController.getSingleStudent);

router.patch("/:StudentId", validateRequest(updateStudentValidateSchema), StudentController.updateSingleStudent);

router.delete("/:StudentId",StudentController.deleteSingleStudent)

export const StudentRoutes = router;
