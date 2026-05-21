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
        // async getAllEvent(token) {
        //     this.loading = true;

        //     try {
        //         const params = {
        //             search: this.filters.search || undefined,
        //             status: this.filters.status || undefined,
        //             sort_by: this.filters.sort_by,
        //             sort: this.filters.sort,
        //             per_page: this.filters.per_page,
        //             page: this.filters.page,
        //         };

        //         const res = await axios.get("/events", {
        //             params,
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });

        //         this.events = res.data.data.data;
        //         this.meta = res.data.data.meta;

        //         return res.data;
        //     } finally {
        //         this.loading = false;
        //     }
        // },
        // async getAllEvent(token, search, status, sort_by, sort, per_page, page) {
        //     const res = await axios.get(
        //         `/events?search=${search}&status=${status}&sort_by=${sort_by}&sort=${sort}&per_page=${per_page}&page=${page}`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         }
        //     );

        //     this.events = res.data.data; // 👈 important (because paginated)
        //     return res.data;
        // }
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
        }


    }
});