<template>
    <div class="container user-management">
        <div class="table-content mt-0">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">User Accounts Management</div>
                    <span class="small-detail">Manage user accounts and control account access with ease from one central place.</span>
                </div>
                <router-link to="/events/create" class="btn btn-official btn-color">
                    <CircleFadingPlus :size="20" :stroke-width="1.75" style="stroke: white; margin-right: 7px;" />
                    Create new account
                </router-link>
            </div>
            <div class="mt-4 d-flex 125rem justify-content-between align-items-center w-100">
                <div class=" d-flex align-items-center ">
                    <ul class="view-type d-inline-flex mb-0">
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentRole === ''  }" @click="setRole('')">
                                All
                            </button>
                        </li>
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentRole === 'manager' }" @click="setRole('manager')">
                                Manager
                            </button>
                        </li>
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentRole === 'staff' }" @click="setRole('staff')">
                                Staff
                            </button>
                        </li>
                    </ul>
                                        
                    <div class="ui dropdown ms-3 sort-status">
                        <input type="hidden">

                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" :stroke-width="1.75" style="margin-right: 5px;" />
                            <span class="default text">Status</span>
                            <X v-if="sortBy" :size="16" class="ms-2 cursor-pointer" @click.stop="clearSort" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="title">Activated</div>
                            <div class="item" data-value="start_date">Deactivated</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <form @submit.prevent="searchUser" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" :stroke-width="1.75" class="position-absolute" />

                            <input v-model="search" type="text" class="form-control" style="width: 100%;"
                                placeholder="Search here">
                        </div>
                    </form>                        
                    <div class="ui dropdown ms-3 sort-field">
                        <input type="hidden">

                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" :stroke-width="1.75" style="margin-right: 5px;" />
                            <span class="default text">Sort field</span>
                            <X v-if="sortBy" :size="16" class="ms-2 cursor-pointer" @click.stop="clearSort" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="title">Title</div>
                            <div class="item" data-value="start_date">Start date</div>
                            <div class="item" data-value="end_date">End date</div>
                            <div class="item" data-value="created_at">Created date</div>
                            <div class="item" data-value="views">Most viewed</div>
                        </div>
                    </div>
                    <div class="ui dropdown ms-3 sort-direction">
                        <input type="hidden">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ArrowUpDown :size="16" :stroke-width="1.75" style="margin-right: 5px;" />
                            Sort order
                        </div>
                        <div class="menu filter">
                            <div class="item" data-value="asc">Ascending</div>
                            <div class="item" data-value="desc">Descending</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="wrapper-list mt-4 label-title">
                <div class="list-user w-100">
                    <div class="d-flex align-items-center " style="width: 25%;">
                        <div class="main-val">Account </div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">                        
                        <div class="main-val">Phone number</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">Role</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 20%;">
                        <div class="main-val">Created at</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 10%;">
                        <div class="main-val">Status</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="main-val"></div>
                    </div>

                </div>
            </div>
            <div class="wrapper-list">
                <div class="list-user w-100" v-for="user in userStore.users" :key="user.id">
                    <div class="d-flex align-items-center " style="width: 25%;">
                        <img :src="user.avatar" class="user-avatar" alt="">
                        <div class="">
                            <div class="main-val">{{ user.name }}</div>
                            <span class="small-val">{{ user.email }}</span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center  " style="width: 15%;">                        
                        <div class="main-val">{{ user.phone }}</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">{{ formatRole(user.role) }}</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 20%;">
                        <div class="main-val">{{ formatDateTime(user.created_at) }}</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 10%;">
                        <div class="status" :class="user.is_blocked ? 'deactivated' : 'activated'">
                            <div class="circle"></div>
                            <span>
                                {{ user.is_blocked ? 'Deactivated' : 'Activated' }}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center" style="width: 15%;">                                               
                        <div class="ui dropdown ms-3 sort-field">
                            <input type="hidden">
                            <div class="wrapper d-flex align-items-center" style="padding: 8px!important;">
                                <Ellipsis :size="16" :stroke-width="1.75" />
                            </div>

                            <div class="menu filter">
                                <div class="item" data-value="title">View profile</div>
                                <div class="item" data-value="start_date">Update account</div>
                                <div class="item" data-value="end_date">{{ user.is_blocked ? 'Activate account' : 'Block account' }}</div>
                                <div class="item" data-value="created_at">Delete account</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="userStore.users && userStore.users.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" alt="">
                <span>No users found</span>
                <span class="sh-desc">
                    Try changing filters or search criteria.
                </span>
            </div>
            <div v-if="userStore.paginate.has_pages"
                class="pagination-wrapper d-flex justify-content-center align-items-center mt-4">
                <!-- Prev -->
                <button class="btn-page" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                    <ChevronLeft :size="17" :stroke-width="1.75" />
                </button>

                <!-- Pages -->
                <button v-for="page in userStore.paginate.total_page" :key="page" class="btn-page"
                    :class="{ active: currentPage === page }" :disabled="currentPage === page"
                    @click="changePage(page)">
                    {{ page }}
                </button>

                <!-- Next -->
                <button class="btn-page" :disabled="currentPage === userStore.paginate.total_page"
                    @click="changePage(currentPage + 1)">
                    <ChevronRight :size="16" :stroke-width="1.75" />
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, nextTick, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'
import { UserManagementStore } from '@/stores/UserManagementStore'

const route = useRoute()
const router = useRouter()

const currentPage = ref(1)
const search = ref('')
const currentRole = ref('')

const userStore = UserManagementStore()

onMounted(async () => {
    window.$ = window.jQuery = $
    await import('fomantic-ui-css/semantic.min.js')
    const token = localStorage.getItem('auth_token')
    await fetchUsers()
    await nextTick()

    $('.ui.dropdown').dropdown({
        on: 'click'
    })
})


const setRole = (role) => {
    currentRole.value = role
    currentPage.value = 1

    router.push({
        query: {
            ...route.query,
            role: role || undefined,
            page: undefined,
            search: search.value || undefined
        }
    })
}

const fetchUsers = async () => {
    const token = localStorage.getItem('auth_token')

    await userStore.getAllUsers(
        token,
        currentPage.value,
        search.value,
        currentRole.value
    )
}

const changePage = async (page) => {
    if (page < 1 || page > userStore.paginate.total_page) return

    currentPage.value = page

    router.push({
        query: {
            ...route.query,
            page: page === 1 ? undefined : page,
            search: search.value || undefined,
            role: currentRole.value || undefined
        }
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const formatRole = (role) => {
    if (!role) return ''

    return role.charAt(0).toUpperCase() + role.slice(1)
}

const searchUser = () => {
    currentPage.value = 1

    router.push({
        query: {
            ...route.query,
            search: search.value || undefined,
            page: 1
        }
    })
}

watch(
    () => route.query,
    async (query) => {
        currentPage.value = Number(query.page) || 1
        search.value = query.search || ''
        currentRole.value = query.role || ''

        await fetchUsers()
    },
    { immediate: true }
)
</script>