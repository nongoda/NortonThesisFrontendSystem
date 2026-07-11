<template>
    <div class="container event create-event ">
        <div class="title-step">Explore Event Details</div>
        <span class="sm-step mt-2 d-flex">View all the essential information about this event.</span>
        <div class="table-content" style="margin-top: 15px;">
            <ul class="view-type d-inline-flex mb-0" v-if="event?.slug">
                <li class="nav-item" role="presentation" style="margin-right: 4px;">
                    <router-link class="tab-table-type" :to="`/events/preview/information/${event.slug}`"
                        active-class="active">Event Information</router-link>
                </li>
                <li class="nav-item" role="presentation" style="margin-right: 4px;">
                    <router-link class="tab-table-type" :to="`/events/preview/tickets/${event.slug}`"
                        active-class="active">Ticket information</router-link>
                </li>
                <li class="nav-item" role="presentation">
                    <router-link class="tab-table-type" :to="`/events/preview/promotion/${event.slug}`"
                        active-class="active">Promotions</router-link>
                </li>
            </ul>
            <div style="margin-top: 15px;">
                <div v-if="event">
                    <div class="row">
                        <div class="col-7 event-preview table-pro-list">
                            <div class="d-flex flex-row justify-between align-items-center w-100 mb-3">
                                <div class="d-flex flex-column w-75">
                                    <span class="title-event">
                                        Manage Ticket Promotions
                                    </span>
                                    <span>Manage all ticket promotions, and campaign details for event.</span>
                                </div>
                                <div class="w-50 d-flex align-items-end justify-content-end" v-if="isManager">
                                    <button @click="openCreatePromotion" type="button"
                                        class="update-event-information btn btn-official btn-color">
                                        <Plus color="#fff" :stroke-width="2" size="18" style="margin-right: 5px;" />
                                        Create promotion
                                    </button>
                                </div>
                            </div>
                            <div class="wrapper-list mt-4 label-title">
                                <div class="list-user w-100">
                                    <div class="d-flex align-items-center " style="width: 30%;">
                                        <div class="main-val">Promotion</div>
                                    </div>
                                    <div class="d-flex align-items-center" style="width: 20%;">
                                        <div class="main-val">Discount</div>
                                    </div>
                                    <div class="d-flex align-items-center " style="width: 20%;">
                                        <div class="main-val">Max usage</div>
                                    </div>
                                    <div class="d-flex align-items-center" style="width: 15%;">
                                        <div class="main-val">Status</div>
                                    </div>
                                    <div class="d-flex align-items-center" style="width: 15%;">
                                        <div class="main-val"></div>
                                    </div>
                                </div>
                            </div>    
                            <!-- .wrapper-list-all                         -->
                            <div class="wrapper-list" v-if="discountInfo?.length">
                                <div class="list-user w-100"  v-for="discount in discountInfo" :key="discount.id">
                                    <div class="d-flex align-items-center " style="width: 30%;">
                                        <div class="">
                                            <div class="main-val one-line">{{ discount?.promotion_type.name }}</div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center  " style="width: 20%;">                        
                                        <div class="main-val">{{ discount?.value }} {{ discount?.type === 'percentage' ? '%' : 'USD' }}</div>
                                    </div>
                                    <div class="d-flex align-items-center " style="width: 20%;">
                                        <div class="main-val">{{ discount?.max_usage }}</div>
                                    </div>
                                    <div class="d-flex align-items-center" style="width: 20%;">
                                        <div class="status" style="padding: 8px 10px!important;" :class="discount?.is_active ? 'activated' : 'deactivated'">
                                            <div class="circle"></div>
                                            <span>
                                                {{ discount?.is_active ? 'Active' : 'Inactive' }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center " style="width: 10%;">                                               
                                        <div class="ui dropdown ms-3 settings-dropdown no-selected rounded-pill">
                                            <input type="hidden">
                                            <div class="wrapper d-flex align-items-center mb-0" style="padding: 5px!important; border-radius: 50%!important;">
                                                <Ellipsis :size="16" :stroke-width="1.75" />
                                            </div>

                                            <div class="menu filter">
                                                <div class="item" @click="openDiscountDetail(discount)">View detail</div>
                                                <div class="item" v-if="isManager && event.status === 'published'" @click="openUpdateDiscount(discount)">Update discount</div>
                                                <div class="item" v-if="isManager && event.status === 'published'" @click="openDeleteModal(discount)">Delete discount</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="no-data-wrapper" v-else>
                                <img src="../../assets/images/file.png" alt="">
                                <span>No ticket promotion found</span>
                                <span class="sh-desc">
                                    Try changing filters or search criteria.
                                </span>
                            </div>
                        </div>
                        <div class="col-5 event-preview right">
                            <div class="content-wrapper-section">
                                <span class="title-event">
                                    Event Insights
                                </span>
                                <div class="w-100 mt-2">

                                    <div class="wrapper">
                                        <div class="tda">Create by:</div>
                                        <div class="tda-content">
                                            <div class=" d-flex align-items-center create-by">
                                                <img :src="event.creator.avatar" alt=""
                                                    style="width: 23px; height: 23px; object-fit: cover; border-radius: 50%;">
                                                <span>{{ event.creator.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Created at:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.created_at)
                                            }}</span>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Updated at:</div>
                                        <span class="vlaue tda-content">{{ formatDateTime(event.updated_at)}}</span>
                                    </div>
                                    <div class="wrapper align-items-center mb-0" v-if="isManager && event.status === 'published'">
                                        <div class="tda">Enable ticket sales:</div>
                                        <div class="status-update tda-content d-flex align-items-center">
                                            <label class="switch mb-0" :class="{ 'outdated-switch': isOutdated }">
                                                <input :checked="event.is_sales_enabled"type="checkbox" @change="toggleSales">
                                                <div class="slider">
                                                    <div class="circle">
                                                        <svg class="cross" xml:space="preserve"
                                                            style="enable-background:new 0 0 512 512"
                                                            viewBox="0 0 365.696 365.696" y="0" x="0" height="6"
                                                            width="6" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path data-original="#000000" fill="currentColor"
                                                                    d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                        <svg class="checkmark" xml:space="preserve"
                                                            style="enable-background:new 0 0 512 512"
                                                            viewBox="0 0 24 24" y="0" x="0" height="10" width="10"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path class="" data-original="#000000"
                                                                    fill="currentColor"
                                                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <!-- <span class="vlaue tda-content">{{ formatDateTime(event.updated_at)}}</span> -->
                                    </div>
                                     <div class="wrapper mb-0">
                                        <button class="btn-official btn-color w-100" type="button" v-if="event.status == 'draft'" @click="openPublishModal">
                                            Publish event
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section" v-if="saleEvent">
                                <span class="title-event">
                                    Sales Overview
                                </span>
                                <div class="w-100 mt-2">

                                    <div class="wrapper">
                                        <div class="tda">Total Revenue:</div>
                                        <div class="tda-content">
                                            {{ saleEvent.revenue.usd.value }} $ 
                                        </div>
                                    </div>
                                    <div class="wrapper">
                                        <div class="tda">Tickets Sold:</div>
                                        <span class="vlaue tda-content">{{ saleEvent.tickets_sold }} / {{ saleEvent.original_tickets }}</span>
                                    </div>
                                    <div class="wrapper mb-0">
                                        <div class="tda">Remaining Tickets:</div>
                                        <span class="vlaue tda-content">{{ saleEvent.remaining_tickets }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section" v-if="saleEvent?.ticket_types && saleEvent.ticket_types.length > 0">
                                <span class="title-event">
                                    Ticket Type Breakdown
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper" v-for="ticket in saleEvent.ticket_types"
                                        :key="ticket.ticket_price_id">
                                        <div class="tda">
                                            Tickets {{ ticket.ticket_type }}:
                                        </div>

                                        <div class="tda-content">
                                            {{ ticket.sold }} Tickets/ {{ ticket.revenue.usd.value }}$
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wrapper-section cancellation" v-if="event.status === 'published' && isManager">
                                <span class="title-event">
                                    Confirm Event Cancellation
                                </span>
                                <div class="w-100 mt-2">
                                    <div class="wrapper">
                                        <div class="tda-content w-100">
                                            Please ensure all ticket purchases are resolved, including refunds or alternative arrangements for customers, before proceeding. Once cancelled, this action is irreversible.
                                        </div>
                                    </div>
                                    <div class="wrapper mb-0">
                                        <div class="tda-content w-100">
                                            <button class="btn-official btn-color-warning w-100" type="button" @click="openCancelModal">Confirm Cancellation</button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="deleteDiscountModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title">
                        Delete Discount
                    </h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    Are you sure you want to delete this discount?
                </div>

                <div class="modal-footer border-0">

                    <button type="button" class="btn-official btn-color-cancel" data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <button type="button" class="btn-official btn-color" @click="confirmDeleteDiscount">
                        Confirm Delete
                    </button>

                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-end" style="--bs-offcanvas-width: 680px;" id="promotionCanvas" data-bs-backdrop="static" data-bs-focus="false" tabindex="-1">
        <div class="offcanvas-header pe-0 ps-0 pt-0 pb-3 w-100 border-bottom">
            <div class="d-flex flex-column">
                <span class="title-off" style="font-size: 18px;">
                    Create the ticket promotion
                </span>
                <span class="b-t">Promotion details for the ticket</span>
            </div>

        </div>
        <div class="offcanvas-body p-0 w-100">
            <form @submit.prevent="submitDiscount">
                <div class="row p-0 m-0">
                    <div class="wrapper pt-3">
                        <span class="t-section">Discount value</span><br>
                        <span class="b-t">Set the discount amount or percentage.</span>
                        <div class=" d-flex w-100">
                            <div class="mt-3 w-50">
                                <label for="">Discount code</label>
                                <input v-model="form.code" type="text" class="form-control"
                                    placeholder="Enter discount code">                                
                            </div>
                            <div class="mt-3 w-50" style="margin-left: 20px;">
                                <label for="">Select promotion type</label>
                                <div class="ui dropdown promotion-type-dropdown w-100"
                                    :class="{ 'form-control-err': v$.promotion_type_id.$error }">
                                    <input type="hidden" v-model="form.promotion_type_id" />

                                    <div class="wrapper justify-content-between d-flex">
                                        <div class="default text">
                                            {{ selectedPromotionTypeName }}
                                        </div>
                                        <i class="dropdown icon"></i>
                                    </div>

                                    <div class="menu w-100">
                                        <div class="item" v-for="type in promotionTypes" :key="type.id"
                                            :data-value="type.id">
                                            {{ type.name }}
                                        </div>
                                    </div>
                                </div>
                                <span class="warning-msg-input" v-for="err in v$.promotion_type_id.$errors"
                                    :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>
                        <div class=" d-flex w-100 align-items-start">
                            <div class="mt-3 w-50">
                                <label for="">Type</label>
                                <div class="ui dropdown discount-type-dropdown w-100">
                                    <input type="hidden" v-model="form.type" />

                                    <div class="wrapper justify-content-between d-flex" style="height: 40px!important;">
                                        <div class="default text">
                                            {{ selectedDiscountTypeName }}
                                        </div>

                                        <i class="dropdown icon"></i>
                                    </div>

                                    <div class="menu w-100">
                                        <div class="item" data-value="percentage">
                                            Percent
                                        </div>

                                        <div class="item" data-value="fixed">
                                            Fixed
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 w-50 " style="margin-left: 20px;">
                                <label for="">Discount value</label>
                                <div
                                    class="w-100 position-relative d-flex flex-column align-items-center justify-content-center">
                                    <!-- <Percent v-if="form.discount_type === 'percentage'" :size="16" :stroke-width="1.75"
                                        class="position-absolute" style="right: 10px;" />
                                    <DollarSign v-else :size="16" :stroke-width="1.75" class="position-absolute"
                                        style="right: 10px;" /> -->
                                        <Percent v-if="form.type === 'percentage'" :size="16" :stroke-width="1.75"
                                        class="position-absolute" style="right: 10px;" />

                                        <DollarSign v-else :size="16" :stroke-width="1.75" class="position-absolute"
                                        style="right: 10px;" />
                                    <input type="text" class="form-control w-100" placeholder="Enter discount value"
                                        :class="{ 'form-control-err': v$.value.$error }" v-model="form.value">
                                </div>
                                <span class="warning-msg-input" v-for="err in v$.value.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>
                        <div class="d-flex w-100 align-items-start mt-3">
                            <div class="w-50">
                                <label for="">Usage Limit</label>
                                <input v-model="form.max_usage" type="text" class="form-control"
                                    placeholder="Enter usage limit"
                                    :class="{ 'form-control-err': v$.max_usage.$error }">
                                <span class="warning-msg-input" v-for="err in v$.max_usage.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                            <div class="w-50" style="margin-left: 20px;">
                                <label for="">Minimum purchase quantity</label>
                                <input v-model="form.min_quantity" type="text" class="form-control"
                                    placeholder="Enter minimum purchase quantity"
                                    :class="{ 'form-control-err': v$.min_quantity.$error }">
                                <span class="warning-msg-input" v-for="err in v$.min_quantity.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="border-top mt-4 d-flex"></div>
                    <div class="wrapper pt-3">
                        <span class="t-section d-flex">Select the ticket type</span>
                        <span class="b-t">Choose tickets for this promotion.</span>
                        <div class="ui fluid multiple search selection dropdown ticket-dropdown mt-3"
                            :class="{ 'form-control-err': v$.ticket_price_ids.$error }">
                            <input type="hidden" v-model="form.ticket_price_ids">
                            <!-- <input type="hidden" :value="form.ticket_price_ids.join(',')"> -->
                            <!-- <input type="hidden" :value="form.ticket_price_ids"> -->
                            <!-- <input type="hidden" v-model="form.ticket_price_ids"> -->

                            <i class="dropdown icon"></i>

                            <div class="default text">
                                Select available tickets
                            </div>

                            <div class="menu">

                                <div class="item" v-for="ticket in availableTickets" :key="ticket.id"
                                    :data-value="ticket.id">
                                    {{ ticket.ticket_type.name }}
                                    —
                                    ${{ ticket.price }}
                                </div>

                            </div>
                        </div>
                        <span class="warning-msg-input" v-for="err in v$.ticket_price_ids.$errors" :key="err.$uid">
                            {{ err.$message }}
                        </span>
                    </div>
                    <div class="border-top mt-4 d-flex"></div>
                    <div class="wrapper pt-3">
                        <span class="t-section d-flex">Active date</span>
                        <span class="b-t">Set when the promotion starts and ends.</span>
                        <div class="d-flex w-100 align-items-start mt-3">
                            <div class="w-50 d-flex  flex-column">
                                <label for="">Start date (Optional)</label>
                                <FlatPickr v-model="form.start_at" placeholder="Select start date"
                                    class="form-control w-100" style="width: 100%!important;" :class="{ 'form-control-err': v$.start_at.$error }" 
                                    :config="{ enableTime: true,dateFormat: 'Y-m-d H:i', static: false , minDate: 'today'}" />
                                <span class="warning-msg-input" v-for="err in v$.start_at.$errors" :key="err.$uid">
                                    {{ err.$message }}
                                </span>
                            </div>
                            <div class="w-50" style="margin-left: 20px;">
                                <label>End date (Optional)</label>

                                <FlatPickr
                                    v-model="form.end_at"
                                    class="form-control"
                                    placeholder="Select end date"
                                    :class="{ 'form-control-err': v$.end_at?.$error }" @mousedown.stop
                                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i', minDate: 'today' }"
                                />

                                <span
                                    class="warning-msg-input"
                                    v-for="err in v$.end_at?.$errors || []"
                                    :key="err.$uid"
                                >
                                    {{ err.$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <button type="button" class="btn-official btn-color-cancel my-4 me-3"
                            data-bs-dismiss="offcanvas" @click="resetForm">Cancel</button>
                        <button type="button" @click="submitDiscount" class="btn-official btn-color my-4">{{ isEditMode ? 'Update promotion' : 'Create promotion' }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="offcanvas offcanvas-end" style="--bs-offcanvas-width: 600px;" id="discountDetailCanvas" tabindex="-1">
        <div class="offcanvas-header p-0 pb-3">
            <div class="d-flex flex-column">
                <span class="title-off mb-0">Discount Detail</span>
                <span class="b-t">Promotion details for the ticket</span>
            </div>

        </div>
        <div class="offcanvas-body p-0 pe-3">
            <div class="border-bottom mb-3"></div>
            <div class="wrapper">
                <span class="t-section">Discount value</span><br>
                <span class="b-t mb-2 d-flex">The amount or percentage of the discount applied.</span>
                <div v-if="selectedDiscount">
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Promotion:</div>
                        <span class="val">{{ selectedDiscount.promotion_type?.name }}</span>
                    </div>                    
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Discount code:</div>
                        <span class="val">{{ selectedDiscount.code ? selectedDiscount.code : 'N/A' }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Discount value:</div>
                        <span class="val">{{ selectedDiscount.value }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Usage limit:</div>
                        <span class="val">{{ selectedDiscount.max_usage }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Minimum quantity:</div>
                        <span class="val">{{ selectedDiscount.max_usage }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Being used:</div>
                        <span class="val">{{ selectedDiscount.used }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Status:</div>
                        <span class="val">{{ selectedDiscount.is_active ? 'Active' : 'Inactive' }}</span>
                    </div>
                </div>
            </div>
            <div class="border-bottom my-3"></div>
            <div class="wrapper">
                <span class="t-section">Active date</span><br>
                <span class="b-t mb-2 d-flex">When the discount starts and is scheduled to apply.</span>
                <div v-if="selectedDiscount">
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">Start date:</div>
                        <span class="val">{{ formatDateTime(selectedDiscount.start_at) }}</span>
                    </div>
                    <div class="d-flex flex-row w-100 align-items-center mb-3">
                        <div class="t-label">End date:</div>
                        <span class="val">{{ formatDateTime(selectedDiscount.end_at) }}</span>
                    </div>
                </div>
            </div>
            <div class="border-bottom my-3"></div>
            <div class="wrapper">
                <span class="t-section">Selected ticket type</span><br>
                <span class="b-t mb-2 d-flex">The ticket category chosen for this discount or configuration.</span>
                <div v-if="selectedDiscount">
                    <div class="" v-for="ticket in selectedDiscount.ticket_prices" :key="ticket.id">
                        <div class="list-selected-ticket">
                            <span class="val">{{ ticket.ticket_type.name }}</span>
                            <span class="price">Final Price:${{ ticket.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade event-confirm" id="publishEventModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

            <div class="modal-header">
                <div class="modal-title">Publish Event</div>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>

            <div class="modal-body pt-0 mt-0 mb-2">
                <div class="info-modal mb-0">
                    Before publishing, make sure:
                </div>
                <ul class="mb-1 info-modal">
                    <li>Ticket prices are valid</li>
                    <li>Venue and date are complete</li>
                    <li>Event is ready for public access</li>
                </ul>
            </div>

            <div class="d-flex justify-content-center gap-2 p-4 pt-0">
                <button type="button" class="btn btn-official btn-color-cancel w-50" data-bs-dismiss="modal">
                Cancel
                </button>

                <button type="button" class="btn btn-official btn-color w-50" @click="confirmPublishEvent">
                Yes, Publish
                </button>
            </div>

            </div>
        </div>
    </div>
    <div class="modal fade event-confirm" id="cancelEventModal" tabindex="-1" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <div class="modal-title text-danger">
                        Event Cancellation
                    </div>
                </div>

                <div class="modal-body">

                    <div class="info-modal mb-2">
                        You are about to cancel this event.
                    </div>
                    
                    <div class="warning-wrapper mb-0">
                        Once cancelled:
                        <ul class="my-1 info-modal">
                            <li>Ticket sales will be disabled automatically.</li>
                            <li>All valid tickets will become cancelled.</li>
                            <li>The event cannot be published again.</li>
                        </ul>
                    </div>
                    <div class="info-modal text-danger mt-2">This action cannot be undone.</div>

                </div>

                <div class="d-flex justify-content-center gap-2 p-4 pt-0">

                    <button class="btn btn-official btn-color-cancel w-50" data-bs-dismiss="modal">
                        Keep Event
                    </button>

                    <button class="btn btn-official btn-color-warning w-50" @click="confirmCancellation">
                        Yes, Cancel Event
                    </button>

                </div>

            </div>
        </div>
    </div>

</template>
<script setup>
import { useRoute } from 'vue-router'
import { EventStore } from '@/stores/EventStore'
import { DiscountStore } from '@/stores/DiscountStore'
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import useVuelidate from '@vuelidate/core'
import { required, numeric, minValue, helpers } from '@vuelidate/validators'
import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import FlatPickr from "vue-flatpickr-component"
import "flatpickr/dist/flatpickr.css"
import nprogress from 'nprogress';
import { AuthStore } from '@/stores/AuthStore'


const authStore = AuthStore()
const isManager = computed(() =>
    authStore.user?.role?.toLowerCase() === 'manager'
)
const saleEvent = ref(null)
const route = useRoute()
const toast = useToast()
const isEditMode = ref(false)
const editingDiscountId = ref(null)
const eventStore = EventStore()
const discountStore = DiscountStore()
const selectedDiscount = ref(null)
const event = ref(null)
const promotionTypes = ref([])
const availableTickets = ref([])
const deleteDiscountData = ref(null)
const form = ref({
    code: '',
    promotion_type_id: null,
    type: 'percentage',
    value: null,
    max_usage: null,
    min_quantity: null,
    ticket_price_ids: [],
    start_at: null,
    end_at: null,
})

const showEndDate = ref(false)

/* =========================
   FORMAT CODE (FIX YOUR ERROR)
========================= */
const formatCode = (code) => {
    if (!code) return null
    return code
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '')        // remove spaces
        .replace(/[^A-Z0-9-_]/g, '') // allow only valid chars
}

/* =========================
   VALIDATION
========================= */
const rules = computed(() => ({
    promotion_type_id: {
        required: helpers.withMessage('Promotion type is required', required),
    },
    type: {
        required: helpers.withMessage('Discount type is required', required),
    },
    value: {
        required,
        numeric,
        minValue: minValue(1),
    },
    max_usage: { required, numeric, minValue: minValue(1) },
    min_quantity: { required, numeric, minValue: minValue(0.01) },
    ticket_price_ids: {
        required: helpers.withMessage('Select at least 1 ticket', required),
    },
    start_at: {},
    end_at: {},   
}))

const v$ = useVuelidate(rules, form)

/* =========================
   FETCH DATA
========================= */
const fetchEvent = async () => {
    const token = localStorage.getItem('auth_token')
    const res = await eventStore.getEventBySlug(token, route.params.slug)
    event.value = res.data
    const saleRes = await eventStore.getSaleSummaryBySlug(token, route.params.slug);
    saleEvent.value = saleRes.data;

}

const fetchPromotionTypes = async () => {
    const token = localStorage.getItem('auth_token')
    const res = await discountStore.fetchPromotionTypes(token)
    promotionTypes.value = res.data
}

const fetchAvailableTickets = async () => {
    const token = localStorage.getItem('auth_token')
    const res = await discountStore.fetchAvailableTickets(token, event.value.id)
    availableTickets.value = res.data
}

/* =========================
   DROPDOWNS (FIX ARRAY ISSUE)
========================= */
const initDropdowns = () => {

    $('.promotion-type-dropdown')
        .dropdown({
            onChange: (value) => {
                form.value.promotion_type_id = value

                // force UI refresh
                nextTick(() => {
                    $('.promotion-type-dropdown').dropdown('set selected', value)
                })
            }
        })

    $('.discount-type-dropdown')
        .dropdown({
            onChange: (value) => {
                form.value.type = value

                nextTick(() => {
                    $('.discount-type-dropdown').dropdown('set selected', value)
                })
            }
        })

    $('.ticket-dropdown')
    .dropdown({
        onChange: (value) => {
            form.value.ticket_price_ids =
            value ? value.split(',').map(id => Number(id)) : []
        }
    })
}

/* =========================
   TOGGLE END DATE
========================= */
const toggleEndDate = () => {
    showEndDate.value = !showEndDate.value
    if (!showEndDate.value) form.value.end_at = null
}

/* =========================
   SUBMIT (FIX BACKEND FORMAT)
========================= */
const submitDiscount = async () => {
    // alert(editingDiscountId.value)
    const isValid = await v$.value.$validate()
    console.log('validation result:', isValid)
    if (!isValid) return
    
    try {
        const token = localStorage.getItem('auth_token')

        const cleanCode = form.value.code
            ? form.value.code.trim().toUpperCase().replace(/\s+/g, '')
            : null
        const ticketIds = Array.isArray(form.value.ticket_price_ids)
            ? form.value.ticket_price_ids
            : []

        const typeMap = {
            percent: 'percentage',
            fixed: 'fixed'
        }
        const payload = {
            promotion_type_id: form.value.promotion_type_id,
            type: form.value.type,
            value: Number(form.value.value),
            min_quantity: form.value.min_quantity
                ? Number(form.value.min_quantity)
                : null,

            max_usage: form.value.max_usage
                ? Number(form.value.max_usage)
                : null,

            ticket_price_ids: ticketIds,

            // 🕒 Laravel "date" is fine with this format
            start_at: form.value.start_at
                ? new Date(form.value.start_at).toISOString().slice(0, 19).replace('T', ' ')
                : null,

            end_at: form.value.end_at
                ? new Date(form.value.end_at).toISOString().slice(0, 19).replace('T', ' ')
                : null,

            code: cleanCode,

            is_active: true,
        }
        if (isEditMode.value) {
            await discountStore.updateDiscount(token, editingDiscountId.value, payload)
            
            await fetchAvailableTickets()
            await fetchDiscounts()
            toast.add({
                severity: 'success',
                summary: 'Updated',
                detail: 'Discount updated successfully',
                life: 3000,
            })
        } else {
            const res = await discountStore.createDiscount(token, payload)
            
            await fetchAvailableTickets()
            await fetchDiscounts()
            toast.add({
                severity: res.result ? 'success' : 'error',
                summary: res.result ? 'Success' : 'Error',
                detail: res.message || 'Operation completed',
                life: 3000,
            })
        }
        const el = document.getElementById('promotionCanvas')
        bootstrap.Offcanvas.getOrCreateInstance(el).hide()

        resetForm()

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.response?.data?.message || 'Failed to create discount',
            life: 3000,
        })
    }
}

/* =========================
   RESET
========================= */
const clearForm = () => {
    form.value = {
        code: '',
        promotion_type_id: null,
        type: 'percentage',
        value: null,
        max_usage: null,
        min_quantity: null,
        ticket_price_ids: [],
        start_at: null,
        end_at: null,
    }

    $('.promotion-type-dropdown').dropdown('clear')
    $('.discount-type-dropdown').dropdown('set selected', 'percentage')
    $('.ticket-dropdown').dropdown('clear')

    v$.value.$reset()
}
const resetMode = () => {
    isEditMode.value = false
    editingDiscountId.value = null
}
const resetForm = () => {
    form.value = {
        code: '',
        promotion_type_id: null,
        type: 'percentage',
        value: null,
        max_usage: null,
        min_quantity: null,
        ticket_price_ids: [],
        start_at: null,
        end_at: null,
    }

    showEndDate.value = false
    isEditMode.value = false
    editingDiscountId.value = null

    $('.promotion-type-dropdown').dropdown('clear')
    $('.discount-type-dropdown').dropdown('set selected', 'percent')
    $('.ticket-dropdown').dropdown('clear')
    v$.value.$reset()
}

/* =========================
   INIT
========================= */
onMounted(async () => {
    nprogress.start()
    await fetchEvent()
    await fetchDiscounts()
    nprogress.done()
    await fetchPromotionTypes()
    await fetchAvailableTickets()
    await nextTick()
    initDropdowns()
})
const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
const selectedDiscountTypeName = computed(() => {
    if (form.value.type === 'fixed') {
        return 'Fixed'
    }

    return 'Percent'
})
const confirmDeleteDiscount = async () => {
    try {
        // alert(deleteDiscountData.value.id)
        const token = localStorage.getItem('auth_token')

        const res = await discountStore.deleteDiscount(
            token,
            deleteDiscountData.value.id
        )

        toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: res.message || 'Discount deleted successfully',
            life: 3000,
        })

        // refresh list
        await fetchDiscounts()

        // close modal
        const modalEl = document.getElementById('deleteDiscountModal')

        bootstrap.Modal.getInstance(modalEl)?.hide()

        deleteDiscountData.value = null

    } catch (error) {

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:
                error?.response?.data?.message ||
                'Failed to delete discount',
            life: 3000,
        })
    }
}
const openDeleteModal = (discount) => {
    deleteDiscountData.value = discount

    const modal = new bootstrap.Modal(
        document.getElementById('deleteDiscountModal')
    )

    modal.show()
}
const openCreatePromotion = async () => {
    await nextTick()

    const el = document.getElementById('promotionCanvas')
    if (!el) return

    bootstrap.Offcanvas.getOrCreateInstance(el).show()
}
const openPromotionCanvas = async () => {
    isEditMode.value = false
    editingDiscountId.value = null
    resetForm()

    await nextTick()

    const el = document.getElementById('promotionCanvas')
    bootstrap.Offcanvas.getOrCreateInstance(el).show()
}
const selectedPromotionTypeName = computed(() => {
    const found = promotionTypes.value.find(
        (item) => item.id == form.value.promotion_type_id
    )

    return found
        ? found.name
        : 'Select promotion type'
})
const toggleStatus = async (e) => {

    const isChecked = e.target.checked

    const newStatus = isChecked
        ? 'published'
        : 'cancelled'

    try {

        const token = localStorage.getItem('auth_token')

        const res = await eventStore.updateStatus(
            event.value.id,
            token,
            newStatus
        )

        if (res?.result === false) {

            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Cannot update status',
                life: 3000
            })

            e.target.checked = !isChecked

            return
        }

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: `Event status updated to ${newStatus}`,
            life: 3000
        })

    } catch (error) {

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:
                error?.response?.data?.message ||
                'Failed to update event status',
            life: 3000
        })

        e.target.checked = !isChecked
    }
}
const openDiscountDetail = async (discount) => {
    selectedDiscount.value = discount

    await nextTick()

    const el = document.getElementById('discountDetailCanvas')
    if (!el) return

    bootstrap.Offcanvas.getOrCreateInstance(el).show()
}
// ========================================
const discountInfo = ref(null)
const fetchDiscounts = async () => {
    try {
        console.log(event.value.id)
        const token = localStorage.getItem('auth_token')
        const res = await discountStore.fetchDiscounts(token, event.value.id)
        console.log('Fetched discounts:', res.data)
        await nextTick()

        discountInfo.value = res.data

    } catch (error) {
        console.log(error)
    } finally {
        
    }
}
const openUpdateDiscount = async (discount) => {
    isEditMode.value = true
    editingDiscountId.value = discount.id

    const ticketIds = discount.ticket_prices.map(t => String(t.id))

    form.value = {
        code: discount.code,
        promotion_type_id: discount.promotion_type_id,
        type: form.value.type,
        value: discount.value,
        max_usage: discount.max_usage,
        min_quantity: discount.min_quantity,
        ticket_price_ids: ticketIds,
        start_at: discount.start_at,
        end_at: discount.end_at,
    }

    // ensure selected tickets exist in dropdown list
    discount.ticket_prices.forEach(t => {
        if (!availableTickets.value.find(x => x.id === t.id)) {
            availableTickets.value.push(t)
        }
    })

    await nextTick()

    $('.ticket-dropdown').dropdown('clear')

    $('.ticket-dropdown')
        .dropdown('set selected', ticketIds)

    $('.promotion-type-dropdown')
        .dropdown('set selected', discount.promotion_type.id)

    $('.discount-type-dropdown')
        .dropdown('set selected', discount.type)

    const el = document.getElementById('promotionCanvas')
    bootstrap.Offcanvas.getOrCreateInstance(el).show()
}

