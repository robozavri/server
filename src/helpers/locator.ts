import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';

export function setLocation(req: any, res: Response, next: NextFunction) {
  try {
    const ip: any = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    req.location = geo ? {
      country: geo.country,
      isLocal: geo.country === 'GE',
    } : { country: 'GE', isLocal: true };

    // console.log(geo);
    // console.log(req.location);
    next();
  } catch (e) {
    next(e);
  }
}

/*
{ range: [ 1347651840, 1347652095 ],
  country: 'GE',
  region: 'TB',
  eu: '0',
  timezone: 'Asia/Tbilisi',
  city: 'Tbilisi',
  ll: [ 41.725, 44.7908 ],
  metro: 0,
  area: 1000 }
*/