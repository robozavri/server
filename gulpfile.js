'use strict';

require('babel-register')({
  presets: ['es2015']
});

require('require-dir')('./gulp/tasks');
