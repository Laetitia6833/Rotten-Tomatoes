<template>
    <div class="single-film">
        <transition name="slide">
            <success-modal class="modal" v-if="success" :success="success" />
        </transition>
        <transition name="slide">
            <error-modal v-show="error" :deleteMessage="error" />
        </transition>
        <transition name="fade">
            <bg-modal v-if="showModal" />
        </transition>
        <transition name="bounce">
            <not-connected
                @closeModal="showModal = false"
                v-if="showModal"
                :message="message"
            />
        </transition>

        <!-- <NuxtLink class="btn" :to="{ name: 'index' }">Home</NuxtLink> -->
        <div class="info">
            <h1 class="title">{{ film.title }}</h1>
            <div class="img">
                <img
                    class="img-path"
                    :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
                    alt=""
                />
            </div>
            <client-only>
                <div class="actions">
                    <div>
                        <select name="note" v-model="note">
                            <option :value="n" v-for="n in 10" :key="n">
                                {{ n }}
                            </option>
                        </select>
                        <button @click="rateMovie">Rate the movie</button>
                    </div>
                    <div class="btn__container">
                        <transition name="fade">
                            <div class="tooltip" v-if="tooltip">
                                <p v-if="!isFavourite">Add To Favourites</p>
                                <p v-else>Remove From Favourites</p>
                            </div>
                        </transition>
                        <button
                            @mouseover="tooltip = true"
                            @mouseleave="tooltip = false"
                            class="btn btn__favourite btn__favourite--add"
                            v-if="isFavourite"
                            @click="removeFromFavourite(film.id)"
                        >
                            <font-awesome-icon :icon="['fas', 'heart']" />
                        </button>
                        <button
                            @mouseover="tooltip = true"
                            @mouseleave="tooltip = false"
                            class="btn btn__favourite btn__favourite--remove"
                            v-if="!isFavourite"
                            @click="addToFavourite(film.id)"
                        >
                            <font-awesome-icon :icon="['far', 'heart']" />
                        </button>
                    </div>
                </div>
            </client-only>
            <div class="content">
                <p>{{ film.tagline }}</p>
                <div class="flex">
                    <p>
                        Year :
                        {{
                            new Date(film.release_date).toLocaleString(
                                "fr-fr",
                                {
                                    year: "numeric",
                                }
                            )
                        }}
                    </p>
                    <p>Duration : {{ film.runtime }} minutes</p>
                </div>
                <p class="overview">Overview : {{ film.overview }}</p>
                <p>
                    Rate : {{ film.vote_average }}/10 (Number of review:
                    {{ film.vote_count }})
                </p>

                <p class="genres">
                    <nuxt-link
                        class="link"
                        :to="{ path: `/films/${g}/results` }"
                        v-for="(g, index) in genres"
                        :key="index"
                    >
                        {{ g }}
                    </nuxt-link>
                </p>
            </div>
        </div>
        <div class="comments__container">
            <div class="write__comment">
                <h4>Write a comment</h4>
                <textarea name="comment" v-model="comment"></textarea>
                <button class="btn btn__update" @click="sendComment(film.id)">
                    Send Comment
                </button>
            </div>
            <div class="comments">
                <h4>Comments</h4>

                <div v-if="comments.length > 0">
                    <div
                        class="comment"
                        v-for="comment in comments"
                        :key="comment.id"
                    >
                        <p class="author">Written by: {{ comment.userName }}</p>
                        <p>{{ comment.content }}</p>
                        <hr />
                    </div>
                </div>
                <div v-else class="no-comment">
                    <font-awesome-icon
                        :icon="['fas', 'exclamation-triangle']"
                    />

                    <p>No comments yet, be the first !</p>
                </div>
            </div>
        </div>
        <p>
            Genres :
            <span v-for="(g, index) in genres" :key="index">
                {{ g }}
            </span>
        </p>
    </div>
</template>

