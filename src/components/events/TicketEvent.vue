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
                            <div class="d-flex flex-row justify-between align-items-center w-100 mb-3">
                                <div class="d-flex flex-column w-50">
                                    <span class="title-event">
                                        Ticket Overview
                                    </span>
                                    <span>Review ticket types and quantities.</span>
                                </div>
                                <div class="w-50 d-flex align-items-end justify-content-end">
                                    <button class="update-event-information btn btn-official btn-color" @click="openCreateTicket">
                                        <Plus color="#fff" :stroke-width="2" size="18" style="margin-right: 5px;"/> Add
                                        new ticket
                                    </button>
                                </div>
                            </div>
                            <div v-if="event?.tickets?.length > 0">
                                <div class="wrapper-list-ticket content-wrapper-section position-relative"
                                    v-for="ticket in event.tickets" :key="ticket.id">
                                    <div
                                        class="ticket-wrapper flex-row d-flex align-items-center justify-content-between position-relative">
                                        <div class="ui dropdown ms-3 setting-dropdown position-absolute"
                                            style="right: 0px; top: 0;" :data-id="ticket.id">
                                            <input type="hidden">
                                            <div class="wrapper d-flex align-items-center" style="padding: 6px!important;">
                                                <Ellipsis :size="16" :stroke-width="1.75" />
                                            </div>
                                            <div class="menu" style="top: calc(100% - 5px)!important;">
                                                <div class="item" @click="openEditDropdown(ticket)">
                                                    Update information
                                                </div>
                                                <div class="item">
                                                    Promotion
                                                </div>
                                                <div class="item" @click="confirmDelete(ticket.id)">
                                                    Move to trash
                                                </div>
                                            </div>
                                        </div>
                                        <div class="total-wrapper content-wrapper-section mb-0">
                                            <div class="small-t">Total Tickets</div>
                                            <div class="Total-ticket">{{ ticket?.quantity }}</div>
                                        </div>
                                        <div class="d-flex align-items-start flex-column ">
                                            <div class="small-t">Ticket type:</div>
                                            <div class="title-ticket">{{ ticket?.ticket_type.name }}</div>
                                        </div>
                                        <div class="d-flex align-items-start flex-column ">
                                            <div class="small-t">Price:</div>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <DollarSign :stroke-width="1.75" size="18" color="rgb(3, 111, 3)" />
                                                <div class="val-ticket price">{{ ticket?.price }}</div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-start flex-column" style="margin-right: 15px;">
                                            <div class="small-t">Created at:</div>
                                            <div class="val-ticket">{{ formatDateTime(ticket?.created_at) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="no-data-wrapper">
                                <img src="../../assets/images/file.png" alt="">
                                <span>No tickets found</span>
                                <span class="sh-desc">
                                    Try adding a new ticket for this event.
                                </span>
                            </div>

                        </div>
                        <div class="col-5 event-preview">
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
                                        <span class="vlaue tda-content">{{ formatDateTime(event.updated_at) }}</span>
                                    </div>
                                    <div class="wrapper align-items-center mb-0">
                                        <div class="tda">Published:</div>
                                        <div class="status-update tda-content d-flex align-items-center">
                                            <label class="switch mb-0" :class="{ 'outdated-switch': isOutdated }">
                                                <input :checked="event.status === 'published'" type="checkbox"
                                                    @change="toggleStatus">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- UPDATE TICKET MODAL -->
    <div class="offcanvas offcanvas-end" style="--bs-offcanvas-width: 500px;" id="updateTicketOffcanvas" tabindex="-1">

        <div class="d-flex flex-column">
            <span class="title-off" style="font-size: 18px;">
                {{ isEditMode ? 'Update Ticket' : 'Create Ticket' }}
            </span>
            <span class="b-t">{{ isEditMode
                ? 'Update Ticket lets you edit existing ticket details to keep information.'
                : 'Create a new ticket for this event.' }}
            </span>
        </div>
        <div class="sumary-info my-3 mx-0">
            <span class="sum-title">
                Summary event information:
            </span>
            <div class="wrap">
                <span class="label">Title:</span>
                <span class="event-val">{{ event?.title }}</span>
            </div>
            <div class="wrap">
                <span class="label">Category:</span>
                <span class="event-val">{{ event?.category_id.name }}</span>
            </div>
             <div class="wrap">
                <span class="label">Start at:</span>
                <span class="event-val">{{ event?.start_date ? formatDateTime(event.start_date) : 'N/A'}}</span>
            </div>
            <div class="wrap">
                <span class="label">End at:</span>
                <span class="event-val">{{ event?.end_date ? formatDateTime(event.end_date) : 'N/A' }}</span>
            </div>
        </div>
        <div class="">
            <div class="mb-3">
                <label class="form-label">
                    Ticket Type ID
                </label>
                <div>
                    <div class="ui dropdown ticket-type-dropdown w-100"
                        :class="{ 'form-control-err': v$.ticket_type_id.$error }">
                        <input type="hidden" style="width: 100%; height: 100%;">
                        <div class="wrapper justify-content-between d-flex">
                            <div class="default text">
                                {{ selectedTicketTypeName }}
                            </div>
                            <i class="dropdown icon"></i>
                        </div>
                        <div class="menu w-100">
                            <div class="item" v-for="type in ticketTypes" :key="type.id" :data-value="type.id">
                                {{ type.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="v$.ticket_type_id.$dirty && v$.ticket_type_id.$error" class="warning-msg-input mt-1">
                    Ticket type is required
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Price
                </label>
                <div class="w-100 position-relative d-flex align-items-center justify-content-end">
                    <DollarSign color="#3a373b" size="16" :stroke-width="1.75"
                        style="position: absolute; right: 10px;" />
                    <input type="text" class="form-control" :class="{ 'form-control-err': v$.price.$error }"
                        v-model="editForm.price" placeholder="Enter the price here" />
                </div>
                <div v-if="v$.price.$dirty && v$.price.$error" class="text-danger mt-1">
                    Price must be a valid number and ≥ 0
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Quantity
                </label>
                <input type="text" class="form-control" :class="{ 'form-control-err': v$.quantity.$error }"
                    v-model="editForm.quantity" placeholder="Enter the quantity here" />
                <div v-if="v$.quantity.$dirty && v$.quantity.$error" class="text-danger mt-1">
                    Quantity must be a valid number and ≥ 1
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-official btn-color-cancel rounded-pill me-2" data-bs-dismiss="offcanvas">
                Cancel
            </button>

            <button class="btn btn-official btn-color " @click="isEditMode ? updateTicket(selectedTicketId) : createTicket()">
                 {{ isEditMode ? 'Update Ticket' : 'Create Ticket' }}
            </button>
        </div>
        </div>

    <!-- DELETE CONFIRM MODAL -->
    <div class="modal fade" id="deleteTicketModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content form-input" style="padding: 30px;">
                <div class="d-flex flex-column align-items-center justify-content-center text-center">
                    <div class="wrapper-i">
                        <Trash2 :size="30" color="rgb(87, 6, 6)" />
                    </div>
                    <h5 class="modal-title warn mb-1">Confirm Delete</h5>
                    <span class="sm-detail">
                        Are you sure you want to delete this ticket? <br> This action cannot be undone.
                    </span>
                </div>

                <div class="d-flex w-100 mt-4">
                    <button type="button" class="w-50 me-2 btn btn-official btn-color-cancel rounded-pill"
                        data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="w-50 ms-2 btn btn-official btn-color-warning rounded-pill"
                        @click="deleteTicket">
                        Delete
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
import { Modal } from 'bootstrap'
import { Offcanvas } from 'bootstrap'
import { onUpdated } from 'vue'
// ===========================================
// import { EventStore } from '@/stores/EventStore';
import { ref, onMounted, nextTick, watch } from 'vue';
import $ from 'jquery'
import useVuelidate from '@vuelidate/core'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { required, numeric, minValue } from '@vuelidate/validators'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-vue-next'
import CreateEvent from '@/components/events/CreateEvent.vue';

// ===========================================
const editForm = ref({
    event_id: '',
    ticket_type_id: '',
    price: '',
    quantity: ''
})
const route = useRoute()
const eventStore = EventStore()
const event = ref(null)
const loading = ref(true)
const toast = useToast()
const showEditDropdown = ref(null)
const showEditForm = ref(true)
const selectedTicketId = ref(null)
const ticketTypes = ref([])
const selectedTicketTypeName = ref('Select ticket type')
const isEditMode = ref(false)
const showDeleteModal = ref(false)
const selectedDeleteTicketId = ref(null)
// ==========================================
onUpdated(() => {
    nextTick(() => {
        $('.ui.dropdown.setting-dropdown').dropdown()
    })
})
onMounted(async () => {
    await fetchEvent()
    const token = localStorage.getItem('auth_token')
    const res = await eventStore.getTicketTypes(token, event.value.id)
    ticketTypes.value = res.data
    await nextTick()
    $('.ui.dropdown.setting-dropdown').dropdown()
})
watch(event, async (val) => {
    if (!val) return

    await nextTick()

    $('.ui.dropdown.setting-dropdown').dropdown()
})
const rules = {
    ticket_type_id: { required },
    price: { required, numeric, minValue: minValue(0) },
    quantity: { required, numeric, minValue: minValue(1) }
}

const v$ = useVuelidate(rules, editForm)

const resetModal = () => {
    selectedTicketId.value = null

    editForm.value = {
        event_id: event.value?.id || '',
        ticket_type_id: '',
        price: '',
        quantity: ''
    }

    selectedTicketTypeName.value = 'Select ticket type'
}

const confirmDelete = (ticketId) => {

    if (event.value?.status === 'published') {
        toast.add({
            severity: 'error',
            summary: 'Not allowed',
            detail: 'You cannot delete tickets from a published event',
            life: 3000
        })
        return
    }

    selectedDeleteTicketId.value = ticketId
    const modal = new Modal(document.getElementById('deleteTicketModal'))
    modal.show()
}


const openEditDropdown = (ticket) => {
    isEditMode.value = true
    if (event.value?.status === 'published') {
        toast.add({
            severity: 'error',
            summary: 'Not allowed',
            detail: 'You cannot update tickets for a published event',
            life: 3000
        })
        return
    }

    selectedTicketId.value = ticket.id

    editForm.value = {
        event_id: ticket.event_id,
        ticket_type_id: ticket.ticket_type?.id,
        price: ticket.price,
        quantity: ticket.quantity
    }

    selectedTicketTypeName.value =
        ticket.ticket_type?.name || 'Select ticket type'

    nextTick(() => {
        v$.value.$reset()
        const $dropdown = $('.ui.dropdown.ticket-type-dropdown')
        $dropdown.dropdown('clear')
        $dropdown.dropdown({
            onChange: (value, text) => {
                editForm.value.ticket_type_id = value
                selectedTicketTypeName.value = text
                v$.value.ticket_type_id.$touch()
            }
        })
        setTimeout(() => {
            $dropdown.dropdown('set selected', ticket.ticket_type?.id)
        }, 50)
    })

    const offcanvasEl = document.getElementById('updateTicketOffcanvas')
    const offcanvas = Offcanvas.getOrCreateInstance(offcanvasEl)

    offcanvas.show()

    nextTick(() => {
        v$.value.$reset()
    })
}

// ==========================================
const openCreateTicket = () => {

    // 🚫 Prevent creating ticket when event is published
    if (event.value?.status === 'published') {
        toast.add({
            severity: 'error',
            summary: 'Not allowed',
            detail: 'You cannot create tickets for a published event',
            life: 3000
        })

        return
    }

    isEditMode.value = false
    selectedTicketId.value = null

    resetModal()

    editForm.value = {
        event_id: event.value.id,
        ticket_type_id: '',
        price: '',
        quantity: ''
    }

    selectedTicketTypeName.value = 'Select ticket type'

    nextTick(() => {
        const $dropdown = $('.ui.dropdown.ticket-type-dropdown')

        nextTick(() => {
            const $dropdown = $('.ui.dropdown.ticket-type-dropdown')

            $dropdown.dropdown('destroy')

            $dropdown.dropdown({
                clearable: true,
                onChange: (value, text) => {
                    editForm.value.ticket_type_id = value
                    selectedTicketTypeName.value = text
                }
            })

            v$.value.$reset()
        })

        $dropdown.dropdown({
            onChange: (value, text) => {
                editForm.value.ticket_type_id = value
                selectedTicketTypeName.value = text
                v$.value.ticket_type_id.$touch()
            }
        })

        v$.value.$reset()
    })

    const offcanvasEl = document.getElementById('updateTicketOffcanvas')
    const offcanvas = Offcanvas.getOrCreateInstance(offcanvasEl)
    offcanvas.show()
}
const createTicket = async () => {
    const isValid = await v$.value.$validate()
    if (!isValid) return

    // 🔴 DEBUG (VERY IMPORTANT)
    console.log("CREATE PAYLOAD:", editForm.value)
    console.log("TICKET TYPE:", editForm.value.ticket_type_id)
    console.log("FULL FORM:", editForm.value)
        if (!editForm.value.ticket_type_id) {
        toast.add({
            severity: 'error',
            summary: 'Missing ticket type',
            detail: 'Please select ticket type',
            life: 3000
        })
        return
    }

    try {
        const token = localStorage.getItem('auth_token')

        const res = await eventStore.createTicket(token, editForm.value)

        console.log("CREATE RESPONSE:", res)

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket created successfully',
            life: 3000
        })

        const offcanvasEl = document.getElementById('updateTicketOffcanvas')
        Offcanvas.getOrCreateInstance(offcanvasEl).hide()

        resetModal()
        v$.value.$reset()

    } catch (error) {
        console.log("CREATE ERROR:", error)

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create ticket',
            life: 3000
        })
    }
}
// ==========================================
const toggleStatus = async (e) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked ? 'published' : 'cancelled';

    try {
        const token = localStorage.getItem('auth_token');

        const res = await eventStore.updateStatus(
            event.value.id,
            token,
            newStatus
        );

        // ✅ HANDLE BACKEND LOGIC FAILURE
        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Cannot update status',
                life: 3000
            });

            // rollback UI
            e.target.checked = !isChecked;
            return;
        }

        // ✅ refresh full event to avoid missing data issues
        await fetchEvent();

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: `Event status updated to ${newStatus}`,
            life: 3000
        });

    } catch (error) {
        console.log(error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to update event status';

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });

        // rollback UI switch
        e.target.checked = !isChecked;
    }
};
// ==========================================

