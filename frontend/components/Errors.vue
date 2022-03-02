<template>
    <div class="errors" v-if="errors.length > 0">
        <div class="error__container" v-for="error in errors" :key="error">
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["errors"],
};
</script>

<style lang="scss">
.errors {
    .error__container {
        // width: 100%;
        background: rgb(255, 105, 105);
        border: 1px solid rgb(230, 29, 29);
        color: rgb(156, 7, 7);
        padding: 5px;
        text-align: center;
        margin-bottom: 5px;
        border-radius: 3px;

        p::first-letter {
            text-transform: capitalize;
        }
    }
}
</style>
