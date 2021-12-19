import { getGroups } from '../api/groups'

export const state = () => ({
    groups: [],
})

export const mutations = {
    SET_GROUPS(state: any, groups: any) {
        state.groups = groups
    },
}

export const getters = {}

export const actions = {
    async FETCH_GROUPS({ state, commit }: any) {
        const groups = await getGroups()
        commit('SET_GROUPS', groups)
    },
}
