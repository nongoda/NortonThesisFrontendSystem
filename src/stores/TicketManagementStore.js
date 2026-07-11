import { defineStore } from 'pinia'
import axios from 'axios'

export const TicketManagementStore = defineStore('TicketManagementStore', {
  state: () => ({
    tickets: [],
    ticket: null,
    scanPreview: null,

    loading: false,
    error: null,

    paginate: {
      totalItem: 0,
      totalPage: 1,
      currentPage: 1,
      perPage: 10,
      hasMorePages: false,
    },
  }),

  actions: {
    getAuthHeader() {
      const token = localStorage.getItem('auth_token')

      return {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    },
	/**
	 * GET /ticket-event/event-sale-summary
	 */
	async fetchEventSalesSummary(params = {}) {
		this.loading = true
		this.error = null

		try {
			const response = await axios.get('/ticket-event/event-sale-summary', {
			...this.getAuthHeader(),
			params,
			})

			// If you want to store list locally (optional)
			this.events = response.data.data || []

			// If your API returns pagination like your backend res_paginate
			this.paginate = {
				totalItem: response.data.paginate?.total_item ?? 0,
				totalPage: response.data.paginate?.total_page ?? 1,
				currentPage: response.data.paginate?.current_page ?? 1,
				perPage: response.data.paginate?.per_page ?? 10,
				hasMorePages: response.data.paginate?.has_more_pages ?? false,
			}
			console.log(response.data)
			return response.data
		} catch (error) {
			this.error = error.response?.data?.message || error.message
			throw error
		} finally {
			this.loading = false
		}
	},
    /**
     * GET /ticket-event/system
     */
    async fetchSummary() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/ticket-event/payment-summary', {
          ...this.getAuthHeader(),
        })
        return response.data
      } catch (error) {
        // this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
	async fetchTickets(params = {}) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/ticket-event/system', {
          ...this.getAuthHeader(),
          params,
        })

        this.tickets = response.data.data || []

        this.paginate = {
          totalItem: response.data.paginate?.total_item ?? 0,
          totalPage: response.data.paginate?.total_page ?? 1,
          currentPage: response.data.paginate?.current_page ?? 1,
          perPage: response.data.paginate?.per_page ?? 10,
          hasMorePages: response.data.paginate?.has_more_pages ?? false,
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * PUT /ticket-event/status/{id}
     */
    async updateTicketStatus(id, status) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.put(
          `/ticket-event/status/${id}`,
          {
            status,
          },
          this.getAuthHeader(),
        )

        const updated = response.data?.data

        if (updated) {
          const index = this.tickets.findIndex((item) => item.id === updated.id)

          if (index !== -1) {
            this.tickets[index] = {
              ...this.tickets[index],
              ...updated,
            }
          }

          if (this.ticket?.id === updated.id) {
            this.ticket = {
              ...this.ticket,
              ...updated,
            }
          }
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * GET /ticket-event/scan-preview
     */
    async fetchScanPreview(ticketCode) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/ticket-event/scan-preview', {
          ...this.getAuthHeader(),
          params: {
            ticket_code: ticketCode,
          },
        })

        this.scanPreview = response.data.data

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    clearScanPreview() {
      this.scanPreview = null
    },
  },
})
