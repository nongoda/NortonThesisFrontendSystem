<template>
    <header class="" :class="['header top-0 left-0 transition-all', headerDroppedClass]">
        <div :class="['py-4', containerBgClass]">
            <div class="container d-flex w-100 justify-content-between align-items-center bg-transparent">
                <img src="../../assets/images/LA CIMA CARTEL.svg" alt="" style="height: 22px!important;">
                <div class="d-flex align-items-center ">
                    <RouterLink to="register" class="btn-offcial btn-color">
                        Register now
                    </RouterLink>
                    <RouterLink to="login" class="btn-offcial btn-no-color ms-2">
                        Login
                    </RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
const headerHeight = 2
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
    ? 'scrollHeader'      // dropped header visible
    : '-translate-y-full' // hidden/dropped up
})

const containerBgClass = computed(() => {
  return dropped.value
    ? 'scrollHeaderContent'
    : 'bg-transparent'
})
</script>