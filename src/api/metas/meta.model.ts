import { Schema, model } from 'mongoose';
import metaTagsSchema from '../../schemas/metaTags.schema';

const MetaSchema = new Schema({
  home: metaTagsSchema,
});

export default model('Meta', MetaSchema);