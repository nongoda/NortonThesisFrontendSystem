<template>
    <div class="container event payment table-pro-list">
        <div class="row summary-total justify-content-between" style="padding-inline: 10px;">
            <div class="col-3">
                <div class="content-wrapper" v-if="summary">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Total Revenue (USD)</div>
                        <BanknoteArrowUp stroke-width="1.75" size="18" />
                    </div>

                    <span class="total-num">
                        {{ summary.overall.revenue }}
                    </span>

                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.monthly.revenue }} USD
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Total Orders</div>
                        <Shuffle :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.overall.orders }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.monthly.orders }} Orders
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Tickets Sold</div>
                        <Ticket :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.overall.ticket_sold }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.monthly.ticket_sold }} Tickets
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Active Events</div>
                        <AudioLines :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.overall.active_events }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.monthly.events_starting }} Active events
                        </span>
                    </span>
                </div>
            </div>

        </div>
        <div class="table-content">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Payment Information</div>
                    <span class="small-detail">
                        Manage tickets, track status, and review event participation.
                    </span>
                </div>
            </div>
            <!-- FILTER BAR -->
            <div class="mt-4 d-flex justify-content-between align-items-center w-100">
                <!-- LEFT FILTERS -->
                <div class="d-flex align-items-center">
                    <ul class="view-type d-inline-flex mb-0">

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: viewMode === 'event' }"
                                @click="setView('event')">
                                Event View
                            </button>
                        </li>

                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: viewMode === 'payment' }"
                                @click="setView('payment')">
                                Payment View
                            </button>
                        </li>

                    </ul>
                    <div class="ui dropdown ms-3 status-filter" :key="viewMode">
                        <div class="wrapper d-flex align-items-center" style="padding:10px 14px;">
                            <Filter :size="16" />
                            <span class="default text">
                                {{ statusLabel || 'Status' }}
                            </span>

                            <X v-if="status" @click.stop="clearStatus" :size="16" class="ms-2 cursor-pointer" />
                        </div>

                        <div class="menu filter">

                            <!-- EVENT STATUS -->
                            <template v-if="viewMode === 'event'">
                                <div class="item" data-value="">All Events</div>
                                <div class="item" data-value="upcoming">Upcoming</div>
                                <div class="item" data-value="ongoing">Ongoing</div>
                                <div class="item" data-value="completed">Completed</div>
                            </template>

                            <!-- TICKET STATUS -->
                            <template v-else>
                                <div class="item" data-value="">All Tickets</div>
                                <div class="item" data-value="valid">Valid</div>
                                <div class="item" data-value="redeemed">Redeemed</div>
                                <div class="item" data-value="expired">Expired</div>
                                <div class="item" data-value="cancelled">Cancelled</div>
                            </template>

                        </div>
                    </div>
                </div>
                <!-- RIGHT FILTERS -->
                <div class="d-flex align-items-center">

                    <!-- SEARCH -->
                    <!-- <form @submit.prevent="applyFilters" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" class="position-absolute" />
                            <input v-model="search" type="text" class="form-control" :placeholder="viewMode === 'event'
                                ? 'Search events'
                                : 'Search tickets'">
                        </div>
                    </form> -->
                    <form @submit.prevent="applyFilters" style="width: 300px">
                        <div class="input-form-search">
                            <Search :size="20" class="position-absolute" @click="applyFilters" style="cursor:pointer" />
                            <input v-model="search" type="text" class="form-control" :placeholder="viewMode === 'event'
                                ? 'Search events'
                                : 'Search tickets'">
                        </div>
                    </form>


                </div>
            </div>
            <template v-if="viewMode === 'event'">

                <!-- HEADER -->
                <div class="wrapper-list mt-4 label-title">
                    <div class="list-user w-100">

                        <div style="width: 35%;">
                            <div class="main-val">Event</div>
                        </div>

                        <div style="width: 15%;">
                            <div class="main-val">Start</div>
                        </div>

                        <div style="width: 15%;">
                            <div class="main-val">End</div>
                        </div>

                        <div style="width: 10%;">
                            <div class="main-val">Tickets</div>
                        </div>

                        <div style="width: 10%;">
                            <div class="main-val">Revenue</div>
                        </div>

                        <div style="width: 10%;">
                            <div class="main-val">Occupancy</div>
                        </div>

                        <div style="width: 5%;"></div>

                    </div>
                </div>

                <!-- BODY -->
                <div class="wrapper-list">
                    <!-- {{ eventRows }} -->
                    <div class="list-user w-100" v-for="event in eventRows" :key="event.event_id">

                        <!-- EVENT -->
                        <div style="width:35%" class="d-flex align-items-center">
                            <div>
                                <div class="main-val">{{ event.event_title }}</div>
                                <span class="small-val">{{ event.event_slug }}</span>
                            </div>
                        </div>

                        <!-- START -->
                        <div style="width:15%" class="d-flex align-items-center">
                            {{ formatDate(event.start_date) }}
                        </div>

                        <!-- END -->
                        <div style="width:15%" class="d-flex align-items-center">
                            {{ formatDate(event.end_date) }}
                        </div>

                        <!-- SOLD -->
                        <div style="width:10%" class="d-flex align-items-center">
                            {{ event.tickets_sold }}
                        </div>

                        <!-- REVENUE -->
                        <div style="width:10%" class="d-flex align-items-center">
                            ${{ event.revenue.usd.value }}
                        </div>

                        <!-- OCCUPANCY -->
                        <div style="width:10%" class="d-flex align-items-center">
                            {{ event.occupancy_rate }}%
                        </div>

                        <!-- ACTION -->
                        <div style="width:5%" class="d-flex justify-content-center">
                            <div class="ui dropdown sort-field">
                                <div class="wrapper">
                                    <Ellipsis :size="16" />
                                </div>
                                <div class="menu filter">
                                    <div class="item" @click="goToEvent('preview-event', event.event_slug)">View event</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-if="viewMode === 'event' && eventRows.length === 0" class="no-data-wrapper">
                    <img src="../../assets/images/file.png" alt="" />

                    <span>No events found</span>

                    <span class="sh-desc">
                        Try changing filters or search criteria.
                    </span>
                </div>

                <!-- PAGINATION -->
                <div class="pagination-wrapper mt-4 d-flex justify-content-center align-items-center"
                    v-if="viewMode === 'event' && totalPages > 1">
                    <!-- Prev -->
                    <button class="btn-page" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                        <ChevronLeft :size="17" />
                    </button>

                    <!-- First -->
                    <button v-if="visiblePages[0] > 1" class="btn-page" @click="changePage(1)">
                        1
                    </button>

                    <span v-if="visiblePages[0] > 2" class="mx-1">
                        ...
                    </span>

                    <!-- Middle -->
                    <button v-for="page in visiblePages" :key="page" class="btn-page"
                        :class="{ active: page === currentPage }" @click="changePage(page)">
                        {{ page }}
                    </button>

                    <!-- Last -->
                    <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="mx-1">
                        ...
                    </span>

                    <button v-if="visiblePages[visiblePages.length - 1] < totalPages" class="btn-page"
                        @click="changePage(totalPages)">
                        {{ totalPages }}
                    </button>

                    <!-- Next -->
                    <button class="btn-page" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
                        <ChevronRight :size="16" />
                    </button>
                </div>

            </template>
            <template v-else>
                <div class="wrapper-list mt-4 label-title">
                    <div class="list-user w-100">

                        <div style="width: 27%;">
                            <div class="main-val">Order</div>
                        </div>

                        <div style="width: 25%;">
                            <div class="main-val">Customer</div>
                        </div>

                        <div style="width: 18%;">
                            <div class="main-val">Event</div>
                        </div>

                        <div style="width: 10%;">
                            <div class="main-val">Amount</div>
                        </div>

                        <div style="width: 10%;">
                            <div class="main-val">Paid At</div>
                        </div>

                        <!-- <div style="width: 10%;">
                            <div class="main-val">Status</div>
                        </div> -->

                        <div style="width: 10%;"></div>

                    </div>
                </div>
                <div class="wrapper-list">

                    <div class="list-user w-100" v-for="payment in ticketRows" :key="payment.id">

                        <!-- ORDER -->
                        <div style="width:27%" class="d-flex align-items-center">
                            <div>
                                <div class="main-val">
                                    {{ payment.order.order_number }}
                                </div>

                                <span class="small-val">
                                    {{ payment.ticket_price.ticket_type }}
                                </span>
                            </div>
                        </div>

                        <!-- CUSTOMER -->
                        <div style="width:25%" class="d-flex align-items-center">

                            <img :src="payment.order.user.avatar" class="table-avatar-purchase me-2">

                            <div>
                                <div class="main-val">
                                    {{ payment.order.user.name }}
                                </div>

                                <span class="small-val">
                                    {{ payment.order.user.email }}
                                </span>
                            </div>

                        </div>

                        <!-- EVENT -->
                        <div style="width:18%" class="d-flex align-items-center">

                            <div>
                                <div class="main-val">
                                    {{ payment.event.title }}
                                </div>

                                <span class="small-val">
                                    {{ payment.event.venue_name }}
                                </span>
                            </div>

                        </div>

                        <!-- AMOUNT -->
                        <div style="width:10%" class="d-flex align-items-center">
                            ${{ payment.order.total }}
                        </div>

                        <!-- PAID -->
                        <div style="width:10%" class="d-flex align-items-center">
                            {{ formatDate(payment.order.paid_at) }}
                        </div>

                        <!-- ACTION -->
                        <div style="width:10%" class="d-flex justify-content-center">

                            <div class="ui dropdown sort-field payment-dropdown">
                                <div class="wrapper">
                                    <Ellipsis :size="16" />
                                </div>

                                <div class="menu filter">
                                    <div class="item" @click="goToEvent('preview-event', event.event_slug)">
                                        View Event
                                    </div>

                                    <div class="item" @click="goToTicket('tickets info', 'ticket_code', payment.ticket_code)">
                                        View Ticket
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div v-if="viewMode === 'payment' && ticketRows.length === 0" class="no-data-wrapper">
                    <img src="../../assets/images/file.png" />

                    <span>No payments found</span>

                    <span class="sh-desc">
                        Try changing filters or search criteria.
                    </span>
                </div>
                <div class="pagination-wrapper mt-4 d-flex justify-content-center align-items-center"
                    v-if="viewMode === 'payment' && totalPages > 1">
                    <!-- Prev -->
                    <button class="btn-page" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                        <ChevronLeft :size="17" />
                    </button>

                    <!-- First -->
                    <button v-if="visiblePages[0] > 1" class="btn-page" @click="changePage(1)">
                        1
                    </button>

                    <span v-if="visiblePages[0] > 2" class="mx-1">
                        ...
                    </span>

                    <!-- Middle -->
                    <button v-for="page in visiblePages" :key="page" class="btn-page"
                        :class="{ active: page === currentPage }" @click="changePage(page)">
                        {{ page }}
                    </button>

                    <!-- Last -->
                    <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="mx-1">
                        ...
                    </span>

                    <button v-if="visiblePages[visiblePages.length - 1] < totalPages" class="btn-page"
                        @click="changePage(totalPages)">
                        {{ totalPages }}
                    </button>

                    <!-- Next -->
                    <button class="btn-page" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
                        <ChevronRight :size="16" />
                    </button>
                </div>
            </template>

        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TicketManagementStore } from '@/stores/TicketManagementStore'

