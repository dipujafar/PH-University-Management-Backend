import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import { academicSemesterCode, academicSemesterName, months } from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterName,
        message:
          "{VALUE} is not valid. The gender field can only be one of the following values: 'Autumn', 'Summer' or 'Fall'",
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCode,
        message:
          "{VALUE} is not valid. The code field can only be one of the following values: '01', '02' or '03'",
      },
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: '{VALUE} is not a valid month',
      },
    },
  },
  {},
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
