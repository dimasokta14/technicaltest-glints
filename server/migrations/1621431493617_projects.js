/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('projects', {
    pid: 'id',
    title: {
      type: 'text',
      notNull: true
    },
    user_id:{
      type: 'int',
      notNull: true,
      unsigned: true,
      references: 'users',
      length: 10,
      foreignKey:{
        name: 'user_project_id_fk',
        table: 'projects',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  pgm.createIndex('projects', 'user_id')
};

exports.down = pgm => {};