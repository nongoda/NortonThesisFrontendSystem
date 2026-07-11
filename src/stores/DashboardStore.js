import { defineStore } from 'pinia'
// import axios from '@/plugins/axios'
import axios from 'axios';

export const useDashboardStore = defineStore('dashboard', {
    actions: {
        async getSummary(token) {
            const res = await axios.get('/dashboard/summary', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return res.data
        },

        async getRevenueTrend(token, params = {}) {
            const res = await axios.get('/dashboard/revenue-trend', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            })

            return res.data
        },

        async getBestSellingEvents(token, params = {}) {
            const res = await axios.get('/dashboard/best-selling-events', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            })

            return res.data
        },

        async getSalesByCategory(token, params = {}) {
            const res = await axios.get('/dashboard/sales-by-category', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            })

            return res.data
        },

        async getTicketRedemption(token, params = {}) {
            const res = await axios.get('/dashboard/ticket-redemption', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            })

            return res.data
        },

        async getMostFavorite(token, params = {}) {
            const res = await axios.get('/dashboard/most-favorite', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            })

            return res.data
        },
    },
})
