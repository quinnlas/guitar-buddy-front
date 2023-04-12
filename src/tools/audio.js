let audioCtx

export function playSong(song, options) {
  if (!audioCtx) audioCtx = new AudioContext()

  song.measures.forEach((measure, measureIndex) => {
    measure.notes.forEach(note => {
      const frequency = convertMidiNoteToHz(note.pitch)
      const oscillator = new OscillatorNode(audioCtx, {
        frequency,
        type: options.waveType
      })
      oscillator.connect(audioCtx.destination)

      const startTime = (measureIndex + note.measureStart) * options.measureTime + 2
      // console.log(`Playing note with frequency ${frequency} at time ${startTime}`)
      oscillator.start(startTime)
      oscillator.stop(startTime + options.noteLength)
    })
  })
}

// an octave is double the frequency, there are 12 notes in an octave
const noteFreqRatio = Math.pow(2, 1 / 12)
function convertMidiNoteToHz(note) {
  // based on 440Hz A4 which has MIDI # 69
  const difference = note - 69

  return 440 * Math.pow(noteFreqRatio, difference)
}