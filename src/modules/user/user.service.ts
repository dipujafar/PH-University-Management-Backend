import { startSession } from 'mongoose';
import config from '../../app/config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudents } from '../students/students.interface';
import { Student } from '../students/students.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudents) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const session = await startSession();

  try {
    session.startTransaction();

    user.id = await generateStudentId(academicSemester as TAcademicSemester);

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
