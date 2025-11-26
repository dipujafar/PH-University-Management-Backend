import config from '../../app/config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudents } from '../students/students.interface';
import { Student } from '../students/students.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudents) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  user.id = await generateStudentId(academicSemester as TAcademicSemester);

  //  at first  create a user
  const newUser = await User.create(user);
  //   then create a student
  if (Object?.keys(newUser)?.length) {
    payload.id = newUser?.id; // embedding student id
    payload.user = newUser?._id; // referencing user id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
