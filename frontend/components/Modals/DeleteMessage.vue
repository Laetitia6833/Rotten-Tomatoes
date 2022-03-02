<template>
    <div class="delete__modal--message">
        <p>{{ deleteMessage }}</p>
    </div>
</template>

<script>
export default {
    props: ["deleteMessage"],
};
</script>

<style lang="scss">
.delete__modal--message {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(252, 121, 121, 0.836);
    width: 100%;
    min-height: 50px;
    display: grid;
    place-items: center;
    color: rgb(87, 6, 6);
    border: 1px solid rgb(87, 6, 6);
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
