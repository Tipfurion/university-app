
<template>
    <div style="width: 240px">
        <el-menu style="position: fixed; height: 100%; width: 200px" v-model="tabs" :default-active="activeIndex">
            <el-menu-item
                v-for="(item, i) in menuItems"
                :index="i + 1"
                :key="title + i"
                @click="$router.push(item.path)"
            >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { USER_TYPES } from '@/vars'
export default {
    components: {},
    methods: {},
    computed: {
        activeIndex() {
            return 1
        },
        menuItems() {
            if (this.$auth.user.type === USER_TYPES.admin) {
                return [
                    {
                        title: 'Учебный план',
                        path: '/admin/curriculum',
                    },
                    {
                        title: 'Успеваемость',
                        path: '/about',
                    },
                    {
                        title: 'Студенты',
                        path: '/about',
                    },
                    {
                        title: 'Преподаватели',
                        path: '/about',
                    },
                    {
                        title: 'Группы',
                        path: '/admin/groups',
                    },
                ]
            } else if (this.$auth.user.type === USER_TYPES.teacher) {
                return [
                    {
                        title: 'Успеваемость',
                        path: '/about',
                    },
                    {
                        title: 'Задолженности',
                        path: '/about',
                    },
                    {
                        title: 'Задолженности 2',
                        path: '/about',
                    },
                ]
            }
        },
    },
}
</script>

<style scoped>
</style>
