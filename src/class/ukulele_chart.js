/*
 * Guitar Chord Chart Renderer.
 * Wotiger -- http://blog.telesoho.com
 *
 * Requires: chord.js
 * Requires: Raphael JS (raphaeljs.com)
 */
import UkuleleChordBox from './ukulele_chord_box'
import * as _ from 'underscore'
var Raphael = require('raphael')

var UkuleleChordChart = [
  { section: 'Open Chords',
    description: `These chords are played in open position, and generally
                 include open strings.`,
    chords:
    [
      {'name': 'N', 'seq': '0,0,0,0'},
      {'name': 'A', 'seq': '2,1,0,0'},
      {'name': 'A5', 'seq': '2,4,0,0'},
      {'name': 'A7', 'seq': '0,1,0,0'},
      {'name': 'A7sus', 'seq': '0,2,0,0'},
      {'name': 'A9', 'seq': '2,1,0,2'},
      {'name': 'Aaug', 'seq': '2,1,1,0'},
      {'name': 'Adim7', 'seq': '2,3,2,3'},
      {'name': 'Am', 'seq': '2,0,0,0'},
      {'name': 'Am7', 'seq': '0,0,0,0'},
      {'name': 'Am7b5', 'seq': '2,3,3,3'},
      {'name': 'Amaj7', 'seq': '1,1,0,0'},
      {'name': 'Asus', 'seq': '2,2,0,0'},
      {'name': 'A#', 'seq': '3,2,1,1'},
      {'name': 'A#7', 'seq': '1,2,1,1'},
      {'name': 'A#7sus', 'seq': '1,3,1,1'},
      {'name': 'A#9', 'seq': '3,2,1,3'},
      {'name': 'A#aug', 'seq': '3,2,2,1'},
      {'name': 'A#dim', 'seq': '3,1,0,1'},
      {'name': 'A#dim7', 'seq': '0,1,0,1'},
      {'name': 'A#m', 'seq': '3,1,1,1'},
      {'name': 'A#m7', 'seq': '1,1,1,1'},
      {'name': 'A#m7b5', 'seq': '1,1,0,1'},
      {'name': 'A#maj7', 'seq': '3,2,1,0'},
      {'name': 'A#sus', 'seq': '3,3,1,1'},
      {'name': 'B', 'seq': '4,3,2,2'},
      {'name': 'B7', 'seq': '4,3,2,0'},
      {'name': 'B7sus', 'seq': '4,4,2,0'},
      {'name': 'B9', 'seq': '4,3,2,4'},
      {'name': 'Baug', 'seq': '0,3,3,2'},
      {'name': 'Bdim', 'seq': '4,2,1,2'},
      {'name': 'Bdim7', 'seq': '1,2,1,2'},
      {'name': 'Bm', 'seq': '4,2,2,2'},
      {'name': 'Bm7', 'seq': '2,2,2,2'},
      {'name': 'Bm7b5', 'seq': '2,2,1,2'},
      {'name': 'Bm7b5', 'seq': '4,2,1,0'},
      {'name': 'Bmaj7', 'seq': '3,3,2,2'},
      {'name': 'Bsus', 'seq': '4,4,2,2'},
      {'name': 'C', 'seq': '0,0,0,3'},
      {'name': 'C5', 'seq': '0,0,3,3'},
      {'name': 'C7', 'seq': '0,0,0,1'},
      {'name': 'C7sus', 'seq': '0,0,1,1'},
      {'name': 'C9', 'seq': '0,2,0,3'},
      {'name': 'Caug', 'seq': '1,0,0,3'},
      {'name': 'Cm', 'seq': '0,3,3,3'},
      {'name': 'Cm7', 'seq': '3,3,3,3'},
      {'name': 'Cm7b5', 'seq': '3,3,2,3'},
      {'name': 'Cmaj7', 'seq': '0,0,0,2'},
      {'name': 'Csus', 'seq': '0,0,1,3'},
      {'name': 'C#', 'seq': '1,1,1,4'},
      {'name': 'C#5', 'seq': '1,1,4,4'},
      {'name': 'C#7', 'seq': '1,1,1,2'},
      {'name': 'C#7sus', 'seq': '1,1,2,2'},
      {'name': 'C#9', 'seq': '1,3,1,4'},
      {'name': 'C#dim', 'seq': '0,4,0,4'},
      {'name': 'C#m', 'seq': '1,1,0,4'},
      {'name': 'C#m7', 'seq': '4,4,4,4'},
      {'name': 'C#m7b5', 'seq': '0,1,0,2'},
      {'name': 'C#maj7', 'seq': '1,1,1,3'},
      {'name': 'C#sus', 'seq': '1,1,2,4'},
      {'name': 'D', 'seq': '2,2,2,0'},
      {'name': 'D7', 'seq': '2,2,2,3'},
      {'name': 'D7sus', 'seq': '2,2,3,3'},
      {'name': 'Dm', 'seq': '2,2,1,0'},
      {'name': 'Dm7', 'seq': '2,2,1,3'},
      {'name': 'Dm7b5', 'seq': '1,2,1,3'},
      {'name': 'Dmaj7', 'seq': '2,2,2,4'},
      {'name': 'Dsus', 'seq': '0,2,3,0'},
      {'name': 'D#', 'seq': '0,3,3,1'},
      {'name': 'D#7', 'seq': '3,3,3,4'},
      {'name': 'D#7sus', 'seq': '3,3,4,4'},
      {'name': 'D#9', 'seq': '0,3,1,1'},
      {'name': 'D#dim', 'seq': '2,3,2,0'},
      {'name': 'D#m', 'seq': '3,3,2,1'},
      {'name': 'D#m7', 'seq': '3,3,2,4'},
      {'name': 'D#m7b5', 'seq': '2,3,2,4'},
      {'name': 'D#sus', 'seq': '1,3,4,1'},
      {'name': 'E', 'seq': '4,4,4,2'},
      {'name': 'E5', 'seq': '4,4,0,2'},
      {'name': 'E7', 'seq': '1,2,0,2'},
      {'name': 'E7sus', 'seq': '4,2,0,0'},
      {'name': 'E9', 'seq': '1,4,2,2'},
      {'name': 'Edim', 'seq': '0,4,0,1'},
      {'name': 'Em', 'seq': '0,4,0,2'},
      {'name': 'Em7', 'seq': '0,2,0,2'},
      {'name': 'Em7b5', 'seq': '0,2,0,1'},
      {'name': 'Emaj7', 'seq': '1,3,0,2'},
      {'name': 'Esus', 'seq': '4,4,0,0'},
      {'name': 'F', 'seq': '2,0,1,0'},
      {'name': 'F7', 'seq': '2,3,1,3'},
      {'name': 'F7sus', 'seq': '3,3,1,3'},
      {'name': 'F9', 'seq': '0,0,1,0'},
      {'name': 'Fm', 'seq': '1,0,1,3'},
      {'name': 'Fm7', 'seq': '1,3,1,3'},
      {'name': 'Fm7b5', 'seq': '1,3,1,2'},
      {'name': 'Fmaj7', 'seq': '2,4,1,3'},
      {'name': 'Fsus', 'seq': '3,0,1,1'},
      {'name': 'F#', 'seq': '3,1,2,1'},
      {'name': 'F#7', 'seq': '3,4,2,4'},
      {'name': 'F#7sus', 'seq': '4,4,2,4'},
      {'name': 'F#9', 'seq': '1,1,2,1'},
      {'name': 'F#dim', 'seq': '2,0,2,0'},
      {'name': 'F#m', 'seq': '2,1,2,0'},
      {'name': 'F#m7', 'seq': '2,4,2,4'},
      {'name': 'F#m7b5', 'seq': '2,4,2,3'},
      {'name': 'F#sus', 'seq': '4,1,2,2'},
      {'name': 'G', 'seq': '0,2,3,2'},
      {'name': 'G7', 'seq': '0,2,1,2'},
      {'name': 'G7sus', 'seq': '0,2,1,3'},
      {'name': 'G9', 'seq': '2,2,3,2'},
      {'name': 'Gdim', 'seq': '0,1,3,1'},
      {'name': 'Gm', 'seq': '0,2,3,1'},
      {'name': 'Gm7', 'seq': '0,2,1,1'},
      {'name': 'Gm7b5', 'seq': '0,1,1,1'},
      {'name': 'Gmaj7', 'seq': '0,2,2,2'},
      {'name': 'Gsus', 'seq': '0,2,3,3'},
      {'name': 'G#', 'seq': '1,3,4,3'},
      {'name': 'G#7', 'seq': '1,3,2,3'},
      {'name': 'G#7sus', 'seq': '1,3,2,4'},
      {'name': 'G#9', 'seq': '3,3,4,3'},
      {'name': 'G#dim', 'seq': '4,2,4,2'},
      {'name': 'G#m', 'seq': '1,3,4,2'},
      {'name': 'G#m7', 'seq': '1,3,2,2'},
      {'name': 'G#m7b5', 'seq': '1,2,2,2'},
      {'name': 'G#maj7', 'seq': '0,3,4,3'},
      {'name': 'G#sus', 'seq': '1,3,4,4'}
    ]
  }
]