const store = TicketManagementStore()
const route = useRoute()
const router = useRouter()
const summary = ref({
    overall: {
        revenue: 0,
        orders: 0,
        ticket_sold: 0,
        active_events: 0
    },
    monthly: {
        revenue: 0,
        orders: 0,
        ticket_sold: 0,
        events_starting: 0
    }
})
// ================= STATE =================
const search = ref('')
const eventStatus = ref('')
const ticketStatus = ref('')
const viewMode = ref('event') // 'event' | 'payment'
const currentPage = ref(1)
const eventRows = ref([])
const ticketRows = ref([])
// const eventRows = ref([])
// const ticketRows = ref([])
// ================= ALLOWED VALUES =================

const allowedEventStatus = ['all', 'upcoming', 'ongoing', 'completed']
const refreshEventView = async () => {
    await loadEventView()
}
const goToEvent = (routeName, slug) => {
    $('.ui.dropdown.sort-field').dropdown('hide')
    router.push({
        name: routeName,
        params: { slug }
    })
}
const goToTicket = (routeName, paramName, value) => {
    $('.ui.dropdown.sort-field').dropdown('hide')

    router.push({
        name: routeName,
        params: {
            [paramName]: value
        }
    })
}
const exportEventSummary = () => {
    console.log("export event summary")
}

