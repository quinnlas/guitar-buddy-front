import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', {
  state: () => ({
    /*
    {
      error: a string that describes an error (detailed logs can be made wherever the error is caught)
      key: a unique value to identify the error for v-for keys
    }
    */
    errors: []
  }),
  actions: {
    clearError(key) {
      const index = this.errors.find(e => e.key === key)
      this.errors.splice(index, 1)
    },
    addError(error) {
      this.errors.push({
        error,
        key: Math.random()
      })
    }
  }
})