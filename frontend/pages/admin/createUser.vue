<template>
    <div>
        <h1>Create a User</h1>
        <div class="form">
            <!-- <div class="errors" v-if="errors.length > 0">
                <div v-for="error in errors" :key="error">
                    <p>{{ error }}</p>
                </div>
            </div> -->
            <errors :errors="errors" />
            <div class="form__group">
                <label for="name" class="form__control">Name</label>
                <input v-model="user.name" type="text" class="form__control" />
            </div>
            <div class="form__group">
                <label for="email" class="form__control">Email</label>
                <input
                    v-model="user.email"
                    type="email"
                    class="form__control"
                />
            </div>
            <div class="form__group">
                <label for="password" class="form__control">Password </label>
                <input
                    v-model="user.password"
                    type="password"
                    class="form__control"
                />
            </div>
            <div class="form__group form__group--radio">
                <div>
                    <label class="form__control">Admin</label>
                    <input type="radio" :value="true" v-model="user.admin" />
                </div>
                <div>
                    <label class="form__control">Not Admin</label>
                    <input type="radio" :value="false" v-model="user.admin" />
                </div>
            </div>
            <div class="form__group">
                <button class="form__control" @click="addUser">Add User</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                admin: "",
            },
            errors: [],
        };
    },

    methods: {
        addUser() {
            this.$axios
                .$post("admin/addUser", this.user)
                .then(() => {
                    this.$store.dispatch("getAllUsers");
                    this.$router.push({
                        name: "admin-users",
                        params: { success: "User Created" },
                    });
                })
                .catch((error) => {
                    // if (error.response.data)
                    if (Array.isArray(error.response.data.message)) {
                        this.errors = error.response.data.message;
                        console.log(errors.respomse.data);
                    }
                    this.errors = [error.response.data.message];
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

        &--radio {
            display: flex;
            justify-content: center;

            & > div {
                margin: 0 20px;
            }
        }

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