const fetchEvent = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const slug = route.params.slug

        const res = await eventStore.getEventBySlug(token, slug)

        event.value = null
        await nextTick()

        event.value = res.data

    } catch (error) {
        console.log(error)
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
    console.log('Start Date:', startDate);

    const now = new Date();
    console.log('Current Date:', now);
    return event.value.status === 'published' && startDate <= now;
});
// =========================
const updateTicket = async (ticketId) => {
    const isValid = await v$.value.$validate()
    if (!isValid) return

    try {
        const token = localStorage.getItem('auth_token')

        await eventStore.updateTicket(
            ticketId,
            token,
            editForm.value
        )

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket updated successfully',
            life: 3000
        })

        await fetchEvent()
        nextTick(() => {
            v$.value.$reset()
        })
        resetModal()
        isEditMode.value = false
        const offcanvasEl = document.getElementById('updateTicketOffcanvas')
        const offcanvas = Offcanvas.getOrCreateInstance(offcanvasEl)
        offcanvas.hide()

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update ticket',
            life: 3000
        })
    }
}

const deleteTicket = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        console.log('Deleting ticket with ID:', selectedDeleteTicketId.value)
        await eventStore.deleteTicket(
            selectedDeleteTicketId.value,
            token
        )

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket deleted successfully',
            life: 3000
        })

        await fetchEvent()

        // close modal
        const modalEl = document.getElementById('deleteTicketModal')
        const modal = Modal.getInstance(modalEl)
        modal.hide()

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            'Failed to delete ticket'

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        })
    } finally {
        selectedDeleteTicketId.value = null
    }
}

</script>