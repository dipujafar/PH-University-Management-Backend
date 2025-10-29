import { Schema, model } from 'mongoose';
import { StudentModel, TStudents } from './students.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [20, 'First name can not exceed 20 characters'],
    validate: {
      validator: function (value: string) {
        const firNameStr = value?.charAt(0).toUpperCase() + value?.slice(1);
        return firNameStr === value;
      },
      message: 'First name is not capitalized',
    },
  },
  middleName: {
    type: String,
    trim: true,
    optional: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    validate: {
      validator: value => validator?.isAlpha(value),
      message: '{VALUE} is not a valid Last name',
    },
  },
});

const guardianSchema = new Schema({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContact: {
    type: String,
    trim: true,
    required: [true, 'Father contact is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContact: {
    trim: true,
    type: String,
    required: [true, 'Mother contact is required'],
  },
});

const localGuardianSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact no is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudents, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'], unique: true },
    password: {
      type: String,
      required: true,
      maxLength: [20, 'Password can not exceed 20 characters'],
    },
    name: { type: nameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid. The gender field can only be one of the following values: 'male', 'female' or 'other'",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Email is not valid',
      },
    },
    contactNo: { type: String, trim: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          "{VALUE} is not valid. The blood group field can only be one of the following values: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
      },
      required: true,
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: { type: String },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian is required'],
    },
    profileImage: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

// pre save middleware / hook : will work on create() or save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : will save data ');
  // hashing password before saving in document
  const user = this;

  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

// post save middleware / hook : will work on create() or save()
studentSchema.post('save', function (doc, next) {
  console.log(this, 'post hook: after save data');
  doc.password = '';
  next();
});

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregation middleware
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: false } } });
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//  creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// -------------- create  model ------------------
export const Student = model<TStudents, StudentModel>(
  'Students',
  studentSchema,
);
