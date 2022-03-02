<template>
  <div>
    <h1>Admin</h1>
    <!-- <pre>
      
      {{ user }}
    </pre> -->
    <div>
      <button class="user">
        <nuxt-link to="users">Users</nuxt-link>
      </button>
    </div>
    <div>
      <h1>Statistics about films</h1>
      <div class="pop">
        <button class="btn1" @click="clear">Clear Research</button>
        <button class="btn" @click="getPopular">Popular movies</button>
        <button class="btn" @click="getPeople">Popular people</button>
        <button class="btn" @click="getTV">Popular on TV</button>
      </div>
      <div class="container-movies">
        <!-- <h1 class="title">Most popular movies</h1> -->
        <div class="wrapper">
          <div
            v-for="(film, index) in popular"
            :key="index"
            class="swiper-slide"
          >
            <div class="info">
              <div class="movie-img">
                <img
                  class="img-film"
                  :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
                  alt=""
                />
              </div>

              <p class="note">Popularity: {{ film.popularity }}</p>
              <p class="note">Rate: {{ film.vote_average }}</p>
              <p class="note">Vote count: {{ film.vote_count }}</p>

              <!-- <NuxtLink
                class="button"
                :to="{
                  name: 'films-filmid',
                  params: { filmid: film.id },
                }"
                >More information</NuxtLink
              > -->
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div
            v-for="(film, index) in people"
            :key="index"
            class="swiper-slide"
          >
            <div class="info">
              <div class="movie-img">
                <img
                  class="img-film"
                  :src="`https://image.tmdb.org/t/p/w500/${film.profile_path}`"
                  alt=""
                />
              </div>

              <p class="note">{{ film.name }}</p>
              <p class="note">Popularity :</p>

              <p class="note">{{ film.popularity }}</p>

              <!-- <NuxtLink
                class="button"
                :to="{
                  name: 'films-filmid',
                  params: { filmid: film.id },
                }"
                >More information</NuxtLink
              > -->
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div v-for="(film, index) in tv" :key="index" class="swiper-slide">
            <div class="info">
              <div class="movie-img">
                <img
                  class="img-film"
                  :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
                  alt=""
                />
              </div>
              <p class="note">Popularity: {{ film.popularity }}</p>
              <p class="note">Rate: {{ film.vote_average }}</p>
              <p class="note">Vote count: {{ film.vote_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: "admin",

  computed: {
    user() {
      return this.$store.state.loggedUser;
    },
  },
  data() {
    return {
      popular: [],
      people: [],
      tv: [],
    };
  },
  methods: {
    async getPopular() {
      const film = axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&sort_by=vote_count.asc&language=en-US&page=1`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.popular.push(film);
      });
    },
    async getPeople() {
      const film = axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&page=1`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.people.push(film);
      });
    },
    async getTV() {
      const film = axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=ac4c36c9ca519b08c59c12e6f9e3747f&language=en-US&page=1`
      );
      const res = await film;
      res.data.results.forEach((film) => {
        this.tv.push(film);
      });
    },
    clear() {
      this.popular = [];
      this.people = [];
      this.tv = [];
    },
  },
};
</script>
<style scoped>
.img-film {
  width: 100px;
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
  font-size: 12px;
}
/* .note {
  background: rgb(199, 9, 9);
  width: 20%;
  color: white;
  text-align: center;
  padding: 2px;
  margin-bottom: 2px;
} */
.btn {
  background: blue;
}
.pop {
  display: flex;
  justify-content: center;
}
.btn1 {
  background: rgb(18, 144, 18);
  color: white;
  margin-right: 10px;
}
h1 {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
.user {
  background: rgb(189, 71, 24);
  color: white;
  padding: 5px;
  border-color: rgb(179, 56, 7);
  margin-left: 20px;
}
</style>
