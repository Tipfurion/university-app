<template>
    <div class="container">
        <el-button @click="logout">log out </el-button>
        <pre>{{ $auth.user }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    middleware: 'auth',
    data: () => ({
        user: {},
    }),
    methods: {
        async logout() {
            this.$auth.logout()
        },
    },
    created() {
        if (this.$auth.user!.type === 'admin') {
            this.$router.push('/admin/curriculum')
        } else if (this.$auth.user!.type === 'teacher') {
            this.$router.push('/teacher')
        }
    },
})
</script>

<style>
</style>
