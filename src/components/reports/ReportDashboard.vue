<template>
    <div class="container user-management table-pro-list">
        <div class="table-content mt-0">

            <!-- HEADER -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Contact Report Management</div>
                    <span class="small-detail">
                        Manage contact reports and review user submissions in one place.
                    </span>
                </div>
            </div>
            <!-- FILTER BAR -->
            <div class="mt-4 d-flex justify-content-between align-items-center w-100">

                <!-- LEFT: SUBJECT + STATUS -->
                <div class="d-flex align-items-center">

                    <!-- SUBJECT TABS -->
                    <ul class="view-type d-inline-flex mb-0">

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: subject === '' }" @click="setSubject('')">
                                All
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: subject === 'contact_us' }"
                                @click="setSubject('contact_us')">
                                Contact Us
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: subject === 'event_issue' }"
                                @click="setSubject('event_issue')">
                                Event Issue
                            </button>
                        </li>

                    </ul>

                    <!-- STATUS DROPDOWN (NEW) -->
                    <div class="ui dropdown ms-3 status-filter">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <Filter :size="16" />
                            <span class="default text">{{ statusLabel || 'Status' }}</span>
                            <X v-if="status" @click.stop="clearStatus" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="">All</div>
                            <div class="item" data-value="pending">Pending</div>
                            <div class="item" data-value="in_progress">In progress</div>
                            <div class="item" data-value="resolved">Resolved</div>
                        </div>
                    </div>

                </div>

                <!-- RIGHT SIDE -->
                <div class="d-flex align-items-center">

                    <!-- SEARCH -->
                    <form @submit.prevent="applyFilters" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" placeholder="Search reports">
                        </div>
                    </form>

                    <!-- SORT FIELD -->
                    <div class="ui dropdown ms-3 sort-field">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <ListFilter :size="16" />
                            <span class="default text">{{ sortFieldLabel || 'Sort field' }}</span>
                            <X v-if="sortField" @click.stop="clearSortField" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="name">Name</div>
                            <div class="item" data-value="email">Email</div>
                            <div class="item" data-value="created_at">Created At</div>
                        </div>
                    </div>

                    <!-- SORT ORDER -->
                    <div class="ui dropdown ms-3 sort-order">
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

                    <div style="width: 20%;">
                        <div class="main-val">Name</div>
                    </div>

                    <div style="width: 15%;">
                        <div class="main-val">Created</div>
                    </div>

                    <div style="width: 40%;">
                        <div class="main-val">Message</div>
                    </div>

                    <div style="width: 15%;">
                        <div class="main-val">Status</div>
                    </div>

                    <div style="width: 5%;"></div>

                </div>
            </div>

            <!-- TABLE BODY -->
            <div class="wrapper-list">

                <div class="list-user w-100" v-for="report in reportStore.reports" :key="report?.id">

                    <div style="width:20%" class="d-flex align-items-center">
                        <div>
                            <div class="main-val">{{ report?.name }}</div>
                            <span class="small-val">{{ report?.email || 'N/A' }}</span>
                        </div>
                    </div>

                    <div style="width:15%" class="d-flex align-items-center">
                        {{ formatDate(report?.created_at) }}
                    </div>

                    <div style="width:40%; padding-right: 15px;" class="d-flex align-items-center">
                        {{ report?.message }}
                    </div>
                    <div style="width:15%" class="d-flex align-items-center">
                        <div class="status" :class="report?.status">
                            <div class="circle"></div>
                            <span>
                                {{ formatStatus(report?.status) }}
                            </span>
                        </div>
                    </div>

                    <!-- ACTIONS -->
                    <div style="width:5%" class="d-flex justify-content-center report">
                        <div class="ui dropdown sort-field">
                            <div class="wrapper">
                                <Ellipsis :size="16" />
                            </div>
                            <div class="menu filter">
                                <div class="item" @click.stop="openPreview(report)">
                                    Preview
                                </div>

                                <div class="item text-danger" @click.stop="openDelete(report)">
                                    Delete
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="pagination-wrapper mt-4 d-flex justify-content-center align-items-center" v-if="totalPages > 1">

                <!-- Prev -->
                <button class="btn-page" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                    <ChevronLeft :size="17" />
                </button>

                <!-- First -->
                <button v-if="visiblePages[0] > 1" class="btn-page" @click="changePage(1)">
                    1
                </button>

                <span v-if="visiblePages[0] > 2" class="mx-1">...</span>

                <!-- Pages -->
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
                    <ChevronRight :size="16" />
                </button>

            </div>
            <!-- EMPTY -->
            <div v-if="reportStore.reports.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" alt="">
                <span>No reports found</span>
                <span class="sh-desc">
                    Try changing filters or search criteria.
                </span>
            </div>

        </div>
    </div>

    <!-- ================= OFFCANVAS PREVIEW ================= -->
    <div class="offcanvas offcanvas-end report" style="--bs-offcanvas-width: 500px;" tabindex="-1" id="reportPreview">
        <div class="offcanvas-header d-flex justify-content-between align-items-center">
            <h5 class="title-off">Report Preview</h5>
            <!-- <button class="btn-official btn-color" style="padding-inline: 10px!important; font-size: 14px!important;"><MousePointerClick :size="20" color="#fff" style="margin-right: 5px;" :stroke-width="1.75" /> Start progress</button> -->
            <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button> -->
        </div>

        <div class="offcanvas-body pt-0" v-if="selectedReport">

            <p><b>Name:</b> {{ selectedReport.name }}</p>
            <p><b>Email:</b> {{ selectedReport.email }}</p>
            <p><b>Phone:</b> {{ selectedReport.phone || 'N/A' }}</p>
            <p><b>Subject:</b> {{ subjectLabel(selectedReport.subject) }}</p>

            <hr>

            <p><b>Message:</b></p>
            <p class="text-muted">{{ selectedReport.message }}</p>

        </div>
        <div class="offcanvas-bottom">
            <button v-if="isPending(selectedReport?.status)" class="btn-official btn-color w-100"
                @click="startProgress(selectedReport)">
                <MousePointerClick :size="22" color="#fff" />
                Start Progress
            </button>
            <button v-if="isInProgress(selectedReport?.status)" class="btn-official btn-color w-100"
                @click="resolveIssue(selectedReport)">
                <MousePointerClick :size="22" color="#fff" />
                Resolve Issue
            </button>

        </div>
    </div>

    <!-- ================= DELETE MODAL ================= -->
    <div class="modal fade" id="deleteModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Delete Report</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    Are you sure you want to delete this report?
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-danger" @click="confirmDelete">Delete</button>
                </div>

            </div>
        </div>
    </div>

