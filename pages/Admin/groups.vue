<template>
    <div>
        <el-row>
            <el-table :data="tableData" style="width: 1000px">
                <el-table-column prop="date" label="Date"> </el-table-column>
                <el-table-column prop="name" label="Name"> </el-table-column>
                <el-table-column prop="address" label="Address"> </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        tableData: [
            {
                id: null,
                code: null,
                speciality: null,
                curriculum_id: null,
                deleted: null,
            },
            {
                id: null,
                code: null,
                speciality: null,
                curriculum_id: null,
                deleted: null,
            },
            {
                id: null,
                code: null,
                speciality: null,
                curriculum_id: null,
                deleted: null,
            },
            {
                id: null,
                code: null,
                speciality: null,
                curriculum_id: null,
                deleted: null,
            },
        ],
    }),
    methods: {},
})
</script>

<style>
</style>
