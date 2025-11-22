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
    year: z.date(),
    code: z.enum([...academicSemesterCode]),
    startMonth: z.enum([...months]),
    endMonth: z.enum([...months]),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
};
