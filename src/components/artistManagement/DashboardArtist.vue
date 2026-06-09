<template>
    <div class="container user-management table-pro-list artist">
        <div class="table-content mt-0">

            <!-- HEADER -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Artist Management</div>
                    <span class="small-detail">
                        Manage artists and their availability in one place.
                    </span>
                </div>
                <div class="">
                    <router-link to="artists/create" class="btn btn-official btn-color"> 
                        <CircleFadingPlus :size="20" :stroke-width="1.75" style="stroke: white; margin-right: 7px;" />  
                        Create new artist
                    </router-link>
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
                            <button class="tab-table-type" :class="{ active: status === '1' }" @click="setStatus('1')">
                                Active
                            </button>
                        </li>
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: status === '0' }" @click="setStatus('0')">
                                Inactive
                            </button>
                        </li>

                    </ul>
                </div>

                <!-- RIGHT: SEARCH + SORT -->
                <div class="d-flex align-items-center">

                    <!-- SEARCH -->
                    <form @submit.prevent="searchArtist" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" :stroke-width="1.75" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" placeholder="Search artist">
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
                        <div class="main-val">Artist</div>
                    </div>
                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="main-val">Genre</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">Country</div>
                    </div>
                    <div class="d-flex align-items-center " style="width: 15%;">
                        <div class="main-val">Created at</div>
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
                <div class="list-user w-100" v-for="artist in artistStore.artists" :key="artist.id">

                    <div style="width:25%" class="d-flex align-items-center">
                        <img :src="artist.profile_image" class="user-avatar" />
                        <div>
                            <div class="main-val">{{ artist.stage_name }}</div>
                            <span class="small-val">{{ artist.name }}</span>
                        </div>
                    </div>

                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ artist.genre || 'N/A' }}
                    </div>

                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ artist.country || 'N/A' }}
                    </div>
                    <div class="d-flex align-items-center  " style="width: 15%;">
                        {{ formatDateTime(artist.created_at) }}
                    </div>

                    <div class="d-flex align-items-center" style="width: 15%;">
                        <div class="status" :class="artist.is_active ? 'activated' : 'deactivated'">
                            <div class="circle"></div>
                            <span>
                                {{ artist.is_active ? 'Activated' : 'Deactivated' }}
                            </span>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center" style="padding: 8px!important; width:15%">
                        <div class="ui dropdown sort-field">
                            <!-- <div class="ui dropdown sort-field"> -->
                            <div class="wrapper">
                                <Ellipsis :size="16" :stroke-width="1.75" />
                            </div>

                            <div class="menu filter">
                                <div class="item" @click="openConfirmModal('toggle', artist)">
                                    {{ artist.is_active ? 'Deactivate' : 'Activate' }}
                                </div>
                                <div class="item" @click="$router.push(`/artists/preview/${artist.slug}`)">Preview information</div>
                                <div class="item" @click="openConfirmModal('delete', artist)">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- EMPTY -->
            <div v-if="artistStore.artists?.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" alt="">
                <span>No artists found</span>
                <span class="sh-desc">
                    Try changing filters or search criteria.
                </span>
            </div>
            <div class="pagination-wrapper mt-4 d-flex justify-content-center align-items-center" v-if="artistStore.paginate.totalPage > 1">

                <!-- Prev -->
                <button class="btn-page" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                    <ChevronLeft :size="17" :stroke-width="1.75" />

                </button>

                <!-- First page shortcut -->
                <button v-if="visiblePages[0] > 1" class="btn-page" @click="changePage(1)">
                    1
                </button>

                <span v-if="visiblePages[0] > 2" class="mx-1">...</span>

                <!-- Visible Pages -->
                <button v-for="page in visiblePages" :key="page" class="btn-page"
                    :class="page === currentPage ? 'active' : ''" @click="changePage(page)">
                    {{ page }}
                </button>

                <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="mx-1">...</span>

                <!-- Last page shortcut -->
                <button v-if="visiblePages[visiblePages.length - 1] < totalPages" class="btn-page"
                    @click="changePage(totalPages)">
                    {{ totalPages }}
                </button>

                <!-- Next -->
                <button class="btn-page" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
                    <ChevronRight :size="16" :stroke-width="1.75" />

                </button>

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
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <button type="button" class="btn btn-danger" @click="confirmAction">
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToast } from 'primevue/usetoast'
import * as bootstrap from 'bootstrap'
import $ from 'jquery'
import { ArtistManagementStore } from '@/stores/ArtistManagementStore'

const artistStore = ArtistManagementStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const goToPreview = (slug) => {
    router.push(`/artists/preview/${slug}`)
}
/* ---------------- STATE ---------------- */
const status = ref('')
const search = ref('')
const sortBy = ref('')
const sortOrder = ref('')
const currentPage = ref(1)
const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return 'Sort order'
})
const sortByLabel = computed(() => {
    if (sortBy.value === 'name') return 'Name'
    if (sortBy.value === 'created_at') return 'Created at'
    return ''
})
let isUpdating = false

const bootstrapModal = ref(null)

const modal = ref({
    title: '',
    message: '',
    action: null,
    artist: null
})

const allowedSortBy = ['name', 'created_at']

const sanitizeSortBy = (value) => {
    return allowedSortBy.includes(value) ? value : ''
}

/* ---------------- FETCH ---------------- */
const loadArtists = async () => {
    const token = localStorage.getItem('auth_token')

    await artistStore.getArtists(token, {
        page: currentPage.value,
        search: search.value,
        is_active: status.value !== '' ? status.value : null,
        sort_by: sortBy.value || null,
        sort: sortOrder.value || null
    })
}

