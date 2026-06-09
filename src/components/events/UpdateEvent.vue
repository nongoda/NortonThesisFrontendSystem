<template>
    <div class="container event create-event">
        <div class="title-step">Explore Event Details</div>
        <span class="sm-step mt-2 d-flex">View all the essential information about this event.</span>
        <div class="table-content" style="margin-top: 15px;">
            <ul class="view-type d-inline-flex mb-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation" style="margin-right: 4px;">
                    <router-link to="" class="tab-table-type active">Event Information</router-link>
                </li>
                <li class="nav-item" role="presentation">
                    <router-link to="" class="tab-table-type">Ticket information</router-link>
                </li>
            </ul>
            <form action="" class="create-event-form cr" style="margin-top: 15px;">
                <div class="row">
                    <div class="col-7 pe-5">
                        <div class="form-section pt-0">
                            <div class="">
                                <div class="title-form-input">Event Information</div>
                                <div class="ds-form-input">Define the core details of your event
                                    including
                                    title,
                                    description, schedule, and category to clearly present what your
                                    event is
                                    about.
                                </div>
                            </div>
                            <div class="">
                                <div>
                                    <label for="">Title</label>
                                    <input type="text" class="form-control"
                                        :class="{ 'form-control-err': v$.title.$error }"
                                        placeholder="Input the event title here" v-model="form.title">
                                    <span class="warning-msg-input" v-for="err in v$.title.$errors" :key="err.$uid">
                                        {{ err.$message }}
                                    </span>
                                </div>
                                <div class="mt-3">
                                    <label for="">Short Description</label>
                                    <div class="position-relative">
                                        <span class="position-absolute count-text"
                                            :class="{ 'text-danger': form.short_description.length > 255 }">
                                            {{ form.short_description.length }}/255
                                        </span>
                                        <textarea class="form-control" style="resize: none;" rows="4"
                                            placeholder="Input the short descript here" v-model="form.short_description"
                                            :class="{ 'form-control-err': v$.short_description.$error }"></textarea>

                                        <span class="warning-msg-input" v-for="err in v$.short_description.$errors"
                                            :key="err.$uid">
                                            {{ err.$message }}
                                        </span>
                                    </div>
                                    <div class="mt-3">
                                        <label for="">Category</label>
                                        <div class="ui fluid search selection dropdown category-update-dropdown"
                                            :class="{ 'form-control-err': v$.category_id.$error }">
                                            <input type="hidden">
                                            <i class="dropdown icon"></i>
                                            <!-- <div class="default text">
                                                Select event category
                                            </div>  -->
                                            <div class="text default">
                                                {{ selectedCategoryName || 'Select event category' }}
                                            </div>
                                            <div class="menu">
                                                <div class="item" v-for="category in categories" :key="category.id"
                                                    :data-value="category.id">
                                                    {{ category.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <span class="warning-msg-input" v-for="err in v$.category_id.$errors"
                                            :key="err.$uid">
                                            {{ err.$message }}
                                        </span>
                                    </div>
                                    <div class="w-100 d-flex mt-3">
                                        <div class="w-50 pe-3">
                                            <label for="">Start date</label>
                                            <FlatPickr v-model="form.start_date" class="form-control"
                                                placeholder="Input the start date here"
                                                :class="{ 'form-control-err': v$.start_date.$error }" :config="{
                                                    enableTime: true,
                                                    dateFormat: 'Y-m-d H:i',
                                                    time_24hr: true,
                                                    minDate: 'today'
                                                }" />
                                            <span class="warning-msg-input" v-for="err in v$.start_date.$errors"
                                                :key="err.$uid">
                                                {{ err.$message }}
                                            </span>
                                        </div>
                                        <div class="w-50 ps-3">
                                            <label for="">End date</label>
                                            <FlatPickr v-model="form.end_date"
                                                :class="{ 'form-control-err': v$.end_date.$error }" class="form-control"
                                                placeholder="Input the end date here" :config="{
                                                    enableTime: true,
                                                    dateFormat: 'Y-m-d H:i',
                                                    time_24hr: true,
                                                    minDate: form.start_date || 'today'
                                                }" />
                                            <span class="warning-msg-input" v-for="err in v$.end_date.$errors"
                                                :key="err.$uid">
                                                {{ err.$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="form-section">
                            <div class="">
                                <div class="title-form-input">Venue & Location</div>
                                <div class="ds-form-input">Specify where your event will take place
                                    by providing
                                    venue
                                    details and precise location coordinates.</div>
                            </div>
                            <div class="">
                                <div>
                                    <label for="">Venue name</label>
                                    <input type="text" class="form-control"
                                        :class="{ 'form-control-err': v$.venue_name.$error }"
                                        placeholder="Input the venue name here" v-model="form.venue_name">
                                    <span class="warning-msg-input" v-for="err in v$.venue_name.$errors"
                                        :key="err.$uid">
                                        {{ err.$message }}
                                    </span>
                                </div>
                                <div class="mt-3">
                                    <label for="">Address</label>
                                    <!-- :class="{ 'form-control-err': v$.address.$error }" -->
                                    <input type="text" class="form-control mb-3"
                                        placeholder="Input the venue address here" v-model="form.address">
                                        <span class="warning-msg-input" v-for="err in v$.address.$errors" :key="err.$uid">
                                        {{ err.$message }}
                                    </span>
                                </div>
                                <div class="w-100 d-flex">
                                    <div class="w-50 pe-3">
                                        <label for="">Latitude</label>
                                        <input type="text" class="form-control mb-3"
                                            :class="{ 'form-control-err': v$.latitude.$error }"
                                            placeholder="Input the latitude here" v-model="form.latitude">
                                        <span class="warning-msg-input" v-for="err in v$.latitude.$errors"
                                            :key="err.$uid">
                                            {{ err.$message }}
                                        </span>
                                    </div>
                                    <div class="w-50 ps-3">
                                        <label for="">Longitude</label>
                                        <input type="text" class="form-control mb-3"
                                            :class="{ 'form-control-err': v$.longitude.$error }"
                                            placeholder="Input the longitude here" v-model="form.longitude">

                                        <span class="warning-msg-input" v-for="err in v$.longitude.$errors"
                                            :key="err.$uid">
                                            {{ err.$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="form-section" style="border-bottom: none!important;">
                            <div class="">
                                <div class="title-form-input">Description</div>
                                <div class="ds-form-input">Write a clear summary of your event so
                                    users
                                    understand what it is about, what to expect, and its purpose.
                                </div>
                            </div>
                            <div class="">
                                <textarea class="form-control mt-2" name="" id="" rows="15" style="resize: none;"
                                    :class="{ 'form-control-err': v$.description.$error }"
                                    placeholder="Enter the event description here"
                                    v-model="form.description"></textarea>
                                <!-- <span class="warning-msg-input" v-if="v$.description.$error">
                                    {{ v$.description.$errors[0].$message }}
                                </span> -->
                                <span class="warning-msg-input" v-for="err in v$.description.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-section pt-0">
                            <div class="">
                                <div class="title-form-input">Media</div>
                                <div class="ds-form-input">Upload visual content such as images to
                                    represent
                                    your event and make it more attractive to users.</div>
                            </div>
                            <div class="mt-3">
                                <input type="file" id="thumbnail" class="form-control" style="display: none;"
                                    accept="image/png, image/jpeg, image/jpg, image/webp" @change="onFileChange" />
                                <label for="thumbnail" class="img-cover"
                                    :class="{ 'form-control-err-label': v$.thumbnail.$error || thumbnailFileError }">
                                    <div v-if="thumbnailPreview && thumbnailPreview.length"
                                        class="position-relative w-100">
                                        <div
                                            class="change-img-hover-top d-flex align-items-center justify-content-center flex-column">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <MousePointerClick size="25" :stroke-width="1.75" />
                                                <span class="change-img-text">Click to Upload
                                                    Thumbnail</span>
                                            </div>
                                            <span class="label">Upload an event cover image to
                                                represent your event.
                                                Maximum file size: 2MB.</span>
                                        </div>
                                        <img :src="thumbnailPreview" style="width: 100%; border-radius: 8px;" />

                                    </div>

                                    <div v-else class="d-flex flex-column align-items-center">
                                        <img src="../../assets/images/picture.png" class="img-icon" alt="">
                                        <span class="form-label">Upload Event Thumbnail</span>
                                        <small></small>
                                    </div>
                                </label>
                                <span class="label-sm" v-if="form.thumbnail">
                                    {{
                                        (form.thumbnail.size / 1024 / 1024).toFixed(2)
                                    }} MB / 2MB
                                </span>
                                <span class="warning-msg-input" v-if="thumbnailFileError">
                                    {{ thumbnailFileError }}
                                </span>
                                <span class="warning-msg-input" v-for="err in v$.thumbnail.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="">
                                <div class="title-form-input">Artists</div>
                                <div class="ds-form-input">Select and assign artists who will be
                                    featured or
                                    participating in this event.</div>
                            </div>
                            <div class="mt-3">
                                <!-- DROPDOWN -->
                                <div class="ui multiple fluid search selection dropdown artist-update-dropdown">
                                    <input type="hidden" style="display: none;">
                                    <i class="dropdown icon"></i>
                                    <div class="default text">
                                        Select artists
                                    </div>

                                    <div class="menu">
                                        <div class="item" v-for="artist in availableArtists" :key="artist.id"
                                            :data-value="artist.id" @click="selectArtist(artist)">
                                            <div class="d-flex align-items-center">
                                                <img :src="artist.avatar" class="artist-avatar" />
                                                <span class="artist-name">{{ artist.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <transition-group name="artist-chip" tag="div" class="selected-artists-wrapper">
                                        <div class="selected-artist" v-for="artist in selectedArtists" :key="artist.id">
                                            <img :src="artist.avatar || 'https://i.pinimg.com/736x/4c/42/e7/4c42e76f3be7c11d387ac24f45a78efc.jpg'"
                                                class="artist-avatar" />
                                            <span class="artist-name">{{ artist.name }}</span>
                                            <button type="button" @click.prevent="removeArtist(artist.id)"
                                                class="remove-selection">
                                                <X :size="18" />
                                            </button>
                                        </div>
                                    </transition-group>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="d-flex align-items-center">
                    <a href="#" class="back-page me-3" @click.prevent="goBack">
                        <ArrowLeft :size="18" :stroke-width="1.75" />
                        Back to previous page
                    </a>
                    <button class="btn-official btn-color " type="button" @click="submitEvent">Update event</button>
                </div>
            </form>
        </div>
    </div>


</template>
<style scope>
.animate__animated {
    --animate-duration: 0.35s;
}
</style>
<script setup>
import { useRoute } from 'vue-router'
import { EventStore } from '@/stores/EventStore'
// ===========================================
// import { EventStore } from '@/stores/EventStore';
import { ref, onMounted, nextTick, watch } from 'vue';
import $ from 'jquery'
import FlatPickr from "vue-flatpickr-component"
import "flatpickr/dist/flatpickr.css"
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'
import {
    required,
    maxLength,
    helpers
} from '@vuelidate/validators'
import { computed } from 'vue'
// ===========================================
const router = useRouter()
const selectedCategoryName = ref('')
const route = useRoute()
const eventStore = EventStore()
const event = ref(null)
const loading = ref(true)
const showEditForm = ref(true)
// ==========================================
onMounted(async () => {


    window.$ = window.jQuery = $

    await import('fomantic-ui-css/semantic.min.js')

    await fetchCategories()
    await fetchArtists()
    await fetchEvent()
})
// ==========================================
// Start code
const categories = ref([])
const artists = ref([])
const selectedArtists = ref([])
const thumbnailFileError = ref('')
const thumbnailPreview = ref(null)


const availableArtists = computed(() => {
    return artists.value.filter(a =>
        !selectedArtists.value.some(s => s.id === a.id)
    )
})
const isNumber = helpers.withMessage(
    'Must be a valid number',
    (value) => {
        if (value === null || value === '' || value === undefined) return true
        return !isNaN(Number(value)) && isFinite(Number(value))
    }
)
const selectArtist = (artist) => {
    const exists = selectedArtists.value.find(a => a.id === artist.id)
    if (exists) return

    selectedArtists.value.push(artist)
}

const initDropdown = async () => {

    await nextTick()

    $('.ui.dropdown.category-update-dropdown').dropdown({
        onChange(value, text, $choice) {
            form.value.category_id = value
            selectedCategoryName.value = $choice?.text() || ''
            v$.value.category_id.$touch()
        }
    })
}

const goBack = () => {
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push('/events')
    }
}

const initArtistDropdown = async () => {
    await nextTick()
    $('.ui.dropdown.artist-update-dropdown').dropdown({
        on: 'click',
        fullTextSearch: true,
        showOnFocus: false,
        useLabels: false,
        forceSelection: false,

        onChange(value) {
            const ids = value
                ? value.split(',').map(id => Number(id))
                : []

            selectedArtists.value = artists.value.filter(artist =>
                ids.includes(artist.id)
            )
        }
    })
}

const fetchArtists = async () => {
    try {
        const res = await eventStore.getAllArtists()
        artists.value = res.data || []
        await initArtistDropdown()
    } catch (error) {
        // console.log(error)
    }
}

const fetchCategories = async () => {

    try {

        const res = await eventStore.getAllCategories()
        categories.value = res.data || []

        await initDropdown()

    } catch (error) {

        console.log(error)
    }
}
const removeArtist = (id) => {
    selectedArtists.value = selectedArtists.value.filter(
        artist => artist.id !== id
    )
    const $dropdown = $('.ui.dropdown.artist-update-dropdown')
    $dropdown.dropdown('remove selected', id.toString())
}


const form = ref({
    title: '',
    short_description: '',
    description: '',
    start_date: '',
    end_date: '',
    venue_name: '',
    address: '',
    latitude: '',
    longitude: '',
    category_id: null,
    thumbnail: null
})

const futureDate = helpers.withMessage(
    'Start date must be in the future',
    (value) => {
        if (!value) return true
        return new Date(value) > new Date()
    }
)


const endDateAfterStart = helpers.withMessage(
    'End date must be after start date',
    (value) => {
        if (!value) return true
        return new Date(value) > new Date(form.value.start_date)
    }
)

const validLatitude = helpers.withMessage(
    'Latitude must be between -90 and 90',
    (value) => {
        if (!value && value !== 0) return true
        const num = Number(value)
        return num >= -90 && num <= 90
    }
)

const validLongitude = helpers.withMessage(
    'Longitude must be between -180 and 180',
    (value) => {
        if (!value && value !== 0) return true
        const num = Number(value)
        return num >= -180 && num <= 180
    }
)

const imageSize = helpers.withMessage(
    'Maximum file size is bigger 2MB',
    (value) => {

        if (!value) return true

        return value.size <= 2 * 1024 * 1024
    }
)

const rules = {
    title: {
        required: helpers.withMessage(
            'Title is required',
            required
        )
    },

    short_description: {
        required: helpers.withMessage(
            'Short description is required',
            required
        ),
        maxLength: helpers.withMessage(
            'Max 255 characters allowed',
            maxLength(255)
        )
    },

    description: {
        required: helpers.withMessage(
            'Description is required',
            required
        )
    },

    start_date: {
        required: helpers.withMessage(
            'Start date is required',
            required
        ),
        futureDate
    },

    end_date: {
        required: helpers.withMessage(
            'End date is required',
            required
        ),
        endDateAfterStart
    },
    address: {
        required: helpers.withMessage(
            'Address is required',
            required
        ),
        maxLength: helpers.withMessage(
            'Maximum 500 characters allowed',
            maxLength(500)
        )
    },
    venue_name: {
        required: helpers.withMessage(
            'Venue name is required',
            required
        )
    },
    latitude: {
        isNumber,
        validLatitude
    },

    longitude: {
        isNumber,
        validLongitude
    },
    category_id: {
        required: helpers.withMessage(
            'Category is required',
            required
        )
    },

    thumbnail: {
        required: helpers.withMessage(
            'Thumbnail is required',
            required
        ),
        imageSize
    }
}
const v$ = useVuelidate(rules, form)
// ======================================
const onFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const maxSize = 2 * 1024 * 1024 // 2MB

    // reset previous error
    thumbnailFileError.value = ''

    if (file.size > maxSize) {
        e.target.value = ''

        form.value.thumbnail = null
        thumbnailPreview.value = null

        thumbnailFileError.value = 'File is too large. Maximum size is 2MB.'

        return
    }

    form.value.thumbnail = file
    thumbnailPreview.value = URL.createObjectURL(file)

    v$.value.thumbnail.$touch()
}

const artist_ids = computed(() =>
    selectedArtists.value.map(a => a.id)
)
const submitEvent = async () => {

    const result = await v$.value.$validate()

    if (!result) return

    const formData = new FormData()

    formData.append('title', form.value.title)
    formData.append('short_description', form.value.short_description)
    formData.append('description', form.value.description)

    formData.append('start_date', form.value.start_date)
    formData.append('end_date', form.value.end_date || '')

    formData.append('venue_name', form.value.venue_name)
    formData.append('address', form.value.address || '')

    formData.append('latitude', form.value.latitude || '')
    formData.append('longitude', form.value.longitude || '')

    formData.append('category_id', form.value.category_id)

    if (form.value.thumbnail) {
        formData.append('thumbnail', form.value.thumbnail)
    }

    artist_ids.value.forEach(id => {
        formData.append('artist_ids[]', id)
    })

    const token = localStorage.getItem('auth_token')

    try {
        const id = event.value.id
        const res = await eventStore.updateEvent(token, formData, id)
        const slug = res?.data?.slug
        form.value = {
            title: '',
            short_description: '',
            description: '',
            start_date: '',
            end_date: '',
            venue_name: '',
            address: '',
            latitude: '',
            longitude: '',
            category_id: null,
            thumbnail: null
        }
        v$.value.$reset()
        thumbnailPreview.value = null
        thumbnailFileError.value = ''
        selectedArtists.value = []
        $('.ui.dropdown.category-update-dropdown').dropdown('clear')
        $('.ui.dropdown.artist-update-dropdown').dropdown('clear')
        router.push(`/events/preview/information/${slug}`)
    } catch (err) {

        console.log('ERROR', err)

    }
}
watch(() => form.value.start_date, (newVal) => {

    if (
        form.value.end_date &&
        new Date(form.value.end_date) <= new Date(newVal)
    ) {
        form.value.end_date = ''
    }

})
// End code
// ==========================================
const fetchEvent = async () => {
    try {
        const token = localStorage.getItem('auth_token')
        const slug = route.params.slug

        const res = await eventStore.getEventBySlug(token, slug)
        event.value = res.data

        const data = res.data

        form.value.title = data.title
        form.value.short_description = data.short_description
        form.value.description = data.description
        form.value.start_date = data.start_date
        form.value.end_date = data.end_date
        form.value.venue_name = data.venue.name
        form.value.address = data.venue.address
        form.value.latitude = data.venue.latitude
        form.value.longitude = data.venue.longitude
        form.value.category_id = data.category_id?.id

        selectedCategoryName.value = data.category_id?.name || ''
        // thumbnail preview (if backend gives image URL)
        if (data.thumbnail) {
            thumbnailPreview.value = data.thumbnail
        }

        // artists
        selectedArtists.value = data.artists || []

        await nextTick()
        // sync Semantic UI dropdowns AFTER DOM update
        $('.ui.dropdown.category-update-dropdown')
            .dropdown('set selected', String(form.value.category_id))

        $('.ui.dropdown.artist-update-dropdown')
            .dropdown('set selected', data.artists.map(a => a.id).join(','))

    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const formatDateTime = (date) => {

    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const statusLabel = (status) => {
    const map = {
        draft: 'Draft',
        published: 'Published',
        cancelled: 'Cancelled',
        pending: 'Pending Review',
        archived: 'Archived'
    }

    return map[status] || status
}


</script>