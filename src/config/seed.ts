import logger from '../helpers/logger';
import config from '../config/environment';
import { roles } from '../constants/user';
import * as _ from 'lodash';

import * as UserDao from '../api/users/user.dao';
import * as CommonDao from '../api/commons/common.dao';
import * as MetaDao from '../api/metas/meta.dao';
import * as ArticleDao from '../api/articles/article.dao';
import * as EventDao from '../api/events/event.dao';
import * as BlogCategoriesDao from '../api/blogCategories/blogCategories.dao';
import * as ProjectDao from '../api/projects/project.dao';
import * as BlogDao from '../api/blogs/blog.dao';

import * as UserStub from '../stubs/user.stub';
import * as CommonStub from '../stubs/common.stub';
import * as MetaStub from '../stubs/meta.stub';
import * as ArticleStub from '../stubs/article.stub';
import * as EventStub from '../stubs/event.stub';
import * as BlogCategoriesStub from '../stubs/blogCategories.stub';
import * as BlogStub from '../stubs/blog.stub';
import * as ProjectStub from '../stubs/project.stub';



export async function seedDB() {
  const { seedDB, env } = config;
  if (!seedDB) return;
  if (env === 'development') {
    await clearDBDevelopment();
    await seedDBDevelopment();
  }
  if (env === 'production') {
    await clearDBProduction();
    await seedDBProduction();
  }
}

export async function seedDBDevelopment() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await ArticleDao.insertMany(ArticleStub.getMany(11));
  await EventDao.insertMany(EventStub.getMany(11));
  await BlogCategoriesDao.insertMany(BlogCategoriesStub.getMany(11));
  await ProjectDao.insertMany(ProjectStub.getMany(11));
  await BlogDao.insertMany(BlogStub.getMany(11));


  logger.info('Seed DB development completed');
}

export async function seedDBProduction() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await ArticleDao.insertMany(ArticleStub.getMany(11));
  await EventDao.insertMany(EventStub.getMany(11));

  logger.info('Seed DB production completed');
}

export async function clearDBDevelopment() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();
  await ArticleDao.destroyAll();
  await EventDao.destroyAll();
  await BlogCategoriesDao.destroyAll();
  await BlogDao.destroyAll();
}

export async function clearDBProduction() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();
  await ArticleDao.destroyAll();
  await EventDao.destroyAll();
}

function getAdmin() {
  return [
    UserStub.getSingle({
      email: 'admin@project.com',
      name: 'Admin',
      role: roles.ADMIN,
      isActivated: true,
    })
  ];
}