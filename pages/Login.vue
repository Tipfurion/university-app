<template>
    <div class="container">
        <div class="login-form">
            <el-form>
                <el-form-item :error="error ? ' ' : null">
                    <el-input v-model="formData.login" @keyup.enter.native="login" placeholder="Логин"></el-input>
                </el-form-item>
                <el-form-item :error="error">
                    <el-input
                        v-model="formData.password"
                        @keyup.enter.native="login"
                        placeholder="Пароль"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" :loading="loading" @click="login">Вход</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    //middleware: "test",
    layout: 'login',
    data: () => ({
        user: {},
        error: null as string | null,
        loading: false as boolean,
        formData: {
            //login: 'teacher1_login',
            login: 'admin_login',
            password: 'qwerty123',
        },
    }),
    methods: {
        async fetchUser() {
            const res = await fetch('/api/user')
            this.user = await res.json()
        },
        async login() {
            this.loading = true
            try {
                await this.$auth.loginWith('local', {
                    data: { password: this.formData.password, login: this.formData.login },
                })
            } catch (err) {
                //throw new Error(String(err))
                console.log(err)

                this.error = 'Неверные данные'
            }
            this.loading = false
        },
        async logOut() {
            this.$auth.logout()
        },
    },
})
</script>

<style  scoped>
.login-form {
    padding: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
}
.login-btn {
    width: 200px;
}
</style>
