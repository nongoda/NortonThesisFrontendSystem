<template>
    <div class="container user-management table-pro-list">
        <div class="table-content mt-0">

            <!-- HEADER -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Customer Management</div>
                    <span class="small-detail">
                        Manage customer accounts and monitor their activity in one place.
                    </span>
                </div>
            </div>

            <!-- FILTER BAR -->
            <div class="mt-4 d-flex justify-content-between align-items-center w-100">

                <!-- LEFT: STATUS TABS -->
                <div class="d-flex align-items-center">
                    <ul class="view-type d-inline-flex mb-0">
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: status === '' }" @click="setStatus('')">
                                All
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: status === '0' }" @click="setStatus('0')">
                                Activated
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: status === '1' }" @click="setStatus('1')">
                                Deactivated
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- RIGHT: SEARCH + SORT -->
                <div class="d-flex align-items-center">

                    <!-- SEARCH -->
                    <form @submit.prevent="searchCustomer" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" :stroke-width="1.75" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" placeholder="Search customer">
                        </div>
                    </form>

                    <!-- SORT FIELD -->
                    <div class="ui dropdown ms-3 sort-field">
                        <input type="hidden">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" />
                            <span class="default text">{{ sortByLabel || 'Sort field' }}</span>
                            <X v-if="sortBy" @click.stop="clearSortField" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="name">Name</div>
                            <div class="item" data-value="created_at">Created at</div>
                        </div>
                    </div>

                    <!-- SORT ORDER -->
                    <div class="ui dropdown ms-3 sort-order-dropdown">
                        <input type="hidden">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ArrowUpDown :size="16" />
                            <span class="default text">{{ sortOrderLabel || 'Sort order' }}</span>
                            <X v-if="sortOrder" @click.stop="clearSortOrder" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="asc">Ascending</div>
                            <div class="item" data-value="desc">Descending</div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- TABLE HEADER -->
            <div class="wrapper-list mt-4 label-title">
                <div class="list-user w-100">
                    <div class="d-flex align-items-center " style="width: 25%;">
                        <div class="main-val">Account </div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="main-val">Phone number</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">Created at</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">Updated at</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="main-val">Status</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="main-val"></div>
                    </div>

                </div>
            </div>

            <!-- TABLE BODY -->
            <div class="wrapper-list">
                <div class="list-user w-100" v-for="customer in userStore.customers" :key="customer.id">

                    <div style="width:25%" class="d-flex align-items-center">
                        <img :src="customer.avatar" class="user-avatar" />
                        <div>
                            <div class="main-val">{{ customer.name }}</div>
                            <span class="small-val">{{ customer.email }}</span>
                        </div>
                    </div>

                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ customer.phone && customer.phone.trim() ? customer.phone : 'N/A'   }}
                    </div>

                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ formatDateTime(customer.created_at) }}
                    </div>
                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ formatDateTime(customer.updated_at) || 'N/A' }}
                    </div>

                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="status" :class="customer.is_blocked ? 'deactivated' : 'activated'">
                            <div class="circle"></div>
                            <span>
                                {{ customer.is_blocked ? 'Deactivated' : 'Activated' }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center" style="padding: 8px!important; width:15%">
                        <div class="ui dropdown sort-field">
                            <div class="wrapper">
                                <Ellipsis :size="16" :stroke-width="1.75" />
                            </div>

                            <div class="menu filter">
                                <div class="item" @click="openConfirmModal('block', customer)">
                                    {{ customer.is_blocked ? 'Activate' : 'Block' }}
                                </div>

                                <div class="item" @click="openConfirmModal('delete', customer)">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- EMPTY -->
            <div v-if="userStore.customers?.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" alt="">
                <span>No users found</span>
                <span class="sh-desc">
                    Try changing filters or search criteria.
                </span>
            </div>
        </div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ modal.title }}
                    </h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    {{ modal.message }}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-official btn-color-cancel" data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <button type="button" class="btn btn-official btn-color-warning" @click="confirmAction">
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { UserManagementStore } from '@/stores/UserManagementStore'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const modal = ref({
    title: '',
    message: '',
    action: null,
    user: null
})

const toast = useToast()
const route = useRoute()
const router = useRouter()
const userStore = UserManagementStore()
let isUpdating = false
const status = ref('')
const search = ref('')
const sortBy = ref('')
const sortOrder = ref('')
const currentPage = ref(1)

const bootstrapModal = ref(null)

