import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        key: 'loggedUser',
        paths: ['loggedUser']
    })(store)
}
