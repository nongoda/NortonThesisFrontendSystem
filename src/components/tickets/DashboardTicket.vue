<template>
    <div class="container user-management ticket-management table-pro-list">
        <div class="table-content mt-0">

            <!-- HEADER -->
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Ticket Management</div>
                    <span class="small-detail">
                        Manage tickets, track status, and review event participation.
                    </span>
                </div>
            </div>

            <!-- FILTER BAR -->
            <div class="mt-4 d-flex justify-content-between align-items-center w-100">

                <!-- LEFT FILTERS -->
                <div class="d-flex align-items-center">

                    <!-- FILTER TABS -->
                    <ul class="view-type d-inline-flex mb-0">

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: eventStatus === '' }"
                                @click="setFilter('')">
                                All
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: eventStatus === 'upcoming' }"
                                @click="setFilter('upcoming')">
                                Upcoming
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: eventStatus === 'ongoing' }"
                                @click="setFilter('ongoing')">
                                Ongoing
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: eventStatus === 'completed' }"
                                @click="setFilter('completed')">
                                Completed
                            </button>
                        </li>

                    </ul>

                    <!-- STATUS DROPDOWN -->
                    <div class="ui dropdown ms-3 status-filter">
                        <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                            <Filter :size="16" />
                            <span class="default text">{{ statusLabel || 'Status' }}</span>
                            <X v-if="status" @click.stop="clearStatus" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">
                            <div class="item" data-value="">All</div>
                            <div class="item" data-value="valid">Valid</div>
                            <div class="item" data-value="redeemed">Redeemed</div>
                            <div class="item" data-value="expired">Expired</div>
                            <div class="item" data-value="cancelled">Cancelled</div>
                        </div>
                    </div>

                </div>

                <!-- RIGHT FILTERS -->
                <div class="d-flex align-items-center">

                    <!-- SEARCH -->
                    <form @submit.prevent="applyFilters" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" placeholder="Search tickets">
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
                            <div class="item" data-value="ticket_code">Ticket Code</div>
                            <div class="item" data-value="checked_in_at">Checked In At</div>
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

                    <div style="width: 30%;">
                        <div class="main-val">Ticket</div>
                    </div>

                    <div style="width: 20%;">
                        <div class="main-val">User</div>
                    </div>

                    <div style="width: 20%;">
                        <div class="main-val">Event</div>
                    </div>

                    <div style="width: 10%;">
                        <div class="main-val">Status</div>
                    </div>

                    <div style="width: 15%;">
                        <div class="main-val">Checked In</div>
                    </div>

                    <div style="width: 5%;"></div>

                </div>
            </div>

            <!-- TABLE BODY -->
            <div class="wrapper-list">

                <div class="list-user w-100" v-for="ticket in ticketStore.tickets" :key="ticket?.id">

                    <!-- TICKET CODE -->
                    <div style="width:30%" class="d-flex align-items-center">
                        <div style="width: calc(100% - 20px);">
                            <div class="main-val">{{ ticket?.ticket_code }}</div>
                            <span class="small-val">{{ ticket?.ticket_price?.ticket_type }}</span>
                        </div>
                    </div>

                    <!-- USER -->
                    <div style="width:20%" class="d-flex align-items-center">
                        <div>
                            <div class="main-val">{{ ticket?.order?.user?.name }}</div>
                            <span class="small-val">{{ ticket?.order?.user?.email }}</span>
                        </div>
                    </div>

                    <!-- EVENT -->
                    <div style="width:20%" class="d-flex align-items-center">
                        <div class="w-100">
                            <div class="main-val">{{ ticket?.event?.title }}</div>
                            <span class="small-val">{{ ticket?.event?.venue_name }}</span>
                        </div>
                    </div>

                    <!-- STATUS -->
                    <div style="width:10%" class="d-flex align-items-center">
                        <div class="status" :class="ticket?.status">
                            <div class="circle"></div>
                            <span>{{ formatStatus(ticket?.status) }}</span>
                        </div>
                    </div>

                    <!-- CHECK IN -->
                    <div style="width:15%" class="d-flex align-items-center">
                        {{ ticket?.checked_in_at ? formatDate(ticket.checked_in_at) : 'Not checked' }}
                    </div>

                    <!-- ACTION -->
                    <div style="width:5%" class="d-flex justify-content-center">
                        <div class="ui dropdown sort-field">
                            <div class="wrapper">
                                <Ellipsis :size="16" />
                            </div>
                           <div class="menu filter">
                                <div class="item" @click.stop="openPreview(ticket)">
                                    Preview
                                </div>

                                <div v-if="ticket.status === 'valid'" class="item text-success"
                                    @click.stop="markRedeemed(ticket)">
                                    Mark Redeemed
                                </div>
                            </div>
                            <!-- <div class="menu filter">
                                <div class="item" @click.stop="openPreview(ticket)">
                                    Preview
                                </div>
                                <div class="item text-danger" @click.stop="openDelete(ticket)">
                                    Delete
                                </div>
                            </div> -->
                        </div>
                    </div>

                </div>
            </div>
            <!-- PAGINATION -->
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
            <div v-if="ticketStore.tickets.length === 0" class="no-data-wrapper">
                <img src="../../assets/images/file.png" alt="">
                <span>No tickets found</span>
                <span class="sh-desc">
                    Try changing filters or search criteria.
                </span>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TicketManagementStore } from '@/stores/TicketManagementStore'
