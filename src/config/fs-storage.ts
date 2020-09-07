import * as fs from 'fs';
import config from '../config/environment';

export function initDirectories() {
  if (!fs.existsSync(config.paths.root)) {
    fs.mkdirSync(config.paths.root);
  }

  if (!fs.existsSync(config.paths.log)) {
    fs.mkdirSync(config.paths.log);
  }

  if (!fs.existsSync(config.paths.uploads)) {
    fs.mkdirSync(config.paths.uploads);
  }
}
