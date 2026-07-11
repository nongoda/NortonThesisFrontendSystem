<template>
    <div class="container event create-event">
        <div class="table-content mt-0">
            <div class="d-flex align-items-center justify-content-between">
                <div class="">
                    <div class="title-step">Ticket Information</div>
                    <span class="sm-step mt-2 d-flex">
                        Review all information related to this ticket, including event details, buyer, order, and payment records.
                    </span>
                </div>
                <button class="btn btn-official btn-color" @click="markRedeemed(ticket)"
                    :disabled="ticket?.status === 'redeemed'">
                    <!-- {{
                        ticket?.status === 'redeemed'
                            ? 'Already Redeemed'
                            : 'Update to Redeemed'
                    }} -->
                    Update to Redeemed
                </button>
            </div>
            <div v-if="store.loading">Loading...</div>
        
            <div v-else-if="store.scanPreview" style="margin-top: 15px;">
                <div class="row">
                    <div class="col-7 event-preview">
                        <div class="content-wrapper-section">
                            <span class="title-event">Ticket Information</span>
                            <div class="w-100 mt-2" v-if="ticket">
                                <div class="wrapper">
                                    <div class="tda">Ticket Code:</div>
                                    <div class="tda-content">{{ ticket.ticket_code }}</div>
                                </div>                               
                                <div class="wrapper">
                                    <div class="tda">Status:</div>
                                    <div class="tda-content">{{ formatStatus(ticket.status) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Check in at:</div>
                                    <div class="tda-content">{{ formatDate(ticket.checked_in_at) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Check in by:</div>                                    
                                    <div class="tda-content">{{ ticket.checked_in_by?.name || 'N/A' }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Created at:</div>                                    
                                    <div class="tda-content">{{ formatDate(ticket.created_at)  }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="content-wrapper-section">
                            <span class="title-event">Order Information</span>
                            <div class="w-100 mt-2" v-if="ticket?.order">
                                <div class="wrapper">
                                    <div class="tda">Order Number:</div>
                                    <div class="tda-content">{{ ticket.order.order_number }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Ticket type:</div>
                                    <div class="tda-content">{{ formatStatus(ticket.items[0]?.ticket_price?.ticket_type ) }}</div>
                                </div>
                                 <div class="wrapper">
                                    <div class="tda">Total Tickets:</div>
                                    <div class="tda-content">{{ ticket.items[0]?.quantity }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Sub Total:</div>
                                    <div class="tda-content">{{ ticket.order.subtotal }} USD</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Discount Amount:</div>
                                    <div class="tda-content">{{ ticket.order.discount_amount }} USD</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Total Amount:</div>
                                    <div class="tda-content">{{ ticket.order.total }} USD</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Order Status:</div>
                                    <div class="tda-content">{{ formatStatus(ticket.order.status) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Paid At:</div>
                                    <div class="tda-content">{{ formatDate(ticket.order.paid_at) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">End Date:</div>
                                    <div class="tda-content">{{ formatDate(ticket.items[0]?.event?.end_date) }}</div>
                                </div>
                                
                            </div>
                        </div>
                         <div class="content-wrapper-section">
                            <span class="title-event">Payment Information</span>
                            <div class="w-100 mt-2" v-if="ticket?.order?.payment">
                                <div class="wrapper">
                                    <div class="tda">Transaction ID:</div>
                                    <div class="tda-content">{{ ticket.order.payment.transaction_id }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Amount:</div>
                                    <div class="tda-content">{{ formatCurrency(ticket.order.payment.amount ,ticket.order.payment.currency) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">From Account:</div>
                                    <div class="tda-content">{{ ticket.order.payment.from_account }}</div>
                                </div>
                                
                            </div>
                        </div>
                        
        
                    </div>
                    <div class="col-5 event-preview">
                        <div class="content-wrapper-section buy-wrapper">
                            <span class="title-event">Buyer Information</span>
                            <div class="w-100 mt-2" v-if="ticket?.order">
                                <div class="wrapper buyer justify-content-start align-items-center">
                                    <img :src="ticket.order.user.avatar" class="buyer-avatar" alt="">
                                    <div class="ms-2">
                                        <div class="name-buyer">{{ ticket.order.user.name }}</div>
                                        <div class="tda-content">{{ ticket.order.user.email }}</div>
                                    </div>
                                </div>                               
                                <div class="wrapper">
                                    <div class="tda">Contact Name:</div>
                                    <div class="tda-content">{{ ticket.order.contact_name }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Contact Email:</div>
                                    <div class="tda-content">{{ ticket.order.contact_email }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Contact Phone:</div>
                                    <div class="tda-content">{{ ticket.order.contact_phone || 'N/A' }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="content-wrapper-section">
                            <span class="title-event">Event Information</span>
                            <div class="w-100 mt-2" v-if="ticket?.items?.[0]?.event">
                                <div class="wrapper">
                                    <div class="tda">Event Title:</div>
                                    <div class="tda-content">{{ ticket.items[0]?.event?.title }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Venue:</div>
                                    <div class="tda-content">{{ ticket.items[0]?.event?.venue_name }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">Start Date:</div>
                                    <div class="tda-content">{{ formatDate(ticket.items[0]?.event?.start_date) }}</div>
                                </div>
                                <div class="wrapper">
                                    <div class="tda">End Date:</div>
                                    <div class="tda-content">{{ formatDate(ticket.items[0]?.event?.end_date) }}</div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        
            <div v-else>No ticket found.</div>

        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { TicketManagementStore } from '@/stores/TicketManagementStore.js'
import { useToast } from 'primevue/usetoast'
const route = useRoute()
const store = TicketManagementStore()
const ticket = ref(null)
const toast = useToast()

const markRedeemed = async (ticketInfo) => {
    if (!ticketInfo) return

    try {
        const res = await store.updateTicketStatus(ticketInfo.id, 'redeemed')

        if (!res.result) {
            toast.add({
                severity: 'error',
                summary: 'Redeem Failed',
                detail: res.message,
                life: 3000,
            })
            return
        }
        ticket.value = {
            ...ticket.value,
            ...res.data,
        }

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
            life: 3000,
        })
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err.response?.data?.message || 'Failed to redeem ticket.',
            life: 3000,
        })
    }
}
const formatStatus = (value) => {
    if (!value) return 'N/A'
    return value.charAt(0).toUpperCase() + value.slice(1)
}
const formatDate = (date) => {
    if (!date) return 'N/A'

    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Change to false for 24-hour format
    })
}
const formatCurrency = (amount, currency) => {
    const symbol = {
        USD: 'USD',
        KHR: 'KHR',
    }[currency] || ''

    return `${Number(amount).toLocaleString()} ${symbol}`
}
onMounted(async () => {
    const ticketCode = route.params.ticket_code

    if (ticketCode) {
        const ticketRes = await store.fetchScanPreview(ticketCode)
        ticket.value = ticketRes.data
        // console.log(ticketRes.data)
    }
})
</script>
