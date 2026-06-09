<template>
    <div class="container create-event">
        <div class="title-step">Artist Creation Wizard</div>
        <span class="sm-step mt-2 d-flex">
            Follow a guided process to create an artist profile including background info and media.
        </span>

        <form class="create-event-form cr">

            <div class="row">
                <!-- LEFT SIDE -->
                <div class="col-7 pe-5">

                    <!-- BASIC INFO -->
                    <div class="form-section pt-0">
                        <div class="title-form-input">Artist Information</div>
                        <div class="ds-form-input">
                            Define basic artist details such as name, stage name, genre, and country.
                        </div>

                        <div class="mt-2">
                            <label>Name</label>
                            <input v-model="form.name" class="form-control"
                                :class="{ 'form-control-err': v$.name.$error }" placeholder="Enter the arist name" />
                            <span v-for="err in v$.name.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <div class="mt-3">
                            <label>Stage Name</label>
                            <input v-model="form.stage_name" class="form-control"
                                :class="{ 'form-control-err': v$.stage_name.$error }"
                                placeholder="Enter the stage name" />
                            <span v-for="err in v$.stage_name.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <div class="mt-3">
                            <label>Genre</label>
                            <input v-model="form.genre" class="form-control"
                                :class="{ 'form-control-err': v$.genre.$error }" placeholder="Enter the genre" />
                            <span v-for="err in v$.genre.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <div class="mt-3">
                            <label>Country</label>
                            <input v-model="form.country" class="form-control"
                                :class="{ 'form-control-err': v$.country.$error }" placeholder="Enter the country" />
                            <span v-for="err in v$.country.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>

                    <!-- BIO -->
                    <div class="form-section">
                        <div class="title-form-input">Biography</div>

                        <div class="position-relative">
                            <textarea v-model="form.bio" rows="10" class="form-control mt-2"
                                :class="{ 'form-control-err': v$.bio.$error }"
                                placeholder="Write artist biography...">
                            </textarea>

                            <span class="position-absolute count-text"
                                :class="{ 'text-danger': form.bio.length > 255 }">
                                {{ form.bio.length }}/255
                            </span>
                        </div>
                        <span v-for="err in v$.bio.$errors" :key="err.$uid" class="warning-msg-input">
                            {{ err.$message }}
                        </span>
                    </div>

                    <!-- SOCIAL -->
                    <div class="form-section">
                        <div class="title-form-input">Social Media</div>

                        <input v-model="form.facebook" class="form-control mt-2" placeholder="Facebook URL" />
                        <input v-model="form.instagram" class="form-control mt-3" placeholder="Instagram URL" />
                    </div>

                </div>
                <div class="col-5">

                    <!-- PROFILE IMAGE -->
                    <div class="form-section pt-0">
                        <div class="">
                            <div class="title-form-input">Profile Image</div>
                            <div class="ds-form-input">
                                Please upload a clear image to represent your profile.
                            </div>
                        </div>

                        <div class="mt-3">
                            <input type="file" id="profile_image" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onProfileChange" />

                            <label for="profile_image" class="img-cover"
                                :class="{ 'form-control-err-label': v$.profile_image.$error }">

                                <div v-if="profilePreview" class="position-relative w-100">

                                    <div
                                        class="change-img-hover-top d-flex align-items-center justify-content-center flex-column">

                                        <div class="d-flex align-items-center justify-content-center">
                                            <MousePointerClick size="25" :stroke-width="1.75" />
                                            <span class="change-img-text">Click to Change Profile Image</span>
                                        </div>

                                        <span class="label">
                                            Upload a profile image to represent this artist.
                                            Maximum file size: 2MB.
                                        </span>

                                    </div>

                                    <img :src="profilePreview" style="width: 100%; border-radius: 8px;" />
                                </div>

                                <div v-else class="d-flex flex-column align-items-center">

                                    <img src="../../assets/images/picture.png" class="img-icon" alt="">

                                    <span class="form-label">Upload Profile Image</span>

                                    <small></small>
                                </div>

                            </label>

                            <span class="label-sm" v-if="form.profile_image">
                                {{ (form.profile_image.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <span class="warning-msg-input" v-for="err in v$.profile_image.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>


                    <!-- COVER IMAGE -->
                    <div class="form-section">
                        <div class="">
                            <div class="title-form-input">Cover Image</div>
                            <div class="ds-form-input">
                                Please upload a banner image to showcase your profile background.
                            </div>
                        </div>

                        <div class="mt-3">
                            <input type="file" id="cover_image" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onCoverChange" />

                            <label for="cover_image" class="img-cover"
                                :class="{ 'form-control-err-label': v$.cover_image.$error }">

                                <div v-if="coverPreview" class="position-relative w-100">

                                    <div
                                        class="change-img-hover-top d-flex align-items-center justify-content-center flex-column">

                                        <div class="d-flex align-items-center justify-content-center">
                                            <MousePointerClick size="25" :stroke-width="1.75" />
                                            <span class="change-img-text">Click to Change Cover Image</span>
                                        </div>

                                        <span class="label">
                                            Upload a banner image to represent this artist.
                                            Maximum file size: 2MB.
                                        </span>

                                    </div>

                                    <img :src="coverPreview" style="width: 100%; border-radius: 8px;" />
                                </div>

                                <div v-else class="d-flex flex-column align-items-center">

                                    <img src="../../assets/images/picture.png" class="img-icon" alt="">

                                    <span class="form-label">Upload Cover Image</span>

                                    <small></small>
                                </div>

                            </label>

                            <span class="label-sm" v-if="form.cover_image">
                                {{ (form.cover_image.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <span class="warning-msg-input" v-for="err in v$.cover_image.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ACTION -->
            <div class="d-flex align-items-center mt-4">
                <router-link to="/artists" class="back-page me-3">
                    <ArrowLeft :size="18" :stroke-width="1.75" /> Back to pervious
                </router-link>
                <button type="button" class="btn-official btn-color" @click="submitArtist">
                    Create Artist
                </button>
            </div>

        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxLength } from '@vuelidate/validators'
import { ArtistManagementStore } from '@/stores/ArtistManagementStore'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const artistStore = ArtistManagementStore()
const toast = useToast()
/* ======================
   FORM STATE
====================== */
const form = ref({
    name: '',
    stage_name: '',
    bio: '',
    genre: '',
    country: '',
    facebook: '',
    instagram: '',
    profile_image: null,
    cover_image: null
})

/* ======================
   IMAGE PREVIEWS
====================== */
const profilePreview = ref(null)
const coverPreview = ref(null)

/* ======================
   VALIDATION RULES
====================== */
const maxImageSize = helpers.withMessage(
    'The profile image field must not be greater than 2048 kilobytes.',
    (value) => {
        if (!value) return true
        return value.size <= 2048 * 1024
    }
)

const rules = {
    name: {
        required: helpers.withMessage('Name is required', required)
    },
    stage_name: {
        required: helpers.withMessage('Stage name is required', required)
    },
    bio: {
        required: helpers.withMessage('Biography is required', required),
        maxLength: helpers.withMessage('Max 255 characters allowed', maxLength(255))

    },
    genre: {
        required: helpers.withMessage('Genre is required', required)
    },
    country: {
        required: helpers.withMessage('Country is required', required)
    },
    profile_image: {
        required: helpers.withMessage('Profile image is required', required),
        maxImageSize
    },
    cover_image: {
        required: helpers.withMessage('Cover image is required', required),
        maxImageSize
    }
}

const v$ = useVuelidate(rules, form)

/* ======================
   IMAGE HANDLERS
====================== */
const onProfileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    form.value.profile_image = file
    profilePreview.value = URL.createObjectURL(file)

    v$.value.profile_image.$touch()
}

const onCoverChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    form.value.cover_image = file
    coverPreview.value = URL.createObjectURL(file)

    v$.value.cover_image.$touch()
}

/* ======================
   SUBMIT
====================== */
const submitArtist = async () => {

    const isValid = await v$.value.$validate()
    if (!isValid) return

    const formData = new FormData()

    formData.append('name', form.value.name)
    formData.append('stage_name', form.value.stage_name)
    formData.append('bio', form.value.bio)
    formData.append('genre', form.value.genre || '')
    formData.append('country', form.value.country || '')
    formData.append('facebook', form.value.facebook || '')
    formData.append('instagram', form.value.instagram || '')

    if (form.value.profile_image) {
        formData.append('profile_image', form.value.profile_image)
    }

    if (form.value.cover_image) {
        formData.append('cover_image', form.value.cover_image)
    }

    const token = localStorage.getItem('auth_token')

    try {
        const res = await artistStore.createArtist(token, formData)

        if (!res.success) {
            toast.add({
                severity: 'error',
                summary: 'Create Failed',
                detail: res.error?.message || 'Something went wrong while creating artist.',
                life: 3000
            })
            return
        }

        toast.add({
            severity: 'success',
            summary: 'Artist Created',
            detail: 'Artist has been created successfully.',
            life: 3000
        })

        // RESET FORM
        form.value = {
            name: '',
            stage_name: '',
            bio: '',
            genre: '',
            country: '',
            facebook: '',
            instagram: '',
            profile_image: null,
            cover_image: null
        }

        profilePreview.value = null
        coverPreview.value = null
        v$.value.$reset()

        // NAVIGATE
        router.push('/artists')

    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Unexpected error occurred. Please try again.',
            life: 3000
        })
    }
}
</script>