const setStatus = (value) => {
    status.value = value
    applyFilters()
}
const searchCustomer = () => applyFilters()

const sortByLabel = computed(() => {
    if (route.query.sort_by === 'name') return 'Name'
    if (route.query.sort_by === 'created_at') return 'Created at'
    return ''
})

const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return ''
})

const clearSortField = async () => {
    sortBy.value = ''

    isUpdating = true
    $('.sort-field').dropdown('clear')
    isUpdating = false

    await syncRoute()
}

const clearSortOrder = async () => {
    sortOrder.value = ''

    isUpdating = true
    $('.sort-order-dropdown').dropdown('clear')
    isUpdating = false

    await syncRoute()
}

const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}
const changePage = async (page) => {
    if (page < 1 || page > userStore.paginate.total_page) return

    const query = {
        ...route.query,
        page: page === 1 ? undefined : page
    }

    await router.push({
        path: route.path,
        query
    })
}
const fetchPage = async (page = 1) => {
    const token = localStorage.getItem('auth_token')

    await userStore.getCustomers(token, {
        page,
        search: search.value,
        status: status.value,
        sort_by: sortBy.value,
        sort: sortOrder.value
    })

    // await nextTick()
} 
const syncRoute = async () => {
    const query = {}

    if (search.value) query.search = search.value

    if (status.value !== '') {
        query.status = status.value
    }

    if (sortBy.value) query.sort_by = sortBy.value

    if (sortOrder.value) query.sort = sortOrder.value

    if (currentPage.value > 1) query.page = currentPage.value

    await router.push({
        path: route.path,
        query
    })
}
const initDropdowns = async () => {
    await nextTick()

    $('.sort-field').dropdown('destroy')
    $('.sort-order-dropdown').dropdown('destroy')

    $('.sort-field').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortBy.value = value
            syncRoute()
        }
    })

    $('.sort-order-dropdown').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortOrder.value = value
            syncRoute()
        }
    })
}
const openConfirmModal = (type, user) => {
    modal.value.user = user

    // BLOCK / UNBLOCK
    if (type === 'block') {
        modal.value.title = user.is_blocked
            ? 'Activate Account'
            : 'Block Account'

        modal.value.message =
            `Are you sure you want to ${user.is_blocked ? 'activate' : 'block'} ${user.name}?`

        modal.value.action = 'toggle'
    }

    // DELETE
    if (type === 'delete') {
        modal.value.title = 'Delete Account'

        modal.value.message =
            `This action cannot be undone for ${user.name}`

        modal.value.action = 'delete'
    }

    // FIX HERE
    if (!bootstrapModal.value) {
        bootstrapModal.value = new bootstrap.Modal(
            document.getElementById('confirmModal')
        )
    }

    bootstrapModal.value.show()
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
                detail: user.is_blocked
                    ? 'User activated successfully'
                    : 'User blocked successfully',
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

        bootstrapModal.value.hide()
        await loadCustomers()
        await nextTick()

    } catch (error) {

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:
                error?.response?.data?.message ||
                'Something went wrong',
            life: 3000
        })
    }
}
const loadCustomers = async () => {
    const token = localStorage.getItem('auth_token')

    await userStore.getCustomers(token, {
        page: currentPage.value,
        search: search.value,
        status: status.value,
        sort_by: sortBy.value,
        sort: sortOrder.value
    })
}

watch(
    () => route.query,
    async (query) => {
        currentPage.value = Number(query.page) || 1
        search.value = query.search || ''
        status.value = query.status || ''
        sortBy.value = query.sort_by || ''
        sortOrder.value = query.sort || ''

        const token = localStorage.getItem('auth_token')

        await userStore.getCustomers(token, {
            page: currentPage.value,
            search: search.value,
            status: status.value,
            sort_by: sortBy.value,
            sort: sortOrder.value
        })

        await nextTick()

        isUpdating = true

        $('.sort-field').dropdown('destroy')
        $('.sort-order-dropdown').dropdown('destroy')

        $('.sort-field').dropdown({
            onChange(value) {
                if (isUpdating) return
                sortBy.value = value
                syncRoute()
            }
        })

        $('.sort-order-dropdown').dropdown({
            onChange(value) {
                if (isUpdating) return
                sortOrder.value = value
                syncRoute()
            }
        })

        isUpdating = false
    },
    { immediate: true }
)

onMounted(async () => {
    const token = localStorage.getItem('auth_token')
    await userStore.getCustomers(token)
    await initDropdowns()
})
</script>