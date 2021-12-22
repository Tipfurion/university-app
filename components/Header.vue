
<template>
    <header>
        <div class="header" style="z-index: 1000000">
            <button class="icon-btn">
                <i class="el-icon-user user-icon" width="24px"></i>
            </button>

            <el-button type="primary" @click="logout">Выход</el-button>
        </div>
    </header>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: { Header },
    methods: {
        async logout() {
            this.$auth.logout()
        },
    },
}
</script>

<style scoped>
.header {
    background-color: #409eff;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 56px;
}
.user-icon {
    font-size: 18px;
    color: inherit;
    cursor: pointer;
}
.icon-btn {
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 100%;
    width: 32px;
    height: 32px;
}
.icon-btn:hover {
    background-color: white;
    color: #409eff;
    border: none;
}
</style>
