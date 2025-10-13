import express from 'express';

const router = express.Router();

router.post('/create-student', userController.createStudent);

export const UserRoutes = router;
