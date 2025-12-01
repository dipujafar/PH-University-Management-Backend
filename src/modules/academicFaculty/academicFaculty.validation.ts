import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z
    .string({
      message: 'Academic Faculty must be a string',
    })
    .nonempty('Academic Faculty is required'),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
