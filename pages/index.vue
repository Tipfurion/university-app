<template>
    <div class="container">
        <el-button @click="logout">log out </el-button>
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
        async fetchUser() {
            const res = await fetch('/api/user')
            console.log('res', res)
            this.user = await res.json()
        },
        async login() {
            console.log('this.$auth', this.$auth)

            const response = await this.$auth.loginWith('local', {
                data: { password: 'qwerty123', login: 'teacher1_login' },
            })
            console.log('response', response)
        },
        async logout() {
            this.$auth.logout()
        },
    },
})
</script>

<style>
</style>
