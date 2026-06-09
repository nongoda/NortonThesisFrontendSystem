<template>
    <div class="container event create-event">
        <div class="title-step">Explore Artist Details</div>
        <span class="sm-step mt-2 d-flex">
            View all the essential information about this artist.
        </span>

        <!-- TABS -->
        <div class="table-content" style="margin-top: 15px;">
            <ul class="view-type d-inline-flex mb-0" v-if="artist?.slug">

                <li class="nav-item" style="margin-right: 4px;">
                    <router-link class="tab-table-type" :to="`/artists/preview/${artist.slug}`"
                        active-class="active">
                        Bacground Information
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="tab-table-type" :to="`/artists/songs/${artist.slug}`"
                        active-class="active">
                        Artist Works (Songs)
                    </router-link>
                </li>

            </ul>

            <!-- CONTENT -->
            <div style="margin-top: 15px;" v-if="artist">

                <div class="row">

                    <!-- LEFT -->
                    <div class="col-7 event-preview">

                        <!-- BASIC INFO -->
                        <div class="content-wrapper-section">
                            <router-link :to="`/artists/update/${artist.slug}`"
                                class="update-event-information btn btn-official btn-outline small-btn position-absolute">
                                <PenLine :stroke-width="1.75" /> Edit
                            </router-link>

                            <div class="d-flex align-items-center">
                                <img class="artist-image-profile me-2" :src="artist.profile_image" alt="">
                                <span class="title-event">
                                    {{ artist.stage_name }} / {{ artist.name }}
                                </span>
                            </div>

                            <div class="w-100 mt-2">

                                <div class="wrapper">
                                    <div class="tda">Genre:</div>
                                    <span class="tda-content">{{ artist.genre || 'N/A' }}</span>
                                </div>

                                <div class="wrapper">
                                    <div class="tda">Country:</div>
                                    <span class="tda-content">{{ artist.country || 'N/A' }}</span>
                                </div>

                                <div class="wrapper align-items-start mb-0">
                                    <div class="tda">Status:</div>
                                    <div class="tda-content">
                                        <span :class="artist.is_active ? 'text-success' : 'text-danger'">
                                            {{ artist.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="content-wrapper-section">
                            <span class="title-event">
                                Social Media
                            </span>

                            <div class="w-100 mt-2">

                                <!-- FACEBOOK -->
                                <div class="wrapper">
                                    <div class="tda">Facebook:</div>
                                    <div class="tda-content">
                                        <a v-if="artist?.facebook" :href="artist.facebook" target="_blank"
                                            class="text-primary">
                                            {{ artist.facebook }}
                                        </a>

                                        <span v-else>N/A</span>
                                    </div>
                                </div>

                                <!-- INSTAGRAM -->
                                <div class="wrapper mb-0">
                                    <div class="tda">Instagram:</div>
                                    <div class="tda-content">
                                        <a v-if="artist?.instagram" :href="artist.instagram" target="_blank"
                                            class="text-primary">
                                            {{ artist.instagram }}
                                        </a>

                                        <span v-else>N/A</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="content-wrapper-section">
                            <span class="title-event">Description</span>
                            <div class="w-100 mt-2">
                                <span class="tda-content">
                                    {{ artist.description || 'N/A' }}
                                </span>
                            </div>
                        </div>

                    </div>

                    <!-- RIGHT -->
                    <div class="col-5 event-preview">

                        
                        <!-- INSIGHTS -->
                        <div class="content-wrapper-section">
                            <span class="title-event mb-2 d-flex">Insights</span>

                            <div class="wrapper">
                                <div class="tda">Created at:</div>
                                <span class="tda-content">
                                    {{ formatDate(artist.created_at) }}
                                </span>
                            </div>

                            <div class="wrapper">
                                <div class="tda">Updated at:</div>
                                <span class="tda-content">
                                    {{ formatDate(artist.updated_at) }}
                                </span>
                            </div>
                            <div class="wrapper align-items-center mb-0">
                                <div class="tda">Activated :</div>

                                <div class="status-update tda-content d-flex align-items-center">

                                    <label class="switch mb-0">

                                        <input type="checkbox" :checked="artist?.is_active == 1"
                                            @change="toggleArtistStatus" />

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
                            <span class="title-event d-flex mb-2">Cover Image</span>
                            <div v-if="artist.cover_image">
                                <img :src="artist.cover_image" class="thumbnail" />
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
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArtistManagementStore } from '@/stores/ArtistManagementStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const artistStore = ArtistManagementStore()
const toast = useToast()

const artist = ref(null)

const fetchArtist = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const slug = route.params.slug

        const res = await artistStore.getArtistBySlug(token, slug)

        if (!res.success) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: res.error?.message || 'Failed to load artist',
                life: 3000
            })
            return
        }

        artist.value = res.data

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000
        })
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
const toggleArtistStatus = async (e) => {
    const isChecked = e.target.checked
    const newStatus = isChecked ? 1 : 0

    try {
        const token = localStorage.getItem('auth_token')

        if (newStatus === 1) {
            await artistStore.activateArtist(artist.value.id, token)
        } else {
            await artistStore.deactivateArtist(artist.value.id, token)
        }

        artist.value.is_active = newStatus

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: newStatus ? 'Artist Activated' : 'Artist Deactivated',
            life: 3000
        })

    } catch (error) {
        e.target.checked = !isChecked

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update status',
            life: 3000
        })
    }
}
onMounted(() => {
    fetchArtist()
})
</script>