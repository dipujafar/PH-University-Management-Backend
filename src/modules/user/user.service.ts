import config from '../../app/config';
import { TStudents } from '../students/students.interface';
import { TNewUser } from './user.interface';

import { User } from './user.model';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {
  const user: TNewUser = {};
  user.password = password || (config.default_password as string);
  user.role = 'student';
  user.id = '2030100001';

  //  at first  create a user
  const result = await User.create(user);
  //   then create a student
  if (Object?.keys(result)?.length) {
    studentData.id = result?.id;
    studentData.user = result?.id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
