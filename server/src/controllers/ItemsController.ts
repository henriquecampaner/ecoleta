/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: String(item.id),
        title: String(item.title),
        image_url: `http://192.168.0.101:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}
