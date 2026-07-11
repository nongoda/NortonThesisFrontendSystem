import { defineStore } from 'pinia'
import axios from 'axios'

export const ReportManagementStore = defineStore('ReportManagementStore', {
  state: () => ({
    reports: [],
    report: null,
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

    // GET /contact-report
    async fetchReports(params = {}) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/contact-report', {
          ...this.getAuthHeader(),
          params,
        })

        this.reports = response.data.data || []

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

    // GET /contact-report/{id}
    async fetchReportById(id) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`/contact-report/${id}`, this.getAuthHeader())

        this.report = response.data.data

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // PUT /contact-report/status/{id}
    async updateStatus(id, status) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.put(
          `/contact-report/status/${id}`,
          {
            status,
          },
          this.getAuthHeader(),
        )

        const updated = response.data?.data

        if (updated) {
          const index = this.reports.findIndex((item) => item.id === updated.id)

          if (index !== -1) {
            this.reports[index] = {
              ...this.reports[index],
              ...updated,
            }
          }

          if (this.report?.id === updated.id) {
            this.report = {
              ...this.report,
              ...updated,
            }
          }
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

    // DELETE /contact-report/{id}
    async deleteReport(id) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.delete(`/contact-report/${id}`, this.getAuthHeader())

        this.reports = this.reports.filter((report) => report.id !== id)

        if (this.report?.id === id) {
          this.report = null
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
