<script setup>
import { useErrorsStore } from '../store/errors';

const store = useErrorsStore()
</script>

<template>
  <el-alert
    v-for="{ error, key } in store.errors"
    :key="key"
    type="error"
    @close="store.clearError(key)"
  >
    {{ error }}
  </el-alert>
</template>
