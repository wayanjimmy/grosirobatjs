exports.seed = knex => {
  return knex
    .raw(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'`)
    .then(async res => {
      const tables = res.rows
        .map(row => row.tablename)
        .filter(table => !['migrations', 'migrations_lock'].includes(table))

      for (const table of tables) {
        await knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
      }

      const quotedTableNames = tables.map(table => `"${table}"`)

      if (quotedTableNames.length > 0) {
        await knex.raw(`TRUNCATE ${quotedTableNames.join()} CASCADE`)
      }
    })
}
