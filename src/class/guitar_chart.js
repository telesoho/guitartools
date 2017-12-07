/*
 * Guitar Chord Chart Renderer.
 * Wotiger -- http://blog.telesoho.com
 *
 * Requires: chord.js
 * Requires: Raphael JS (raphaeljs.com)
 */
import GuitarChordBox from './guitar_chord_box'
import * as _ from 'underscore'
var Raphael = require('raphael')

var GuitarChordChart = [
  { section: 'Open Chords',
    description: `These chords are played in open position, and generally
                 include open strings.`,
    chords: {
      'N': {
        name: '',
        chord: [],
        position: 0,
        bars: []
      },
      'C:maj': {
        name: 'C',
        chord: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 3]],
        position: 0,
        bars: []
      },
      'D:maj': {
        name: 'D',
        chord: [[1, 2], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        position: 0,
        bars: []
      },
      'E:maj': {
        name: 'E',
        chord: [[1, 0], [2, 0], [3, 1], [4, 2], [5, 2], [6, 0]],
        position: 0,
        bars: []
      },
      'G:maj': {
        name: 'G',
        chord: [[1, 3], [2, 3], [3, 0], [4, 0], [5, 2], [6, 3]],
        position: 0,
        bars: []
      },
      'A:maj': {
        name: 'A',
        chord: [[1, 0], [2, 2], [3, 2], [4, 2], [5, 0], [6, 'x']],
        position: 0,
        bars: []
      },
      'D:min': {
        name: 'Dm',
        chord: [[1, 1], [2, 3], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        position: 0,
        bars: []
      },
      'E:min': {
        name: 'Em',
        chord: [[1, 0], [2, 0], [3, 0], [4, 2], [5, 2], [6, 0]],
        position: 0,
        bars: []
      },
      'A:min': {
        name: 'Am',
        chord: [[1, 0], [2, 1], [3, 2], [4, 2], [5, 0], [6, 'x']],
        position: 0,
        bars: []
      },
      'C:7': {
        name: 'C7',
        chord: [[1, 0], [2, 1], [3, 3], [4, 2], [5, 3], [6, 'x']],
        position: 0,
        bars: []
      },
      'D:7': {
        name: 'D7',
        chord: [[1, 2], [2, 1], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        position: 0,
        bars: []
      },
      'E:7': {
        name: 'E7',
        chord: [[1, 0], [2, 3], [3, 1], [4, 0], [5, 2], [6, 0]],
        position: 0,
        bars: []
      },
      'G:7': {
        name: 'G7',
        chord: [[1, 1], [2, 0], [3, 0], [4, 0], [5, 2], [6, 3]],
        position: 0,
        bars: []
      },
      'A:7': {
        name: 'A7',
        chord: [[1, 0], [2, 2], [3, 0], [4, 2], [5, 0], [6, 'x']],
        position: 0,
        bars: []
      },
      'D:min7': {
        name: 'Dm7',
        chord: [[1, 1], [2, 1], [3, 2], [4, 0], [5, 'x'], [6, 'x']],
        position: 0,
        bars: []
      },
      'E:min7': {
        name: 'Em7',
        chord: [[1, 0], [2, 3], [3, 0], [4, 2], [5, 2], [6, 0]],
        position: 0,
        bars: []
      },
      'A:min7': {
        name: 'Am7',
        chord: [[1, 0], [2, 1], [3, 0], [4, 2], [5, 0], [6, 'x']],
        position: 0,
        bars: []
      }
    }
  }
]

var GuitarChordShapes = {
  'E:maj': {
    name: '',
    chord: [[3, 2], [4, 3], [5, 3]],
    bars: [{from_string: 6, to_string: 1, fret: 1}]
  },
  'E:min': {
    name: 'm',
    chord: [[4, 3], [5, 3]],
    bars: [{from_string: 6, to_string: 1, fret: 1}]
  },
  'E:7': {
    name: '7',
    chord: [[2, 4], [3, 2], [5, 3]],
    bars: [{from_string: 6, to_string: 1, fret: 1}]
  },
  'E:min7': {
    name: 'm7',
    chord: [[2, 4], [5, 3]],
    bars: [{from_string: 6, to_string: 1, fret: 1}]
  },
  'E:maj7': {
    name: 'maj7',
    chord: [[1, 'x'], [2, 1], [3, 2], [4, 2], [5, 'x'], [6, 1]]
  },
  'E:dim': {
    name: 'dim',
    chord: [[1, 'x'], [3, 2], [5, 'x'], [6, 2]],
    position_text: 1,
    bars: [{from_string: 4, to_string: 2, fret: 1}]
  },
  'E:min7b5': {
    name: 'm7b5',
    chord: [[1, 'x'], [2, 1], [3, 2], [4, 2], [5, 'x'], [6, 2]],
    position_text: 1
  },
  'E:sus4': {
    name: 'sus4',
    chord: [],
    bars: [{from_string: 6, to_string: 1, fret: 1},
           {from_string: 5, to_string: 3, fret: 3}]
  },
  'E:7sus4': {
    name: '7sus4',
    chord: [[3, 3], [5, 3]],
    bars: [{from_string: 6, to_string: 1, fret: 1}]
  },
  'E:13': {
    name: '13',
    chord: [[1, 'x'], [2, 4], [3, 3], [4, 2], [5, 'x'], [6, 2]],
    position_text: 1
  },
  'A:maj': {
    name: '',
    chord: [[2, 3], [3, 3], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:min': {
    name: 'm',
    chord: [[2, 2], [3, 3], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:7': {
    name: '7',
    chord: [[2, 3], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:min7': {
    name: 'm7',
    chord: [[2, 2], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:min7b5': {
    name: 'm7b5',
    chord: [[2, 2], [4, 2], [6, 'x']],
    bars: [{from_string: 5, to_string: 3, fret: 1}]
  },
  'A:dim': {
    name: 'dim',
    chord: [[1, 'x'], [2, 3], [3, 1], [4, 3], [5, 2], [6, 'x']],
    position_text: 1
  },
  'A:maj7': {
    name: 'maj7',
    chord: [[2, 3], [3, 2], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:sus2': {
    name: 'sus2',
    chord: [[3, 3], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:sus4': {
    name: 'sus4',
    chord: [[2, 4], [3, 3], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:7sus4': {
    name: '7sus4',
    chord: [[2, 4], [4, 3], [6, 'x']],
    bars: [{from_string: 5, to_string: 1, fret: 1}]
  },
  'A:9': {
    name: '9',
    chord: [[1, 'x'], [2, 2], [3, 2], [4, 1], [5, 2], [6, 'x']],
    position_text: 1
  },
  'A:7b9': {
    name: '7b9',
    chord: [[1, 'x'], [2, 1], [3, 2], [4, 1], [5, 2], [6, 'x']],
    position_text: 1
  },
  'A:7#9': {
    name: '7#9',
    chord: [[1, 'x'], [2, 3], [3, 2], [4, 1], [5, 2], [6, 'x']],
    position_text: 1
  },
  'A:13': {
    name: '13',
    chord: [[1, 4], [2, 4], [3, 2], [4, 4], [5, 2], [6, 'x']],
    position_text: 1
  }
}

var positions = {
  'E': {
    'A': 5,
    'A#': 6,
    'Bb': 6,
    'B': 7,
    'C': 8,
    'C#': 9,
    'Db': 9,
    'D': 10,
    'D#': 11,
    'Eb': 11,
    'E': 12,
    'F': 1,
    'F#': 2,
    'Gb': 2,
    'G': 3,
    'G#': 4,
    'Ab': 4
  },
  'A': {
    'A': 12,
    'A#': 1,
    'Bb': 1,
    'B': 2,
    'C': 3,
    'C#': 4,
    'Db': 4,
    'D': 5,
    'D#': 6,
    'Eb': 6,
    'E': 7,
    'F': 8,
    'F#': 9,
    'Gb': 9,
    'G': 10,
    'G#': 11,
    'Ab': 11
  }
}

function createChordStructByName (chordName) {
  function findTabKey (key) {
    var minFret = 99
    var tabKey = 'N'
    for (var k in positions) {
      for (var s in positions[k]) {
        if (s === key) {
          if (positions[k][s] < minFret) {
            minFret = positions[k][s]
            tabKey = k
            break
          }
        }
      }
    }
    return tabKey
  }

  for (var i in GuitarChordChart) {
    for (var k in GuitarChordChart[i].chords) {
      if (k === chordName) {
        return GuitarChordChart[i].chords[k]
      }
    }
  }

  var chord = chordName.split(':')
  var tabKey = findTabKey(chord[0])

  var shape = tabKey + ':' + chord[1]
  return createChordStruct(chord[0], tabKey, shape)
}

function createChordStruct (key, string, shape) {
  // console.log(key, string, shape)
  string = string.toUpperCase()
  var position = positions[string][key]
  var struct = GuitarChordShapes[shape]

  return {
    name: key + struct.name,
    chord: struct.chord,
    position: position,
    position_text: struct.position_text,
    bars: struct.bars
  }
}

function renderOneChord (element, chordName) {
  return renderOneChordElement(element, createChordStructByName(chordName))
}

function renderOneChordElement (element, chordStruct) {
  var paper = Raphael(element, 60, 60)
  var chord = new GuitarChordBox(paper, 10, 0, 50, 60)

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

function renderGuitarChord (withinElement, rerender = false) {
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

export default renderGuitarChord
