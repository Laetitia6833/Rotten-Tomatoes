<template>
  <div class="search">
    <div class="searchbar">
      <input
        @keyup.enter="$fetch"
        v-model.lazy="query"
        type="text"
        placeholder="Search a film"
      />
    </div>
    <!-- <input
        v-model.lazy="director"
        type="text"
        placeholder="Choose a person"
      />
      <button class="button" @click="filterDirector">Search by person</button> -->
    <div class="searchbar">
      <!-- <label for="genre" class="genre">Genre</label> -->
      <select v-model.lazy="genre">
        <option>Action</option>
        <option>Adventure</option>
        <option>Comedy</option>
        <option>Crime</option>
        <option>Documentary</option>
        <option>Drama</option>
        <option>Family</option>
        <option>Fantasy</option>
        <option>History</option>
        <option>Mystery</option>
        <option>Romance</option>
        <option>Science Fiction</option>
        <option>Thriller</option>
        <option>War</option>
        <option>Western</option>
      </select>
      <button class="button" @click="filterGender">Filter by genre</button>
      <input
        v-model.lazy="year"
        type="number"
        min="1900"
        max="2022"
        step="1"
        value="2022"
      />
      <button class="button" @click="filterYear">Filter by year</button>
      <button class="button" @click="clear">Clear Research</button>
    </div>
    <div class="container-movies">
      <div id="movie-grid" class="wrapper" v-if="query">
        <div
          v-for="(film, index) in searchedFilms"
          :key="index"
          class="swiper-slide"
        >
          <div class="movie-img">
            <img
              class="img-film"
              :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
              alt=""
            />
            <p class="note">{{ film.vote_average }}</p>
          </div>
          <div class="info">
            <p class="film-title">{{ film.title.slice(0, 25) }}</p>

            <NuxtLink
              class="button"
              :to="{ name: 'films-filmid', params: { filmid: film.id } }"
              >More information</NuxtLink
            >
          </div>
        </div>
      </div>
      <div id="movie-grid" class="wrapper" v-if="year">
        <div
          v-for="(film, index) in searchedYear"
          :key="index"
          class="swiper-slide"
        >
          <div class="movie-img">
            <img
              class="img-film"
              :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
              alt=""
            />
            <p class="note">{{ film.vote_average }}</p>
          </div>
          <div class="info">
            <p class="film-title">{{ film.title.slice(0, 25) }}</p>

            <NuxtLink
              class="button"
              :to="{ name: 'films-filmid', params: { filmid: film.id } }"
              >More information</NuxtLink
            >
          </div>
        </div>
      </div>
      <!-- <div id="movie-grid" class="wrapper" v-if="director">
        <div
          v-for="(film, index) in searchedDirector"
          :key="index"
          class="swiper-slide"
        >
          <div class="movie-img">
            <img
              class="img-film"
              :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
              alt=""
            />
            <p class="note">{{ film.vote_average }}</p>
          </div>
          <div class="info">
            <p class="film-title">{{ film.title }}</p>

            <NuxtLink
              class="button"
              :to="{ name: 'films-filmid', params: { filmid: film.id } }"
              >More information</NuxtLink
            >
          </div>
        </div>
      </div> -->
      <!-- <button class="button" @click="filterGender">Filter by genre</button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      films: [],
      query: "",
      searchedFilms: [],
      genre: "",
      searchedGenres: [],
      year: "",
      searchedYear: [],
      // director: "",
      // searchedDirector: [],
    };
  },
  async fetch() {
    // if (this.genre !== "") {
    //   await this.filterGender();
    // }
    // if (this.query !== "") {
    await this.research();
    // }
  },
  methods: {
    async research() {
      const film = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&page=1&query=${this.query}`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.searchedFilms.push(film);
      });
    },
    async filterGender() {
      const film = axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&query=${this.genre}`
        // `https://api.themoviedb.org/3/discover/movie?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&with_genres=${this.genre}`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.searchedGenres.push(film);
      });
    },
    async filterYear() {
      const film = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&primary_release_year=${this.year}`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.searchedYear.push(film);
      });
    },
    // async filterDirector() {
    //   const film = axios.get(
    //     `https://api.themoviedb.org/3/search/person?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&query=${this.director}&page=1&include_adult=false`
    //   );
    //   const res = await film;
    //   res.data.results.forEach((film) => {
    //     this.searchedDirector.push(film);
    //   });
    // },
    clear() {
      this.query = "";
      this.genre = "";
      this.year = "";
      this.director = "";
      this.searchedFilms = [];
      this.searchedGenres = [];
      // this.searchedYear = [];
      // this.searchedDirector;
    },
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.img-film {
  width: 200px;
}
.searchbar {
  display: flex;
  justify-content: center;
  margin: 5px auto;
  padding: 5px;
}
// .container-movies {
//   width: 200px;
// }
.button {
  font-size: 12px;
  color: rgb(12, 60, 236);
  display: flex;
  justify-content: center;
  margin: 5px;
}
.film-title {
  font-size: 14px;
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
