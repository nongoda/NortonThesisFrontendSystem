<template>
    <div class="container create-event">
        <div class="title-step">Update Song</div>
        <span class="sm-step mt-2 d-flex">
            Update song information including metadata and media.
        </span>

        <form class="create-event-form cr pt-0">

            <div class="row">

                <!-- LEFT SIDE -->
                <div class="col-7 pe-5">

                    <!-- BASIC INFO -->
                    <div class="form-section pt-0">
                        <div class="title-form-input">Song Information</div>
                        <div class="ds-form-input">
                            Update basic song details such as title, artist, category, and release date.
                        </div>

                        <!-- TITLE -->
                        <div class="mt-3">
                            <label>Title</label>
                            <input v-model="form.title" class="form-control"
                                :class="{ 'form-control-err': v$.title.$error }" placeholder="Enter song title" />

                            <span v-for="err in v$.title.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <!-- ARTIST -->
                        <div class="mt-3">
                            <label>Artist</label>

                            <div class="ui fluid search selection dropdown artist-dropdown"
                                :class="{ 'form-control-err': v$.artist_id.$error }">

                                <input type="hidden">
                                <i class="dropdown icon"></i>

                                <div class="default text">Select artist</div>

                                <div class="menu">
                                    <div class="item" v-for="artist in songStore.artists" :key="artist.id"
                                        :data-value="artist.id">
                                        {{ artist.name }}
                                    </div>
                                </div>
                            </div>

                            <span v-for="err in v$.artist_id.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <!-- CATEGORY -->
                        <div class="mt-3">
                            <label>Song Category</label>

                            <div class="ui fluid search selection dropdown category-dropdown"
                                :class="{ 'form-control-err': v$.song_category_id.$error }">

                                <input type="hidden">
                                <i class="dropdown icon"></i>

                                <div class="default text">Select category</div>

                                <div class="menu">
                                    <div class="item" v-for="cat in songStore.categories" :key="cat.id" :data-value="cat.id">
                                        {{ cat.name }}
                                    </div>
                                </div>
                            </div>

                            <span v-for="err in v$.song_category_id.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <!-- RELEASE DATE -->
                        <div class="mt-3">
                            <label>Release Date</label>

                            <FlatPickr v-model="form.release_date" class="form-control" :config="{
                                enableTime: false,
                                dateFormat: 'Y-m-d'
                            }" />
                        </div>
                    </div>

                    <!-- DESCRIPTION -->
                    <div class="form-section pt-3">
                        <div class="title-form-input">Song Description</div>
                            <div class="ds-form-input mb-3">
                            Write a clear and detailed description of the song, including its meaning, mood, or
                            background.
                        </div>
                        <textarea v-model="form.description" rows="6" class="form-control"
                            :class="{ 'form-control-err': v$.description.$error }"
                            placeholder="Write song description..."></textarea>

                        <span v-for="err in v$.description.$errors" :key="err.$uid" class="warning-msg-input">
                            {{ err.$message }}
                        </span>
                    </div>

                    <!-- YOUTUBE -->
                    <div class="form-section pt-3">
                        <div class="title-form-input">YouTube Video URL</div>
                        <div class="ds-form-input">
                            Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=xxxx).
                        </div>
                        <input v-model="form.youtube_url" class="form-control mt-3"
                            placeholder="https://www.youtube.com/watch?v=..." />
                    </div>

                </div>

                <!-- RIGHT SIDE -->
                <div class="col-5">
                    <div class="form-section pt-0">
                        <div class="title-form-input">Thumbnail</div>
                        <div class="ds-form-input">
                            Update song thumbnail image.
                        </div>

                        <div class="mt-3">

                            <input type="file" id="thumbnail" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onThumbnailChange" />

                            <label for="thumbnail" class="img-cover"
                                :class="{ 'form-control-err-label': v$.thumbnail?.$error }">

                                <!-- PREVIEW (NEW OR EXISTING IMAGE) -->
                                <div v-if="thumbnailPreview || form.thumbnail_url" class="position-relative w-100">
                                    <div
                                        class="change-img-hover-top d-flex align-items-center justify-content-center flex-column">
                                        <span class="change-img-text">
                                            Click to Change Thumbnail
                                        </span>

                                        <span class="label">
                                            Upload a song thumbnail image. Maximum file size: 2MB.
                                        </span>
                                    </div>

                                    <img :src="thumbnailPreview || form.thumbnail_url"
                                        style="width: 100%; border-radius: 8px;" />
                                </div>

                                <!-- EMPTY STATE ONLY IF NO IMAGE EXISTS -->
                                <div v-else class="d-flex flex-column align-items-center">
                                    <img src="../../assets/images/picture.png" class="img-icon" />
                                    <span class="form-label">Upload Thumbnail</span>
                                </div>

                            </label>

                            <!-- SIZE (ONLY WHEN NEW FILE SELECTED) -->
                            <span v-if="form.thumbnail" class="label-sm">
                                {{ (form.thumbnail.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <!-- VALIDATION -->
                            <span v-for="err in v$.thumbnail?.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>

                        </div>
                    </div>
                </div>
            </div>

            <!-- ACTION -->
            <div class="d-flex align-items-center mt-4">
                <router-link to="/songs" class="back-page me-3">
                    <ArrowLeft :size="18" :stroke-width="1.75" /> Back
                </router-link>

                <button type="button" class="btn-official btn-color" @click="updateSong">
                    Update Song
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SongManagementStore } from '@/stores/SongManagementStore'
import { useToast } from 'primevue/usetoast'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import $ from 'jquery'
import FlatPickr from 'vue-flatpickr-component'

const route = useRoute()
const router = useRouter()
const songStore = SongManagementStore()
const toast = useToast()

const song = ref(null)
const thumbnailPreview = ref(null)

const form = ref({
    id: null,
    title: '',
    artist_id: '',
    song_category_id: '',
    description: '',
    release_date: '',
    youtube_url: '',
    thumbnail: null
})


/* VALIDATION */
const rules = {
    title: { required: helpers.withMessage('Title required', required) },
    artist_id: { required: helpers.withMessage('Artist required', required) },
    song_category_id: { required: helpers.withMessage('Category required', required) },
    description: { required: helpers.withMessage('Description required', required) }
}

const v$ = useVuelidate(rules, form)

const fetchSong = async () => {
    try {
        const slug = route.params.slug

        const res = await songStore.fetchSongBySlug(slug)

        const song = res.data

        form.value = {
            id: song.id,
            artist_id: song.artist?.id,
            song_category_id: song.category?.id,
            title: song.title,
            description: song.description,
            release_date: song.release_date?.split('T')[0],
            youtube_url: song.youtube_url,
            thumbnail: null,
            thumbnail_url: song.thumbnail_url
        }

        await nextTick()

        $('.artist-dropdown').dropdown(
            'set selected',
            String(song.artist?.id)
        )

        $('.category-dropdown').dropdown(
            'set selected',
            String(song.category?.id)
        )

    } catch (error) {
        console.error(error)
    }
}

const initArtistDropdown = async () => {
    await nextTick()

    $('.ui.dropdown.artist-dropdown').dropdown('destroy')

    $('.ui.dropdown.artist-dropdown').dropdown({
        fullTextSearch: true,
        onChange(value) {
            form.value.artist_id = value
            v$.value.artist_id?.$touch()
        }
    })
}

const initCategoryDropdown = async () => {
    await nextTick()

    $('.ui.dropdown.category-dropdown').dropdown('destroy')

    $('.ui.dropdown.category-dropdown').dropdown({
        fullTextSearch: true,
        onChange(value) {
            form.value.song_category_id = value
            v$.value.song_category_id?.$touch()
        }
    })
}
/* SWITCH */
const toggleSongStatus = async () => {
    try {
        await store.toggleSongStatus(song.value.id)
        song.value.is_active = song.value.is_active ? 0 : 1

        toast.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Status updated',
            life: 2000
        })
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update status',
            life: 3000
        })
    }
}

