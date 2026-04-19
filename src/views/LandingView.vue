<template>
    <LandingHeader/>
    <div class="container" style="height: 800px;">
        
      <div class="rec w-100 h-25 bg-danger"></div>
        <div class="title mt-5">
            Where Music Meets Ambition and Every Beat Tells a Story
        </div>
        <span class="desc">
            Discover groundbreaking artists, explore exclusive releases, and join a community that lives and breathes music. We don’t just share music — we shape movements and elevate every note.
        </span>
    </div>
<!-- ============================================================================ -->
<button @click="loginWithGoogle" class="btn-google">
    Login with Google
  </button> 
<!-- ============================================================================ -->
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    // import LandingHeader from '@/components/LandingHeader.vue';
    import LandingHeader from '@/components/header/LandingHeader.vue';
  
    import { useRouter } from 'vue-router'

  // Get Vue Router instance if you want to redirect after login
  const router = useRouter()

  const loginWithGoogle = () => {
    // Redirect the user to your Laravel API Google login endpoint
    window.location.href = 'http://localhost:8000/api/auth/redirect'
  }
</script>