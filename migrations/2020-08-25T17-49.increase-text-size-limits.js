exports.up = ({slonik, sql}) => slonik.query(sql`
ALTER TABLE happenings ALTER COLUMN description TYPE varchar(2047);
ALTER TABLE happenings ALTER COLUMN organizer_description TYPE varchar(2047);
ALTER TABLE happenings ALTER COLUMN agenda TYPE varchar(2047);
`)
exports.down = ({slonik, sql}) => slonik.query(sql`
ALTER TABLE happenings ALTER COLUMN description TYPE varchar(1023);
ALTER TABLE happenings ALTER COLUMN organizer_description TYPE varchar(1023);
ALTER TABLE happenings ALTER COLUMN agenda TYPE varchar(1023);
`)
