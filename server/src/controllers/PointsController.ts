/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import knex from '../database/connection';

export default class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      country,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      id: uuid(),
      image:
        'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      country,
    };

    const checkIfEmailExist = await trx('points').where('email', email).first();

    if (checkIfEmailExist) {
      return response.status(400).json({ error: 'Email already in use' });
    }

    await trx('points').insert(point);

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: point.id,
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point.id,
      ...point,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ error: 'point not found' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({
      point,
      items,
    });
  }

  async index(request: Request, response: Response) {
    const { city, country, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => item.trim());

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('country', String(country))
      .distinct()
      .select('points.*');

    return response.json(points);
  }
}
