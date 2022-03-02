<template>
    <div class="success__modal">
        <p>{{ success }}</p>
    </div>
</template>

<script>
export default {
    props: ["success"],
};
</script>

<style lang="scss">
.success__modal {
    position: fixed;
    top: 0;
    background: rgba(132, 252, 121, 0.836);
    width: 100%;
    min-height: 50px;
    display: grid;
    place-items: center;
    color: rgb(13, 87, 6);
    border: 1px solid rgb(13, 87, 6);
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
