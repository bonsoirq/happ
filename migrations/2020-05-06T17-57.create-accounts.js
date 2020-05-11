exports.up = ({ slonik, sql }) => slonik.query(sql`
CREATE TABLE accounts (
  id uuid PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE(email)
);
`)

exports.down = ({ slonik, sql }) => slonik.query(sql`
DROP TABLE accounts;
`)
