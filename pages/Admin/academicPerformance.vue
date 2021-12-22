<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
            <el-select
                placeholder="Студент"
                v-model="formdata.student_id"
                class="form-input"
                style="width: 100%"
                filterable
                ><el-option v-for="item in students" :key="item.id" :label="getStudentName(item)" :value="item.id">
                </el-option
            ></el-select>
            <el-select placeholder="Оценка" v-model="formdata.mark" class="form-input" style="width: 100%"
                ><el-option
                    v-for="item in [
                        'Отлично',
                        'Хорошо',
                        'Удовлетворительно',
                        'Зачтено',
                        'Не зачтено',
                        'Неудовлетворительно',
                        'Неявка',
                    ]"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option
            ></el-select>
            <el-select
                placeholder="Форма контроля"
                filterable=""
                v-model="formdata.form_of_control_id"
                class="form-input"
                style="width: 100%"
                ><el-option
                    v-for="item in formOfControls"
                    :key="item.id"
                    :label="getFormOfControlName(item)"
                    :value="item.id"
                >
                </el-option
            ></el-select>

            <el-date-picker
                v-model="formdata.complete_date"
                class="form-input"
                type="date"
                placeholder="Дата сдачи"
                style="width: 100%"
            >
            </el-date-picker>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Отмена</el-button>
                <el-button type="primary" @click="handleApplyButton">{{ applyButtonTitle }}</el-button>
            </span>
        </el-dialog>
        <el-button
            plain
            type="primary"
            icon="el-icon-plus"
            style="margin-bottom: 14px"
            size="mini"
            @click="
                dialogVisible = true
                dialogMode = 'create'
            "
            >Добавить</el-button
        >
        <el-row>
            <el-table :data="formattedAcademicPerformances" style="width: 1050px">
                <el-table-column v-for="field in fields" :prop="field.value" :label="field.name" :key="field.value">
                </el-table-column>

                <el-table-column label="Действия">
                    <template slot-scope="scope">
                        <div class="action-buttons">
                            <el-button size="mini" class="action-button" @click="handleEdit(scope.row)"
                                >Редактировать</el-button
                            >
                            <el-button size="mini" class="action-button" type="danger" @click="deleteItem(scope.row.id)"
                                >Удалить</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
    createAcademicPerformance,
    deleteAcademicPerformance,
    getAcademicPerformances,
    updateAcademicPerformance,
} from '../../api/academicPerformance'
import { getFormOfControls } from '../../api/formOfControls'
import { getGroups } from '../../api/groups'
import { getStudents } from '../../api/students'

export default Vue.extend({
    data: () => ({
        fields: [
            {
                name: 'Студент',
                value: 'student',
            },
            {
                name: 'Форма контроля',
                value: 'formOfControl',
            },
            {
                name: 'Оценка',
                value: 'mark',
            },

            {
                name: 'Дата сдачи',
                value: 'formatted_complete_date',
            },
        ],
        formdata: {} as any,
        students: [] as any[],
        groups: [] as any[],
        formOfControls: [] as any[],
        academicPerformances: [] as any[],
        editedItem: null as any,
        dialogVisible: false,
        dialogMode: null as string | null,
    }),
    computed: {
        dialogTitle(): string {
            return this.dialogMode === 'create' ? 'Создать' : 'Редактировать'
        },
        applyButtonTitle(): string {
            return this.dialogMode === 'create' ? 'Создать' : 'Применить'
        },
        formattedAcademicPerformances(): any[] {
            return this.academicPerformances.map((el) =>
                Object.assign({}, el, {
                    formatted_complete_date: el.complete_date
                        ? new Date(el.complete_date).toLocaleString().substr(0, 10)
                        : '',
                    formOfControl: this.getFormOfControlName(
                        this.formOfControls.find((el2) => el2.id == el.form_of_control_id)
                    ),
                    student: this.getStudentName(this.students.find((el2) => el2.id == el.student_id)),
                })
            )
        },
    },
    async fetch() {
        this.academicPerformances = await getAcademicPerformances()
        this.students = await getStudents()
        this.groups = await getGroups()
        this.formOfControls = await getFormOfControls()
    },
    methods: {
        handleDialogClose() {
            this.formdata = {}
            this.dialogMode = null
            this.editedItem = null
        },
        async handleApplyButton() {
            if (this.dialogMode === 'create') {
                await this.createItem()
            }
            if (this.dialogMode === 'edit') {
                await this.updateItem()
            }
            this.dialogVisible = false
        },
        handleEdit(item: any) {
            this.editedItem = item
            const editemItemFormFields = {} as any
            this.fields
                .map((el) => el.value)
                .forEach((key) => {
                    if (key === 'formatted_complete_date') {
                        editemItemFormFields.complete_date = this.editedItem.complete_date
                    }
                    if (key === 'student') {
                        editemItemFormFields.student_id = this.editedItem.student_id
                    }
                    if (key === 'formOfControl') {
                        editemItemFormFields.form_of_control_id = this.editedItem.form_of_control_id
                    } else {
                        editemItemFormFields[key] = this.editedItem[key]
                    }
                })
            this.formdata = { ...editemItemFormFields }
            this.dialogMode = 'edit'
            this.dialogVisible = true
        },
        async createItem() {
            const academicPerformance = await createAcademicPerformance(Object.assign({}, this.formdata))
            this.academicPerformances.push(academicPerformance)
        },
        async updateItem() {
            const academicPerformance = await updateAcademicPerformance(
                Object.assign({}, this.formdata, { id: this.editedItem.id })
            )
            const index = this.academicPerformances.findIndex((el) => el.id === this.editedItem.id)
            this.academicPerformances.splice(index, 1, academicPerformance)
        },
        async deleteItem(id: number) {
            await deleteAcademicPerformance({ id })
            const index = this.academicPerformances.findIndex((el) => el.id === id)
            this.academicPerformances.splice(index, 1)
        },
        getStudentName(student: any) {
            const group = this.groups.find((el2) => el2.id == student.group_id)
            const groupCode = group ? group.code : ''
            return student
                ? student.surname + ' ' + student.name + ' ' + student.patronymic + ' ' + groupCode
                : 'Неизвестно'
        },
        getFormOfControlName(formOfControl: any) {
            if (!formOfControl) return ''
            return (
                formOfControl.subject +
                ' ' +
                formOfControl.control_form +
                ' ' +
                new Date(formOfControl.exam_date).toLocaleString().substr(0, 10)
            )
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