/* ---------------- ROUTE SYNC ---------------- */
const syncRoute = async () => {
    const query = {}

    if (search.value) query.search = search.value

    if (status.value !== '') {
        query.is_active = status.value
    }

    const safeSort = sanitizeSortBy(sortBy.value)
    if (safeSort) query.sort_by = safeSort
    else sortBy.value = ''

    if (sortOrder.value) query.sort = sortOrder.value

    if (currentPage.value > 1) query.page = currentPage.value

    await router.push({ path: route.path, query })
}

/* ---------------- FILTER ACTIONS ---------------- */
const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}

const setStatus = (value) => {
    status.value = value
    applyFilters()
}

const searchArtist = () => applyFilters()

/* ---------------- PAGINATION ---------------- */
const changePage = async (page) => {
    const total = totalPages.value

    if (page < 1 || page > total) return

    currentPage.value = page
    await syncRoute()
}
/* ---------------- DROPDOWNS ---------------- */
const initSortDropdowns = async () => {
    await nextTick()

    $('.sort-field').dropdown('destroy')
    $('.sort-order-dropdown').dropdown('destroy')

    $('.sort-field').dropdown({
        onChange(value) {
            if (isUpdating) return

            const safe = sanitizeSortBy(value)
            if (!safe) return

            sortBy.value = safe
            syncRoute()
        }
    })

    $('.sort-order-dropdown').dropdown({
        onChange(value) {
            if (isUpdating) return

            sortOrder.value = value

            // 👇 FORCE UI LABEL UPDATE
            $('.sort-order-dropdown .default.text')
                .text(value === 'asc'
                    ? 'Ascending'
                    : value === 'desc'
                        ? 'Descending'
                        : 'Sort order'
                )

            syncRoute()
        }
    })
}
const clearSortField = async () => {
    sortBy.value = ''

    isUpdating = true

    // reset semantic UI dropdown completely
    const $dd = $('.sort-field')
    $dd.dropdown('clear')

    // force UI label reset
    $('.sort-field .default.text').text('Sort field')

    isUpdating = false

    await syncRoute()
}
const clearSortOrder = async () => {
    sortOrder.value = ''

    isUpdating = true

    const $dd = $('.sort-order-dropdown')
    $dd.dropdown('clear')

    $('.sort-order-dropdown .default.text').text('Sort order')

    isUpdating = false

    await syncRoute()
}
const initActionDropdowns = async () => {
    await nextTick()

    $('.action-dropdown').dropdown({
        on: 'click',
        action: 'hide'
    })
}

/* ---------------- MODAL ---------------- */
const openConfirmModal = (type, artist) => {
    modal.value.artist = artist

    if (type === 'toggle') {
        modal.value.title = artist.is_active
            ? 'Deactivate Artist'
            : 'Activate Artist'

        modal.value.message = `Are you sure you want to ${artist.is_active ? 'deactivate' : 'activate'
            } ${artist.stage_name}?`

        modal.value.action = 'toggle'
    }

    if (type === 'delete') {
        modal.value.title = 'Delete Artist'
        modal.value.message = `This action cannot be undone for ${artist.name}`
        modal.value.action = 'delete'
    }

    if (!bootstrapModal.value) {
        bootstrapModal.value = new bootstrap.Modal(
            document.getElementById('confirmModal')
        )
    }

    bootstrapModal.value.show()
}

const confirmAction = async () => {
    const artist = modal.value.artist
    const token = localStorage.getItem('auth_token')

    try {
        if (modal.value.action === 'toggle') {
            if (artist.is_active) {
                await artistStore.deactivateArtist(artist.id, token)
            } else {
                await artistStore.activateArtist(artist.id, token)
            }

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: artist.is_active
                    ? 'Artist deactivated'
                    : 'Artist activated',
                life: 2000
            })
        }

        if (modal.value.action === 'delete') {
            await artistStore.deleteArtist(artist.id, token)

            toast.add({
                severity: 'success',
                summary: 'Deleted',
                detail: 'Artist deleted successfully',
                life: 2000
            })
        }

        bootstrapModal.value.hide()

        await loadArtists()
        await nextTick()

        await initActionDropdowns()

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.response?.data?.message || 'Something went wrong',
            life: 3000
        })
    }
}

const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
const totalPages = computed(() => {
    return artistStore.paginate?.totalPage || 1
})
const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value

    const maxVisible = 5
    let start = Math.max(current - 2, 1)
    let end = start + maxVisible - 1

    if (end > total) {
        end = total
        start = Math.max(end - maxVisible + 1, 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})
/* ---------------- WATCH ROUTE ---------------- */
watch(() => route.query, async (query) => {
    isUpdating = true

    currentPage.value = Number(query.page) || 1
    search.value = query.search || ''
    status.value = query.is_active || ''
    sortBy.value = sanitizeSortBy(query.sort_by)
    sortOrder.value = query.sort || ''

    await artistStore.getArtists(localStorage.getItem('auth_token'), {
        page: currentPage.value,
        search: search.value,
        is_active: status.value !== '' ? status.value : null,
        sort_by: sortBy.value,
        sort: sortOrder.value
    })

    await nextTick()

    await initSortDropdowns()
    await initActionDropdowns()

    isUpdating = false
}, { immediate: true })

/* ---------------- INIT ---------------- */
onMounted(async () => {
    await loadArtists()
    await initSortDropdowns()
    await initActionDropdowns()
})
</script>