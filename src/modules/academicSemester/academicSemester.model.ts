import { Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: {
      values: ['Autumn', 'Summer', 'Fall'],
      message:
        "{VALUE} is not valid. The gender field can only be one of the following values: 'Autumn', 'Summer' or 'Fall'",
    },
    required: true,
  },
  code: {
    type: String,
    enum: {
      values: ['01', '02', '03'],
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
    enum: {
      values: months,
      message: '{VALUE} is not a valid month',
    },
  },
  endMonth: {
    type: String,
    enum: {
      values: months,
      message: '{VALUE} is not a valid month',
    },
  },
});
