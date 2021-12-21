<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
            <el-input placeholder="Код" v-model="formdata.code" class="form-input"></el-input>
            <el-input placeholder="Специальность" v-model="formdata.speciality" class="form-input"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Отмена</el-button>
                <el-button type="primary" @click="handleApplyButton">{{ applyButtonTitle }}</el-button>
            </span>
        </el-dialog>
        <h2>Группы</h2>
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
            <el-table :data="groups" style="width: 1000px">
                <el-table-column prop="code" label="Код"> </el-table-column>
                <el-table-column prop="speciality" label="Специальность"> </el-table-column>
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
import { createGroup, deleteGroup, getGroups, updateGroup } from '../../api/groups'

export default Vue.extend({
    data: () => ({
        formdata: { code: '', speciality: '' } as any,
        groups: [] as any[],
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
        this.groups = await getGroups()
    },
    watch: {
        'formdata.code'() {
            console.log(this.formdata)
        },
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
            this.formdata = { code: '', speciality: '' }
            this.formdata.code = this.editedItem.code
            this.formdata.speciality = this.editedItem.speciality

            this.dialogMode = 'edit'
            this.dialogVisible = true
        },
        async createItem() {
            const group = await createGroup(this.formdata)
            this.groups.push(group)
        },
        async updateItem() {
            const group = await updateGroup(Object.assign({}, this.formdata, { id: this.editedItem.id }))
            const index = this.groups.findIndex((el) => el.id === this.editedItem.id)
            this.groups.splice(index, 1, group)
        },
        async deleteItem(id: number) {
            await deleteGroup({ id })
            const index = this.groups.findIndex((el) => el.id === id)
            this.groups.splice(index, 1)
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
