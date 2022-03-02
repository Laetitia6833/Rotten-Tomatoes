<template>
    <div>
        <div>
            <transition name="slide">
                <success-modal v-if="success" :success="success" />
            </transition>
            <h1>Hello {{ user.name }}</h1>
            <div>
                <div>
                    <nuxt-link
                        class="btn btn__update btn__update--profil"
                        :to="{
                            path: `/user/updateProfil/${user._id}`,
                        }"
                    >
                        Update my profil
                    </nuxt-link>
                </div>
                <div class="hr">
                    <hr />
                    <span></span>
                </div>
                <h2>Favourite movies</h2>
                <div class="fav__container">
                    <div class="movie" v-for="movie in movies" :key="movie.id">
                        <button
                            @click="removeFromFavourite(movie.id)"
                            class="btn btn__delete"
                        >
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                        <nuxt-link :to="{ path: `/films/${movie.id}` }">
                            <img
                                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                                alt=""
                            />
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SuccessModal from "../../components/Modals/Success.vue";

export default {
    components: {
        SuccessModal,
    },
    middleware: ["user"],
    data() {
        return {
            movies: [],
            // success: "",
        };
    },
    computed: {
        user() {
            return this.$store.state.loggedUser;
        },
        success() {
            return this.$store.state.successMessage;
        },
    },

    watch: {
        user() {
            this.user.favourites;
        },
    },

    methods: {
        removeFromFavourite(movieId) {
            this.$axios
                .$patch(
                    `users/removeFromFavourite/${this.$store.state.loggedUser._id}`,
                    { movieId: movieId }
                )
                .then((res) => {
                    this.movies = this.movies.filter((value) => {
                        return value.id != movieId;
                    });
                    let user = res;
                    let cookie = this.$cookies.get("user");
                    cookie.favourites = user.favourites;
                    this.$cookies.set("user", cookie);
                    this.$store.commit("SET_LOGGED_USER", cookie);
                    this.moviesList = cookie.favourites;
                });
        },
    },

    mounted() {
        this.user.favourites.forEach((fav) => {
            this.$axios
                .$get(
                    `https://api.themoviedb.org/3/movie/${fav}?api_key=0b14b5a8dd1b4886f5d2424b5e0ac7bc`
                )
                .then((res) => {
                    this.movies.push(res);
                });
        });
    },
};
</script>

<style lang="scss" scoped>
.hr {
    position: relative;
    margin: 30px auto 30px auto;
    hr {
        border: none;
        border-top: 2px solid black;
        width: 80%;
    }

    span {
        width: 20px;
        height: 20px;
        background: #000;
        display: block;
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);

        &::after,
        &::before {
            content: "";
            width: 15px;
            height: 15px;
            background: black;
            display: block;
            position: absolute;
        }

        &::before {
            transform: translate(-83%, 118%);
        }

        &::after {
            transform: translate(120%, -90%);
        }
    }
}
.btn__update--profil {
    width: max-content;
    padding: 10px 20px;
    margin: 20px auto;
}

h2 {
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
}

h1 {
    margin-top: 10px;
    font-size: 18px;
}
h2 {
    text-align: center;
    margin: 10px;
    font-size: 18px;
    font-weight: bold;
}
.fav__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .movie {
        margin: 10px;
        position: relative;
        img {
            max-width: 200px;
        }

        .btn__delete {
            position: absolute;
            right: 0;
            top: 0;
            border: none;
            border-radius: 100%;
            width: 30px;
            height: 30px;
            display: grid;
            place-items: center;
            transform: translate(50%, -50%);
        }
    }
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.7s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(-100px);
}
</style>
