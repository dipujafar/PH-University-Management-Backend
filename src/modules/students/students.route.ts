import express from 'express';
import { StudentController } from './students.controller';

const router = express.Router();



router.get('/', StudentController.getAllStudents);

router.get('/:StudentId', StudentController.getSingleStudent);

router.patch("/:StudentId", StudentController.updateSingleStudent);

router.delete("/:StudentId",StudentController.deleteSingleStudent)

export const StudentRoutes = router;
