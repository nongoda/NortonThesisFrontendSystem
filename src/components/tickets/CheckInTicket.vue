<template>
    <div class="container scanner-page">
        <div class="table-content mt-0">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="title-table">Contact Report Management</div>
                    <span class="small-detail">
                        Manage contact reports and review user submissions in one place.
                    </span>
                </div>
            </div>
            <!-- ================================= -->
            <!-- TAB CONTENT HEADER -->
            <div class="mt-4">
                <ul class="view-type d-inline-flex mb-0">
                    <li class="nav-item r">
                        <button class="tab-table-type" :class="{ active: activeTab === 'camera' }"
                            @click="changeTab('camera')">
                            <i class="ri-camera-line me-2"></i>
                            Camera
                        </button>
                    </li>

                    <li class="nav-item">
                        <button class="tab-table-type" :class="{ active: activeTab === 'file' }"
                            @click="changeTab('file')">
                            <i class="ri-image-line me-2"></i>
                            Upload QR Image
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-7">
                <div class=" d-flex align-items-center justify-content-center">
                    <div v-show="activeTab === 'camera'" class=" w-100 position-relative ">

                        <!-- OFF UI -->
                        <div v-if="!isScanning"
                            class="camera-off text-center wrapper-content-scanning d-flex align-items-center flex-column py-5">
                            <CameraOff size="35" />

                            <div class="camera-title mt-2">
                                Camera Access Required
                            </div>

                            <div class="camera-desc px-5">
                                Enable camera access to scan the QR code. Open your camera and point it at the QR code
                                to continue.
                            </div>

                            <button class="btn btn-official btn-color mt-3" @click="startScanner">
                                Start Camera
                            </button>
                        </div>

                        <!-- CAMERA BOX (MUST HAVE HEIGHT) -->
                        <div v-show="isScanning" class="">
                            <div
                                class="scanner-wrapper position-relative w-100 wrapper-content-scanning p-0 d-flex align-items-center justify-content-center">
                                <div id="reader"></div>
                                <div class="position-absolute how-touser" style="z-index: 2;">
                                    Move your camera closer or adjust its position until the QR code is fully aligned.
                                </div>
                                <div class="d-flex align-items-center position-absolute ask-toclose" style="">
                                    <div class="camera-desc">Click the button below to close the camera.</div>
                                    <button class="btn btn-sm white-btn ms-3" @click="stopScanner">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <label id="fileSubmit" v-show="activeTab === 'file'"
                        class="text-center wrapper-content-scanning w-100 file-submit-lable">
                        <ImageUp size="32" />
                        <div class="mt-3 camera-title">
                            Upload QR Code
                        </div>
                        <div class="camera-desc">
                            Select an image containing a QR code.
                        </div>
                        <div class="camera-desc text-decoration-underline fw-medium">
                            Click to upload
                        </div>

                        <input id="fileSubmit" type="file" class="form-control d-none"
                            accept="image/png,image/jpeg,image/jpg" @change="scanImage" />

                    </label>
                </div>

            </div>
            <div class="col-5">
                <div class="wrapper-content-scanning">

                    <template v-if="store.scanPreview">

                        <div class="camera-title">Ticket Information</div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Code:</div>
                            <div class="ticket-val">
                                {{ store.scanPreview.ticket_code }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Status:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.status }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Check in at:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.checked_in_at || 'Not checked in' }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Quantity:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.quantity }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Ticket Type:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.ticket_price?.ticket_type }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Event:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.event?.title }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Venue:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.event?.venue_name }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Start:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.event?.start_date }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">End:</div>

                            <div class="ticket-val">
                                {{ store.scanPreview.items?.[0]?.event?.end_date }}
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                            <div class="label-text">Purchased By:</div>

                            <div class="d-flex align-items-center w-75">

                                <img :src="store.scanPreview.order?.user?.avatar" class="avatar-purchase" alt="">

                                <div class="ticket-val ms-2">
                                    {{ store.scanPreview.order?.contact_name }}
                                </div>

                            </div>
                        </div>

                        <div class="mt-4">

                            <button class="btn-official btn-color w-100" @click="markRedeemed(store.scanPreview)"
                                :disabled="store.scanPreview.status === 'redeemed'">
                                {{
                                    store.scanPreview.status === 'redeemed'
                                        ? 'Already Redeemed'
                                        : 'Update to Redeemed'
                                }}
                            </button>

                            <button class="btn-official btn-color-cancel w-100 mt-2" @click="goToTicketDetail">
                                Preview More Detail
                            </button>

                        </div>

                    </template>

                    <template v-else>

                        <div class="empty-ticket h-100 d-flex flex-column justify-content-center align-items-center">

                            <i class="ri-qr-scan-line fs-1 mb-3"></i>

                            <div class="camera-title">
                                No Ticket Selected
                            </div>

                            <div class="camera-desc text-center mt-2">
                                Scan a QR code or upload a QR image to view the ticket information.
                            </div>

                        </div>

                    </template>

                </div>
            </div>
            <!-- <div class="col-5">
                <div class="wrapper-content-scanning">
                    <div class="camera-title">Ticket Information</div>
                    <div class="d-flex flex-row mt-3">
                        <div class="label-text">Code:</div>
                        <div class="ticket-val">4a4aad2e-6f9a-49a5-b745-9b7b3b2afeb04a4aad2e-6f9a-49a5-b745-9b7b3b2afeb0</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Status:</div>
                        <div class="status ticket-val">Valid</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Check in at:</div>
                        <div class="status ticket-val">Valid</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Quantity:</div>
                        <div class="status ticket-val">1</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Event title:</div>
                        <div class="status ticket-val">1</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Start at:</div>
                        <div class="status ticket-val">1</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">End at:</div>
                        <div class="status ticket-val">1</div>
                    </div>
                    <div class="mt-3 d-flex flex-row">
                        <div class="label-text">Purchase by:</div>
                        <div class="d-flex w-75" >
                            <img src="http://127.0.0.1:8000/storage/avatars/KjaizeYWfSGm9TbbLwTa5DbJauhs3Hp0yyXh4Oit.png" class="avatar-purchase" alt="">
                            <div class="ticket-val ms-1">Nong Oda</div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn-official btn-color w-100">Update to redeemed</button>
                        <button class="btn-official btn-color-cancel w-100 mt-2">Preview more detail</button>
                    </div>
                </div>
            </div> -->
        </div>
        <div v-if="showPreview" class="modal-backdrop fade show"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { Html5Qrcode } from "html5-qrcode"
