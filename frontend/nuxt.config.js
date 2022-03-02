export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/reset.css",
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/persistedState.client.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // ['@nuxtjs/dotenv', { systemvars: true }]
    // "@nuxtjs/vuetify",
  ],


  ssr: true,
  target: "server",
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/dotenv",
    [
      '@nuxtjs/fontawesome', {
        icons: {
          solid: ['faCheck', 'faHeart', 'faTrash', `faTimesCircle`, 'faExclamationTriangle'],
          regular: ['faHeart']
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8080",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },

  env: {
    API_KEY: process.env.API_KEY,
  },
};
