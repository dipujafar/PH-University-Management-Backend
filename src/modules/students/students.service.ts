import { TStudents } from './students.interface';
import { Student } from './students.model';

const createStudentIntoDB = async (studentData: TStudents) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await Student.create(studentData); // built in static method

  //   const student = new Student(studentData);

  //   if(await student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists');
  //   }

  //   const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const updateSingleStudentFromDB = async (id: string, data: TStudents) => {
  console.log(data);
  const result = await Student.updateOne({ id }, { $set: data });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
