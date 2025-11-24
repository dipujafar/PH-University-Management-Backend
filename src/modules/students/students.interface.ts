import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudents = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo?: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress?: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  academicSemester: Types.ObjectId;
  isDeleted?: boolean;
};

//  for creating static
export interface StudentModel extends Model<TStudents> {
  isUserExists(id: string): Promise<TStudents | null>;
}

//  for creating instance
// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudents | null>;
// };

// export type StudentModel = Model<
//   TStudents,
//   Record<string, never>,
//   StudentMethod
// >;
