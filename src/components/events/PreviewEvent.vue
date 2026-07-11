<template>
    <div class="container event create-event">
        <div class="title-step">Explore Event Details</div>
        <span class="sm-step mt-2 d-flex">View all the essential information about this event.</span>
        <div class="table-content" style="margin-top: 15px;">
            <ul class="view-type d-inline-flex mb-0" v-if="event?.slug">
                <li class="nav-item" role="presentation" style="margin-right: 4px;">
                    <router-link class="tab-table-type" :to="`/events/preview/information/${event.slug}`"
                        active-class="active">Event Information</router-link>
                </li>
                <li class="nav-item" role="presentation" style="margin-right: 4px;">
                    <router-link class="tab-table-type" :to="`/events/preview/tickets/${event.slug}`"
                        active-class="active">Ticket information</router-link>
                </li>
                <li class="nav-item" role="presentation">
                    <router-link class="tab-table-type" :to="`/events/preview/promotion/${event.slug}`"
                        active-class="active">Promotions</router-link>
                </li>
            </ul>
            <div style="margin-top: 15px;">
                <div v-if="event">
                    <div class="row">
                        <div class="col-7 event-preview">
                            <div class="content-wrapper-section">
                                <router-link :to="`/events/preview/update/${event.slug}`" v-if="isManager && event.status == 'published'" 
                                    class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                    <PenLine :stroke-width="1.75" /> Edit
                                </router-link>
                                <span class="title-event ">
                                    {{ event.title }} <span class="status" :class="event.status">{{
                                        statusLabel(event.status) }}</span>
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper">
                                        <div class="tda">Category:</div>
                                        <span class="vlaue tda-content">{{ event.category_id.name || 'N/A'
                                            }}</span>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Event start date:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.start_date) ||
                                            'N/A' }}</span>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Event end date:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.end_date) ||
                                            'N/A' }}</span>
                                    </div>
                                    <div class="wrapper align-items-start mb-0">
                                        <div class="tda">Short description:</div>
                                        <div class="tda-content">{{ event.short_description || 'N/A' }}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="content-wrapper-section">
                                <router-link :to="`/events/preview/update/${event.slug}`" v-if="isManager && event.status === 'published'" 
                                    class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                    <PenLine :stroke-width="1.75" /> Edit
                                </router-link>
                                <span class="title-event">
                                    Venue & Location
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper">
                                        <div class="tda">Venue name:</div>
                                        <div class="tda-content">{{ event.venue.name || 'N/A' }}</div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Address:</div>
                                        <div class="tda-content">{{ event.venue.address || 'N/A' }}</div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Latitude:</div>
                                        <div class="tda-content">{{ event.venue.latitude || 'N/A' }}</div>
                                    </div>
                                    <div class="wrapper mb-0">
                                        <div class="tda">Longitude:</div>
                                        <div class="tda-content">{{ event.venue.longitude || 'N/A' }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section">
                                <router-link :to="`/events/preview/update/${event.slug}`" v-if="isManager && event.status === 'published'" 
                                    class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                    <PenLine :stroke-width="1.75" /> Edit
                                </router-link>
                                <span class="title-event">
                                    Performing Artists
                                </span>
                                <div class="w-100 mt-2">
                                    <div v-if="event.artists && event.artists.length > 0">
                                        <div class="wrapper artist-item" v-for="artist in event.artists"
                                            :key="artist.id">
                                            <div class="tda">
                                                <img :src="artist.profile_image" alt="" class="artist-avatar"
                                                    style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; margin-right: 10px;" />
                                            </div>
                                            <div class="tda-content">
                                                <div class="artist-name">
                                                    {{ artist.name }} / {{ artist.stage_name }}
                                                </div>

                                                <div class="artist-genre">
                                                    {{ artist.genre }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-else>
                                        <span>No artists assigned to this event</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section">
                                <router-link :to="`/events/preview/update/${event.slug}`" v-if="isManager && event.status === 'published'" 
                                    class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                    <PenLine :stroke-width="1.75" /> Edit
                                </router-link>
                                <span class="title-event">
                                    Description
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper">
                                        <span class="vlaue tda-content w-100">{{ event.description || 'N/A' }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-5 event-preview right">

                            <div class="content-wrapper-section">
                                <span class="title-event">
                                    Event Insights
                                </span>
                                <div class="w-100 mt-2">

                                    <div class="wrapper">
                                        <div class="tda">Create by:</div>
                                        <div class="tda-content">
                                            <div class=" d-flex align-items-center create-by">
                                                <img :src="event.creator.avatar" alt=""
                                                    style="width: 23px; height: 23px; object-fit: cover; border-radius: 50%;">
                                                <span>{{ event.creator.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Created at:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.created_at)
                                            }}</span>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Updated at:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.updated_at)}}</span>
                                    </div>
                                    <div class="wrapper align-items-center mb-0" v-if="isManager && event.status === 'published'">
                                        <div class="tda">Enable ticket sales:</div>
                                        <div class="status-update tda-content d-flex align-items-center">
                                            <label class="switch mb-0" :class="{ 'outdated-switch': isOutdated }">
                                                <input :checked="event.is_sales_enabled"type="checkbox" @change="toggleSales">
                                                <div class="slider">
                                                    <div class="circle">
                                                        <svg class="cross" xml:space="preserve"
                                                            style="enable-background:new 0 0 512 512"
                                                            viewBox="0 0 365.696 365.696" y="0" x="0" height="6"
                                                            width="6" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path data-original="#000000" fill="currentColor"
                                                                    d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                        <svg class="checkmark" xml:space="preserve"
                                                            style="enable-background:new 0 0 512 512"
                                                            viewBox="0 0 24 24" y="0" x="0" height="10" width="10"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path class="" data-original="#000000"
                                                                    fill="currentColor"
                                                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <!-- <span class="vlaue tda-content">{{ formatDateTime(event.updated_at)}}</span> -->
                                    </div>
                                     <div class="wrapper mb-0">
                                        <button class="btn-official btn-color w-100" type="button" v-if="event.status == 'draft'" @click="openPublishModal">
                                            Publish event
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section" v-if="saleEvent">
                                <span class="title-event">
                                    Sales Overview
                                </span>
                                <div class="w-100 mt-2">

                                    <div class="wrapper">
                                        <div class="tda">Total Revenue:</div>
                                        <div class="tda-content">
                                            {{ saleEvent.revenue.usd.value }} $ 
                                        </div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Tickets Sold:</div>
                                        <span class="vlaue tda-content">{{ saleEvent.tickets_sold }} / {{ saleEvent.original_tickets }}</span>
                                    </div>
                                    <div class="wrapper mb-0">
                                        <div class="tda">Remaining Tickets:</div>
                                        <span class="vlaue tda-content">{{ saleEvent.remaining_tickets }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section" v-if="saleEvent?.ticket_types && saleEvent.ticket_types.length > 0">
                                <span class="title-event">
                                    Ticket Type Breakdown
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper" v-for="ticket in saleEvent.ticket_types"
                                        :key="ticket.ticket_price_id">
                                        <div class="tda">
                                            Tickets {{ ticket.ticket_type }}:
                                        </div>

                                        <div class="tda-content">
                                            {{ ticket.sold }} Tickets/ {{ ticket.revenue.usd.value }}$
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section cancellation" v-if="event.status === 'published' && isManager">
                                <span class="title-event">
                                    Confirm Event Cancellation
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper">
                                        <div class="tda-content w-100">
                                            Please ensure all ticket purchases are resolved, including refunds or alternative arrangements for customers, before proceeding. Once cancelled, this action is irreversible.
                                        </div>
                                    </div>
                                    <div class="wrapper mb-0">
                                        <div class="tda-content w-100">
                                            <button class="btn-official btn-color-warning w-100" type="button" @click="openCancelModal">Confirm Cancellation</button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section position-relative">
                                <router-link :to="`/events/preview/update/${event.slug}`" v-if="isManager && event.status === 'published'"
                                    class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                    <PenLine :stroke-width="1.75" /> Edit
                                </router-link>
                                <span class="title-event">
                                    Thumbnail
                                </span>
                                <div v-if="event.thumbnail == null" class="d-flex flex-column">
                                    <img src="../../assets/images/No-Image.jpg" width="80%" alt="">
                                    <div class="wrapper flex-column">
                                        <div class="tda mb-0">No Thumbnail Available</div>
                                    </div>
                                </div>
                                <div v-else style="margin-top: 10px;">
                                    <img :src="event.thumbnail" alt="" class="thumbnail">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade event-confirm" id="publishEventModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

            <div class="modal-header">
                <div class="modal-title">Publish Event</div>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>

            <div class="modal-body pt-0 mt-0 mb-2">
                <div class="info-modal mb-0">
                    Before publishing, make sure:
                </div>
                <ul class="mb-1 info-modal">
                    <li>Ticket prices are valid</li>
                    <li>Venue and date are complete</li>
                    <li>Event is ready for public access</li>
                </ul>
            </div>

            <div class="d-flex justify-content-center gap-2 p-4 pt-0">
                <button type="button" class="btn btn-official btn-color-cancel w-50" data-bs-dismiss="modal">
                Cancel
                </button>

                <button type="button" class="btn btn-official btn-color w-50" @click="confirmPublishEvent">
                Yes, Publish
                </button>
            </div>

            </div>
        </div>
    </div>
    <div class="modal fade event-confirm" id="cancelEventModal" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <div class="modal-title text-danger">
                        Event Cancellation
                    </div>
                </div>

                <div class="modal-body">

                    <div class="info-modal mb-2">
                        You are about to cancel this event.
                    </div>
                    
                    <div class="warning-wrapper mb-0">
                        Once cancelled:
                        <ul class="my-1 info-modal">
                            <li>Ticket sales will be disabled automatically.</li>
                            <li>All valid tickets will become cancelled.</li>
                            <li>The event cannot be published again.</li>
                        </ul>
                    </div>
                    <div class="info-modal text-danger mt-2">This action cannot be undone.</div>

                </div>

                <div class="d-flex justify-content-center gap-2 p-4 pt-0">

                    <button class="btn btn-official btn-color-cancel w-50" data-bs-dismiss="modal">
                        Keep Event
                    </button>

                    <button class="btn btn-official btn-color-warning w-50" @click="confirmCancellation">
                        Yes, Cancel Event
                    </button>

                </div>

            </div>
        </div>
    </div>
</template>
<style scope>
.animate__animated {
    --animate-duration: 0.35s;
}
</style>
<script setup>
import { useRoute } from 'vue-router'
import { EventStore } from '@/stores/EventStore'
// ===========================================
// import { EventStore } from '@/stores/EventStore';
import { ref, onMounted, nextTick, watch } from 'vue';
import $ from 'jquery'
import { Modal } from 'bootstrap'
import useVuelidate from '@vuelidate/core'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import nprogress from 'nprogress';
import { AuthStore } from '@/stores/AuthStore'
const showPublishModal = ref(false)
const pendingPublish = ref(false)
let cancelModalInstance = null

const openCancelModal = () => {
    const modalEl = document.getElementById('cancelEventModal')
    cancelModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    cancelModalInstance.show()
}
let publishModalInstance = null

const openPublishModal = () => {
    const modalEl = document.getElementById('publishEventModal')
    publishModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    publishModalInstance.show()
}
const authStore = AuthStore()
const isAdmin = computed(() =>
    authStore.user?.role?.toLowerCase() === 'admin'
)


const isManager = computed(() =>
    authStore.user?.role?.toLowerCase() === 'manager'
)
// ===========================================

const route = useRoute()
const eventStore = EventStore()
const event = ref(null)
const saleEvent = ref(null)
const loading = ref(true)
const showEditForm = ref(true)
const toast = useToast()
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-vue-next'
// ==========================================
onMounted(async () => {
    nprogress.start()
    
    await fetchEvent()
    nprogress.done()
})
// ==========================================
// const toggleStatus = async (e) => {
//     const isChecked = e.target.checked;
//     const newStatus = isChecked ? 'published' : 'cancelled';

//     try {
//         const token = localStorage.getItem('auth_token');

//         const res = await eventStore.updateStatus(
//             event.value.id,
//             token,
//             newStatus
//         );

//         // ✅ HANDLE BACKEND LOGIC FAILURE
//         if (res?.result === false) {
//             toast.add({
//                 severity: 'error',
//                 summary: 'Not allowed',
//                 detail: res.message || 'Cannot update status',
//                 life: 3000
//             });

//             // rollback UI
//             e.target.checked = !isChecked;
//             return;
//         }

//         // ✅ refresh full event to avoid missing data issues
//         await fetchEvent();

//         toast.add({
//             severity: 'success',
//             summary: 'Success',
//             detail: `Event status updated to ${newStatus}`,
//             life: 3000
//         });

//     } catch (error) {
//         console.log(error);

//         const message =
//             error?.response?.data?.message ||
//             error?.response?.data?.msg ||
//             'Failed to update event status';

//         toast.add({
//             severity: 'error',
//             summary: 'Error',
//             detail: message,
//             life: 3000
//         });

//         // rollback UI switch
//         e.target.checked = !isChecked;
//     }
// };
const toggleSales = async (e) => {
    const enabled = e.target.checked;

    try {
        const token = localStorage.getItem('auth_token');

        const res = await eventStore.updateSalesStatus(
            event.value.id,
            token,
            enabled
        );

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Unable to update ticket sales.',
                life: 3000
            });

            // Roll back switch
            e.target.checked = !enabled;
            return;
        }

        await fetchEvent();

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: enabled
                ? 'Ticket sales have been enabled.'
                : 'Ticket sales have been disabled.',
            life: 3000
        });

    } catch (error) {

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to update ticket sales.';

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });

        e.target.checked = !enabled;
    }
};
const confirmPublishEvent = async () => {
    try {
        const token = localStorage.getItem('auth_token')

        const res = await eventStore.updateEventStatus(
            event.value.id,
            token,
            'published'
        )

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Cannot publish event',
                life: 3000
            })
            return
        }

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Event published successfully',
            life: 3000
        })

        // ✅ CLOSE MODAL HERE (after success)
        const modalEl = document.getElementById('publishEventModal')
        const modal = bootstrap.Modal.getInstance(modalEl)
        modal.hide()

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to publish event'

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        })
    }
}
const cancelPublish = () => {
    showPublishModal.value = false
    pendingPublish.value = false
}
const confirmCancellation = async () => {
    try {
        const token = localStorage.getItem('auth_token')

        const res = await eventStore.updateEventStatus(
            event.value.id,
            token,
            'cancelled'
        )

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Unable to cancel event.',
                life: 3000
            })
            return
        }

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Event Cancelled',
            detail: 'The event has been cancelled successfully.',
            life: 3000
        })

        // Close modal
        const modalEl = document.getElementById('cancelEventModal')
        bootstrap.Modal.getInstance(modalEl)?.hide()

    } catch (error) {

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to cancel event.'

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        })
    }
}
// ==========================================

const fetchEvent = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const slug = route.params.slug
        const res = await eventStore.getEventBySlug(token, slug)
        event.value = res.data
        // console.log(res.data)
        const saleRes = await eventStore.getSaleSummaryBySlug(token, slug);
        saleEvent.value = saleRes.data;
    } catch (error) {

        // console.log(error)

    } finally {

        loading.value = false

    }
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

const statusLabel = (status) => {
    const map = {
        draft: 'Draft',
        published: 'Published',
        cancelled: 'Cancelled',
    }

    return map[status] || status
}

const isOutdated = computed(() => {
    if (!event.value?.start_date) return false;

    const startDate = new Date(event.value.start_date);
    // console.log('Start Date:', startDate); 

    const now = new Date();
    // console.log('Current Date:', now);
    return event.value.status === 'published' && startDate <= now;
});

</script>