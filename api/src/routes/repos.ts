import { Router, Request, Response } from 'express';
import fs from 'fs';
import fetch from 'node-fetch';

import { Repo } from '../models/Repo';

export const repos = Router();
const JSON_URL = 'https://api.github.com/users/silverorange/repos';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  res.status(200);

  try {
    const response = await fetch(JSON_URL).then((res) => res.json());
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});
