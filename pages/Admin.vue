<template>
    <div class="container">
        <h1>Admin</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    middleware: 'auth',
    data: () => ({}),
    methods: {},
})
</script>

<style>
</style>
