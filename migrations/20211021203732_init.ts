import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', function(table) {
        table.increments()
        table.string('login')
        table.string('type')
        table.string('password_hash')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user')
}
