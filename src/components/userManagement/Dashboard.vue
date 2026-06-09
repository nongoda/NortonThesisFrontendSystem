<template>
    <div class="container user-management table-pro-list">
        <div class="table-content mt-0">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">User Accounts Management</div>
                    <span class="small-detail">Manage user accounts and control account access with ease from one central place.</span>
                </div>
                <router-link to="/user-management/create-account" class="btn btn-official btn-color">
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
                                        
                    <div class="ui dropdown ms-3 sort-status status-dropdown">
                        <input type="hidden">

                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" :stroke-width="1.75" style="margin-right: 5px;" />
                            <span class="default text">{{ statusLabel || 'Status' }}</span>
                            <X v-if="status" @click.stop="clearStatus" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="activated">Activated</div>
                            <div class="item" data-value="deactivated">Deactivated</div>
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
                            <span class="default text">{{ sortByLabel || 'Sort field' }}</span>
                            <X v-if="sortBy" @click.stop="clearSortField" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="name">Name</div>
                            <div class="item" data-value="created_at">Created at</div>
                        </div>
                    </div>
                    <div class="ui dropdown ms-3 sort-direction sort-order-dropdown">
                        <input type="hidden">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ArrowUpDown :size="16" :stroke-width="1.75" style="margin-right: 5px;" />
                            <span class="default text">
                                {{ sortOrderLabel || 'Sort order' }}
                            </span>
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
                        <div class="main-val">{{ user.phone && user.phone.trim() ? user.phone : 'N/A'   }}</div>
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
                                <div class="item" @click="openConfirmModal('block', user)">{{ user.is_blocked ? 'Activate account' : 'Block account' }}</div>
                                <div class="item" @click="openConfirmModal('delete', user)" >Delete account</div>
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
    <div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

        <div class="modal-header">
            <h5 class="modal-title">{{ modal.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
            {{ modal.message }}
        </div>

        <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
            </button>

            <button class="btn btn-danger" @click="confirmAction">
            Confirm
            </button>
        </div>

        </div>
    </div>
    </div>
</template>
<script setup>
import { onMounted, nextTick, watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import { UserManagementStore } from '@/stores/UserManagementStore'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const route = useRoute()
const router = useRouter()
const sortBy = ref('')
const sortOrder = ref('')
const status = ref('')
const currentPage = ref(1)
const search = ref('')
const currentRole = ref('')
const modal = ref({
    title: '',
    message: '',
    action: null,
    user: null
})

let bootstrapModal = null
const userStore = UserManagementStore()
const openConfirmModal = (type, user) => {
    modal.value.user = user

    if (type === 'block') {
        modal.value.title = user.is_blocked ? 'Activate Account' : 'Block Account'
        modal.value.message = `Are you sure you want to ${user.is_blocked ? 'activate' : 'block'} ${user.name}?`
        modal.value.action = 'toggle'
    }

    if (type === 'delete') {
        modal.value.title = 'Delete Account'
        modal.value.message = `This action cannot be undone for ${user.name}`
        modal.value.action = 'delete'
    }

    if (!bootstrapModal) {
        bootstrapModal = new bootstrap.Modal(document.getElementById('confirmModal'))
    }

    bootstrapModal.show()
}
const confirmAction = async () => {
    const user = modal.value.user
    const token = localStorage.getItem('auth_token')

    try {

        // BLOCK / UNBLOCK
        if (modal.value.action === 'toggle') {
            if (user.is_blocked) {
                await userStore.unblockUser(user.id, token)
            } else {
                await userStore.blockUser(user.id, token)
            }

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User status updated',
                life: 2000
            })
        }

        // DELETE
        if (modal.value.action === 'delete') {
            await userStore.deleteUser(user.id, token)

            toast.add({
                severity: 'success',
                summary: 'Deleted',
                detail: 'User deleted successfully',
                life: 2000
            })
        }

        await fetchUsers()
        bootstrapModal.hide()

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000
        })
    }
}
const statusLabel = computed(() => {
    if (status.value === '0' || status.value === 0) return 'Activated'
    if (status.value === '1' || status.value === 1) return 'Deactivated'
    return ''
})
const sortByLabel = computed(() => {
    if (sortBy.value === 'name') return 'Name'
    if (sortBy.value === 'created_at') return 'Created at'
    return ''
})
const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return ''
})
const clearStatus = async () => {
    status.value = ''

    $('.status-dropdown').dropdown('clear')

    await applyFilters()
}
const clearRole = async () => {
    currentRole.value = ''

    await removeQueryParam('role')
}
const clearSortField = async () => {
    sortBy.value = ''

    $('.sort-field').dropdown('set selected', null)
    $('.sort-field').dropdown('clear')

    await applyFilters()
}
onMounted(async () => {
    window.$ = window.jQuery = $
    await import('fomantic-ui-css/semantic.min.js')
    const token = localStorage.getItem('auth_token')
    await fetchUsers()
    await nextTick()

    $('.status-dropdown').dropdown({
        onChange(value) {
           status.value = value === 'activated' ? '0'
                      : value === 'deactivated' ? '1'
                      : ''


            applyFilters()
        }
    })

    $('.sort-field').dropdown({
        onChange(value) {
            sortBy.value = value
            applyFilters()

        }
    })

    $('.sort-order-dropdown').dropdown({
        onChange(value) {
           sortOrder.value = value
            applyFilters()

        }
    })
})


