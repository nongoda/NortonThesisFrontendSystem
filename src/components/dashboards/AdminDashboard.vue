<template>
    <div class="row summary-total justify-content-between" style="padding-inline: 10px;">
        <div class="col-3">
            <div class="content-wrapper">
                <div class="top d-flex align-items-center justify-content-between">
                    <div class="title-total">Total Revenue</div>
                    <BanknoteArrowUp stroke-width="1.75" size="18" />
                </div>

                <span class="total-num">
                    kkk
                </span>

                <span class="month-update d-flex align-items-center">
                    This month's total:
                    <span class="num">
                        jij Events
                    </span>
                </span>
            </div>
        </div>
        <div class="col-3">
            <div class="content-wrapper">
                <div class="top d-flex align-items-center justify-content-between">
                    <div class="title-total">Total Orders</div>
                    <shuffle :size="18" :stroke-width="1.75" />
                </div>
                <span class="total-num">
                    kkkk
                </span>
                <span class="month-update d-flex align-items-center">
                    This month's total:
                    <span class="num">
                        jjjj Events
                    </span>
                </span>
            </div>
        </div>
        <div class="col-3">
            <div class="content-wrapper">
                <div class="top d-flex align-items-center justify-content-between">
                    <div class="title-total">Registered Users</div>
                    <users-round :size="18" :stroke-width="1.75" />
                </div>
                <span class="total-num">
                    ;ll
                </span>
                <span class="month-update d-flex align-items-center">
                    This month's total:
                    <span class="num">
                        ll Events
                    </span>
                </span>
            </div>
        </div>
        <div class="col-3">
            <div class="content-wrapper">
                <div class="top d-flex align-items-center justify-content-between">
                    <div class="title-total">Published Events</div>
                    <audio-waveform :size="18" :stroke-width="1.75" />
                </div>
                <span class="total-num">
                    llll
                </span>
                <span class="month-update d-flex align-items-center">
                    This month's total:
                    <span class="num">
                        kkkk Events
                    </span>
                </span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/DashboardStore'
// import { useAuthStore } from '@/stores/AuthStore'

const dashboardStore = useDashboardStore()
// const authStore = useAuthStore()

const summary = ref(null)
const revenueTrend = ref([])
const bestSellingEvents = ref([])
const salesByCategory = ref([])
const ticketRedemption = ref([])
const mostFavorite = ref([])

onMounted(async () => {
    const token = localStorage.getItem('auth_token')

    summary.value = await dashboardStore.getSummary(token)
    console.log(summary.value)
    revenueTrend.value = await dashboardStore.getRevenueTrend(token)
    bestSellingEvents.value = await dashboardStore.getBestSellingEvents(token)
    salesByCategory.value = await dashboardStore.getSalesByCategory(token)
    ticketRedemption.value = await dashboardStore.getTicketRedemption(token)
    mostFavorite.value = await dashboardStore.getMostFavorite(token)



})
</script>