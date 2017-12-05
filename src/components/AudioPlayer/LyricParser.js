/**
 * Parse lyric and chord data and generate HTML
 *
 * @class LyricParser
 */
class LyricParser {
  constructor () {
    this.renderLine = function (lrcLine) {
      var html = []
      const regex = /\$([a-zA-Z0-9#:]+)/g
      let lyricStartPos = 0
      let m
      while ((m = regex.exec(lrcLine)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }

        var lyric = lrcLine.substring(lyricStartPos, m.index)
        if (lyric.trim().length > 0) {
          html.push(`<span class="lyric">${lyric}</span>`)
        } else {
          if (lyricStartPos !== 0) {
            html.push(`<span class="lyric">&nbsp;</span>`)
          }
        }

        var chord = m[1]

        html.push(`
        <span class="chordWrap">
          <ruby>
            <div class="chord" chord="${chord}"></div>
            <span style="display: none;">${chord}</span>
          </ruby>
        </span>
        `)

        lyricStartPos = regex.lastIndex
      }

      if (lyricStartPos < lrcLine.length) {
        lyric = lrcLine.substring(lyricStartPos, lrcLine.length)
        if (lyric.trim().length > 0) {
          html.push(`<span class="lyric">${lyric}</span>`)
        } else {
          if (lyricStartPos !== 0) {
            html.push(`<span class="lyric">&nbsp;</span>`)
          }
        }
      }
      return html.join('')
    }
  }
  /**
   * Parse lrc, suppose multiple time tag
   *
   * @param {any} lrcString  - Format:
   * [mm:ss.xx]lyric
   * [mm:ss.xxx]lyric
   * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
   *
   * @param {any} chordString
   * [{"end": 50(ms), "chord": "N", "start": 0}, {"end": 230,"chord": "F:maj","start": 50}, ...]
   * @param {any} renderLineCallback
   * @return {list}
   * [{time: xxx, lrcHtml: xxx, focus:false} ...]
   * @memberof LyricParser
   */
  parse (lrcString, chordString, renderLineCallback) {
    var renderLine = renderLineCallback || this.renderLine
    var lyricData = []
    const lyric = lrcString.split('\n')
    const lyricLen = lyric.length
    for (let i = 0; i < lyricLen; i++) {
      // match lrc time
      const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g)
      // match lrc text
      const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '')

      if (lrcTimes != null) {
        // handle multiple time tag
        const timeLen = lrcTimes.length
        for (let j = 0; j < timeLen; j++) {
          const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j])
          const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) +
            parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)
          lyricData.push({
            time: lrcTime,
            lrcHtml: renderLine(lrcText),
            focus: false
          })
        }
      }
    }
    // sort by time
    lyricData.sort((a, b) => {
      var ret = a.time - b.time
      return ret
    })
    return lyricData
  }

  /**
   * According to the capo position, calculate the corresponding chord
   * @param {string} key key = C    D     Fm
   * @param {number} capo 1
   * @returns B    C#    Em
   * @memberof LyricParser
   */
  getCapoKey (key, capo) {
    var ChordKey = ['C', 'C#/Bb', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    var lens = ChordKey.length
    for (var i = 0; i < lens; i++) {
      if (key === ChordKey[i]) {
        break
      } else if (key.length === 2 && ChordKey[i].search(key) !== -1) {
        break
      }
    }
    i = i - capo
    if (i < 0) {
      i = lens + i
    }
    var retKey = ChordKey[i]
    return retKey.length === 1 ? retKey : retKey.substr(0, 2)
  }

  /**
   * Get short name of chord.
   * @param {any} chord C:maj A:min C:7 D#:min7 N
   * @param {number} [capo=0] 0
   * @returns C     Am    C7  D#m7    Intro
   * @memberof LyricParser
   */
  getShortNameOfChord (chord, capo = 0) {
    if (chord === 'N') {
      return 'Intro'
    }

    var chordArray = chord.split(':')
    var chordKey = this.getCapoKey(chordArray[0], capo)
    var chordShap = chordArray[1]
    chordShap = chordShap.replace('maj', '').replace('min', 'm')
    return chordKey + chordShap
  }

  /**
   * Parse chord data.
   * @param {any} content
   * @returns
   * @memberof LyricParser
   */
  parseChordData (content) {
    var jsonObj = null
    if (typeof content === 'string') {
      jsonObj = JSON.parse(content)
    } else {
      jsonObj = content
    }
    this.duration = 0
    for (var key in jsonObj) {
      var item = jsonObj[key]
      item.name = this.getShortNameOfChord(item.chord)
      item.width = item.end - item.start
      this.duration += item.width
    }
    return jsonObj
  }
}

export default new LyricParser()
