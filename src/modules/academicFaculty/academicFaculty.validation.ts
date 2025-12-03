import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z
    .string({
      message: 'Academic Faculty must be a string',
    })
    .nonempty('Academic Faculty is required'),
});

const updateAcademicSemesterValidationSchema = z.object({
  name: z
    .string({
      message: 'Academic Faculty must be a string',
    })
    .nonempty('Academic Faculty is required'),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicSemesterValidationSchema,
};
