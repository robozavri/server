import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  startTime: String,
  endTime: String,
  color: {
    primary: String,
  },
  meta: {
    notes: String,
  },
  draggable: Boolean,
});

export default model('Event', EventSchema);