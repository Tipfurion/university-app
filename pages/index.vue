<template>
    <div class="container">
        <NuxtLink to="/About">About page</NuxtLink>
        <pre>user: {{ $auth.user }}</pre>
        <button @click="fetchUser">2121</button>
        <button @click="login">login</button>
        <button @click="logOut">logOut</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    //middleware: "test",
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
                data: { password: 'password' },
            })
            console.log('response', response)
        },
        async logOut() {
            this.$auth.logout()
        },
    },
})
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
        Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
