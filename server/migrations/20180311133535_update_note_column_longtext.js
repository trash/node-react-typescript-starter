
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('note', function(t) {
        t.text('note').alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('note', function(t) {
        t.string('note').alter();
    });
};
