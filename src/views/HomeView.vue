<template>
  <main>
    <!-- TODO components? -->
    <h1>Welcome to Guitar Buddy</h1>
    <el-form v-if="!song" label-position="top">
      <p>Examples <el-link href="https://www.ultimate-guitar.com/top/tabs?order=hitstotal_desc&type=tab" target="_blank">(find more here)</el-link>:</p>
      <el-button
        v-for="name of exampleNames"
        :key="name"
        type="primary"
        @click="loadExample(name)"
      >
        {{ name }}
      </el-button>
      <br><br>
      <el-form-item label="Please enter your tab to start:">
        <el-input
          style="font-family: monospace"
          v-model="tabForm.tab"
          :autosize="{ minRows: 10, maxRows: 28 }"
          type="textarea"
          placeholder="Paste here"
        />
      </el-form-item>
      <el-form-item label="Tuning">
        <el-select v-model="tabForm.tuning">
          <el-option
            v-for="item in tuningOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
    <el-form v-else>
      <p>Tab parsed!</p>
      <el-form-item label="Measure Time">
        <el-tooltip content="The number of seconds one measure of the song should last. Usually 240/BPM.">
          <el-input type="number" v-model="playbackForm.measureTime"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="Wave Type">
        <el-tooltip :content="'The \'timbre\' of the sound of each note'">
          <el-select v-model="playbackForm.waveType">
          <el-option
            v-for="item in waveOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <!-- TODO stop button etc -->
        <el-button type="primary" @click="play">Play</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
import api from '../tools/api'
import { playSong } from '../tools/audio'
import examples from '../tools/examples'
// import audio from '../tools/audio'

// el-select does not work well with array values
const tunings = {
  drop_d: [64, 59, 55, 50, 45, 38],
  standard: [64, 59, 55, 50, 45, 40]
}

export default {
  data() {
    return {
      tabForm: {
        tab: '',
        tuning: 'standard'
      },
      playbackForm: {
        measureTime: 2,
        waveType: 'sawtooth',
        noteLength: 0.2
      },
      song: null,
      tuningOptions: [
        {
          value: 'standard',
          label: 'Standard (EADGBE)'
        },
        {
          value: 'drop_d',
          label: 'Drop D (DADGBE)'
        }
        // TODO custom
      ],
      waveOptions: [
        'sine',
        'sawtooth',
        'square',
        'triangle'
      ]
    }
  },
  computed: {
    exampleNames() {
      return Object.keys(examples)
    }
  },
  methods: {
    async submit() {
      const submitForm = Object.assign({}, this.tabForm, {
        tuning: tunings[this.tabForm.tuning]
      })
      const wsRes = await api.post('/tab/parse', submitForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.song = wsRes.data
    },
    async play() {
      playSong(this.song, this.playbackForm)
    },
    loadExample(name) {
      const example = examples[name]
      this.tabForm = example.tabForm
      this.playbackForm = Object.assign({}, this.playbackForm, example.playbackForm)
    }
  }
}
</script>
