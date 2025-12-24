import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Academic Faculty must be a string',
      })
      .nonempty('Academic Faculty is required'),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Academic Faculty must be a string',
      })
      .nonempty('Academic Faculty is required'),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
