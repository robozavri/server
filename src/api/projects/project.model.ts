import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const ProjectSchema = new Schema({
  
  name: String,
  title: multilingualSchema,
  description: multilingualSchema,
  count: Number,
  thumbnail: imageSchema,
  images: [imageSchema],
  createAt: Date,
  socialAccounts: [{ account: String, link: String }],
  meta: metaTagsSchema,
  position: Number,
});

export default model('Project', ProjectSchema);