</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ReportManagementStore } from '@/stores/ReportManagementStore'
import * as bootstrap from 'bootstrap'
import $ from 'jquery'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const reportStore = ReportManagementStore()
const route = useRoute()
const router = useRouter()

/* ================= STATE ================= */
const search = ref('')
const subject = ref('')
const status = ref('')
const sortField = ref('')
const sortOrder = ref('')
const currentPage = ref(1)

const selectedReport = ref(null)
const deleteTarget = ref(null)

/* ================= FLAGS ================= */
let isUpdating = false

/* ================= MODALS ================= */
let previewCanvas = null
let deleteModal = null

/* ================= HELPERS ================= */
const subjectLabel = (value) => {
    return {
        contact_us: 'Contact Us',
        event_issue: 'Event Issue'
    }[value] || 'N/A'
}
const showToast = (severity, summary, detail) => {
    toast.add({
        severity, // success | info | warn | error
        summary,
        detail,
        life: 2500
    })
}

const formatStatus = (value) => {
    if (!value) return 'N/A'
    return value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')
}

const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const getStatusClass = (value) => {
    return ['pending', 'in_progress', 'resolved'].includes(value)
        ? value
        : 'unknown'
}

/* ================= STATUS HELPERS ================= */
const isPending = (s) => s === 'pending'
const isInProgress = (s) => s === 'in_progress'
const isResolved = (s) => s === 'resolved'

/* ================= TOAST ================= */

/* ================= PAGINATION ================= */
const totalPages = computed(() => reportStore.paginate.totalPage || 1)
const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    let start = Math.max(current - 2, 1)
    let end = Math.min(current + 2, total)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

const changePage = async (page) => {
    if (page < 1 || page > totalPages.value) return

    currentPage.value = page
    await syncRoute()
}
/* ================= FILTER ACTIONS ================= */
const setSubject = (val) => {
    subject.value = val
    applyFilters()
}

const setStatus = (val) => {
    status.value = val
    applyFilters()
}

const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}
const sortFieldLabel = computed(() => {
    if (sortField.value === 'name') return 'Name'
    if (sortField.value === 'email') return 'Email'
    if (sortField.value === 'created_at') return 'Created At'
    return ''
})

