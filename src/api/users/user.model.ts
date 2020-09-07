import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,

  passwordHash: String,
  isActivated: Boolean,
  activationToken: String,
  role: String,
  joinedAt: Date,
});

UserSchema.index({email: 1}, {unique: true});

export default model('User', UserSchema);
