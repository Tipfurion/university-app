<template>
    <div>
        <el-row>
            <el-table :data="formattedReportData" style="width: 1050px">
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
        reportData: [] as any[],
    }),
    computed: {
        formattedReportData(): any[] {
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
        this.reportData = await getFullAcademicPerformance()
    },
    methods: {},
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
