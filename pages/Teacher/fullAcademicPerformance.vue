<template>
    <div>
        <h2>Успеваемость</h2>
        <el-row>
            <div v-for="(sem, i) in Object.keys(splittedBySemesterReportData)" :key="i">
                <h3>{{ sem }} семестр</h3>
                <el-table :data="splittedBySemesterReportData[sem]" style="width: 1050px" :span-method="getSpan">
                    <el-table-column label="" prop="student"> </el-table-column>
                    <el-table-column v-for="subject in subjects" :label="subject" :key="subject">
                        <el-table-column label="Оценка">
                            <template slot-scope="scope">
                                <span>{{ getMark(scope, subject, sem) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :prop="subject" label="Дата сдачи">
                            <template slot-scope="scope">
                                <span>{{ scope.row[subject] ? scope.row[subject].formatted_complete_date : '' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :prop="subject" label="Преподаватель">
                            <template slot-scope="scope">
                                <span>{{ scope.row[subject] ? scope.row[subject].teacher : '' }}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </el-row>
    </div>
</template>

<script lang="ts">
import _ from 'lodash'
import Vue from 'vue'

import { getFullAcademicPerformance } from '../../api/report'

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
        summaryCols: ['Дата по ведомости', 'Форма контроля'] as any,
        formdata: {} as any,
        reportData: [] as any[],
    }),
    computed: {
        splittedBySemesterReportData(): any {
            const formatedAndGroupedBySemester = _.groupBy(
                this.reportData.map((el) =>
                    Object.assign({}, el, {
                        formatted_complete_date: el.complete_date
                            ? new Date(el.complete_date).toLocaleString().substr(0, 10)
                            : '',
                        formOfControl: `${el.subject} ${el.control_form} ${
                            el.exam_date ? new Date(el.exam_date).toLocaleString().substr(0, 10) : ''
                        }`,
                        teacher: `${el.teacher} Кафедра ${el.teacher_department.toLowerCase()}`,
                    })
                ),
                'semester'
            )
            const result: any = {}
            for (const semester of Object.keys(formatedAndGroupedBySemester)) {
                const defaultRow = formatedAndGroupedBySemester[semester]
                const groupedByStudent = _.groupBy(formatedAndGroupedBySemester[semester], 'student')
                //result[semester] = groupedBySubject
                result[semester] = Object.keys(groupedByStudent)
                    .concat(['Форма контроля', 'Дата по ведомости'])
                    .map((key) => {
                        const res: any = { student: key }
                        if (!groupedByStudent[key]) {
                            return res
                        } else {
                            for (const studentData of groupedByStudent[key]) {
                                res[studentData.subject] = studentData
                            }
                        }

                        return res
                    })
                //result[semester].push({ student: 'Форма контроля' })
                //result[semester].push({ student: 'Дата по ведомости' })
            }
            return result
        },
        dataForTable(): any {},
        subjects(): any {
            return _.uniq(this.reportData.map((el) => el.subject))
        },
        subjectData(): any {
            return _.uniqBy(this.reportData, 'subject')
        },
    },
    async fetch() {
        this.reportData = await getFullAcademicPerformance()
    },
    methods: {
        getSpan({ row, columnIndex }: any) {
            if (this.summaryCols.includes(row.student) && columnIndex > 0) {
                return {
                    rowspan: 1,
                    colspan: 1,
                }
            }
        },
        getControlFormBySubject(subject: string, sem: any) {
            return this.reportData.find((el) => el.subject === subject && el.semester == sem)?.control_form
        },
        getDateBySubject(subject: string, sem: any) {
            return new Date(this.reportData.find((el) => el.subject === subject && el.semester == sem)?.complete_date)
                .toLocaleString()
                .substr(0, 10)
        },
        getMark(scope: any, subject: any, sem: any) {
            if (scope.row.student === 'Форма контроля') {
                return this.getControlFormBySubject(subject, sem)
            }
            if (scope.row.student === 'Дата по ведомости') {
                return this.getDateBySubject(subject, sem)
            }
            return scope.row[subject] ? scope.row[subject].mark : ''
        },
    },
})
</script>

<style scoped>
.form-input {
    padding-top: 10px;
}
</style>