// chordName will be:
// C:maj C:min C#:7 C#:min7
function createChordStructByName (chordName) {
  var chord = chordName.split(':')
  var ukuleleChordName = 'N'
  if (chord.length > 1) {
    ukuleleChordName = chord[0] + chord[1].replace('min', 'm').replace('maj', '')
  } else {
    ukuleleChordName = chord[0]
  }
  return createChordStruct(ukuleleChordName)
}

function createChordStruct (ukuleleChordName) {
  for (var i in UkuleleChordChart) {
    for (var k in UkuleleChordChart[i].chords) {
      var uchord = UkuleleChordChart[i].chords[k]
      if (ukuleleChordName === uchord.name) {
        var seqs = uchord.seq.split(',')
        var fingger = []
        for (var f in seqs) {
          fingger.push([4 - parseInt(f), seqs[f]])
        }
        return {
          name: uchord.name,
          chord: fingger,
          position: 0,
          position_text: '',
          bars: []
        }
      }
    }
  }
  return {
    name: '',
    chord: [],
    position: 0,
    position_text: '',
    bars: []
  }
}

function renderOneChord (element, chordName) {
  return renderOneChordElement(element, createChordStructByName(chordName))
}

function renderOneChordElement (element, chordStruct) {
  var paper = Raphael(element, 60, 60)
  var chord = new UkuleleChordBox(paper, 10, 0, 50, 60)

  chord.setChord(
    chordStruct.name,
    chordStruct.chord,
    chordStruct.position,
    chordStruct.bars,
    chordStruct.position_text,
    []
  )
  chord.draw()

  if (element.className.indexOf('rendered') === -1) {
    element.className += ' rendered'
  }
}

function renderUkuleleChord (withinElement, rerender = false) {
  withinElement = withinElement || document
  _.each(withinElement.getElementsByClassName('chord'), function (el) {
    if (rerender === false && el.className.indexOf('rendered') > -1) {
      return
    }
    if (rerender === true) {
      el.innerHTML = ''
    }
    renderOneChord(el, el.getAttribute('chord'))
  })
}

export default renderUkuleleChord
