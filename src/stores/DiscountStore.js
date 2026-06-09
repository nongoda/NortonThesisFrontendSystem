import axios from 'axios';
import { defineStore } from 'pinia';
export const DiscountStore = defineStore('DiscountStore', {
    state: () => ({
        discounts: [],
        promotionTypes: [],

        paginate: {
            total_page: 1,
            current_page: 1,
            per_page: 10,
            has_pages: false
        }

    }),
    actions: {
        async fetchPromotionTypes(token) {

            const res = await axios.get(
                '/promotion/types',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            this.promotionTypes = res.data.data

            return res.data
        },
        async fetchAvailableTickets(token, eventId) {

            const res = await axios.get(
                `/discounts/available-ticket/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log('Available ticket:' ,res.data)
            return res.data
        },
        // ===========================================
        async createDiscount(token, payload) {

            const res = await axios.post(
                '/discounts',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res.data)
            return res.data
        },
        // ===========================================
        async fetchDiscounts(token, eventId) {

            const res = await axios.get(
                '/discounts',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        event_id: eventId
                    }
                }
            )

            this.discounts = res.data.data
            this.paginate = res.data.paginate

            return res.data
        },
        async updateDiscount(token, discountId, payload) {

            const res = await axios.put(
                `/discounts/${discountId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log('Updated discount:', res.data)
            return res.data
        },
        async deleteDiscount(token, id){
            const res = await axios.delete(`/discounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        }
    }

})