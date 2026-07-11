<template>
    <div class="container user-management table-pro-list artist">
        <div class="table-content mt-0">

            <!-- HEADER -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Song Management</div>
                    <span class="small-detail">
                        Manage songs and their availability in one place.
                    </span>
                </div>

                <div>
                    <router-link to="songs/create" class="btn btn-official btn-color">
                        <CircleFadingPlus :size="20" :stroke-width="1.75" style="stroke: white; margin-right: 7px;" />
                        Create new song
                    </router-link>
                </div>
            </div>

            <!-- FILTER BAR -->
            <div class="mt-4 d-flex justify-content-between align-items-center w-100">

                <!-- LEFT: STATUS -->
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
                    <form @submit.prevent="searchSong" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" :stroke-width="1.75" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" placeholder="Search song">
                        </div>
                    </form>

                    <!-- SORT FIELD -->
                    <div class="ui dropdown ms-3 sort-field">
                        <input type="hidden">

                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" />
                            <span class="default text">{{ sortByLabel || 'Sort field' }}</span>
                            <X v-if="hasCustomSortBy" @click.stop="clearSortField" :size="16" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="title">Title</div>
                            <div class="item" data-value="created_at">Created at</div>
                            <div class="item" data-value="release_date">Release date</div>
                        </div>
                    </div>

                    <!-- SORT ORDER -->
                    <div class="ui dropdown ms-3 sort-order-dropdown">
                        <input type="hidden">

                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ArrowUpDown :size="16" />
                            <span class="default text">{{ sortOrderLabel || 'Sort order' }}</span>
                            <X v-if="hasCustomSortOrder" @click.stop="clearSortOrder" :size="16" />
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

                    <div style="width: 35%;">Song</div>
                    <div style="width: 15%;">Artist</div>
                    <div style="width: 15%;">Category</div>
                    <div style="width: 15%;">Release</div>
                    <div style="width: 15%;">Status</div>
                    <div style="width: 5%;"></div>

                </div>
            </div>

            <!-- TABLE BODY -->
            <div class="wrapper-list">
                <div class="list-user w-100" v-for="song in songStore.songs" :key="song.id">

                    <!-- SONG -->
                    <div style="width:35%" class="d-flex align-items-center overflow-hidden">
                        <img :src="song.thumbnail_url" class="user-avatar" />
                        <div style="width: calc(100% - 70px);">
                            <div class="main-val">{{ song.title }}</div>
                            <span class="small-val">{{ song.slug }}</span>
                        </div>
                    </div>

                    <!-- ARTIST -->
                    <div style="width:15%">
                        {{ song.artist?.stage_name || 'N/A' }}
                    </div>

                    <!-- CATEGORY -->
                    <div style="width:15%">
                        {{ song.category?.name || 'N/A' }}
                    </div>

                    <!-- RELEASE -->
                    <div style="width:15%">
                        {{ formatDateTime(song.release_date) }}
                    </div>

                    <!-- STATUS -->
                    <div style="width:15%">
                        <div class="status" :class="song.is_active ? 'activated' : 'deactivated'" style="width: fit-content!important;">
                            <div class="circle"></div>
                            <span>
                                {{ song.is_active ? 'Activated' : 'Deactivated' }}
                            </span>
                        </div>
                    </div>

                    <!-- ACTION -->
                    <div style="width:5%" class="d-flex justify-content-center">
                        <div class="ui dropdown action-dropdown move-left-dropdown">
                            <input type="hidden">
                            <div class="wrapper">
                                <Ellipsis :size="16" />
                            </div>

                            <div class="menu filter">
                                
                                <div class="item" @click="goToPreview(song.slug)">Preview information</div>
                                    <!-- Preview information
                                </div> -->

                                <div class="item" @click="openConfirmModal('toggle', song)">
                                    {{ song.is_active ? 'Deactivate' : 'Activate' }}
                                </div>

                                <div class="item" @click="openConfirmModal('delete', song)">
                                    Delete
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <!-- EMPTY -->
            <div v-if="songStore.songs?.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" />
                <span>No songs found</span>
            </div>
            <div class="pagination-wrapper mt-4 d-flex justify-content-center align-items-center" v-if="totalPages > 1">

                <!-- Prev -->
                <button class="btn-page" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                    <ChevronLeft :size="17" :stroke-width="1.75" />
                </button>

                <!-- First -->
                <button v-if="visiblePages[0] > 1" class="btn-page" @click="changePage(1)">
                    1
                </button>

                <span v-if="visiblePages[0] > 2" class="mx-1">...</span>

                <!-- Middle -->
                <button v-for="page in visiblePages" :key="page" class="btn-page"
                    :class="{ active: page === currentPage }" @click="changePage(page)">
                    {{ page }}
                </button>

                <!-- Last -->
                <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="mx-1">...</span>

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

    <!-- CONFIRM MODAL -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
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
                    <button class="btn btn-light" data-bs-dismiss="modal">
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SongManagementStore } from '@/stores/SongManagementStore'
import * as bootstrap from 'bootstrap'
import { useToast } from 'primevue/usetoast'
import $ from 'jquery'
import { nextTick } from 'vue'
const songStore = SongManagementStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const defaultSortBy = 'id'
const defaultSortOrder = 'desc'
const hasCustomSortBy = computed(() => sortBy.value !== defaultSortBy)
const hasCustomSortOrder = computed(() => sortOrder.value !== defaultSortOrder)
/* STATE */

