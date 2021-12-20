<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
            <el-input placeholder="Предмет" v-model="formdata.subject" class="form-input"></el-input>
            <el-select
                placeholder="Форма контроля"
                v-model="formdata.control_form"
                class="form-input"
                style="width: 100%"
                ><el-option v-for="item in ['Зачет', 'Экзамен', 'Практика']" :key="item" :label="item" :value="item">
                </el-option
            ></el-select>
            <el-input placeholder="Семестр" v-model="formdata.semester" class="form-input"></el-input>

            <el-select placeholder="Преподаватель" v-model="formdata.teacher_id" class="form-input" style="width: 100%"
                ><el-option v-for="item in teachers" :key="item.id" :label="getTeacherName(item)" :value="item.id">
                </el-option
            ></el-select>
            <el-date-picker
                v-model="formdata.exam_date"
                class="form-input"
                type="date"
                placeholder="Дата начала"
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
            <el-table :data="formattedFormOfControls" style="width: 850px" size="mini">
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
    createFormOfControl,
    deleteFormOfControl,
    getFormOfControls,
    updateFormOfControl,
} from '../../api/formOfControls'
import { getTeachers } from '../../api/teachers'

export default Vue.extend({
    props: ['curriculum_id'],
    data: () => ({
        fields: [
            {
                name: 'Предмет',
                value: 'subject',
            },
            {
                name: 'Форма контроля',
                value: 'control_form',
            },
            {
                name: 'Семестр',
                value: 'semester',
            },
            {
                name: 'Преподаватель',
                value: 'teacher',
            },
            {
                name: 'Дата',
                value: 'formatted_exam_date',
            },
        ],
        formdata: {} as any,
        teachers: [] as any[],
        formOfControls: [] as any[],
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
        formattedFormOfControls(): any[] {
            return this.formOfControls
                .filter((el) => el.curriculum_id == this.curriculum_id)
                .map((el) =>
                    Object.assign({}, el, {
                        //start_date: new Date(el.start_date).toLocaleString().substr(0, 10),
                        formatted_exam_date: new Date(el.exam_date).toLocaleString().substr(0, 10),
                        teacher: this.getTeacherName(this.teachers.find((el2) => el2.id == el.teacher_id)),
                    })
                )
        },
    },
    async fetch() {
        this.formOfControls = await getFormOfControls()
        this.teachers = await getTeachers()
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
                    if (key === 'formatted_exam_date') {
                        editemItemFormFields.exam_date = this.editedItem.exam_date
                    }
                    if (key === 'teacher') {
                        editemItemFormFields.teacher_id = this.editedItem.teacher_id
                    } else {
                        editemItemFormFields[key] = this.editedItem[key]
                    }
                })
            this.formdata = { ...editemItemFormFields }
            this.dialogMode = 'edit'
            this.dialogVisible = true
        },
        async createItem() {
            const formOfControl = await createFormOfControl(
                Object.assign({}, this.formdata, { curriculum_id: this.curriculum_id })
            )
            this.formOfControls.push(formOfControl)
        },
        async updateItem() {
            const formOfControl = await updateFormOfControl(
                Object.assign({}, this.formdata, { id: this.editedItem.id, curriculum_id: this.curriculum_id })
            )
            const index = this.formOfControls.findIndex((el) => el.id === this.editedItem.id)
            this.formOfControls.splice(index, 1, formOfControl)
        },
        async deleteItem(id: number) {
            await deleteFormOfControl({ id })
            const index = this.formOfControls.findIndex((el) => el.id === id)
            this.formOfControls.splice(index, 1)
        },
        getTeacherName(teacher: any) {
            return teacher ? teacher.surname + ' ' + teacher.name + ' ' + teacher.patronymic : 'Неизвестно'
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
