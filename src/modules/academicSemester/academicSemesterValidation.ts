import z from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';
import { TAcademicSemesterName } from './academicSemester.interface';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as TAcademicSemesterName[]),
    year: z.string(),
    code: z.enum([...academicSemesterCode]),
    startMonth: z.enum([...months]),
    endMonth: z.enum([...months]),
  }),
});

const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z
      .enum([...academicSemesterName] as TAcademicSemesterName[])
      .optional(),
    year: z.string().optional(),
    code: z.enum([...academicSemesterCode]).optional(),
    startMonth: z.enum([...months]).optional(),
    endMonth: z.enum([...months]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