const goToPreview = (slug) => {
    router.push(`/songs/preview/${slug}`)
}
const status = ref('')
const search = ref('')
const sortBy = ref('id')
const sortOrder = ref('desc')
const currentPage = ref(1)
const clearSortField = () => {
    sortBy.value = defaultSortBy
    applyFilters()
}
const clearSortOrder = () => {
    sortOrder.value = defaultSortOrder
    applyFilters()
}
const sortByLabel = computed(() => {
    if (sortBy.value === 'title') return 'Title'
    if (sortBy.value === 'created_at') return 'Created at'
    if (sortBy.value === 'release_date') return 'Release date'
    return 'Sort field'
})

const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return 'Sort order'
})
/* MODAL */
let modalInstance = null

const modal = ref({
    title: '',
    message: '',
    action: null,
    song: null
})

/* VALIDATION */
const allowedSort = ['id', 'title', 'created_at', 'release_date']
const allowedOrder = ['asc', 'desc']

/* FETCH */
const loadSongs = async () => {
    await songStore.fetchSongs({
        page: currentPage.value,
        search: search.value || null,
        is_active: status.value !== '' ? status.value : null,
        sort_by: sortBy.value,
        sort: sortOrder.value
    })
}

/* FILTER */
const setStatus = (val) => {
    status.value = val
    applyFilters()
}

const searchSong = () => applyFilters()

const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}

/* SORT */
const setSortBy = (val) => {
    if (!allowedSort.includes(val)) return
    sortBy.value = val
    applyFilters()
}

const setSortOrder = (val) => {
    if (!allowedOrder.includes(val)) return
    sortOrder.value = val
    applyFilters()
}

/* ROUTE SYNC */
const syncRoute = async () => {
    const query = {}

    if (search.value) query.search = search.value
    if (status.value !== '') query.is_active = status.value
    if (sortBy.value !== 'id') query.sort_by = sortBy.value
    if (sortOrder.value !== 'desc') query.sort = sortOrder.value
    if (currentPage.value > 1) query.page = currentPage.value

    await router.push({ path: route.path, query })
}

/* PAGINATION */
const changePage = async (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
    await syncRoute()
}

/* MODAL */
const openConfirmModal = (type, song) => {
    modal.value.song = song

    if (type === 'toggle') {
        modal.value.title = song.is_active ? 'Deactivate Song' : 'Activate Song'
        modal.value.message = 'Are you sure you want to continue?'
        modal.value.action = 'toggle'
    }

    if (type === 'delete') {
        modal.value.title = 'Delete Song'
        modal.value.message = 'This action cannot be undone'
        modal.value.action = 'delete'
    }

    if (!modalInstance) {
        modalInstance = new bootstrap.Modal(
            document.getElementById('confirmModal')
        )
    }

    modalInstance.show()
}

const totalPages = computed(() => songStore.paginate?.totalPage || 1)

const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const delta = 2
    const range = []

    const start = Math.max(2, current - delta)
    const end = Math.min(total - 1, current + delta)

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    return range
})

const initDropdowns = async () => {
    await nextTick()

    $('.ui.dropdown').dropdown('destroy')

    // SORT FIELD
    $('.sort-field').dropdown({
        onChange: function (value) {
            sortBy.value = value
            applyFilters()
        }
    })

    // SORT ORDER
    $('.sort-order-dropdown').dropdown({
        onChange: function (value) {
            sortOrder.value = value
            applyFilters()
        }
    })
    $('.action-dropdown').dropdown()
}
const confirmAction = async () => {
    try {
        if (modal.value.action === 'delete') {
            await songStore.deleteSong(modal.value.song.id)
        }

        if (modal.value.action === 'toggle') {
            await songStore.toggleSongStatus(modal.value.song.id)
        }

        modalInstance.hide()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Action completed',
            life: 2000
        })

        await loadSongs()

    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000
        })
    }
}

/* FORMAT */
const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

/* WATCH ROUTE */
watch(
    () => route.query,
    async (q) => {
        currentPage.value = Number(q.page) || 1
        search.value = q.search || ''
        status.value = q.is_active || ''
        sortBy.value = allowedSort.includes(q.sort_by) ? q.sort_by : 'id'
        sortOrder.value = allowedOrder.includes(q.sort) ? q.sort : 'desc'

        await loadSongs()
        await initDropdowns()
    },
    { immediate: true }
)

/* INIT */
onMounted(async () => {
    await loadSongs()
    await initDropdowns()
})
</script>