import * as multer from 'multer';
import config from './environment';

export const storage = multer.diskStorage({
  destination: config.paths.uploads,

  filename: (req, file, cb) => {
    cb(undefined, file.originalname);
  },
});
