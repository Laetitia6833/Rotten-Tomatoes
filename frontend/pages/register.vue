<template>
    <div>
        <h1>Create an account</h1>
        <div class="form">
            <!-- <div class="errors" v-if="errors.length > 0">
                <div v-for="error in errors" :key="error">
                    <p>{{ error }}</p>
                </div>
            </div> -->
            <errors :errors="errors" />
            <div class="form__group">
                <label for="name" class="form__control">Your name</label>
                <input v-model="user.name" type="text" class="form__control" />
            </div>
            <div class="form__group">
                <label for="email" class="form__control">Your email</label>
                <input
                    v-model="user.email"
                    type="email"
                    class="form__control"
                />
            </div>
            <div class="form__group">
                <label for="password" class="form__control">
                    Your password
                </label>
                <input
                    v-model="user.password"
                    type="password"
                    class="form__control"
                />
            </div>
            <div class="form__group">
                <label for="password_confirmation" class="form__control">
                    Confrim your password
                </label>
                <input
                    v-model="user.password_confirmation"
                    type="password"
                    class="form__control"
                />
            </div>
            <div class="form__group">
                <button class="form__control" @click="registerUser">
                    Register
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Errors from "../components/Errors.vue";

export default {
    components: {
        Errors,
    },

    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: [],
        };
    },

    methods: {
        registerUser() {
            this.error = "";
            this.$axios
                .$post("/auth/register", this.user)
                .then((res) => {
                    console.log(res);
                    // const requestToken = res;
                    // window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:8080/auth/approved/${this.user.email}`;
                })
                .catch((error) => {
                    if (
                        error.response.status === 409 ||
                        error.response.status === 406
                    ) {
                        console.log(error.response.data);
                        this.errors = [error.response.data.message];
                    } else {
                        this.errors = error.response.data.message;
                    }
                });
        },
    },
};
</script>

<style lang="scss">
h1 {
    margin-top: 40px;
    font-size: 30px;
    text-align: center;
}
.form {
    background: rgb(155, 227, 255);
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 0 15px -5px rgba(0, 11, 48, 0.76);
    border-radius: 5px;

    &__group {
        margin-top: 20px;

        button {
            margin: 10px auto;
            width: 50%;
            padding: 10px;
            border: none;
            background: rgb(62, 95, 202);
            color: white;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;

            &:hover {
                background: rgb(54, 161, 63);
            }
        }
    }

    &__control {
        display: block;
        text-align: center;
    }

    input {
        width: 80%;
        margin: 10px auto;
        height: 30px;
    }
}
</style>
