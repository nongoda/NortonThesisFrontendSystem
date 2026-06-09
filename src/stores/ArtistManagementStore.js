import axios from 'axios'
import { defineStore } from 'pinia'

export const ArtistManagementStore = defineStore('ArtistManagementStore', {
    state: () => ({
        artists: [],
        artist: null,
        paginate: {
            per_page: 4,
            total_page: 1,
            current_page: 1,
            has_pages: false
        }
    }),

    actions: {

        async getArtists(token, params = {}) {

            const res = await axios.get('/artists/list?page=2', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            })
            console.log(res.data)
            this.artists = res.data.data || []
            // this.paginate = res.data.paginate || {}
            this.paginate = {
                totalItem: res.data.paginate?.total_item ?? 0,
                totalPage: res.data.paginate?.total_page ?? 1,
                currentPage: res.data.paginate?.current_page ?? 1,
                perPage: res.data.paginate?.per_page ?? 10,
                hasMorePages: res.data.paginate?.has_more_pages ?? false
            }
            return res.data
        },

        async createArtist(token, formData) {

            return axios.post('/artists', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => ({
                    success: true,
                    data: res.data
                }))
                .catch(error => ({
                    success: false,
                    error: error?.response?.data
                }))
        },
        async updateArtist(id, token, formData) {
            try {
                const res = await axios.post(`/artists/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

                return {
                    success: true,
                    data: res.data
                }
            } catch (error) {
                return {
                    success: false,
                    error: error?.response?.data
                }
            }
        },

        async activateArtist(id, token) {

            const res = await axios.put(
                `/artists/activate/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data
        },
        async getArtistBySlug(token, slug) {
            try {
                const res = await axios.get(`/artists/by-slug/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                this.artist = res.data.data || null

                return {
                    success: true,
                    data: res.data.data
                }

            } catch (error) {
                return {
                    success: false,
                    error: error?.response?.data
                }
            }
        },
        async deactivateArtist(id, token) {

            const res = await axios.put(
                `/artists/deactivate/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data
        },

        async deleteArtist(id, token) {

            const res = await axios.delete(
                `/artists/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data
        }
    }
})