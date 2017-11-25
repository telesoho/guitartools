/*
 * Guitar Chord Chart Renderer.
 * wotiger -- http://blog.telesoho.com
 *
 * Requires: Raphael JS (raphaeljs.com)
 */
var Raphael = require('raphael')

// Add a simple line method to Raphael.
Raphael.prototype.vexLine = function (x, y, newX, newY) {
  return this.path('M' + x + ' ' + y + 'L' + newX + ' ' + newY)
}

class ChordBox {
  constructor (paper, x, y, width, height) {
    this.paper = paper
    this.x = x
    this.y = y

    this.width = (!width) ? 100 : width
    this.height = (!height) ? 100 : height
    this.num_strings = 6
    this.num_frets = 5

    this.spacing = this.width / (this.num_strings)
    this.fret_spacing = (this.height) / (this.num_frets + 3)

    // Add room on sides for finger positions on 1. and 6. string
    this.x += this.spacing / 2
    this.y += this.fret_spacing

    this.metrics = {
      circle_radius: this.width / 28,
      text_shift_x: this.width / 29,
      text_shift_y: this.height / 29,
      font_size: Math.ceil(this.width / 9),
      bar_shift_x: this.width / 28,
      bridge_stroke_width: Math.ceil(this.height / 36),
      chord_fill: '#444'
    }

    // Content
    this.position = 0
    this.position_text = 0
    this.chord = []
    this.bars = []
  }

  setNumFrets (numFrets) {
    this.num_frets = numFrets
    this.fret_spacing = (this.height) / (this.num_frets + 2)
    return this
  }

  setChord (name, chord, position, bars, positionText, tuning) {
    this.name = name
    this.chord = chord
    this.position = position || 0
    this.position_text = positionText || 0
    this.bars = bars || []
    this.tuning = tuning || ['E', 'A', 'D', 'G', 'B', 'E']
    if (tuning === []) {
      this.fret_spacing = (this.height) / (this.num_frets + 1)
    }
    return this
  }

  setPositionText (position) {
    this.position_text = position
    return this
  }

  draw () {
    var spacing = this.spacing
    var fretSpacing = this.fret_spacing

    // Draw guitar bridge
    if (this.position <= 1) {
      this.paper.vexLine(this.x, this.y - this.metrics.bridge_stroke_width / 2,
        this.x + (spacing * (this.num_strings - 1)),
        this.y - this.metrics.bridge_stroke_width / 2).attr('stroke-width', this.metrics.bridge_stroke_width)
    } else {
      // Draw position number
      this.paper.text(this.x - (this.spacing / 2) - this.metrics.text_shift_x,
        this.y + (this.fret_spacing / 2) +
        this.metrics.text_shift_y +
        (this.fret_spacing * this.position_text),
        this.position).attr('font-size', this.metrics.font_size)
    }

    // Draw strings
    for (var i = 0; i < this.num_strings; ++i) {
      this.paper.vexLine(this.x + (spacing * i), this.y,
        this.x + (spacing * i),
        this.y + (fretSpacing * (this.num_frets)))
    }

    // Draw frets
    for (i = 0; i < this.num_frets + 1; ++i) {
      this.paper.vexLine(this.x, this.y + (fretSpacing * i),
        this.x + (spacing * (this.num_strings - 1)),
        this.y + (fretSpacing * i))
    }

    // Draw tuning keys
    if (this.tuning && this.tuning.length > 0) {
      var tuning = this.tuning
      for (i = 0; i < tuning.length; ++i) {
        var t = this.paper.text(
          this.x + (this.spacing * i),
          this.y +
          ((this.num_frets + 1) * this.fret_spacing),
          tuning[i])
        t.attr('font-size', this.metrics.font_size)
      }
    } else {
      t = this.paper.text(this.x + (this.width - this.metrics.font_size * this.name.length) / 2,
        this.y + ((this.num_frets + 1) * this.fret_spacing),
        this.name)
      t.attr('font-size', this.metrics.font_size * 2)
    }

    // Draw chord
    for (i = 0; i < this.chord.length; ++i) {
      this.lightUp(this.chord[i][0], this.chord[i][1])
    }

    // Draw bars
    for (i = 0; i < this.bars.length; ++i) {
      this.lightBar(this.bars[i].from_string,
        this.bars[i].to_string,
        this.bars[i].fret)
    }
  }

  lightUp (stringNum, fretNum) {
    stringNum = this.num_strings - stringNum

    var shiftPosition = 0
    if (this.position === 1 && this.position_text === 1) {
      shiftPosition = this.position_text
    }

    var mute = false

    if (fretNum === 'x') {
      fretNum = 0
      mute = true
    } else {
      fretNum -= shiftPosition
    }

    var x = this.x + (this.spacing * stringNum)
    var y = this.y + (this.fret_spacing * (fretNum))

    if (fretNum === 0) y -= this.metrics.bridge_stroke_width

    if (!mute) {
      var c = this.paper.circle(x, y - Math.floor(this.fret_spacing / 2), this.metrics.circle_radius)
      if (fretNum > 0) c.attr('fill', this.metrics.chord_fill)
    } else {
      c = this.paper.text(x, y - (this.fret_spacing - this.metrics.font_size), 'X').attr({ 'font-size': this.metrics.font_size })
    }

    return this
  }

  lightBar (stringFrom, stringTo, fretNum) {
    if (this.position === 1 && this.position_text === 1) {
      fretNum -= this.position_text
    }

    var stringFromNum = this.num_strings - stringFrom
    var stringToNum = this.num_strings - stringTo

    var x = this.x + (this.spacing * stringFromNum) - this.metrics.bar_shift_x
    var xTo = this.x + (this.spacing * stringToNum) + this.metrics.bar_shift_x

    var y = this.y + (this.fret_spacing * (fretNum - 1)) +
      (this.fret_spacing / 4)
    var yTo = this.y + (this.fret_spacing * (fretNum - 1)) +
      ((this.fret_spacing / 4) * 3)

    this.paper.rect(x, y, (xTo - x), (yTo - y), this.metrics.circle_radius).attr('fill', this.metrics.chord_fill)

    return this
  }
}

export default ChordBox
