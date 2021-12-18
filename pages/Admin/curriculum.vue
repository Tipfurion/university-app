<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-table :data="tableData">
                    <el-table-column prop="date" label="Date" width="100"> </el-table-column>
                    <el-table-column prop="name" label="Name" width="100"> </el-table-column>
                    <el-table-column prop="address" label="Address"> </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="18">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, et eius unde debitis beatae natus
                    temporibus magni ab laborum velit voluptas dolore, nihil facere tempore distinctio consectetur!
                    Consectetur, veritatis provident.
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        tableData: [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ],
    }),
    methods: {},
})
</script>

<style>
</style>
