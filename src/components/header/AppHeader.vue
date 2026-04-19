<template>
    <header class="" :class="['header top-0 left-0 transition-all', headerDroppedClass]">
        <div :class="['container-fluid py-4', containerBgClass]">
            <div class="container d-flex w-100 justify-content-between align-items-center bg-transparent">
                <img src="../../assets/images/LA CIMA CARTEL.svg" alt="" style="height: 23px!important;">
                <div class="d-flex align-items-center ">
                    <ul class="list-group content-lst flex-row">
                        <li class="list-group-item bg-transparent border-0">
                            <a href="" class="text-decoration-none">Home</a>
                        </li>
                        <li class="list-group-item bg-transparent border-0">
                            <a href="" class="text-decoration-none">Discover Events</a>
                        </li>
                        <li class="list-group-item bg-transparent border-0">
                            <a href="" class="text-decoration-none">Artists</a>
                        </li>
                        <li class="list-group-item bg-transparent border-0">
                            <a href="" class="text-decoration-none">Merge store</a>
                        </li>
                        <li class="list-group-item bg-transparent border-0">
                            <a href="" class="text-decoration-none">About us</a>
                        </li>
                    </ul>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center">
                    <Ticket />
                    
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
const headerHeight = 90
const dropped = ref(false)

const handleScroll = () => {
  dropped.value = window.scrollY >= headerHeight
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const headerDroppedClass = computed(() => {
  return dropped.value
    ? 'translate-y-0 scrollHeader'      // dropped header visible
    : '-translate-y-full' // hidden/dropped up
})

const containerBgClass = computed(() => {
  return dropped.value
    ? 'scrollHeaderContent'
    : 'bg-transparent'
})
</script>