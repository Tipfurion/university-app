<template>
    <div>
        <h2>Задолженности более полугода</h2>
        <el-row>
            <el-table :data="formattedReportData" style="width: 1050px">
                <el-table-column v-for="field in fields" :prop="field.value" :label="field.name" :key="field.value">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script lang="ts">
import _ from 'lodash'
import Vue from 'vue'

import { getArrears, getArrearsBiggerThanHalfYear, getFullAcademicPerformance } from '../../api/report'

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
            {
                name: 'Преподователь',
                value: 'teacher',
            },
        ],
        formdata: {} as any,
        reportData: [] as any[],
    }),
    computed: {
        formattedReportData(): any {
            return this.reportData.map((el) =>
                Object.assign({}, el, {
                    formatted_complete_date: el.complete_date
                        ? new Date(el.complete_date).toLocaleString().substr(0, 10)
                        : '',
                    formOfControl: `${el.subject} ${el.control_form} ${
                        el.exam_date ? new Date(el.exam_date).toLocaleString().substr(0, 10) : ''
                    }`,
                    teacher: `${el.teacher} Кафедра ${el.teacher_department.toLowerCase()}`,
                })
            )
        },
    },
    async fetch() {
        this.reportData = await getArrearsBiggerThanHalfYear()
    },
    methods: {},
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