import * as bootstrap from 'bootstrap'
import $ from 'jquery'
import { useToast } from 'primevue/usetoast'
import { minValue } from '@vuelidate/validators';

const toast = useToast()
const ticketStore = TicketManagementStore()
const route = useRoute()
const router = useRouter()

/* ================= STATE ================= */
const search = ref('')
const eventStatus = ref('') // all / upcoming / ongoing / completed
const status = ref('')
const sortField = ref('')
const sortOrder = ref('')
const currentPage = ref(1)

const selectedTicket = ref(null)
const deleteTarget = ref(null)

/* ================= FLAGS ================= */
let isUpdating = false

/* ================= MODALS ================= */
let deleteModal = null

/* ================= HELPERS ================= */
const showToast = (severity, summary, detail) => {
    toast.add({
        severity,
        summary,
        detail,
        life: 2500,
    })
}

// ==================ROUTE CONTROLLABLE================
const allowedEventStatus = ['all', 'upcoming', 'ongoing', 'completed']
const allowedStatus = ['valid', 'redeemed', 'expired', 'cancelled']

const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const formatStatus = (value) => {
    if (!value) return 'N/A'
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/* ================= LABELS ================= */
const sortFieldLabel = computed(() => {
    if (sortField.value === 'ticket_code') return 'Ticket Code'
    if (sortField.value === 'checked_in_at') return 'Checked In At'
    return ''
})

const sortOrderLabel = computed(() => {
    if (sortOrder.value === 'asc') return 'Ascending'
    if (sortOrder.value === 'desc') return 'Descending'
    return ''
})

const statusLabel = computed(() => {
    if (status.value === 'valid') return 'Valid'
    if (status.value === 'redeemed') return 'Redeemed'
    if (status.value === 'expired') return 'Expired'
    if (status.value === 'cancelled') return 'Cancelled'
    return ''
})

const setFilter = (val) => {
    eventStatus.value = val
    currentPage.value = 1
    syncRoute()
}

const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}

const clearStatus = async () => {
    status.value = ''
    isUpdating = true
    $('.status-filter').dropdown('clear')
    isUpdating = false
    await syncRoute()
}

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

/* ================= PAGINATION ================= */
const totalPages = computed(() => {
    return Number(ticketStore.paginate?.totalPage) || 1
})
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

