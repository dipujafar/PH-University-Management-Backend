import mongoose from 'mongoose';
import { TStudents } from './students.interface';
import { Student } from './students.model';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('academicSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({id})
    .populate('academicSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const updateSingleStudentFromDB = async (id: string, data: TStudents) => {
  const result = await Student.findOneAndUpdate({ id }, data, { new: true });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
