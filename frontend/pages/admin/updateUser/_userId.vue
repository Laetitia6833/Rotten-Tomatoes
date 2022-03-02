<template>
    <div>
        <h1>update user</h1>

        <div class="form">
            <errors :errors="errors" />
            <div v-if="errors.length > 0">
                <p v-for="error in errors" :key="error">
                    {{ error }}
                </p>
            </div>
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
                <label class="form__control">Admin</label>
                <input type="radio" :value="true" v-model="user.admin" />
                <label class="form__control">Not Admin</label>
                <input type="radio" :value="false" v-model="user.admin" />
            </div>
            <div class="form__group">
                <button class="form__control" @click="updateUser">
                    Update User
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import Errors from "@/components/Errors.vue";
// import Errors from "../../../components/Errors.vue";
export default {
    components: {
        Errors,
    },
    name: "updateUser",
    data() {
        return {
            user: "",
            errors: [],
        };
    },

    async fetch() {
        this.user = await this.$axios.$get(`users/${this.$route.query.userId}`);
    },

    methods: {
        updateUser() {
            this.$axios
                .$patch(`users/${this.user._id}`, this.user)
                .then(() => {
                    this.$store.dispatch("getAllUsers");
                    this.$store.dispatch("setSuccessMessage", "ok");
                    this.$router.push({
                        name: "admin-users",
                        params: { success: "User Updated" },
                    });
                })
                .catch((error) => {
                    this.errors = error.response.data.message;
                });
        },
    },
};
</script>

<style lang="scss">
</style>
