import { TStudents } from './students.interface';
import { Student } from './students.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('academicSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const updateSingleStudentFromDB = async (id: string, data: TStudents) => {
  const result = await Student.findOneAndUpdate({ id }, data, { new: true });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