const toggleRevenueMode = () => {
    console.log("toggle revenue mode")
}

const refreshTicketView = async () => {
    await loadPaymentView()
}

const exportTickets = () => {
    console.log("export tickets")
}

const bulkCheckIn = () => {
    console.log("bulk check-in")
}
// ================= FETCH =================
const loadEventView = async () => {
    const res = await store.fetchEventSalesSummary({
        page: currentPage.value,
        search: search.value,
        event_status: eventStatus.value,
    })

    eventRows.value = res.data || []
}

const loadPaymentView = async () => {
    const res = await store.fetchTickets({
        page: currentPage.value,
        search: search.value,
        status: ticketStatus.value,
    })

    ticketRows.value = res.data || []
}

const applyFilters = async () => {
    currentPage.value = 1
    await syncRoute()
}
// ================= ROUTE SYNC =================
const syncRoute = async () => {
    const query = {}

    if (search.value) query.search = search.value

    if (viewMode.value === 'event') {
        if (allowedEventStatus.includes(eventStatus.value)) {
            query.event_status = eventStatus.value
        }
    } else {
        if (ticketStatus.value) {
            query.status = ticketStatus.value
        }
    }

    if (currentPage.value > 1) {
        query.page = currentPage.value
    }

    if (viewMode.value === 'payment') {
        query.view = 'payment'
    }

    await router.replace({   // 🔥 IMPORTANT: replace not push
        path: route.path,
        query
    })
}
// ================= VIEW SWITCH =================
const setView = async (mode) => {
    viewMode.value = mode
    currentPage.value = 1

    await syncRoute()
    await nextTick()
    await initDropdowns()
}
// ================= FETCH SWITCH =================
const fetchData = async () => {
    if (viewMode.value === 'event') {
        await loadEventView()
    } else {
        await loadPaymentView()
    }
}
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
const totalPages = computed(() => {
    return Number(store.paginate?.totalPage) || 1
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
// ================= WATCH ROUTE =================
watch(
    () => route.query,
    async (q) => {
        search.value = q.search || ''

        eventStatus.value = allowedEventStatus.includes(q.event_status)
            ? q.event_status
            : ''

        ticketStatus.value = q.status || ''

        viewMode.value = q.view === 'payment'
            ? 'payment'
            : 'event'

        currentPage.value = Number(q.page) || 1

        await fetchData()

        await nextTick()

        initDropdowns()
    },
    { immediate: true }
)

const statusLabel = computed(() => {
    const val =
        viewMode.value === 'event'
            ? eventStatus.value
            : ticketStatus.value

    const map = {
        valid: 'Valid',
        redeemed: 'Redeemed',
        expired: 'Expired',
        cancelled: 'Cancelled',
        upcoming: 'Upcoming',
        ongoing: 'Ongoing',
        completed: 'Completed',
    }

    return map[val] || ''
})
const initDropdowns = async () => {
    await nextTick()

    $('.status-filter').dropdown('destroy')
    $('.sort-field').dropdown('destroy')

    $('.status-filter').dropdown({
        onChange(value) {
            if (viewMode.value === 'event') {
                eventStatus.value = value || ''
            } else {
                ticketStatus.value = value || ''
            }

            currentPage.value = 1
            syncRoute()
        }
    })

    $('.sort-field').dropdown()
}
watch(viewMode, async () => {
    await nextTick()
    initDropdowns()
})
// ================= INIT =================
onMounted(async () => {
    await fetchData()
    await nextTick()
    initDropdowns()   // 🔥 REQUIRED
    const summaryRes = await store.fetchSummary()
    summary.value = summaryRes.data
})
</script>