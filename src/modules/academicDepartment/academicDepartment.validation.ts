import { z } from 'zod';
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Academic Department must be a string',
      })
      .nonempty('Academic Department is required'),
    academicFaculty: z
      .string({
        message: 'Academic Faculty must be a string',
      })
      .nonempty('Academic Faculty is required'),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Academic Department must be a string',
      })
      .optional(),
    academicFaculty: z
      .string({
        message: 'Academic Faculty must be a string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
