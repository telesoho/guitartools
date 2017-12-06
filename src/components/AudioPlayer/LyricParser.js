/**
 * Parse lyric and chord data and generate HTML
 *
 * @class LyricParser
 */
class LyricParser {
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
    var chordData = this.parseChordData(chordString, 3)
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
          const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)

          lyricData.push({
            time: lrcTime,
            chords: [],
            lrcText: lrcText,
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

    var chordIndex = 0
    var chordLen = chordData.length
    var newChordData = []
    lyricData.forEach(data => {
      var lrcTime100 = data.time * 100
      while (chordIndex < chordLen) {
        var chord = chordData[chordIndex]
        if (lrcTime100 > chord.start && lrcTime100 < chord.end) {
          var newChord1 = Object.assign({}, chord)
          var newChord2 = Object.assign({}, chord)
          newChord1.end = lrcTime100
          newChord2.start = lrcTime100
          newChordData.push(newChord1, newChord2)
          chordIndex++
          break
        } else if (lrcTime100 === chord.start || lrcTime100 === chord.end) {
          newChordData.push(chord)
          chordIndex++
          break
        }
        newChordData.push(chord)
        chordIndex++
      }
    })
    chordData = newChordData
    var lastLyricData = null
    chordLen = chordData.length
    chordIndex = 0
    var lastChords = []
    lyricData.forEach(data => {
      // 计算上句歌词的和弦列表
      var lrcTime100 = data.time * 100
      lastChords = []
      while (chordIndex < chordLen) {
        var chord = chordData[chordIndex]
        if (chord.start >= lrcTime100) {
          break
        } else {
          lastChords.push(chord)
          chordIndex++
        }
      }

      if (lastLyricData !== null) {
        lastLyricData.chords = lastChords
      }
      lastLyricData = data
    })
    // 设置最后一句歌词的和弦
    lastChords.chords = lastChords
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
  parseChordData (content, capo = 0) {
    var jsonObj = null
    if (typeof content === 'string') {
      jsonObj = JSON.parse(content)
    } else {
      jsonObj = content
    }
    this.duration = 0
    for (var key in jsonObj) {
      var item = jsonObj[key]
      if (item.chord === 'N') {
        item.name = 'Intro'
      } else {
        var chordArray = item.chord.split(':')
        var chordKey = this.getCapoKey(chordArray[0], capo)
        var chordShap = chordArray[1]
        item.chord = `${chordKey}:${chordShap}`
        var shortChordShap = chordShap.replace('maj', '').replace('min', 'm')
        item.name = chordKey + shortChordShap
      }
      // item.width = item.end - item.start
      // this.duration += item.width
    }
    return jsonObj
  }
}

export default new LyricParser()
