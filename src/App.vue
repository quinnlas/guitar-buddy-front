<script setup>
import { RouterView } from 'vue-router'
import SiteNav from './components/SiteNav.vue'
import ErrorDisplay from './components/ErrorDisplay.vue'
</script>

<template>
  <SiteNav/>
  <ErrorDisplay/>
  <RouterView id="router_view"/>
</template>

<style scoped>
  #router_view {
    padding: 1rem
  }
</style>
