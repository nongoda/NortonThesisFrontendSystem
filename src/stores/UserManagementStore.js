import axios from 'axios';
import { defineStore } from 'pinia';
export const UserManagementStore = defineStore('UserManagementStore', {
    state: () => ({
        users: [],
        paginate: {
            total_page: 1,
            current_page: 1,
            per_page: 10,
            has_pages: false
        }

    }),
    actions: {
        async getAllUsers(token, page = 1, search = '', role = '') {
            const res = await axios.get('/user-account/get-user', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page,
                    search,
                    role
                }
            })

            this.users = res.data.data || []
            this.paginate = res.data.paginate || {}
            return res.data
        },
        async getCustomers(token) {

            const res = await axios.get('/user-account/get-customer', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            this.customers = res.data.data || []

            return res.data
        },
        async createAccount(token, formData) {

            const res = await axios.post(
                '/user-account',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return res.data
        },
        async blockUser(id, token) {

            const res = await axios.put(
                `/user-account/block/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data
        },
        async unblockUser(id, token) {

            const res = await axios.put(
                `/user-account/unblock/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data
        },
        async deleteUser(id, token) {

            const res = await axios.delete(
                `/user-account/${id}`,
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