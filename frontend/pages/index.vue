<template>
  <div class="home">
    <Top />
    <!-- <Navbar /> -->
    <Search />

    <div class="container-movies">
      <h1 class="title">Most popular movies</h1>
      <div class="wrapper">
        <div v-for="(film, index) in films" :key="index" class="swiper-slide">
          <div class="movie-img">
            <img
              class="img-film"
              :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
              alt=""
            />
          </div>
          <div class="info">
            <p class="note">{{ film.vote_average }}</p>
            <p class="film-title">{{ film.title.slice(0, 25) }}</p>
            <!-- <p class="date">Date: {{ film.release_date }}</p> -->
            <NuxtLink
              class="button"
              :to="{
                name: 'films-filmid',
                params: { filmid: film.id },
              }"
              >More information</NuxtLink
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
  name: "IndexPage",
  data() {
    return {
      films: [],
    };
  },
  async fetch() {
    await this.getFilms();
  },
  methods: {
    async getFilms() {
      const film = axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&page=1`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.films.push(film);
      });
    },
    // async fetch() {
    //   await this.getFilms();
    // },
    // methods: {
    //   async getFilms() {
    //     const film = axios.get(
    //       `https://api.themoviedb.org/3/movie/now_playing?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&page=1`
    //     );
    //     const res = await film;
    //     res.data.results.forEach((film) => {
    //       this.films.push(film);
    //     });
    //   },

    // async fetch() {
    //   this.truc = await this.$axios.$get("/hi");
    // },
    // },
  },
};
</script>
<style scoped>
.img-film {
  width: 200px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
  text-align: center;
}
.film-title {
  font-size: 14px;
}
.button {
  font-size: 14px;
  color: rgb(12, 60, 236);
  display: flex;
  justify-content: center;
  margin: 5px;
}
.button:hover {
  color: rgb(199, 9, 9);
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
.swiper-slide {
  margin: 2px;
}
.info {
  padding: 2px;
}
.note {
  background: rgb(199, 9, 9);
  width: 20%;
  color: white;
  text-align: center;
  padding: 2px;
  margin-bottom: 2px;
}
</style>
