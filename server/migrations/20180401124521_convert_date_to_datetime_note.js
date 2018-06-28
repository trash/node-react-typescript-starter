
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('note', function(t) {
        t.datetime('date').alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('note', function(t) {
        t.date('date').alter();
    });
};
