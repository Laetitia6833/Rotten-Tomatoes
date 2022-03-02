<template>
    <div>
        <transition name="slide">
            <delete-message-modal
                v-if="deleteMessage"
                :deleteMessage="deleteMessage"
            />
        </transition>
        <transition name="slide" appear>
            <success v-if="successDisabled" :success="success" />
        </transition>
        <transition name="fade">
            <bg-modal v-if="bgModalVisible" @closeModal="closeModal" />
        </transition>
        <transition name="slide">
            <delete-modal
                @deleteUser="deleteUser(userToDelete)"
                v-show="isDeleteModalVisible"
                @closeModal="closeModal"
            />
        </transition>
        <h1>Users</h1>

        <div class="btn btn__update btn__create">
            <nuxt-link to="createUser">Create User</nuxt-link>
        </div>

        <div>
            <user-table :users="users" @open-delete-modal="openDeleteModal" />
            <!-- <client-only>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td data-label="Nom">{{ user.name }}</td>
                            <td data-label="Email">{{ user.email }}</td>
                            <td data-label="Admin" class="admin">
                                <span
                                    class="circle"
                                    :class="user.admin ? 'green' : ''"
                                ></span>
                            </td>
                            <td data-label="Actions">
                                <nuxt-link
                                    :to="{
                                        path: 'updateUser',
                                        query: { userId: user._id },
                                    }"
                                >
                                    Update
                                </nuxt-link>

                                <div
                                    class="btn btn__delete"
                                    @click="openDeleteModal(user._id)"
                                >
                                    Delete
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </client-only> -->
        </div>
    </div>
</template>


<script>
import DeleteModal from "../../components/Modals/DeleteModal.vue";
import BgModal from "../../components/Modals/BgModal.vue";
import Success from "../../components/Modals/Success.vue";
import UserTable from "../../components/Admin/UserTable.vue";
import DeleteMessageModal from "../../components/Modals/DeleteMessage.vue";

export default {
    components: {
        DeleteModal,
        BgModal,
        Success,
        UserTable,
        DeleteMessageModal,
    },
    data: () => ({
        userToDelete: "",
        isDeleteModalVisible: false,
        bgModalVisible: false,
        // success: "",
        successDisabled: false,
        deleteMessage: "",
    }),

    computed: {
        users() {
            return this.$store.state.allUsers;
        },
        success() {
            let message = "";
            if ("success" in this.$route.params) {
                message = this.$route.params.success;
                this.successDisabled = true;
                setTimeout(() => {
                    this.successDisabled = false;
                }, 2000);
            }
            return message;
        },
    },

    methods: {
        openDeleteModal(userId) {
            this.isDeleteModalVisible = true;
            this.userToDelete = userId;
            this.bgModalVisible = true;
        },
        closeModal() {
            this.isDeleteModalVisible = false;
            this.bgModalVisible = false;
        },
        deleteUser(userId) {
            this.$axios.$post(`users/deleteUser/${userId}`).then((res) => {
                this.$store.dispatch("getAllUsers");
                this.closeModal();
                this.deleteMessage = "User has been succefullu deleted";
                setTimeout(() => {
                    this.deleteMessage = "";
                }, 2000);
            });
        },
    },

    mounted() {
        this.$store.dispatch("getAllUsers");
        // if ("success" in this.$route.params) {
        //     this.success = this.$route.params.success;
        // }
        // setTimeout(() => {
        //     this.successDisabled = false;
        //     this.$store.dispatch("setSuccessMessage", "");
        //     this.success = "";
        // }, 2000);
    },
};
</script>

<style lang="scss">
h1 {
    margin-bottom: 20px;
}
.btn__create {
    width: max-content;
    margin: 0 auto 10px auto;
    padding: 10px 20px;
}
.admin {
    display: grid;
    place-items: center;
}
.circle {
    &::after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        background: rgb(235, 0, 0);
        border-radius: 10px;
    }
    &.green::after {
        background: rgb(22, 241, 59);
    }
}

table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
}

table caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
}

table tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0.35em;
}

table th,
table td {
    padding: 0.625em;
    text-align: center;
}

table th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

@media screen and (max-width: 600px) {
    table {
        border: 0;
    }
    .admin {
        display: flex;
        justify-content: space-between;
    }

    table caption {
        font-size: 1.3em;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: 0.625em;
    }

    table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: 0.8em;
        text-align: right;
    }

    table td::before {
        /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }

    table td:last-child {
        border-bottom: 0;
    }
}
// FADE \\

.fade-enter-active,
.fade-leave-active {
    transition: all 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    // opacity: 1;
    opacity: 0;
}

// SLIDE \\
.slide-enter-active,
.slide-leave-active {
    transition: all 0.7s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-100px);
    // opacity: 0;
}
</style>
