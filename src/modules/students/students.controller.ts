import { Request, Response } from 'express';
import { StudentServices } from './students.service';



const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'student retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'something went wrong',
      error: error,
    });
  }
};

const updateSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { student: studentData } = req.body;
    const result = await StudentServices.updateSingleStudentFromDB(
      id,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'student updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Successfully Deleted the student',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'something went wrong',
      error: error,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
