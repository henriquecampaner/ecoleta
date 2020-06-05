import Knex from 'knex';
import connection from '../connection';

const uuidGenerationRaw =
  connection.client.config.client === 'sqlite3'
    ? `(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))`
    : `uuid_generate_v4()`;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('items', table => {
    table.uuid('id').primary().defaultTo(connection.raw(uuidGenerationRaw));
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchema('items');
}
