import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const contactSchema = {
  phone: String,
  email: String,
  address: multilingualSchema,
  adminEmail: String,
};

const articlesSchema = {
  title: multilingualSchema,
  subtitle: multilingualSchema,
};

const CommonSchema = new Schema({
  contact: contactSchema,
  articles: articlesSchema,
});

export default model('Common', CommonSchema);