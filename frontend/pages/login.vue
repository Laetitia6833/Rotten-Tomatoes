<template>
    <div>
        <h1>Login</h1>
        <div class="form">
            <errors :errors="errors" />

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
                    @keyup.enter="login"
                />
            </div>

            <div class="form__group">
                <button class="form__control" @click="login">Login</button>
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
    middleware: ["cookie"],
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            errors: [],
        };
    },

    methods: {
        login() {
            this.errors = [];
            if (this.user.email != "" && this.user.password != "") {
                this.$axios
                    .$post("/auth/login", this.user)
                    .then((res) => {
                        let { password, ...user } = res.user;
                        const token = res.accessToken;
                        user.token = token;
                        this.$store.commit("SET_LOGGED_USER", user);
                        this.$cookies.set("user", JSON.stringify(user));
                        if (user.admin) {
                            this.$router.push({
                                path: `/admin/${user._id}`,
                            });
                        } else {
                            this.$router.push({
                                path: `/user/${user._id}`,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        this.errors = [error.response.data.message];
                    });
            } else {
                this.errors = ["Please enter your email and password"];
            }
        },
    },
};
</script>
