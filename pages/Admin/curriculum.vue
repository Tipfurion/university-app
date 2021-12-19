<template>
    <div>
        <pre>curriculumFormdata:{{ curriculumFormdata }}</pre>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
            <el-input
                placeholder="Форма обучнения"
                v-model="curriculumFormdata.education_form"
                class="form-input"
            ></el-input>

            <el-date-picker
                v-model="curriculumFormdata.start_date"
                class="form-input"
                type="date"
                placeholder="Дата начала"
            >
            </el-date-picker>
            <el-select
                v-model="curriculumFormdata.groupIds"
                multiple
                placeholder="Группы"
                class="form-input"
                style="width: 100%"
            >
                <el-option v-for="group in groups" :key="group.id" :label="group.code" :value="group.id"> </el-option>
            </el-select>
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
            <el-table :data="curriculumsWithGroups" style="width: 1000px">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <Teacherspage></Teacherspage>
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="field in curriculumFields"
                    :prop="field.value"
                    :label="field.name"
                    :key="field.value"
                >
                </el-table-column>
                <el-table-column prop="groups" label="Группы"> </el-table-column>
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
import { createCurriculum, deleteCurriculum, getCurriculums, updateCurriculum } from '../../api/curriculum'
import { getGroups } from '../../api/groups'
import Teacherspage from '@/pages/Admin/teachers.vue'
export default Vue.extend({
    components: { Teacherspage },
    data: () => ({
        curriculumFields: [
            {
                name: 'Форма обучения',
                value: 'education_form',
            },
            {
                name: 'Дата начала',
                value: 'formatted_start_date',
            },
        ],
        curriculumFormdata: {} as any,
        curriculums: [] as any[],
        groups: [],
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
        curriculumsWithGroups(): any {
            return this.curriculums.map((el) =>
                Object.assign({}, el, {
                    //start_date: new Date(el.start_date).toLocaleString().substr(0, 10),
                    formatted_start_date: new Date(el.start_date).toLocaleString().substr(0, 10),
                    groupIds: this.groups.filter((el2: any) => el2.curriculum_id == el.id).map((el3: any) => el3.id),
                    groups: this.groups
                        .filter((el2: any) => el2.curriculum_id == el.id)
                        .map((el3: any) => el3.code)
                        .join(', '),
                })
            )
        },
    },
    async fetch() {
        this.curriculums = await getCurriculums()
        this.groups = await getGroups()
    },
    methods: {
        handleDialogClose() {
            this.curriculumFormdata = {}
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
            this.curriculumFields
                .map((el) => el.value)
                .forEach((key) => {
                    if (key === 'formatted_start_date') {
                        editemItemFormFields.start_date = this.editedItem.start_date
                    } else {
                        editemItemFormFields[key] = this.editedItem[key]
                    }
                })
            editemItemFormFields.groupIds = this.editedItem.groupIds
            this.curriculumFormdata = { ...editemItemFormFields }
            this.dialogMode = 'edit'
            this.dialogVisible = true
        },
        async createItem() {
            const curriculum = await createCurriculum(this.curriculumFormdata)
            this.curriculums.push(curriculum)
            this.groups = await getGroups()
        },
        async updateItem() {
            const curriculum = await updateCurriculum(
                Object.assign({}, this.curriculumFormdata, { id: this.editedItem.id })
            )
            const index = this.curriculums.findIndex((el) => el.id === this.editedItem.id)
            this.curriculums.splice(index, 1, curriculum)
            this.groups = await getGroups()
        },
        async deleteItem(id: number) {
            await deleteCurriculum({ id })
            const index = this.curriculums.findIndex((el) => el.id === id)
            this.curriculums.splice(index, 1)
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
.el-date-editor.el-input {
    width: 100%;
}
</style>
