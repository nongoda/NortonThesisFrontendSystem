<template>
    <div class="container create-event">
        <div class="title-step">Song Creation Wizard</div>
        <span class="sm-step mt-2 d-flex">
            Follow a guided process to create a song including metadata and media.
        </span>

        <form class="create-event-form cr">

            <div class="row">
                <!-- LEFT SIDE -->
                <div class="col-7 pe-5">

                    <!-- BASIC INFO -->
                    <div class="form-section pt-0">
                        <div class="title-form-input">Song Information</div>
                        <div class="ds-form-input">
                            Define basic song details such as title, artist, category, description, and release date.
                        </div>

                        <div class="mt-3">
                            <label>Title</label>
                            <input v-model="form.title" class="form-control"
                                :class="{ 'form-control-err': v$.title.$error }" placeholder="Enter song title" />

                            <span v-for="err in v$.title.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>
                        <div class="mt-3">
                            <label>Artist</label>

                            <div class="ui fluid search selection dropdown artist-dropdown"
                                :class="{ 'form-control-err': v$.artist_id.$error }">

                                <input type="hidden">
                                <i class="dropdown icon"></i>

                                <div class="default text">
                                    Select artist
                                </div>

                                <div class="menu">
                                    <div class="item" v-for="artist in artists" :key="artist.id"
                                        :data-value="artist.id">
                                        {{ artist.name }}
                                    </div>
                                </div>
                            </div>

                            <span class="warning-msg-input" v-for="err in v$.artist_id.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>

                        <div class="mt-3">
                            <label>Song Category</label>

                            <div class="ui fluid search selection dropdown category-dropdown"
                                :class="{ 'form-control-err': v$.song_category_id.$error }">

                                <input type="hidden">
                                <i class="dropdown icon"></i>

                                <div class="default text">
                                    Select category
                                </div>

                                <div class="menu">
                                    <div class="item" v-for="cat in categories" :key="cat.id" :data-value="cat.id">
                                        {{ cat.name }}
                                    </div>
                                </div>
                            </div>

                            <span class="warning-msg-input" v-for="err in v$.song_category_id.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                        <div class="mt-3">
                            <label>Release Date</label>

                            <FlatPickr v-model="form.release_date" class="form-control"
                                placeholder="Select release date" :config="{
                                    enableTime: false,
                                    dateFormat: 'Y-m-d',
                                    minDate: 'today'
                                }" />

                                <!-- <span v-for="err in v$.release_date.$errors" :key="err.$uid" class="warning-msg-input">
                                    {{ err.$message }}
                                </span> -->
                        </div>
                    </div>
                    <div class="form-section pt-3">
                        <div class="title-form-input">Song Description</div>
                        <div class="ds-form-input">
                            Write a clear and detailed description of the song, including its meaning, mood, or
                            background.
                        </div>
                        <div class="mt-3">
                            <textarea v-model="form.description" rows="6" class="form-control"
                                :class="{ 'form-control-err': v$.description.$error }"
                                placeholder="Write song description..."></textarea>

                            <span v-for="err in v$.description.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>
                    <div class="form-section pt-3">
                        <div class="title-form-input">YouTube Video URL</div>
                        <div class="ds-form-input">
                            Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=xxxx).
                        </div>
                        <div class="mt-3">
                            <input v-model="form.youtube_url" class="form-control"
                                :class="{ 'form-control-err': v$.youtube_url.$error }"
                                placeholder="https://www.youtube.com/watch?v=..." />

                            <span class="warning-msg-input" v-for="err in v$.youtube_url.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- RIGHT SIDE -->
                <div class="col-5">

                    <div class="form-section pt-0">
                        <div class="title-form-input">Thumbnail</div>
                        <div class="ds-form-input">
                            Upload a thumbnail image for the song.
                        </div>

                        <div class="mt-3">
                            <input type="file" id="thumbnail" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onThumbnailChange" />

                            <label for="thumbnail" class="img-cover"
                                :class="{ 'form-control-err-label': v$.thumbnail.$error }">

                                <!-- IMAGE PREVIEW -->
                                <div v-if="thumbnailPreview" class="position-relative w-100">

                                    <div
                                        class="change-img-hover-top d-flex align-items-center justify-content-center flex-column">

                                        <span class="change-img-text">
                                            Click to Change Thumbnail
                                        </span>

                                        <span class="label">
                                            Upload a song thumbnail image.
                                            Maximum file size: 2MB.
                                        </span>

                                    </div>

                                    <img :src="thumbnailPreview" style="width: 100%; border-radius: 8px;" />
                                </div>

                                <!-- EMPTY STATE -->
                                <div v-else class="d-flex flex-column align-items-center">
                                    <img src="../../assets/images/picture.png" class="img-icon" />
                                    <span class="form-label">Upload Thumbnail</span>
                                </div>

                            </label>

                            <!-- ✅ FILE SIZE DISPLAY (NEW PART) -->
                            <span class="label-sm" v-if="form.thumbnail">
                                {{ (form.thumbnail.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <!-- VALIDATION ERROR -->
                            <span class="warning-msg-input" v-for="err in v$.thumbnail.$errors" :key="err.$uid">
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

                <button type="button" class="btn-official btn-color" @click="submitSong">
                    Create Song
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { SongManagementStore } from '@/stores/SongManagementStore'
import { useToast } from 'primevue/usetoast'
import $ from 'jquery'
import FlatPickr from "vue-flatpickr-component"
import "flatpickr/dist/flatpickr.css"

const router = useRouter()
const songStore = SongManagementStore()
const toast = useToast()

/* ======================
   FORM
====================== */
const form = ref({
    artist_id: '',
    song_category_id: '',
    title: '',
    description: '',
    release_date: '',
    youtube_url: '',
    thumbnail: null
})

/* ======================
   PREVIEW
====================== */
const thumbnailPreview = ref(null)

/* ======================
   EXTRA DATA (dropdowns)
====================== */
const artists = computed(() => songStore.artists)
const categories = computed(() => songStore.categories)

/* ======================
   VALIDATION
====================== */
const maxImageSize = helpers.withMessage(
    'Thumbnail must not exceed 2MB',
    (value) => {
        if (!value) return true
        return value.size <= 2 * 1024 * 1024
    }
)
const isYoutubeUrl = helpers.withMessage(
    'Invalid YouTube URL format',
    (value) => {
        if (!value) return true

        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
        return regex.test(value)
    }
)
const rules = {
    artist_id: { required: helpers.withMessage('Artist is required', required) },
    song_category_id: { required: helpers.withMessage('Category is required', required) },
    title: { required: helpers.withMessage('Title is required', required) },
    description: { required: helpers.withMessage('Description is required', required) },
    // release_date: { required: helpers.withMessage('Release date is required', required) },
    thumbnail: {
        required: helpers.withMessage('Thumbnail is required', required),
        maxImageSize
    },
    youtube_url: {
        required: helpers.withMessage('YouTube URL is required', required),
        isYoutubeUrl
    }
}

const v$ = useVuelidate(rules, form)

/* ======================
   HANDLERS
====================== */
const onThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    form.value.thumbnail = file
    thumbnailPreview.value = URL.createObjectURL(file)

    v$.value.thumbnail.$touch()
}

const initArtistDropdown = async () => {
    await nextTick()

    $('.ui.dropdown.artist-dropdown').dropdown({
        fullTextSearch: true,
        onChange(value) {
            form.value.artist_id = value
            v$.value.artist_id.$touch()
        }
    })
}
const initCategoryDropdown = async () => {
    await nextTick()

    $('.ui.dropdown.category-dropdown').dropdown({
        fullTextSearch: true,
        onChange(value) {
            form.value.song_category_id = value
            v$.value.song_category_id.$touch()
        }
    })
}

/* ======================
   SUBMIT
====================== */
const submitSong = async () => {

    const isValid = await v$.value.$validate()
    if (!isValid) return

    const formData = new FormData()

    formData.append('artist_id', form.value.artist_id)
    formData.append('song_category_id', form.value.song_category_id)
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('release_date', form.value.release_date)
    formData.append('youtube_url', form.value.youtube_url || '')

    if (form.value.thumbnail) {
        formData.append('thumbnail', form.value.thumbnail)
    }

    const token = localStorage.getItem('auth_token')

    try {
        const res = await songStore.createSong(formData, token)

        if (!res.result) {
            toast.add({
                severity: 'error',
                summary: 'Create Failed',
                detail: res.message || 'Something went wrong',
                life: 3000
            })
            return
        }

        toast.add({
            severity: 'success',
            summary: 'Song Created',
            detail: 'Song has been created successfully',
            life: 3000
        })

        // RESET
        form.value = {
            artist_id: '',
            song_category_id: '',
            title: '',
            description: '',
            release_date: '',
            youtube_url: '',
            thumbnail: null
        }

        thumbnailPreview.value = null
        v$.value.$reset()

        router.push('/songs')

    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Unexpected error occurred',
            life: 3000
        })
    }
}

/* ======================
   OPTIONAL: FETCH DROPDOWNS
====================== */
onMounted(async () => {
    window.$ = window.jQuery = $
    await import('fomantic-ui-css/semantic.min.js')

    await songStore.fetchArtists()
    await songStore.fetchSongCategories()

    await initArtistDropdown()
    await initCategoryDropdown()

})
</script>