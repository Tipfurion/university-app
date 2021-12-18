import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('group', function(table) {
        table
            .boolean('deleted')
            .alter()
            .defaultTo(false)
    })
    await knex.schema.alterTable('teacher', function(table) {
        table
            .boolean('deleted')
            .alter()
            .defaultTo(false)
    })
    await knex.schema.alterTable('academic_performance', function(table) {
        table
            .boolean('deleted')
            .alter()
            .defaultTo(false)
    })
    await knex.schema.alterTable('curriculum', function(table) {
        table
            .boolean('deleted')
            .alter()
            .defaultTo(false)
    })
    await knex.schema.alterTable('form_of_control', function(table) {
        table
            .boolean('deleted')
            .alter()
            .defaultTo(false)
    })
}

export async function down(knex: Knex): Promise<void> {
    return
}
