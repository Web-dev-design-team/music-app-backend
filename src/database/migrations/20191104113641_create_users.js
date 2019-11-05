exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name').notNull();
    table
      .string('email')
      .unique()
      .notNull();
    table
      .string('username')
      .unique()
      .notNull();
    table.string('password').notNull();
    table.timestamps(true, true);
    table.string('bio');
    table.string('avatar');
  });

exports.down = knex => knex.schema.dropTable('users');