/* ================= ROUTE SYNC ================= */
const syncRoute = async () => {
  const query = {}

  if (search.value) query.search = search.value

  if (allowedEventStatus.includes(eventStatus.value)) {
    query.event_status = eventStatus.value
  }

  if (allowedStatus.includes(status.value)) {
    query.status = status.value
  }

  if (sortField.value) query.sort_by = sortField.value
  if (sortOrder.value) query.sort = sortOrder.value
  if (currentPage.value > 1) query.page = currentPage.value

  await router.push({ path: route.path, query })
}
/* ================= FETCH ================= */
const loadTickets = async () => {
    await ticketStore.fetchTickets({
        page: currentPage.value,
        search: search.value,
        event_status: eventStatus.value,
        status: status.value,
        sort_by: sortField.value,
        sort: sortOrder.value,
    })
}

/* ================= PREVIEW ================= */
const openPreview = (ticket) => {
    selectedTicket.value = ticket
    $('.ui.dropdown').dropdown('hide')

    // no offcanvas anymore → you can navigate or just store state
    router.push(`/tickets/${ticket.ticket_code}`)
}

const fetchTickets = async () => {
  await ticketStore.fetchTickets({
    page: currentPage.value,
    search: search.value,
    event_status: eventStatus.value,
    status: status.value,
    sort_by: sortField.value,
    sort: sortOrder.value,
  })
}
/* ================= MARK REDEEMED ================= */
const markRedeemed = async (ticket) => {
    try {
        const res = await ticketStore.updateTicketStatus(ticket.id, 'redeemed')

        if (!res.result) {
            showToast('error', 'Error', res.message)
            return
        }

        showToast('success', 'Updated', res.message)

        await fetchTickets()
    } catch (err) {
        showToast(
            'error',
            'Error',
            err.response?.data?.message || 'Failed to update ticket'
        )
    }
}
/* ================= DELETE ================= */
const openDelete = (ticket) => {
    deleteTarget.value = ticket
    $('.ui.dropdown').dropdown('hide')

    if (!deleteModal) {
        deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
    }

    deleteModal.show()
}

const confirmDelete = async () => {
    try {
        // assume you have delete API later
        deleteModal.hide()
        showToast('success', 'Deleted', 'Ticket removed')
        await loadTickets()
    } catch (err) {
        showToast('error', 'Error', 'Failed to delete ticket')
    }
}

/* ================= DROPDOWNS ================= */
const initDropdowns = async () => {
    await nextTick()

    $('.ui.dropdown').dropdown({
        onChange(value) {
            if (isUpdating) return
        },
    })

    $('.sort-field').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortField.value = value
            syncRoute()
        },
    })

    $('.sort-order').dropdown({
        onChange(value) {
            if (isUpdating) return
            sortOrder.value = value
            syncRoute()
        },
    })

    $('.status-filter').dropdown({
        onChange(value) {
            if (isUpdating) return

            status.value = value   // ✅ CORRECT
            currentPage.value = 1
            syncRoute()
        },
    })
}

/* ================= WATCH ROUTE ================= */
watch(
  () => route.query,
  async (q) => {
    currentPage.value = Number(q.page) || 1
    search.value = q.search || ''

    const rawEventStatus = q.event_status
    const rawStatus = q.status

    const cleanEventStatus = allowedEventStatus.includes(rawEventStatus)
      ? rawEventStatus
      : ''

    const cleanStatus = allowedStatus.includes(rawStatus)
      ? rawStatus
      : ''

    eventStatus.value = cleanEventStatus
    status.value = cleanStatus

    sortField.value = q.sort_by || ''
    sortOrder.value = q.sort || ''

    // 🔥 FIX DIRTY URL
    const needsFix =
      rawEventStatus !== cleanEventStatus ||
      rawStatus !== cleanStatus

    if (needsFix) {
      await router.replace({
        path: route.path,
        query: {
          ...q,
          event_status: cleanEventStatus || undefined,
          status: cleanStatus || undefined,
        },
      })
    }

    await fetchTickets()
    await nextTick()
    initDropdowns()
  },
  { immediate: true }
)
/* ================= INIT ================= */
onMounted(async () => {
    await fetchTickets()
    await initDropdowns()
})
</script>