import express from 'express';
import { StudentController } from './students.controller';

const router = express.Router();



router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getSingleStudent);

router.patch("/:id", StudentController.updateSingleStudent);

router.delete("/:id",StudentController.deleteSingleStudent)

export const StudentRoutes = router;
