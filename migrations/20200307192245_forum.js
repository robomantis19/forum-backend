

exports.up = function(knex) {
    return knex.schema.createTable('users', users => { 
        users.increments();
        users.string('username', 128)
        .notNullable()
        .unique();
  
        users.string('password', 128).notNullable();
    })
    .createTable('Message', tbl => { 
        tbl.increments();
        tbl.string('from_user', 256)
        tbl.string('message', 2048)
        tbl.float('starRating')
        tbl.integer('user_id', 128)
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Message')
    .dropTableIfExists('users')
};
