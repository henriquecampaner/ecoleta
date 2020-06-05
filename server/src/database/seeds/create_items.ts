import Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  await knex('items').insert([
    { title: 'Lamps', image: 'lampadas.svg' },
    { title: 'Batteries', image: 'baterias.svg' },
    { title: 'Papers and cardboard', image: 'papeis-papelao.svg' },
    { title: 'Electronic waste', image: 'eletronicos.svg' },
    { title: 'Kitchen oil', image: 'oleo.svg' },
    { title: 'Organic', image: 'organicos.svg' },
  ]);
}
