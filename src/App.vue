<script setup>
import { RouterView } from 'vue-router'
import SiteNav from './components/SiteNav.vue'
</script>

<template>
  <SiteNav/>
  <RouterView id="router_view"/>
</template>

<style scoped>
  #router_view {
    padding: 1rem
  }
</style>
