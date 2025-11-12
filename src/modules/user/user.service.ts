import config from '../../app/config';
import { TStudents } from '../students/students.interface';
import { Student } from '../students/students.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);
  user.role = 'student';
  user.id = '2030100001';

  //  at first  create a user
  const newUser = await User.create(user);
  //   then create a student
  if (Object?.keys(newUser)?.length) {
    studentData.id = newUser?.id; // embedding student id
    studentData.user = newUser?._id; // referencing user id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
