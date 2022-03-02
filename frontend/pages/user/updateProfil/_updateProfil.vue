<template>
    <div>
        <h1>Update Profile</h1>
        <div class="form">
            <!-- <errors :errors="errors" />
            <div v-if="errors.length > 0">
                <p v-for="error in errors" :key="error">
                    {{ error }}
                </p>
            </div> -->
            <div class="form__group">
                <label class="form__control">Name</label>
                <input class="form__control" v-model="user.name" type="text" />
            </div>
            <div class="form__group">
                <label class="form__control">Email</label>
                <input
                    class="form__control"
                    v-model="user.email"
                    type="email"
                />
            </div>
            <div class="form__group">
                <label class="form__control">Password</label>
                <input
                    class="form__control"
                    v-model="newPassword"
                    type="text"
                />
            </div>
            <div class="form__group">
                <button class="form__control" @click="updateUser">
                    Update Profil
                </button>
            </div>
        </div>
    </div>
</template>


<script>
// import { mapGetters } from "vuex";

export default {
    data() {
        return {
            user: {},
            newPassword: "",
        };
    },
    // computed: {
    //     ...mapGetters({
    //         user: "getLoggedUser",
    //     }),
    // },

    async fetch() {
        // this.user = await this.$axios.$get(
        //     `users/${this.$route.params.updateProfil}`
        // );
    },

    methods: {
        updateUser() {
            let user = this.user;
            if (this.newPassword) {
                user.password = this.newPassword;
            } else {
                console.log("keep same");
            }

            this.$axios
                .$patch(`users/userUpdate/${user._id}`, user)
                .then((res) => {
                    const { password, ...loggedUser } = res;

                    this.$store.commit("SET_LOGGED_USER", loggedUser);
                    this.$cookies.set("user", JSON.stringify(loggedUser));
                    this.$store.dispatch(
                        "setSuccessMessage",
                        "Profil successfully updated"
                    );
                    setTimeout(() => {
                        this.$store.dispatch("setSuccessMessage", "");
                    }, 2000);
                    this.$router.push({
                        path: `/user/${user._id}`,
                        query: { success: true },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    async mounted() {
        this.user = await this.$axios.$get(
            `users/${this.$route.params.updateProfil}`
        );
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
