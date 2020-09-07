import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import config from '../../config/environment';
import * as fileParser  from './file.parser';
import * as multerConfig from '../../config/multer';

const upload = multer(multerConfig);

const fileRouter = Router();

fileRouter.post('/', upload.array('filesToAdd', 20), fileParser.parseCreateAndDestroy, destroy);

fileRouter.post('/editor', upload.single('upload'), returnEditorFile);

export default fileRouter;

function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const {fileNamesToDestroy} = req.body;
    for (const filename of fileNamesToDestroy) {
      const filepath = path.join(config.paths.uploads, filename || '');
      fs.unlink(filepath, () => {});
    }
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

function returnEditorFile(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      'uploaded': 1,
      'fileName': req.file.filename,
      'url': config.resourceUrl + '/' + req.file.filename,
    });
  } catch (e) {
    next(e);
  }
}