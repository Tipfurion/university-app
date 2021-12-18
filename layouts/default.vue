<template>
    <div class="page-wrapper">
        <Header></Header>
        <div class="content-wrapper">
            <div class="row">
                <div class="col" style="width: 260px">
                    <Sidebar></Sidebar>
                </div>
                <div class="col content"><Nuxt /></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
export default {
    components: { Header, Sidebar },
    data: () => ({
        tabs: [],
    }),
    methods: {
        async logout() {
            this.$auth.logout()
        },
    },
}
</script>

<style scoped>
.page-wrapper {
    height: 100%;
}
.content-wrapper {
    padding-top: 56px;
    height: calc(100% - 56px);
    sposition: relative;
}
.content {
    margin-top: 55px;
}
.header {
    background-color: red;
    position: fixed;
    width: 100%;
    height: 56px;
}
.row {
    display: flex;
    flex-direction: row;
}
.col {
}
</style>
