import { StudentServices } from './students.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { StudentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(StudentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student retrieved successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res, next) => {
  const { StudentId } = req.params;
  const { student: studentData } = req.body;
  const result = await StudentServices.updateSingleStudentFromDB(
    StudentId,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { StudentId } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(StudentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
