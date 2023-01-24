import { Router, Request, Response } from 'express';
import fs from 'fs';

import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  res.status(200);

  try {
    // read file
    const fileData: Repo[] = JSON.parse(
      fs.readFileSync('data/repos.json', 'utf8')
    );

    res.json(fileData.filter((data) => !data.fork));
  } catch (error) {
    res.status(400).send(error);
  }
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
});
