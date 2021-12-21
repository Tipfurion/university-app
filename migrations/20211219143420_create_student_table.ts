import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('student', function(table) {
        table.increments()
        table.string('name')
        table.string('surname')
        table.string('patronymic')
        table.string('phone')
        table.string('email')
        table.integer('group_id')
        table.boolean('deleted').defaultTo(false)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('student')
}
