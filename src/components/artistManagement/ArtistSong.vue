<template>
    <div class="container event create-event">
        <div class="title-step">Explore Artist Details</div>
        <span class="sm-step mt-2 d-flex">
            View all the essential information about this artist.
        </span>
    </div>
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
onMounted(async () => {
    await fetchArtist()
})
</script>