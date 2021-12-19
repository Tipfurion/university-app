import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('group', function(table) {
        table.increments()
        table.string('code')
        table.string('speciality')
        table.integer('curriculum_id')
        table.boolean('deleted')
    })
    await knex.schema.createTable('teacher', function(table) {
        table.increments()
        table.string('name')
        table.string('surname')
        table.string('patronymic')
        table.string('phone')
        table.string('email')
        table.string('department')
        table.boolean('deleted')
    })
    await knex.schema.createTable('academic_performance', function(table) {
        table.increments()
        table.integer('student_id')
        table.string('mark')
        table.integer('form_of_control_id')
        table.date('complete_date')
        table.boolean('deleted')
    })
    await knex.schema.createTable('curriculum', function(table) {
        table.increments()
        table.string('education_form')
        table.date('start_date')
        table.boolean('deleted')
    })
    await knex.schema.createTable('form_of_control', function(table) {
        table.increments()
        table.boolean('is_practice')
        table.string('subject')
        table.string('control_form')
        table.integer('semester')
        table.integer('curriculum_id')
        table.integer('teacher_id')
        table.date('exam_date')
        table.boolean('deleted')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('group')
    await knex.schema.dropTable('teacher')
    await knex.schema.dropTable('academic_performance')
    await knex.schema.dropTable('curriculum')
    await knex.schema.dropTable('form_of_control')
}
