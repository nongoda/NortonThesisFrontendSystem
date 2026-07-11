<template>
    <div class="container event create-event">
        <div class="title-step">Explore Song Details</div>
        <span class="sm-step mt-2 d-flex">
            View all the essential information about this song.
        </span>

        <!-- CONTENT -->
        <div class="table-content" style="margin-top: 15px;" v-if="song">

            <div class="row">

                <!-- LEFT -->
                <div class="col-7 event-preview">

                    <div class="content-wrapper-section position-relative">

                        <router-link :to="`/songs/update/${song.slug}`"
                            class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                            Edit
                        </router-link>

                        <div class="d-flex align-items-center">
                            <span class="title-event">
                                {{ song.title }}
                            </span>
                        </div>

                        <div class="w-100 mt-2">

                            <div class="wrapper">
                                <div class="tda">Slug:</div>
                                <span class="tda-content">{{ song.slug }}</span>
                            </div>

                            <div class="wrapper">
                                <div class="tda">Artist:</div>
                                <span class="tda-content">
                                    <img class="artist-image-profile td-co me-2" :src="song.artist.profile_image" />
                                    {{ song.artist?.stage_name || 'N/A' }}
                                </span>
                            </div>

                            <div class="wrapper">
                                <div class="tda">Category:</div>
                                <span class="tda-content">
                                    {{ song.category?.name || 'N/A' }}
                                </span>
                            </div>

                            <div class="wrapper align-items-start">
                                <div class="tda">Status:</div>
                                <div class="tda-content">
                                    <span :class="song.is_active ? 'text-success' : 'text-danger'" class="tda-content fw-medium">
                                        {{ song.is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </div>
                            </div>
                            <div class="wrapper align-items-start">
                                <div class="tda">Youtube URL:</div>
                                <div class="tda-content">
                                    <span class="tda-content">
                                        {{ song.youtube_url }}
                                    </span>
                                </div>
                            </div>
                            <div class="wrapper mb-0">
                                <div class="tda">Release Date:</div>
                                <span class="tda-content">
                                    {{ formatDate(song.release_date) }}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div class="content-wrapper-section">
                        <router-link :to="`/songs/update/${song.slug}`"
                            class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                            Edit
                        </router-link>
                        <span class="title-event">Description</span>
                        <div class="wrapper mb-0 mt-2">
                            <span class="tda-content">
                                {{ song.description}}
                            </span>
                        </div>
                    </div>

                </div>

                <!-- RIGHT -->
                <div class="col-5 event-preview">

                    <div class="content-wrapper-section">
                        <span class="title-event mb-2 d-flex">Insights</span>

                        <div class="wrapper">
                            <div class="tda">Created at:</div>
                            <span class="tda-content">
                                {{ formatDate(song.created_at) }}
                            </span>
                        </div>

                        <div class="wrapper">
                            <div class="tda">Updated at:</div>
                            <span class="tda-content">
                                {{ formatDate(song.updated_at) }}
                            </span>
                        </div>

                        <div class="wrapper align-items-center mb-0">
                            <div class="tda">Activated :</div>

                            <div class="status-update tda-content d-flex align-items-center">

                                <label class="switch mb-0">

                                    <input type="checkbox" :checked="song?.is_active == 1" @change="toggleSongStatus($event)" />

                                    <div class="slider">
                                        <div class="circle">

                                            <!-- X ICON -->
                                            <svg class="cross" viewBox="0 0 365.696 365.696" height="6" width="6">
                                                <path fill="currentColor"
                                                    d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25z" />
                                            </svg>

                                            <!-- CHECK ICON -->
                                            <svg class="checkmark" viewBox="0 0 24 24" height="10" width="10">
                                                <path fill="currentColor"
                                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                                            </svg>

                                        </div>
                                    </div>
                                </label>

                            </div>
                        </div>
                    </div>

                    <div class="content-wrapper-section position-relative">
                        <span class="title-event d-flex mb-2">Thumbnail</span>

                        <div v-if="song.thumbnail_url">
                            <img :src="song.thumbnail_url" class="thumbnail" />
                        </div>

                        <div v-else>
                            <img src="../../assets/images/No-Image.jpg" width="80%" />
                            <div class="tda mb-0">No Image Available</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { SongManagementStore } from '@/stores/SongManagementStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const songStore = SongManagementStore()
const toast = useToast()
// const songStore = 
const song = ref(null)

const fetchSong = async () => {
    try {
        const slug = route.params.slug
        const res = await songStore.fetchSongBySlug(slug)

        song.value = res.data
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load song',
            life: 3000
        })
    }
}

const toggleStatus = async (e) => {
    try {
        await songStore.toggleSongStatus(song.value.id)
        song.value.is_active = !song.value.is_active

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status updated',
            life: 2000
        })
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update failed',
            life: 3000
        })
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const toggleSongStatus = async (e) => {
    const isChecked = e.target.checked
    const newStatus = isChecked ? 1 : 0

    try {
        await songStore.toggleSongStatus(song.value.id)

        song.value.is_active = newStatus
    } catch (error) {
        e.target.checked = !isChecked
    }
}
onMounted(async () => {
    const slug = route.params.slug
    const res = await songStore.fetchSongBySlug(slug)

    song.value = res.data
    fetchSong()
})
</script>