/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    uid: 'id',
    username: {
      type: 'varchar(255)', notNull: true
    },
    email: {type: 'varchar(255)', notNull: true},
    emailVerified: 'boolean',
    password: {
      type: 'varchar(255)',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
};

exports.down = pgm => {};
