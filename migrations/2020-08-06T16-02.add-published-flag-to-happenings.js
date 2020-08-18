exports.up = ({ slonik, sql }) => slonik.query(sql`
  ALTER TABLE happenings ADD COLUMN is_published boolean NOT NULL DEFAULT FALSE;
`)

exports.down = ({ slonik, sql }) => slonik.query(sql`
  ALTER TABLE happenings DROP COLUMN is_published;
`)
