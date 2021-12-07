<template>
    <div class="page-wrapper">
        <Header></Header>
        <div class="content-wrapper">
            <div class="row">
                <div class="col" style="width: 260px">
                    <el-menu
                        style="position: fixed; height: 100%; width: 200px"
                        default-active="2"
                        v-model="tabs"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="isCollapse"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">Navigator One</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">Group One</span>
                                <el-menu-item index="1-1" @click="$router.push('/teacher')">item one</el-menu-item>
                                <el-menu-item index="1-2" @click="$router.push('/about')">item two</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group Two">
                                <el-menu-item index="1-3">item three</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">item four</span>
                                <el-menu-item index="1-4-1">item one</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">Navigator Two</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">Navigator Three</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">Navigator Four</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="col content"><Nuxt /></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: { Header },
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