/* FILE */
const onThumbnailChange = (e) => {
    const file = e.target.files[0]
    form.value.thumbnail = file
    thumbnailPreview.value = URL.createObjectURL(file)
}

/* UPDATE */
const updateSong = async () => {
    const valid = await v$.value.$validate()
    if (!valid) return

    const fd = new FormData()

    fd.append('title', form.value.title)
    fd.append('artist_id', form.value.artist_id)
    fd.append('song_category_id', form.value.song_category_id)
    fd.append('description', form.value.description)
    fd.append('release_date', form.value.release_date || '')
    fd.append('youtube_url', form.value.youtube_url || '')

    if (form.value.thumbnail) {
        fd.append('thumbnail', form.value.thumbnail)
    }

    try {
    const res = await songStore.updateSong(form.value.id, fd)

        console.log('SUCCESS', res.data)

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Song updated',
            life: 2000
        })

        router.push(`/songs/preview/${res.data.slug}`)

    } catch (err) {
        console.error(err)

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update failed',
            life: 3000
        })
    }
}

/* FORMAT */
const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US') : 'N/A'

onMounted(async () => {
    window.$ = window.jQuery = $

    await import('fomantic-ui-css/semantic.min.js')

    await songStore.fetchArtists()
    await songStore.fetchSongCategories()

    await initArtistDropdown()
    await initCategoryDropdown()

    await fetchSong()

    $('.artist-dropdown').dropdown(
        'set selected',
        String(form.value.artist_id)
    )

    $('.category-dropdown').dropdown(
        'set selected',
        String(form.value.song_category_id)
    )
})
</script>