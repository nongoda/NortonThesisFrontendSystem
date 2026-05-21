<template>
    <div class="container create-event">
        <div class="title-step">Event Creation Wizard</div>
        <span class="sm-step mt-2 d-flex">Follow a guided process to set up your event from entering basic information
            to adding tickets and preparing it for publishing.</span>
        <ul class="nav my-3 tab-creation" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-event-creation-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-event-creation" type="button" role="tab" aria-controls="pills-event-creation"
                    aria-selected="true">
                    Event Setup
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-ticket-creation-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-ticket-creation" type="button" role="tab"
                    aria-controls="pills-ticket-creation" aria-selected="false">
                    Pricing & Tickets
                </button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-event-creation" role="tabpanel"
                aria-labelledby="pills-event-creation-tab" tabindex="0">
                <form action="">
                    <div class="form-section">
                        <div class="row">
                            <div class="col-7">
                                <div class="form-section pt-0">
                                    <div class="">
                                        <div class="title-form-input">Event Information</div>
                                        <div class="ds-form-input">Define the core details of your event including title,
                                            description, schedule, and category to clearly present what your event is about.
                                        </div>
                                    </div>
                                    <div class="">
                                        <div>
                                            <label for="">Title</label>
                                            <input type="text" class="form-control mb-3"
                                                placeholder="Input the event title here">
                                        </div>
                                        <div>
                                            <label for="">Short description</label>
                                            <input type="text" class="form-control mb-3"
                                                placeholder="Input the event short description here">
                                        </div>
                                        <div>
                                            <label for="">Category</label>
                                            <input type="text" class="form-control mb-3"
                                                placeholder="Input the event category here">
                                        </div>
                                        <div class="w-100 d-flex">
                                            <div class="w-50 pe-3">
                                                <label for="">Start date</label>
                                                <input type="text" class="form-control mb-3"
                                                    placeholder="Input the start date here">
                                            </div>
                                            <div class="w-50 ps-3">
                                                <label for="">End date</label>
                                                <input type="text" class="form-control mb-3"
                                                    placeholder="Input the end date here">
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="form-section">
                                    <div class="">
                                        <div class="title-form-input">Venue & Location</div>
                                        <div class="ds-form-input">Specify where your event will take place by providing venue
                                            details and precise location coordinates.</div>
                                    </div>
                                    <div class="">
                                        <div>
                                            <label for="">Venue name</label>
                                            <input type="text" class="form-control mb-3"
                                                placeholder="Input the venue name here">
                                        </div>
                                        <div>
                                            <label for="">Address</label>
                                            <input type="text" class="form-control mb-3"
                                                placeholder="Input the venue address here">
                                        </div>
                                        <div class="w-100 d-flex">
                                            <div class="w-50 pe-3">
                                                <label for="">Latitude</label>
                                                <input type="text" class="form-control mb-3"
                                                    placeholder="Input the latitude here">
                                            </div>
                                            <div class="w-50 ps-3">
                                                <label for="">Longitude</label>
                                                <input type="text" class="form-control mb-3"
                                                    placeholder="Input the longitude here">
                                            </div>
                                        </div>
                                    </div>
                            
                            </div>
                            <div class="form-section">
                                <div class="">
                                    <div class="title-form-input">Artists</div>
                                    <div class="ds-form-input">Select and assign artists who will be featured or participating in this event.</div>
                                </div>
                                <div class="">
                                    <div>
                                        <label for="">Select Artists</label>
                                        <input type="text" class="form-control mb-3"
                                            placeholder="Select the artists here">
                                    </div>                                
                                </div>
                            </div>
                            </div>
                            <div class="col-5">
                                <div class="">
                                    <div class="title-form-input">Media</div>
                                    <div class="ds-form-input">Upload visual content such as images to represent your event and make it more attractive to users.</div>
                                </div>
                                <div class="">
                                    <div>
                                        <img src="https://i.pinimg.com/1200x/75/4c/d1/754cd132370692fb05f518276345f8a2.jpg" class="cover" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div class="tab-pane fade" id="pills-ticket-creation" role="tabpanel"
                aria-labelledby="pills-ticket-creation-tab" tabindex="0">...</div>
        </div>
    </div>


</template>
<script setup>


</script>
