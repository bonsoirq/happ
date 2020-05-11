exports.up = ({ slonik, sql }) => slonik.query(sql`
CREATE TABLE happenings (
  id uuid PRIMARY KEY,
  account_id uuid NOT NULL,
  name varchar(255) NOT NULL,
  description varchar(1023) NOT NULL,
  organizer_description varchar(1023) NOT NULL,
  agenda varchar(1023) NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`)

exports.down = ({ slonik, sql }) => slonik.query(sql`
DROP TABLE happenings;
`)