watch(discountInfo, async () => {
    await nextTick()

    $('.ui.dropdown.settings-dropdown').dropdown()
})

let cancelModalInstance = null

const openCancelModal = () => {
    const modalEl = document.getElementById('cancelEventModal')
    cancelModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    cancelModalInstance.show()
}
let publishModalInstance = null

const openPublishModal = () => {
    const modalEl = document.getElementById('publishEventModal')
    publishModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
    publishModalInstance.show()
}
const toggleSales = async (e) => {
    const enabled = e.target.checked;

    try {
        const token = localStorage.getItem('auth_token');

        const res = await eventStore.updateSalesStatus(
            event.value.id,
            token,
            enabled
        );

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Unable to update ticket sales.',
                life: 3000
            });

            // Roll back switch
            e.target.checked = !enabled;
            return;
        }

        await fetchEvent();

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: enabled
                ? 'Ticket sales have been enabled.'
                : 'Ticket sales have been disabled.',
            life: 3000
        });

    } catch (error) {

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to update ticket sales.';

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });

        e.target.checked = !enabled;
    }
};
const confirmPublishEvent = async () => {
    try {
        const token = localStorage.getItem('auth_token')

        const res = await eventStore.updateEventStatus(
            event.value.id,
            token,
            'published'
        )

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Cannot publish event',
                life: 3000
            })
            return
        }

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Event published successfully',
            life: 3000
        })

        // ✅ CLOSE MODAL HERE (after success)
        const modalEl = document.getElementById('publishEventModal')
        const modal = bootstrap.Modal.getInstance(modalEl)
        modal.hide()

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to publish event'

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        })
    }
}
const cancelPublish = () => {
    showPublishModal.value = false
    pendingPublish.value = false
}
const confirmCancellation = async () => {
    try {
        const token = localStorage.getItem('auth_token')

        const res = await eventStore.updateEventStatus(
            event.value.id,
            token,
            'cancelled'
        )

        if (res?.result === false) {
            toast.add({
                severity: 'error',
                summary: 'Not allowed',
                detail: res.message || 'Unable to cancel event.',
                life: 3000
            })
            return
        }

        await fetchEvent()

        toast.add({
            severity: 'success',
            summary: 'Event Cancelled',
            detail: 'The event has been cancelled successfully.',
            life: 3000
        })

        // Close modal
        const modalEl = document.getElementById('cancelEventModal')
        bootstrap.Modal.getInstance(modalEl)?.hide()

    } catch (error) {

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            'Failed to cancel event.'

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        })
    }
}
</script>
