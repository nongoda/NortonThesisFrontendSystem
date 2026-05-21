<template>
    <div class="container event">
        <div class="row summary-total justify-content-between" style="padding-inline: 10px;">
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Draft events</div>
                        <CircleDashed stroke-width="1.75" size="18" />
                    </div>

                    <span class="total-num">
                        {{ summary.total.draft_events }}
                    </span>

                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.current_month.draft_events }} Events
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Published events</div>
                        <CheckCheck :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.total.published_events }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.current_month.published_events }} Events
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Cancelled events</div>
                        <TicketX :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.total.cancelled_events }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.current_month.cancelled_events }} Events
                        </span>
                    </span>
                </div>
            </div>
            <div class="col-3">
                <div class="content-wrapper">
                    <div class="top d-flex align-items-center justify-content-between">
                        <div class="title-total">Completed events</div>
                        <History :size="18" :stroke-width="1.75" />
                    </div>
                    <span class="total-num">
                        {{ summary.total.completed_events }}
                    </span>
                    <span class="month-update d-flex align-items-center">
                        This month's total:
                        <span class="num">
                            {{ summary.current_month.completed_events }} Events
                        </span>
                    </span>
                </div>
            </div>

        </div>
        <div class="table-content">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Event Records</div>
                    <span class="small-detail">Quick overview of all event activities</span>
                </div>
                <router-link to="/events/create" class="btn btn-offcial btn-color">
                    <CircleFadingPlus :size="20" :stroke-width="1.75" style="stroke: white; margin-right: 7px;" />
                    Create event
                </router-link>


            </div>
            <div class="d-flex justify-content-between align-items-center w-100 mt-3">
                <div>
                    <ul class="view-type d-inline-flex mb-0">
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentStatus === '' }"
                                @click="setStatus('')">
                                All
                            </button>
                        </li>
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentStatus === 'published' }"
                                @click="setStatus('published')">
                                Published
                            </button>
                        </li>
                        <li class="nav-item r">
                            <button class="tab-table-type" :class="{ active: currentStatus === 'completed' }"
                                @click="setStatus('completed')">
                                Completed
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="tab-table-type" :class="{ active: currentStatus === 'cancelled' }"
                                @click="setStatus('cancelled')">
                                Cancelled
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="tab-table-type" :class="{ active: currentStatus === 'draft' }"
                                @click="setStatus('draft')">
                                Draft
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex w-100 align-items-center justify-content-start">

                        <form @submit.prevent="searchEvent" style="width: 300px">
                            <div class="input-form-search">
                                <Search :size="20" :stroke-width="1.75" class="position-absolute" />

                                <input v-model="search" type="text" class="form-control" style="width: 100%;"
                                    placeholder="Search here">
                            </div>
                        </form>
                        <div class="ui dropdown ms-3 sort-field">
                            <input type="hidden">

                            <div class="wrapper d-flex align-items-center" style="padding: 10px 14px;">
                                <SlidersHorizontal :size="16" :stroke-width="1.75" style="margin-right: 5px;" />

                                <span>{{ sortDisplay }}</span>
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
                                {{ sort.toUpperCase() }}
                            </div>
                            <div class="menu filter">
                                <div class="item" data-value="asc">Ascending</div>
                                <div class="item" data-value="desc">Descending</div>
                            </div>
                        </div>
                        <ul class="view-type d-inline-flex mb-0 ms-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation" style="margin-right: 4px;">
                                <button class="active tab-table-type" id="pills-list-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-list" type="button" role="tab" aria-controls="pills-list"
                                    aria-selected="true">
                                    <TableProperties :size="18" :stroke-width="1.75" />
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="tab-table-type" id="pills-grid-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-grid" type="button" role="tab" aria-controls="pills-grid"
                                    aria-selected="false">
                                    <LayoutGrid :size="18" :stroke-width="1.75" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="tab-content content-fetch mt-4" id="pills-tabContent">
                <div class="tab-pane fade list-wrap show active" id="pills-list" role="tabpanel"
                    aria-labelledby="pills-list-tab" tabindex="0">
                    <div v-if="eventStore.events && eventStore.events.length > 0">
                        <div v-for="event in eventStore.events" :key="event.id">
                            <div class="wrapper-list d-flex align-items-start justify-content-between w-100">
                                <div class="w-50 d-flex flex-column">
                                    <div class="title">
                                        {{ event.title }}
                                    </div>
                                    <p class="desc text-start mt-0">
                                        {{ event.short_description }}
                                    </p>
                                    <div class="created-at-by d-flex mt-2">
                                        <span class="created-at">
                                            Created at:
                                            {{ formatDateTime(event.created_at) }}
                                        </span>
                                        <span class="created-by">
                                            Created by:
                                            {{ event.creator?.name }}
                                        </span>
                                    </div>
                                </div>
                                <!-- RIGHT -->
                                <div class="w-50 d-flex flex-column align-items-end justify-content-between"
                                    style="height: 122px;">
                                    <!-- TOP -->
                                    <div class="d-flex align-items-center">

                                        <div class="view d-flex align-items-center">
                                            <Eye :size="18" :stroke-width="1.75" class="me-1" />

                                            {{ event.views }}
                                        </div>
                                        <span class="status ms-3" :class="event.status">
                                            {{ formatStatus(event.status) }}
                                        </span>
                                        <div class="ui dropdown ms-3 setting-dropdown">

                                            <input type="hidden">

                                            <div class="wrapper d-flex align-items-center">
                                                <Ellipsis :size="20" :stroke-width="1.75" />
                                            </div>

                                            <div class="menu">
                                                <div class="item">
                                                    Update information
                                                </div>

                                                <div class="item">
                                                    Move to trash
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <!-- BOTTOM -->
                                    <div class="row w-100">
                                        <div class="col-4 content-tt">
                                            <span class="label-content-tt">
                                                Related artists
                                            </span>
                                            <div class="num">
                                                {{ event.total_artists }}
                                            </div>
                                        </div>
                                        <div class="col-4 content-tt">
                                            <span class="label-content-tt">
                                                Total ticket types
                                            </span>
                                            <div class="num">
                                                {{ event.total_ticket_types }}
                                            </div>
                                        </div>
                                        <div class="col-4 content-tt" style="border-right: none!important;">
                                            <span class="label-content-tt">
                                                Total favorites
                                            </span>
                                            <div class="num">
                                                1
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div v-else class="no-data-wrapper">
                        <img src="../../assets/images/file.png" alt="">
                        <span>No data available at the moment</span>
                        <span class="sh-desc">As soon as data is created or added, it will be displayed here.</span>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-grid" role="tabpanel" aria-labelledby="pills-grid-tab"
                    tabindex="0">
                    <div v-if="eventStore.events && eventStore.events.length > 0" class="row">
                        <div v-for="event in eventStore.events" :key="event.id" class="col-4">
                            <div class="wrapper-grid gr-wrap">
                                <div class="d-flex justify-content-between align-items-center w-100 mb-2">
                                    <div class="d-flex">
                                        <span class="status m-0 mb-0" :class="event.status">
                                            {{ formatStatus(event.status) }}
                                        </span>
                                        <div class="view d-flex align-items-center">
                                            <Eye :size="18" :stroke-width="1.75" class="me-1" />
                                            {{ event.views }}
                                        </div>
                                    </div>
                                    <div class="ui dropdown setting-dropdown">
                                        <input type="hidden">
                                        <div class="wrapper d-flex align-items-center">
                                            <Ellipsis :size="20" :stroke-width="1.75" />
                                        </div>
                                        <div class="menu">
                                            <div class="item">
                                                Update information
                                            </div>
                                            <div class="item">
                                                Move to trash
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span class="title">{{ event.title }}</span>
                                <span class="desc">{{ event.short_description }}</span>
                                <div class="row w-100 my-3" style="padding-inline: 15px!important;">
                                    <div class="col-4 content-tt">
                                        <span class="label-content-tt">
                                            Related artists
                                        </span>
                                        <div class="num">
                                            {{ event.total_artists }}
                                        </div>
                                    </div>
                                    <div class="col-4 content-tt l">
                                        <span class="label-content-tt">
                                            Tickets types
                                        </span>
                                        <div class="num">
                                            {{ event.total_ticket_types }}
                                        </div>
                                    </div>
                                    <div class="col-4 content-tt l" style="border-right: none!important;">
                                        <span class="label-content-tt">
                                            Total favorites
                                        </span>
                                        <div class="num">
                                            1
                                        </div>
                                    </div>

                                </div>
                                <div class="created-at-by d-flex flex-column mt-2">
                                    <span class="created-at">
                                        Created at:
                                        {{ formatDateTime(event.created_at) }}
                                    </span>
                                    <span class="created-by">
                                        Created by:
                                        {{ event.creator?.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-data-wrapper">
                        <img src="../../assets/images/file.png" alt="">
                        <span>No data available at the moment</span>
                        <span class="sh-desc">As soon as data is created or added, it will be displayed here.</span>
                    </div>
                </div>
                <div v-if="eventStore.paginate.has_pages"
                    class="pagination-wrapper d-flex justify-content-center align-items-center mt-4">

                    <!-- Prev -->
                    <button class="btn-page" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                        <ChevronLeft :size="17" :stroke-width="1.75" />
                    </button>

                    <!-- Pages -->
                    <button v-for="page in eventStore.paginate.total_page" :key="page" class="btn-page"
                        :class="{ active: currentPage === page }" :disabled="currentPage === page" @click="changePage(page)">
                        {{ page }}
                    </button>

                    <!-- Next -->
                    <button class="btn-page" :disabled="currentPage === eventStore.paginate.total_page"
                        @click="changePage(currentPage + 1)">
                        <ChevronRight :size="16" :stroke-width="1.75" />
                    </button>

                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import { EventStore } from '@/stores/EventStore';
import {
    CircleDashed,
    CheckCheck,
    ClockFading,
    History
} from 'lucide-vue-next';

const route = useRoute()
const router = useRouter()
const sortBy = ref(route.query.sort_by || null)
const sort = ref(route.query.sort || 'desc')
const eventStore = EventStore();

const sortLabels = {
    title: 'Title',
    start_date: 'Start date',
    end_date: 'End date',
    created_at: 'Created date',
    views: 'Most viewed',
}

const sortDisplay = computed(() => {
    return sortBy.value ? sortLabels[sortBy.value] : 'Filter'
})

const clearSort = () => {
    sortBy.value = null

    router.push({
        query: {
            ...route.query,
            sort_by: undefined,
            page: 1
        }
    })
}
// const initDropdowns = async () => {
//     await nextTick()
//     $('.ui.dropdown').dropdown({
//         onChange(value) {
//             sortBy.value = value

//             router.push({
//                 query: {
//                     ...route.query,
//                     sort_by: value,
//                     page: 1
//                 }
//             })
//         }
//     })
// }

const initDropdowns = async () => {
    await nextTick()

    // SORT FIELD dropdown only
    $('.ui.dropdown.sort-field').dropdown({
        onChange(value) {
            sortBy.value = value === 'id' ? null : value

            router.push({
                query: {
                    ...route.query,
                    sort_by: sortBy.value || undefined,
                    page: 1
                }
            })
        }
    })

    // SORT DIRECTION dropdown only
    $('.ui.dropdown.sort-direction').dropdown({
        onChange(value) {
            sort.value = value

            router.push({
                query: {
                    ...route.query,
                    sort: sort.value,
                    page: 1
                }
            })
        }
    })
}

const search = ref(route.query.search || '')
const currentPage = ref(Number(route.query.page) || 1)
const currentStatus = ref(route.query.status || '')

const summary = ref({
    total: {
        draft_events: 0,
        published_events: 0,
        cancelled_events: 0,
        completed_events: 0,
    },

    current_month: {
        draft_events: 0,
        published_events: 0,
        cancelled_events: 0,
        completed_events: 0,
    }
});
onMounted(async () => {
    window.$ = window.jQuery = $
    await import('fomantic-ui-css/semantic.min.js')
    try {
        const token = localStorage.getItem('auth_token')
        const res = await eventStore.getData(token)
        summary.value = res.data
        // await fetchEvents()
    } catch (error) {
        console.log(error)
    }
})

// ===========================

import $ from 'jquery'
import { CalendarDays } from 'lucide-vue-next';

const selectedText = ref('Filter')
const searchEvent = async () => {

    currentPage.value = 1

    router.push({
        query: {
            ...route.query,
            search: search.value || undefined,
            status: currentStatus.value || undefined,
            sort_by: sortBy.value,
            sort: sort.value,
            page: 1
        }
    })

}

const formatDateTime = (date) => {

    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const setStatus = async (status) => {

    currentStatus.value = status
    currentPage.value = 1

    router.push({
        query: {
            ...route.query,
            search: search.value || undefined,
            status: status || undefined,
            sort_by: sortBy.value,
            sort: sort.value,
            page: 1
        }
    })

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

}


document.querySelectorAll('.ui.dropdown').forEach(el => {
    $(el).dropdown()
})

const formatStatus = (status) => {
    if (!status) return ''
    return status.charAt(0).toUpperCase() + status.slice(1)
}
// ===========================
// Pagination

const fetchEvents = async () => {

    const token = localStorage.getItem('auth_token')

    await eventStore.getAllEvent(
        token,
        search.value,
        currentStatus.value,
        sortBy.value,
        sort.value,
        9,
        currentPage.value
    )

    await initDropdowns()

}

const changePage = async (page) => {

    if (
        page < 1 ||
        page > eventStore.paginate.total_page
    ) return

    currentPage.value = page

    router.push({
        query: {
            ...route.query,
            search: search.value || undefined,
            status: currentStatus.value || undefined,
            sort_by: sortBy.value,
            sort: sort.value,
            page
        }
    })

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

}

// watch(
//     () => route.query,
//     async (query) => {

//         currentPage.value = Number(query.page) || 1
//         currentStatus.value = query.status || ''
//         search.value = query.search || ''

//         sortBy.value = query.sort_by || 'id'
//         sort.value = query.sort || 'desc'

//         await fetchEvents()
//     },
//     { immediate: true }
// )
watch(
    () => route.query,
    async (query) => {
        currentPage.value = Number(query.page) || 1
        currentStatus.value = query.status || ''
        search.value = query.search || ''

        sortBy.value = query.sort_by || null
        sort.value = query.sort || 'desc'
        // sortBy.value = query.sort_by || null
        // sort.value = query.sort || 'desc'

        await fetchEvents()
    },
    { immediate: true }
)

</script>
