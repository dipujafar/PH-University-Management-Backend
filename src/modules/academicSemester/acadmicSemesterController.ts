import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemesterFromDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrieved successfully',
    data: result,
  })
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemesterFromDB
};
