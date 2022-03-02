<template>
    <div>
        <h1>{{ this.$route.params.search }}</h1>
        <div class="container-movies">
            <h1 class="title">Most popular movies</h1>
            <div class="wrapper">
                <div
                    v-for="(film, index) in movies"
                    :key="index"
                    class="swiper-slide"
                >
                    {{ film.original_title }}
                    <div class="movie-img">
                        <img
                            class="img-film"
                            :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
                            alt=""
                        />
                    </div>
                    <div class="info">
                        <p class="note">{{ film.vote_average }}</p>
                        <!-- <p class="film-title">{{ film.title.slice(0, 25) }}</p> -->
                        <!-- <p class="date">Date: {{ film.release_date }}</p> -->
                        <NuxtLink
                            class="button"
                            :to="{
                                name: 'films-filmid',
                                params: { filmid: film.id },
                            }"
                        >
                            More information</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    data() {
        return {
            movies: "",
        };
    },
    async mounted() {
        this.movies = await axios
            .get(
                `https://api.themoviedb.org/3/discover/movie?api_key=0b14b5a8dd1b4886f5d2424b5e0ac7bc&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.$route.params.search}`
            )
            .then((res) => {
                return res.data.results;
            });
        // .then((res) => {
        //     console.log(res);
        // });
    },
};
</script>
