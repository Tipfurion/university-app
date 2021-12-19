<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
            <el-input placeholder="Имя" v-model="formdata.name" class="form-input"></el-input>
            <el-input placeholder="Фамилия" v-model="formdata.surname" class="form-input"></el-input>
            <el-input placeholder="Отчество" v-model="formdata.patronymic" class="form-input"></el-input>
            <el-input placeholder="Телефон" v-model="formdata.phone" class="form-input"></el-input>
            <el-input placeholder="Email" v-model="formdata.email" class="form-input"></el-input>

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
            @click="
                dialogVisible = true
                dialogMode = 'create'
            "
            >Добавить</el-button
        >
        <el-row>
            <el-table :data="students" style="width: 1200px">
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
import { createStudent, deleteStudent, getStudents, updateStudent } from '../../api/students'

export default Vue.extend({
    data: () => ({
        fields: [
            {
                name: 'Имя',
                value: 'name',
            },
            {
                name: 'Фамилия',
                value: 'surname',
            },
            {
                name: 'Отчество',
                value: 'patronymic',
            },
            {
                name: 'Телефон',
                value: 'phone',
            },
            {
                name: 'Email',
                value: 'email',
            },
        ],
        formdata: {} as any,
        students: [] as any[],
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
    },
    async fetch() {
        this.students = await getStudents()
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
                    editemItemFormFields[key] = this.editedItem[key]
                })
            this.formdata = { ...editemItemFormFields }
            this.dialogMode = 'edit'
            this.dialogVisible = true
        },
        async createItem() {
            const student = await createStudent(this.formdata)
            this.students.push(student)
        },
        async updateItem() {
            const student = await updateStudent(Object.assign({}, this.formdata, { id: this.editedItem.id }))
            const index = this.students.findIndex((el) => el.id === this.editedItem.id)
            this.students.splice(index, 1, student)
        },
        async deleteItem(id: number) {
            await deleteStudent({ id })
            const index = this.students.findIndex((el) => el.id === id)
            this.students.splice(index, 1)
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
