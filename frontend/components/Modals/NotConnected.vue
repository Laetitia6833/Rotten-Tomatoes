<template>
    <div class="modal__container">
        <div class="btn_c">
            <font-awesome-icon
                @click="closeModal"
                :icon="['fas', 'times-circle']"
            />
        </div>
        <p>You need to be connected to {{ message }}</p>
        <nuxt-link class="btn btn__update" to="/login">Login</nuxt-link>
        <p>You don't have an account yet ?</p>
        <nuxt-link class="btn btn__create" to="/register">
            Create an account
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: ["message"],
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style lang="scss">
.modal__container {
    position: fixed;
    max-width: 800px;
    width: 80%;
    background: white;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 10px;

    .fa-times-circle {
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
        transform: translate(50%, -50%);
        color: red;
        background: white;
        border: 2px solid red inset;
        border-radius: 100%;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            transform: translate(50%, -50%) scale(1.2) rotate(360deg);
        }
    }

    .btn {
        width: 80%;
        margin: 20px auto;
        padding: 10px 0;
        font-weight: 600;
        &__create {
            background: rgb(79, 167, 61);
            border: 1px solid rgb(79, 167, 61);

            &:hover {
                background: transparent;
                color: rgb(79, 167, 61);
            }
        }

        &__update {
            border: 1px solid rgb(77, 154, 255);

            &:hover {
                background: transparent;
                color: rgb(77, 154, 255);
            }
        }
    }
}
</style>
