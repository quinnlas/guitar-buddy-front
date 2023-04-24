<template>
  <el-form>
    <h2>Optimize</h2>
    <el-form-item label="Iterations">
      <el-tooltip
        content="How many iterations to run the optimization algorithm. Time running is proportional to iterations."
      >
        <el-input type="number" v-model="form.iterations"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Neck Inches">
      <el-tooltip
        content="The length of the playable part of a string."
      >
        <el-input type="number" v-model="form.neckInches"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Inches Between Strings">
      <el-tooltip
        content="The fraction of an inch between two adjacent strings."
      >
        <el-input type="number" v-model="form.inchesBetweenStrings"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Number of Frets">
      <el-tooltip
        content="The highest fret number on your guitar. Do not include 1 extra for the open/0 fret."
      >
        <el-input type="number" v-model="form.numFrets"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Number of Strings">
      <el-tooltip
        content="The number of strings on your guitar."
      >
        <el-input type="number" v-model="form.numStrings"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="optimize">Optimize</el-button>
    </el-form-item>
  </el-form>
  <div v-if="tab" class="tab">
    {{ tab }}
  </div>
</template>

<script>
import apiTool from '../tools/api'

export default {
  props: {
    tuning: Array,
    song: Object
  },
  data() {
    return {
      form: {
        iterations: 10000,
        neckInches: 26.0,
        inchesBetweenStrings: 0.35,
        numFrets: 22,
        numStrings: 6
      },
      tab: null
    }
  },
  computed: {
    submittedForm() {
      return Object.assign({
        tuning: this.tuning,
        song: this.song
      }, this.form)
    }
  },
  methods: {
    async optimize() {
      const wsRes = await apiTool.post('/tab/optimize', this.submittedForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.tab = wsRes.data
    }
  }
}
</script>

<style scoped>
.tab {
  font-family: monospace;
  white-space: pre;
}
</style>