const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return ''
})
/* ================= ROUTE SYNC ================= */
const syncRoute = async () => {
    const query = {}

    if (search.value) query.search = search.value
    if (subject.value) query.subject = subject.value
    if (status.value) query.status = status.value
    if (sortField.value) query.sort_by = sortField.value
    if (sortOrder.value) query.sort = sortOrder.value
    if (currentPage.value > 1) query.page = currentPage.value

    await router.push({ path: route.path, query })
}

/* ================= FETCH ================= */
const loadReports = async () => {
    await reportStore.fetchReports({
        page: currentPage.value,
        search: search.value,
        subject: subject.value,
        status: status.value,
        sort_by: sortField.value,
        sort: sortOrder.value
    })
}

/* ================= STATUS UPDATE ================= */
const startProgress = async (report) => {
    try {
        await reportStore.updateStatus(report.id, 'in_progress')

        // update local UI instantly
        selectedReport.value.status = 'in_progress'

        showToast('success', 'Updated', 'Moved to In Progress')

        // OPTIONAL: close offcanvas
        previewCanvas?.hide()

        // refresh list so table also updates
        await loadReports()

    } catch (err) {
        showToast('error', 'Error', 'Failed to update status')
    }
}

const resolveIssue = async (report) => {
    try {
        await reportStore.updateStatus(report.id, 'resolved')

        selectedReport.value.status = 'resolved'

        showToast('success', 'Updated', 'Marked as Resolved')

        // OPTIONAL: close offcanvas
        previewCanvas?.hide()

        await loadReports()

    } catch (err) {
        showToast('error', 'Error', 'Failed to resolve issue')
    }
}
/* ================= PREVIEW ================= */
const openPreview = async (report) => {
    selectedReport.value = report

    // close dropdown instantly
    $('.ui.dropdown').dropdown('hide')

    if (!previewCanvas) {
        previewCanvas = new bootstrap.Offcanvas(
            document.getElementById('reportPreview')
        )
    }

    previewCanvas.show()
}

/* ================= DELETE ================= */
const openDelete = (report) => {
    deleteTarget.value = report

    $('.ui.dropdown').dropdown('hide')

    if (!deleteModal) {
        deleteModal = new bootstrap.Modal(
            document.getElementById('deleteModal')
        )
    }

    deleteModal.show()
}

const confirmDelete = async () => {
    try {
        await reportStore.deleteReport(deleteTarget.value.id)

        deleteModal.hide()
        await loadReports()

        showToast('success', 'Deleted', 'Report removed successfully')
    } catch (err) {
        showToast('error', 'Error', 'Failed to delete report')
        console.error(err)
    }
}
/* ================= DROPDOWNS INIT (IMPORTANT FIX) ================= */
const initDropdowns = async () => {
    await nextTick()

    $('.ui.dropdown').dropdown({
        onChange(value) {
            if (isUpdating) return
        }
    })

    $('.sort-field').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortField.value = value
            syncRoute()
        }
    })

    $('.sort-order').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortOrder.value = value
            syncRoute()
        }
    })

    $('.status-filter').dropdown({
        onChange(value) {
            if (isUpdating) return
            status.value = value
            syncRoute()
        }
    })
}
const statusLabel = computed(() => {
    if (status.value === 'pending') return 'Pending'
    if (status.value === 'resolved') return 'Resolved'
    if (status.value === 'in_progress') return 'In progress'
    return ''
})
const clearSortField = async () => {
    sortField.value = ''
    isUpdating = true
    $('.sort-field').dropdown('clear')
    isUpdating = false
    await syncRoute()
}
const clearSortOrder = async () => {
    sortOrder.value = ''
    isUpdating = true
    $('.sort-order').dropdown('clear')
    isUpdating = false
    await syncRoute()
}
/* ================= WATCH ROUTE ================= */
watch(
    () => route.query,
    async (q) => {
        currentPage.value = Number(q.page) || 1
        search.value = q.search || ''
        subject.value = q.subject || ''
        status.value = q.status || ''
        sortField.value = q.sort_by || ''
        sortOrder.value = q.sort || ''

        await reportStore.fetchReports({
            page: currentPage.value,
            search: search.value,
            subject: subject.value,
            status: status.value,
            sort_by: sortField.value,
            sort: sortOrder.value
        })

        await nextTick()
        initDropdowns()
    },
    { immediate: true }
)
const clearStatus = async () => {
    status.value = ''
    isUpdating = true
    $('.status-filter').dropdown('clear')
    isUpdating = false
    await syncRoute()
}
/* ================= INIT ================= */
onMounted(async () => {
    await reportStore.fetchReports()
    await initDropdowns()
})
</script>