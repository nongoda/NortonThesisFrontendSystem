import { defineStore } from 'pinia'
import axios from 'axios'

export const SongManagementStore = defineStore('SongManagementStore', {
  state: () => ({
    songs: [],
    song: null,
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
    async toggleSongStatus(id) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.patch(`/songs/status/${id}`, {}, this.getAuthHeader())

        // update local state if song exists in list
        const updated = response.data?.data

        if (updated) {
          const index = this.songs.findIndex((s) => s.id === updated.id)

          if (index !== -1) {
            this.songs[index].is_active = updated.is_active
          }

          // also update selected song detail if it matches
          if (this.song?.id === updated.id) {
            this.song.is_active = updated.is_active
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
    // GET /songs
    async fetchSongs(params = {}) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/songs', {
          ...this.getAuthHeader(),
          params,
        })

        this.songs = response.data.data || []

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

    // GET /songs/detail/{slug}
    async fetchSongBySlug(slug) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`/songs/detail/${slug}`, this.getAuthHeader())

        this.song = response.data.data

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },

    // GET /songs/by-artist/{slug}
    async fetchSongsByArtist(slug) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`/songs/by-artist/${slug}`, this.getAuthHeader())

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },

    // POST /songs
    async createSong(formData) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/songs', formData, {
          ...this.getAuthHeader(),
          headers: {
            ...this.getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
          },
        })

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },

    // POST /songs/{id}
    async updateSong(id, formData) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(`/songs/${id}`, formData, {
          ...this.getAuthHeader(),
          headers: {
            ...this.getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
          },
        })

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },

    // DELETE /songs/{id}
    async deleteSong(id) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.delete(`/songs/${id}`, this.getAuthHeader())

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchArtists() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/artists', this.getAuthHeader())

        this.artists = response.data.data || []

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message

        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchSongCategories() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/song-category', this.getAuthHeader())

        this.categories = response.data.data || []

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
