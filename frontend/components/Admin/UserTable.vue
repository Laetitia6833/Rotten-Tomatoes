<template>
    <div>
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
                <tr v-for="user in displayUsers" :key="user.id">
                    <td data-label="Nom">{{ user.name }}</td>
                    <td data-label="Email">{{ user.email }}</td>
                    <td data-label="Admin" class="admin">
                        <span
                            class="circle"
                            :class="user.admin ? 'green' : ''"
                        ></span>
                    </td>
                    <td data-label="Actions">
                        <div>
                            <nuxt-link
                                class="btn btn__update"
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
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- PAGINATION -->
        <nav v-if="pages.length > 1">
            <ul class="pagination">
                <li>
                    <button v-if="page != 1" @click="page--">Previous</button>
                </li>
                <li
                    v-for="pageNumber in pages /*.slice(page - 1, page + 5)*/"
                    :key="pageNumber.index"
                >
                    <button
                        @click="page = pageNumber"
                        :class="pageNumber === page ? 'active' : ''"
                    >
                        {{ pageNumber }}
                    </button>
                </li>
                <li>
                    <button v-if="page < pages.length" @click="page++">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            perPage: 10,
        };
    },
    props: ["users"],
    emits: { "open-delete-modal": null },
    computed: {
        // users() {
        //     return this.$store.state.allUsers;
        // },
        displayUsers() {
            return this.paginate(this.users);
        },
        pages() {
            let numberOfPages = Math.ceil(this.users.length / this.perPage);
            let pages = [];
            for (let i = 1; i <= numberOfPages; i++) {
                pages.push(i);
            }
            return pages;
        },
    },
    mounted() {
        this.$store.dispatch("getAllUsers");
    },

    // watch: {
    //     users() {
    //         console.log(this.users);
    //         this.setPages();
    //     },
    // },

    methods: {
        openDeleteModal(userId) {
            this.$emit("open-delete-modal", userId);
        },
        setPages() {
            let numberOfPages = Math.ceil(this.users.length / this.perPage);
            for (let i = 1; i <= numberOfPages; i++) {
                this.pages.push(i);
            }
        },
        paginate(users) {
            let page = this.page;
            let perPage = this.perPage;
            let from = page * perPage - perPage;
            let to = page * perPage;
            return users.slice(from, to);
        },
    },
};
</script>

<style lang="scss">
// PAGINATION
.pagination {
    margin-top: 10px;
    display: flex;

    button {
        border: 1px solid rgb(98, 98, 255);
        color: rgb(98, 98, 255);
        background: none;
        display: block;
        padding: 10px;
        cursor: pointer;

        &.active {
            background: rgb(98, 98, 255);
            color: white;
        }
    }
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

    table td[data-label="Actions"] {
        display: flex;
        justify-content: space-between;
        div {
            display: flex;
        }
        .btn {
            height: 100%;
            display: grid;
            place-items: center;
            padding: 5px 10px;
            &:last-child {
                margin-left: 5px;
            }
        }
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

.btn {
    display: block;
    padding: 5px;
    color: white;
    transition: all 0.3s;
    cursor: pointer;

    &:first-child {
        margin-bottom: 5px;
    }

    &__update {
        background: rgb(77, 154, 255);
        &:hover {
            background: rgb(45, 98, 168);
        }
    }
    &__delete {
        background: rgb(255, 77, 77);
        &:hover {
            background: rgb(153, 43, 43);
        }
    }
}
</style>
