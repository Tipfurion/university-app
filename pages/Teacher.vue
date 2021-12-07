<template>
    <div>
        <div v-for="i in Array.from({ length: 1000 })" :key="i">Teacher {{ i }}</div>
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
