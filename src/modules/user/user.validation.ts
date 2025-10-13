import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ message: 'Password must be a string' })
    .max(20, 'Password can not exceed 20 characters')
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
