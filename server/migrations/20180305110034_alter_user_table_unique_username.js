
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('user', function(t) {
        t.unique(['username']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('user', function(t) {
        t.dropUnique(['username']);
    });
};
