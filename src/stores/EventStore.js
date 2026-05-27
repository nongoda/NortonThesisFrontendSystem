import axios from "axios";
import { defineStore } from "pinia";
export const EventStore = defineStore('EventStore', {
    state: () => ({
        summary: null,  
        events: [],
        paginate: {
            total_item: 0,
            total_page: 1,
            current_page: 1,
            per_page: 10,
            has_more_pages: false,
            has_pages: false
        },
        loading: false,
    }),
    actions:{
        async getData(token) {

            const res = await axios.get('/summary/events', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        async getAllEvent(
            token,
            search = '',
            status = '',
            sort_by = 'id',
            sort = 'desc',
            per_page = 10,
            page = 1
        ) {

            this.loading = true;

            try {

                const res = await axios.get('/events', {

                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    params: {
                        search,
                        status,
                        sort_by,
                        sort,
                        per_page,
                        page,
                    }
                });
                this.events = res.data.data || [];
                this.paginate = res.data.paginate || {
                    total_item: 0,
                    total_page: 1,
                    current_page: 1,
                    per_page: 10,
                    has_more_pages: false,
                    has_pages: false
                };
                return res.data;

            } finally {

                this.loading = false;
            }
        },
        async getAllCategories(){
            const res = await axios.get('/categories');
            return res.data;
        },
        async getAllArtists(){
            const res = await axios.get('/artists');
            return res.data;
        },
        async getEventBySlug(token, slug){
            const res = await axios.get(`/events/slug/${slug}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
            return res.data;
        },
        async createEvent(token, payload) {
            try {
                const res = await axios.post('/events', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                return res.data;

            } catch (error) {
                throw error.response?.data || error;
            }
        },
        async updateEvent(token, payload, id) {
            try {
                // payload.append('_method', 'PUT') 
                const res = await axios.post(`/events/update/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return res.data;
            } catch (error) {
                throw error.response?.data || error;
            }
        },
        async updateStatus(id, token, status) {
            try {
                const res = await axios.post(
                    `/events/update-status/${id}`,
                    { status },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                return res.data;
            } catch (error) {
                throw error; // ✅ let component handle it
            }
        },
        async createTicket(token, payload) {
            try {
                const res = await axios.post(
                    '/ticket-prices',
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data

            } catch (error) {

                throw error.response?.data || error

            }
        },
        async updateTicket(ticketId, token, payload) {

            try {

                const res = await axios.put(
                    `/ticket-prices/${ticketId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data

            } catch (error) {

                throw error.response?.data || error

            }

        },
        async deleteTicket(ticketId, token) {

            try {

                const res = await axios.delete(
                    `/ticket-prices/${ticketId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data

            } catch (error) {

                throw error.response?.data || error

            }

        },
        async deleteEvent(eventId, token) {

            try {

                const res = await axios.delete(
                    `/events/${eventId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data

            } catch (error) {

                throw error.response?.data || error

            }

        },
        async getTicketTypes() {
            try{
                const res = await axios.get('/ticket-types')
                return res.data

            }catch(error){
                throw error;
            }
        }



    }
});
