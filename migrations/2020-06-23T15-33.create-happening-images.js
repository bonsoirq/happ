exports.up = ({ slonik, sql }) => slonik.query(sql`
CREATE TABLE happening_images (
  id uuid PRIMARY KEY,
  happening_id uuid NOT NULL,
  path varchar(255) NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`)

exports.down = ({ slonik, sql }) => slonik.query(sql`
DROP TABLE happening_images;
`)
