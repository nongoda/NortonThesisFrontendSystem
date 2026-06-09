<template>
    <div class="container create-event">
        <div class="title-step">Update Artist Information</div>
        <span class="sm-step mt-2 d-flex">
            Update artist profile including biography, media, and social links.
        </span>

        <form class="create-event-form cr">

            <div class="row">
                <!-- LEFT -->
                <div class="col-7 pe-5">

                    <!-- BASIC INFO -->
                    <div class="form-section pt-0">
                        <div class="title-form-input">Artist Information</div>
                        <div class="ds-form-input">
                            Define basic artist details such as name, stage name, genre, and country.
                        </div>

                        <div class="mt-2">
                            <label>Name</label>
                            <input v-model="form.name" class="form-control" placeholder="Enter artist name"
                                :class="{ 'form-control-err': v$.name.$error }" />
                            <span v-for="err in v$.name.$errors" :key="err.$uid" class="warning-msg-input">
                                {{ err.$message }}
                            </span>
                        </div>

                        <div class="mt-3">
                            <label>Stage Name</label>
                            <input v-model="form.stage_name" class="form-control" placeholder="Enter stage name"
                                :class="{ 'form-control-err': v$.stage_name.$error }" />
                        </div>

                        <div class="mt-3">
                            <label>Genre</label>
                            <input v-model="form.genre" class="form-control" placeholder="Enter music genre"
                                :class="{ 'form-control-err': v$.genre.$error }" />
                        </div>

                        <div class="mt-3">
                            <label>Country</label>
                            <input v-model="form.country" class="form-control" placeholder="Enter country"
                                :class="{ 'form-control-err': v$.country.$error }" />
                        </div>
                    </div>

                    <!-- BIO -->
                    <div class="form-section">
                        <div class="title-form-input">Biography</div>

                        <textarea v-model="form.bio" rows="10" class="form-control mt-2"
                            :class="{ 'form-control-err': v$.bio.$error }"
                            placeholder="Write artist biography..."></textarea>

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
                <!-- RIGHT -->
                <div class="col-5">

                    <!-- PROFILE IMAGE -->
                    <div class="form-section pt-0">
                        <div>
                            <div class="title-form-input">Profile Image</div>
                            <div class="ds-form-input">
                                Please upload a clear image to represent your profile.
                            </div>
                        </div>

                        <div class="mt-3">
                            <input type="file" id="profile_image" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onProfileChange" />

                            <label for="profile_image" class="img-cover"
                                :class="{ 'form-control-err-label': v$.profile_image?.$error }">

                                <div v-if="profilePreview || form.profile_image_url" class="position-relative w-100">

                                    <!-- SAME CREATE FORM OVERLAY -->
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

                                    <img :src="profilePreview || form.profile_image_url"
                                        style="width: 100%; border-radius: 8px;" />
                                </div>

                                <div v-else class="d-flex flex-column align-items-center">
                                    <img src="../../assets/images/picture.png" class="img-icon" />
                                    <span class="form-label">Upload Profile Image</span>
                                </div>

                            </label>

                            <!-- SIZE -->
                            <span class="label-sm" v-if="form.profile_image">
                                {{ (form.profile_image.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <!-- VALIDATION -->
                            <span class="warning-msg-input" v-for="err in v$.profile_image?.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>


                    <!-- COVER IMAGE -->
                    <div class="form-section">
                        <div>
                            <div class="title-form-input">Cover Image</div>
                            <div class="ds-form-input">
                                Please upload a banner image to showcase your profile background.
                            </div>
                        </div>

                        <div class="mt-3">
                            <input type="file" id="cover_image" class="form-control" style="display: none;"
                                accept="image/png, image/jpeg, image/jpg, image/webp" @change="onCoverChange" />

                            <label for="cover_image" class="img-cover"
                                :class="{ 'form-control-err-label': v$.cover_image?.$error }">

                                <div v-if="coverPreview || form.cover_image_url" class="position-relative w-100">

                                    <!-- SAME CREATE FORM OVERLAY -->
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

                                    <img :src="coverPreview || form.cover_image_url"
                                        style="width: 100%; border-radius: 8px;" />
                                </div>

                                <div v-else class="d-flex flex-column align-items-center">
                                    <img src="../../assets/images/picture.png" class="img-icon" />
                                    <span class="form-label">Upload Cover Image</span>
                                </div>

                            </label>

                            <!-- SIZE -->
                            <span class="label-sm" v-if="form.cover_image">
                                {{ (form.cover_image.size / 1024 / 1024).toFixed(2) }} MB / 2MB
                            </span>

                            <!-- VALIDATION -->
                            <span class="warning-msg-input" v-for="err in v$.cover_image?.$errors" :key="err.$uid">
                                {{ err.$message }}
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ACTION -->
            <div class="d-flex mt-4">
                <button type="button" class="btn-official btn-color" @click="updateArtist">
                    Update Artist
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArtistManagementStore } from '@/stores/ArtistManagementStore'
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxLength } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const store = ArtistManagementStore()
const toast = useToast()

const form = ref({
    name: '',
    stage_name: '',
    bio: '',
    genre: '',
    country: '',
    facebook: '',
    instagram: '',
    profile_image: null,
    cover_image: null,

    // existing images
    profile_image_url: null,
    cover_image_url: null
})

const profilePreview = ref(null)
const coverPreview = ref(null)

/* VALIDATION */
const rules = {
    name: { required: helpers.withMessage('Name required', required) },
    stage_name: { required: helpers.withMessage('Stage name required', required) },
    bio: {
        required: helpers.withMessage('Bio required', required),
        maxLength: helpers.withMessage('Max 255 characters', maxLength(255))
    },
    genre: { required: helpers.withMessage('Genre required', required) },
    country: { required: helpers.withMessage('Country required', required) },
    facebook: {
        maxLength: helpers.withMessage('Too long', maxLength(255))
    },
    instagram: {
        maxLength: helpers.withMessage('Too long', maxLength(255))
    }
}

const v$ = useVuelidate(rules, form)

/* FETCH ARTIST */
const fetchArtist = async () => {
    const token = localStorage.getItem('auth_token')
    const slug = route.params.slug

    const res = await store.getArtistBySlug(token, slug)

    if (res.success) {
        const a = res.data

        form.value = {
            id: a.id,
            name: a.name,
            stage_name: a.stage_name,
            bio: a.bio,
            genre: a.genre,
            country: a.country,
            facebook: a.facebook,
            instagram: a.instagram,
            profile_image: null,
            cover_image: null,
            profile_image_url: a.profile_image,
            cover_image_url: a.cover_image
        }
    }
}

/* IMAGE HANDLERS */
const onProfileChange = (e) => {
    const file = e.target.files[0]
    form.value.profile_image = file
    profilePreview.value = URL.createObjectURL(file)
}

const onCoverChange = (e) => {
    const file = e.target.files[0]
    form.value.cover_image = file
    coverPreview.value = URL.createObjectURL(file)
}

const updateArtist = async () => {

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
    const id = form.value.id
    
    try {
        const res = await store.updateArtist(id, token, formData)

        if (!res.success) {
            toast.add({
                severity: 'error',
                summary: 'Failed',
                detail: res.error?.message || 'Update failed'
            })
            return
        }

        const slug = res.data?.data?.slug
        
        toast.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Artist updated successfully',
            life: 3000
        })

        router.push(`/artists/preview/${slug}`)

    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error occurred',
            life: 3000
        })
    }
}

onMounted(fetchArtist)
</script>