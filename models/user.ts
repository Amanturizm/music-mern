import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types';
import { randomUUID } from 'crypto';

const SALT_WORK_FACTORS = 10;

interface IUserMethods {
  generateToken(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTORS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;

    return ret;
  }
});

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = model('User', UserSchema);

export default User;