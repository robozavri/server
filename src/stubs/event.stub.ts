import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

const EventStub = {
  title: 'Event Name',
  start: new Date(),
  end: new Date(),
  color: {
    primary: '#039be5',
  },
  meta: {
    notes: 'event note',
  },
  draggable: false,
  startTime: '13:00',
  endTime: '23:00',
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(EventStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: `Event ${i}`,
  }));
}