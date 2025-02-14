import mongoose, { Schema } from 'mongoose';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}


export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  active: boolean;
  status: UserRole;
  _id: mongoose.Types.ObjectId;
}


const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: UserRole.USER,
  },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);