const setRole = (role) => {
    currentRole.value = role
    applyFilters()

}

const removeQueryParam = async (key) => {
    const newQuery = { ...route.query }
    delete newQuery[key]

    await router.push({
        path: route.path,
        query: newQuery
    })
}

const fetchUsers = async () => {
    const token = localStorage.getItem('auth_token')

    await userStore.getAllUsers(token, {
        page: currentPage.value,
        search: search.value,
        role: currentRole.value,
        sort_by: sortBy.value,
        sort: sortOrder.value,
        status: status.value || undefined
    })
    
    await nextTick()
    console.log(userStore.users)

    // IMPORTANT: rebind dropdowns after DOM update
    $('.ui.dropdown').dropdown()
}
const resetFilters = async () => {
    status.value = ''
    sortBy.value = ''
    sortOrder.value = ''
    search.value = ''
    currentRole.value = ''
    currentPage.value = 1

    // reset UI dropdowns (fomantic)
    nextTick(() => {
        $('.status-dropdown').dropdown('clear')
        $('.sort-field').dropdown('clear')
        $('.sort-order-dropdown').dropdown('clear')
    })

    // clear URL query completely
    await router.push({
        path: route.path,
        query: {}
    })

    await fetchUsers()
}
const changePage = async (page) => {
    if (page < 1 || page > userStore.paginate.total_page) return

    currentPage.value = page

    router.push({
        query: {
            ...route.query,
            page: page === 1 ? undefined : page,
            search: search.value || undefined,
            role: currentRole.value || undefined,
            status: status.value || undefined,
            sort_by: sortBy.value || undefined,
            sort: sortOrder.value || undefined
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
    applyFilters()
}
const applyFilters = async () => {
    currentPage.value = 1

    const query = {
        page: 1,
        search: search.value || undefined,
        role: currentRole.value || undefined,
        status: status.value !== '' ? status.value : undefined,
        sort_by: sortBy.value || undefined,
        sort: sortOrder.value || undefined
    }

    await router.push({
        path: route.path,
        query
    })

    await fetchUsers()
}

const toggleUserStatus = async (user) => {
    const action = user.is_blocked ? 'activate' : 'block'

    const result = await Swal.fire({
        title: `${action.toUpperCase()} this account?`,
        text: `Are you sure you want to ${action} ${user.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Yes`,
        cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    const token = localStorage.getItem('auth_token')

    try {
        if (user.is_blocked) {
            await userStore.unblockUser(user.id, token)
        } else {
            await userStore.blockUser(user.id, token)
        }

        await fetchUsers()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${action}ed successfully`,
            life: 2000
        })

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000
        })
    }
}
const deleteUser = async (user) => {
    const result = await Swal.fire({
        title: 'Delete this account?',
        text: `This action cannot be undone for ${user.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    const token = localStorage.getItem('auth_token')

    try {
        await userStore.deleteUser(user.id, token)

        await fetchUsers()

        toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'User deleted successfully',
            life: 2000
        })

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete user',
            life: 3000
        })
    }
}

watch(
    () => route.query,
    async (query) => {
        currentPage.value = Number(query.page) || 1
        search.value = query.search || ''
        currentRole.value = query.role || ''

        // ADD THIS
        status.value = query.status || ''
        sortBy.value = query.sort_by || ''
        sortOrder.value = query.sort || ''

        await fetchUsers()
    },
    { immediate: true }
)
</script>