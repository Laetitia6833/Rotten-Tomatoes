
export const state = () => ({
    loggedUser: {},
    allUsers: [],
    successMessage: '',
    comments: []
})

export const mutations = {
    SET_LOGGED_USER(state, user) {
        state.loggedUser = user
    },

    LOGOUT(state) {
        state.loggedUser = {}
        this.$cookies.remove('user')
    },

    GET_ALL_USERS(state, users) {
        state.allUsers = users
    },

    SET_SUCCESS_MESSAGE(state, message) {
        state.successMessage = message
    },

    ADD_FAVOURITE(state, movie) {
        state.loggedUser.favourites.push(movie)
    },

    GET_COMMENTS_BY_MOVIE(state, comments) {
        state.comments = comments
    }
}

export const actions = {
    getAllUsers({ commit }) {
        this.$axios.get('users/allUsers').then(res => {
            commit('GET_ALL_USERS', res.data)
        })
    },

    setSuccessMessage({ commit }, message) {
        commit('SET_SUCCESS_MESSAGE', message)
    },

    getCommentsByMovie({ commit }, movieId) {
        this.$axios.$get(`comments/${movieId}`).then(res => {
            commit('GET_COMMENTS_BY_MOVIE', res)
        })
    },


}

export const getters = {
    getLoggedUser: (state) => {
        return state.loggedUser
    }
}

