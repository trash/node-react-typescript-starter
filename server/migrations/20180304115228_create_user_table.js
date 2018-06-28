exports.up = function (knex) {
    return knex.schema
        .createTable('user', function (t) {
            t.increments('id').primary()
            t.string('username').notNullable()
            t.string('password').notNullable()
            t.timestamps()
        })
        // Insert test user
        .then(function() {
            return knex.insert({
                id: 666,
                username: 'tester',
                password: 'tester'
            }).into('user');
        });
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
}