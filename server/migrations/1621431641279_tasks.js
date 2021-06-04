/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('tasks', {
    tid: 'id',
    title_task: {
      type: 'text',
      notNull: true
    },
    ischeck:{
      type: 'boolean'
    },
    project_id:{
      type: 'int',
      notNull: true,
      unsigned: true,
      references: 'projects',
      length: 10,
      foreignKey:{
        name: 'project_task_id_fk',
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
    },
  })
  pgm.createIndex('tasks', 'project_id')
};

exports.down = pgm => {};
