<template>
  <div class="top">
    <img src="../assets/img/top.jpg" alt="" />
    <div class="text-container">
      <div class="text">
        <h1><span>Rotten</span> Tomatoes</h1>
        <!-- <a href="#movie-grid" class="button">View Movies</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
};
</script>

<style lang="scss" scoped>
.top {
  height: 130px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(100, 4, 4, 0.3);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .text {
      padding: 0 16px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      color: #fff;
      font-size: 64px;
      font-weight: 200;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 84px;
      }
      span {
        font-weight: 500;
      }
    }
    .button {
      font-size: 20px;
      align-self: flex-start;
      text-decoration: none;
      color: white;
      font-weight: bold;
      background-color: rgb(198, 28, 28);
      padding: 5px;
    }
  }
}
</style>
