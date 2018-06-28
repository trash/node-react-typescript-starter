exports.up = function (knex) {
    return knex.schema.createTable('note', function (t) {
        // * note: string;
        // * date: date;
        // * period: PeriodEnum;
        // * user: User (FK)

        t.increments('id')
            .primary();
        t.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('user')
            .notNull()
            .onDelete('cascade');
        t.string('note');
        t.date('date')
            .notNull();
        t.integer('period')
            .notNull();
    })
    // Create first note
    .then(function () {
        return knex('user')
            .where('id', 666)
            .then(function (users) {
                return knex
                    .table('note')
                    .insert({
                        note: 'First test note',
                        user_id: users[0].id,
                        date: new Date().toISOString(),
                        period: 1
                    });
            })
    })
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('note');
}