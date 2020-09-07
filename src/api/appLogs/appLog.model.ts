import { Schema, model } from 'mongoose';

const AppLogSchema = new Schema({
  level: String,
  timestamp: Date,
  message: String,
  meta: Schema.Types.Mixed,
});

export default model('AppLog', AppLogSchema);