<script>
import axios from "axios";
import SuccessModal from "../../components/Modals/Success.vue";
import ErrorModal from "../../components/Modals/DeleteMessage.vue";
import NotConnected from "../../components/Modals/NotConnected.vue";
import bgModal from "../../components/Modals/BgModal.vue";
export default {
    components: {
        SuccessModal,
        ErrorModal,
        NotConnected,
        bgModal,
    },

    name: "singlefilm",
    data() {
        return {
            film: "",
            genres: [],
            user: "",
            fav: [],
            isFavourite: false,
            tooltip: false,
            comment: "",
            success: "",
            note: {
                type: Number,
            },
            error: "",
            message: "",
            showModal: false,
        };
    },
    async fetch() {
        await this.getFilm();
    },

    computed: {
        favourites() {
            this.fav.forEach((el) => {
                // console.log(el);
            });
            return this.$store.state.loggedUser.favourites;
        },

        comments() {
            return this.$store.state.comments;
        },
    },

    methods: {
        async getFilm() {
            const data = axios.get(
                `https://api.themoviedb.org/3/movie/${this.$route.params.filmid}?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US`
            );
            const res = await data;
            this.film = res.data;
            this.film.genres.forEach((g) => this.genres.push(g.name));
        },
        async addToFavourite(filmId) {
            const userId = this.$store.state.loggedUser._id;
            const bToken = this.$store.state.loggedUser.token;
            this.$axios
                .$post(
                    `users/addToFavourite/${userId}`,
                    {
                        filmId: filmId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${bToken}`,
                        },
                    }
                )
                .then((res) => {
                    let { password, ...user } = res;
                    const token = this.$store.state.loggedUser.token;
                    user.token = token;
                    this.$store.commit("SET_LOGGED_USER", user);
                    this.$cookies.set("user", JSON.stringify(user));
                    this.isFavourite = true;
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        console.log(
                            "error unauthorized, please connect to add to favourite"
                        );
                    }
                });
        },

        removeFromFavourite(filmId) {
            console.log("remove from favourites" + filmId);
            this.$axios
                .$patch(
                    `users/removeFromFavourite/${this.$store.state.loggedUser._id}`,
                    { movieId: filmId }
                )
                .then((res) => {
                    let { password, ...user } = res;
                    const token = this.$store.state.loggedUser.token;
                    user.token = token;
                    this.$store.commit("SET_LOGGED_USER", user);
                    this.$cookies.set("user", JSON.stringify(user));
                    this.isFavourite = false;
                    this.error = "Movie removed from favourites";
                    setTimeout(() => {
                        this.error = "";
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        sendComment(movieId) {
            this.$axios
                .$post(
                    `comments/${movieId}`,
                    {
                        userId: this.$store.state.loggedUser._id,
                        userName: this.$store.state.loggedUser.name,
                        content: this.comment,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.state.loggedUser.token}`,
                        },
                    }
                )
                .then(() => {
                    this.comment = "";
                    this.success = "Thanks For Your comment";
                    this.$store.dispatch("getCommentsByMovie", this.film.id);
                    setTimeout(() => {
                        this.success = "";
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 401) {
                        this.message = "to post a comment";
                        this.showModal = true;
                    }
                });
        },
        rateMovie() {
            axios
                .post(
                    `
            https://api.themoviedb.org/3/movie/${this.film.id}/rating?api_key=${process.env.API_KEY}&guest_session_id=${this.$store.state.loggedUser.sessionId}`,
                    {
                        value: this.note,
                    }
                )
                .then((res) => {
                    console.log("res", res);
                    if (res.data.success === true) {
                        if (res.data.status_code === 12) {
                            this.success = "Your note as been updated";
                            console.log(this.success);
                            setTimeout(() => {
                                this.success = "";
                            }, 2000);
                        } else if (res.data.status_code === 1) {
                            this.success = "Thanks for rating this movie";
                            console.log(this.success);
                            setTimeout(() => {
                                this.success = "";
                            }, 2000);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 401) {
                        console.log("you need to be connected to note");
                        this.showModal = true;
                        this.message = "rate a movie";
                    }
                    if (error.response.data.status_code === 11) {
                        console.log("please select a number");
                        this.error = "Please select a valid number";
                        setTimeout(() => {
                            this.error = "";
                        }, 2000);
                    }
                });
        },
    },

    mounted() {
        if (Object.keys(this.$store.state.loggedUser).length > 0) {
            this.user = this.$store.state.loggedUser;
            this.fav = this.user.favourites;
            if (this.fav.includes(this.film.id)) {
                this.isFavourite = true;
            }
        }

        this.$store.dispatch("getCommentsByMovie", this.film.id);
    },
};
</script>

<style lang="scss" scoped>
.single-film {
    max-width: 80%;
    margin: auto;

    .title {
        text-align: center;
        font-size: 25px;
        margin: 20px 0;
    }

    .img {
        max-height: 400px;
        height: 400px;
        width: 100%;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }

    .actions {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .flex {
        display: flex;
        justify-content: space-between;
    }

    .overview {
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 1.2;
    }

    .genres {
        display: flex;
        justify-content: center;

        .link {
            margin: 5px;
            padding: 5px 10px;
            border: 1px solid black;
            border-radius: 9999px;
            cursor: pointer;
            background: rgb(243, 243, 243);
        }
    }
}

.comments__container {
    padding-bottom: 20px;
    h4 {
        text-align: center;
        font-size: 20px;
        margin-bottom: 15px;
    }

    textarea {
        display: block;
        margin: auto;
        width: 100%;
        max-width: 500px;
        font-family: sans-serif;
        min-height: 100px;
        padding: 5px;
        resize: none;
    }

    button {
        color: white;
        margin-top: 15px;
        border: none;
        padding: 10px 15px;
        margin-bottom: 15px;
    }

    hr {
        border: none;
        border-top: 2px solid black;
        max-width: 80%;
        margin: auto;
        margin-top: 15px;
    }

    .comments {
        .comment {
            margin-bottom: 15px;

            .author {
                text-decoration: underline;
                font-style: italic;
                margin-bottom: 10px;
            }
        }

        .no-comment {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            .fa-exclamation-triangle {
                font-size: 20px;
                color: rgb(255, 123, 0);
                margin-right: 10px;
            }
        }
    }
}
.content {
    padding: 10px;
}
p {
    padding-bottom: 5px;
}
.overview {
    text-align: justify;
}
.btn {
    color: rgb(12, 60, 236);
    font-weight: bold;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.content {
    padding: 10px;
}
p {
    padding-bottom: 5px;
}

.heart {
    color: red;
    font-size: 50px;
}

.btn__container {
    position: relative;
    width: max-content;

    .btn {
        color: rgb(255, 145, 0);
        border-radius: 9999px;
        border: none;
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        font-size: 25px;
        background: rgb(218, 197, 173);
        transition: all 0.3s;

        &:hover {
            transform: scale(1.1);
        }
    }

    .tooltip {
        background: rgb(255, 196, 86);
        position: absolute;
        min-width: 200px;
        top: 0;
        right: 0;
        height: 102%;
        transform: translate(50%, -115%);
        padding: 0 10px;
        display: grid;
        place-items: center;
        color: rgb(95, 46, 0);
        border-radius: 5px;

        p {
            width: auto;
        }
    }
}

.content {
    margin-top: 10px;
}

// FADE \\

.fade-enter-active,
.fade-leave-active {
    transition: all 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    // opacity: 1;
    opacity: 0;
}

// SLIDE \\
.slide-enter-active,
.slide-leave-active {
    transition: all 0.7s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(-100px);
}
// FADE \\
.fade-enter-active,
.fade-leave-active {
    transition: all 0.7s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
// BOUNCE \\
.bounce-enter-active {
    animation: bounce-in 0.5s ease-in-out;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.3);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
