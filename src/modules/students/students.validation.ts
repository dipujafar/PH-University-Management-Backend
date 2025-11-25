import { z } from 'zod';

// Name Schema
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty('First name is required')
    .trim()
    .max(20, 'First name can not exceed 20 characters')
    .refine(
      val => {
        const capitalized = val?.charAt(0).toUpperCase() + val?.slice(1);
        return capitalized === val;
      },
      { message: 'First name is not capitalized' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required')
    .trim()
    .refine(val => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must contain only alphabets',
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required').trim(),
  fatherOccupation: z.string().nonempty('Father occupation is required').trim(),
  fatherContact: z.string().nonempty('Father contact is required').trim(),
  motherName: z.string().nonempty('Mother name is required').trim(),
  motherOccupation: z.string().nonempty('Mother occupation is required').trim(),
  motherContact: z.string().nonempty('Mother contact is required').trim(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupation: z.string().nonempty('Occupation is required').trim(),
  contactNo: z.string().nonempty('Contact no is required').trim(),
  address: z.string().nonempty('Address is required').trim(),
});

// ----------- Main Student Schema ------------
export const createStudentValidateSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'])
        .refine(val => ['male', 'female', 'other'].includes(val), {
          message:
            "The gender field can only be one of: 'male', 'female', or 'other'",
        }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Email is not valid')
        .nonempty('Email is required'),
      contactNo: z.string().trim().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .refine(
          val =>
            ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
          {
            message:
              "The blood group field can only be one of: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
          },
        ),
      presentAddress: z.string().nonempty('Present address is required').trim(),
      permanentAddress: z.string().trim().optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      academicSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidateSchema,
};
