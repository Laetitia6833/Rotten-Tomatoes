<template>
  <div>
    <Navbar />
    <div class="main__container">
      <Nuxt keep-alive />
    </div>
  </div>
</template>

<style lang="scss">
.main__container {
  margin: auto;
  min-height: 100vh;
  // width: 90%;
  max-width: 100%;

  @media screen and(max-width: 800px) {
    max-width: 100%;
  }
}
</style>
