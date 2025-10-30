import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// pre save middleware / hook : will work on create() or save()
userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

// post save middleware / hook : will work on create() or save()
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