import { TicketManagementStore } from "@/stores/TicketManagementStore"
import { useToast } from 'primevue/usetoast'
import { useRouter } from "vue-router"

const router = useRouter()
const store = TicketManagementStore()
const toast = useToast()
const scanner = ref(null)
const isScanning = ref(false)
const showPreview = ref(false)
const activeTab = ref("camera")
const qrRegionId = "reader"
const startScanner = async () => {

    if (activeTab.value !== "camera") return
    if (isScanning.value) return

    try {

        await nextTick()
        await new Promise(r => setTimeout(r, 400)) // IMPORTANT

        if (!scanner.value) {
            scanner.value = new Html5Qrcode(qrRegionId)
        }

        await scanner.value.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 425, height: 425 }
            },
            onScanSuccess
        )

        isScanning.value = true

    } catch (e) {
        console.error("Camera error:", e)
    }
}
const goToTicketDetail = () => {
    const code = store.scanPreview?.ticket_code
    if (!code) return

    router.push(`/tickets/${code}`)
}
const stopScanner = async () => {

    if (!scanner.value || !isScanning.value) return

    try {

        await scanner.value.stop()
        await scanner.value.clear()

    } catch (e) {
        console.error(e)
    }

    scanner.value = null
    isScanning.value = false

}

const onScanSuccess = async (decodedText) => {
    try {
        // Fetch ticket first
        await store.fetchScanPreview(decodedText)

        // Then stop the camera
        await stopScanner()

        // Don't show the modal
        showPreview.value = false

    } catch (e) {

        alert(store.error || "Ticket not found.")

        if (activeTab.value === "camera") {
            await startScanner()
        }

    }
}
const scanImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image")
        return
    }

    try {
        const decodedText = await Html5Qrcode.scanFile(file, true)

        if (!decodedText) {
            alert("No QR code found in image")
            return
        }

        await store.fetchScanPreview(decodedText)
        showPreview.value = false

    } catch (e) {
        console.error("QR scan error:", e)
        alert(store.error || "Unable to read QR code.")
    }

    event.target.value = ""
}
const markRedeemed = async (ticket) => {
    if (!ticket) return

    try {
        const res = await store.updateTicketStatus(ticket.id, "redeemed")

        if (!res.result) {
            toast.add({
                severity: "error",
                summary: "Redeem Failed",
                detail: res.message,
                life: 3000,
            })
            return
        }

        store.scanPreview = {
            ...store.scanPreview,
            ...res.data,
        }

        toast.add({
            severity: "success",
            summary: "Success",
            detail: res.message,
            life: 3000,
        })

    } catch (err) {

        toast.add({
            severity: "error",
            summary: "Error",
            detail: err.response?.data?.message || "Failed to redeem ticket.",
            life: 3000,
        })

    }
}

const changeTab = async (tab) => {

    if (activeTab.value === tab) return

    activeTab.value = tab

    if (tab === "camera") {

        await startScanner()

    } else {

        await stopScanner()

    }

}
const closePreview = async () => {
    showPreview.value = false

    if (activeTab.value === "camera") {
        await startScanner()
    }
}
onMounted(async () => {

    if (activeTab.value === "camera") {

        await startScanner()

    }

})

onBeforeUnmount(async () => {

    if (scanner.value && isScanning.value) {

        await scanner.value.stop().catch(() => { })

        await scanner.value.clear().catch(() => { })

    }

})
</script>