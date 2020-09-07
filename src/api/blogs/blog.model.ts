import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogSchema = new Schema({
  
  name: String,
  meta: metaTagsSchema,about: { contact: { category: [{ type: Schema.Types.ObjectId, ref: 'blogCategory' }], street: { title: String, blogType: String, peoples: { human: { age: multilingualSchema, age4: String,}, isFeatured: Boolean,}, desc: String,}, image: imageSchema,}, dimmuborgir: { ambum: String, songs: { oneSong: multilingualSchema, oneSong2: multilingualSchema,}, metal: { images: [imageSchema],},}, socialAccounts: [{ account: String, link: String }],},
  position: Number,
});

export default model('Blog', BlogSchema);
